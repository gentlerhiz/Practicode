import { z } from 'zod'
import { confirmPayment } from '@/lib/server/confirm'
import { signedByPaystack } from '@/lib/server/paystack'

const Event = z.object({
  event: z.string(),
  data: z.object({ reference: z.string().optional(), metadata: z.unknown().optional() }).passthrough(),
})

/**
 * Paystack's events for academy payments. Paystack allows one webhook per account and PractiCode Learn
 * owns it, so Learn's webhook forwards charges marked `source: 'academy'` here, body and signature
 * unchanged. This catches students who pay and close the tab before Paystack sends them back.
 * confirmPayment verifies the charge with Paystack again and only the first update sends the emails.
 */
export async function POST(request: Request) {
  const raw = await request.text()
  if (!signedByPaystack(raw, request.headers.get('x-paystack-signature'))) return new Response('Bad signature', { status: 401 })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return new Response('ok')
  }
  const parsed = Event.safeParse(body)
  if (!parsed.success || parsed.data.event !== 'charge.success' || !parsed.data.data.reference) return new Response('ok')

  const result = await confirmPayment(parsed.data.data.reference)
  // Paystack retries on a non-2xx answer: ask again when we couldn't reach Paystack to verify.
  if (result.state === 'pending') return new Response('Try again', { status: 500 })
  return new Response('ok')
}
