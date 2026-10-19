import type { Metadata } from 'next'
import { CircleAlert, CircleCheck, Code, Hammer, Hourglass, Mail, MessageCircle } from 'lucide-react'
import { EnrolDone, type DoneStep } from '@/components/site/enrol-done'
import { naira } from '@/lib/enrolment'
import { confirmPayment } from '@/lib/server/confirm'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Your enrolment', robots: { index: false } }

const paidSteps: DoneStep[] = [
  { title: 'Check your email', body: 'Your receipt and enrolment details are waiting. Check your spam folder if you can’t see them.', icon: Mail, tone: 'fe' },
  { title: 'Join your class WhatsApp group', body: 'We’ll send you an invite on WhatsApp, with your class details and timetable.', icon: MessageCircle, tone: 'da' },
  { title: 'Get ready for class', body: 'Bring a laptop if you can. Online students need a steady internet connection.', icon: Code, tone: 'ux' },
  { title: 'Start building', body: 'From your first class, you build something real every week.', icon: Hammer, tone: 'ai' },
]

/** Paystack sends students here after paying, with ?reference=. The payment is checked with Paystack first. */
export default async function ConfirmedPage({ searchParams }: PageProps<'/enrol/confirmed'>) {
  const sp = await searchParams
  const reference = typeof sp.reference === 'string' ? sp.reference : typeof sp.trxref === 'string' ? sp.trxref : undefined
  const { state, row } = await confirmPayment(reference)

  if (state === 'paid' && row) {
    const first = row.full_name.split(/\s+/)[0]
    return (
      <EnrolDone
        tone="da"
        badge={CircleCheck}
        kicker="Payment received"
        title={`You’re in, ${first}. Welcome to PractiCode Academy!`}
        lead={`We’ve emailed your receipt and enrolment details to ${row.email}. Here’s what happens next.`}
        course={row.course}
        status="Paid"
        printable
        rows={[
          { k: 'Name on certificate', v: row.full_name },
          { k: 'Paid with', v: row.paid_channel ? `Paystack, ${row.paid_channel.replace('_', ' ')}` : 'Paystack' },
          { k: 'Reference', v: row.paystack_reference ?? '', mono: true },
          { k: 'Amount paid', v: naira(row.paid_amount_kobo ?? row.amount_kobo), big: true },
        ]}
        steps={paidSteps}
      />
    )
  }

  const pending = state === 'pending'
  return (
    <EnrolDone
      tone={pending ? 'ai' : 'ux'}
      badge={pending ? Hourglass : CircleAlert}
      kicker={pending ? 'Payment not confirmed yet' : 'Payment not completed'}
      title={pending ? 'We’re still waiting for Paystack.' : 'Your payment didn’t go through.'}
      lead={
        pending
          ? 'If you completed the payment, refresh this page in a minute. Your details are saved, so you won’t need to fill the form again.'
          : `Nothing was charged. You can enrol again, pay by bank transfer instead, or message us on WhatsApp (${site.phones[0]}) and we’ll help.`
      }
      course={row?.course}
      status={pending ? 'Waiting' : 'Not paid'}
      rows={row ? [{ k: 'Name on certificate', v: row.full_name }, { k: 'Reference', v: row.paystack_reference ?? '', mono: true }, { k: 'Amount', v: naira(row.amount_kobo), big: true }] : undefined}
      steps={[
        { title: pending ? 'Refresh this page' : 'Try again', body: pending ? 'Paystack can take a moment to confirm a bank transfer or USSD payment.' : 'Go back to the Enrol page and choose Paystack or bank transfer.', icon: pending ? Hourglass : CircleAlert, tone: 'fe' },
        { title: 'Or message us', body: `Send your reference to us on WhatsApp (${site.phones[0]}) and we’ll check it for you.`, icon: MessageCircle, tone: 'da' },
      ]}
    />
  )
}
