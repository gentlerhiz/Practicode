import 'server-only'
import { request as httpsRequest } from 'node:https'
import { z } from 'zod'
import type { PaystackTx } from '@/lib/enrolment'
import { serverEnv } from './env'

export class PaystackError extends Error {
  override name = 'PaystackError'
}

/**
 * One HTTPS/1.1 request on its own connection (as PractiCode Learn does): payments are rare, and a fresh
 * connection can't inherit a broken shared HTTP/2 session.
 */
function call(method: 'GET' | 'POST', path: string, body?: unknown): Promise<{ status: number; text: string }> {
  const key = serverEnv.paystackSecret
  if (!key) return Promise.reject(new PaystackError('PAYSTACK_SECRET_KEY is not set'))
  return new Promise((resolve, reject) => {
    const payload = body === undefined ? undefined : JSON.stringify(body)
    const req = httpsRequest(
      {
        host: 'api.paystack.co',
        path,
        method,
        agent: false,
        timeout: 20_000,
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        let text = ''
        res.setEncoding('utf8')
        res.on('data', (chunk: string) => (text += chunk))
        res.on('end', () => resolve({ status: res.statusCode ?? 0, text }))
        res.on('error', reject)
      },
    )
    req.on('timeout', () => req.destroy(new Error('timed out')))
    req.on('error', reject)
    req.end(payload)
  })
}

async function paystack<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  let res: { status: number; text: string }
  try {
    res = await call(method, path, body)
  } catch (error) {
    // Reading is safe to repeat once; starting a payment isn't.
    if (method !== 'GET') throw new PaystackError(`Paystack ${path}: ${(error as Error).message}`)
    res = await call(method, path, body).catch((again: Error) => {
      throw new PaystackError(`Paystack ${path}: ${again.message}`)
    })
  }
  let json: { status?: boolean; message?: string; data?: T } = {}
  try {
    json = JSON.parse(res.text)
  } catch {
    // Reported below with the status code.
  }
  if (res.status >= 400 || !json.status) throw new PaystackError(`Paystack ${path}: ${res.status} ${json.message ?? ''}`)
  return json.data as T
}

/** Starts a one-off payment on Paystack's checkout page and returns its address. */
export async function startPayment(o: {
  email: string
  amountKobo: number
  reference: string
  callbackUrl: string
  enrolmentId: string
  course: string
}): Promise<string> {
  const data = await paystack<{ authorization_url: string }>('POST', '/transaction/initialize', {
    email: o.email,
    amount: o.amountKobo,
    currency: 'NGN',
    reference: o.reference,
    callback_url: o.callbackUrl,
    // Learn's webhook shares this account; it ignores charges without a learner, such as these.
    metadata: { source: 'academy', enrolment_id: o.enrolmentId, course: o.course },
  })
  return data.authorization_url
}

const Tx = z.object({
  reference: z.string(),
  status: z.string(),
  amount: z.number(),
  currency: z.string(),
  channel: z.string().nullable().optional(),
  paid_at: z.string().nullable().optional(),
})

/** Asks Paystack what really happened to a payment. */
export async function verifyPayment(reference: string): Promise<PaystackTx> {
  return Tx.parse(await paystack('GET', `/transaction/verify/${encodeURIComponent(reference)}`))
}
