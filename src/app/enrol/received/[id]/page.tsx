import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hammer, Hourglass, ListChecks, Mail, MessageCircle } from 'lucide-react'
import { EnrolDone } from '@/components/site/enrol-done'
import { naira } from '@/lib/enrolment'
import { canStore } from '@/lib/server/env'
import { admin, type EnrolmentRow } from '@/lib/server/supabase'

export const metadata: Metadata = { title: 'Registration received', robots: { index: false } }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

/** After a bank-transfer registration. The address carries the enrolment's unguessable id. */
export default async function ReceivedPage({ params }: PageProps<'/enrol/received/[id]'>) {
  const { id } = await params
  if (!UUID.test(id) || !canStore()) notFound()
  const { data: row } = await admin().from('academy_enrolments').select('*').eq('id', id).eq('method', 'transfer').maybeSingle<EnrolmentRow>()
  if (!row) notFound()
  const first = row.full_name.split(/\s+/)[0]
  const confirmed = row.status === 'confirmed'

  return (
    <EnrolDone
      tone="ai"
      badge={Hourglass}
      kicker="Registration received"
      title={confirmed ? `You’re in, ${first}!` : `Thanks, ${first}. We’re checking your transfer.`}
      lead={
        confirmed
          ? 'We’ve confirmed your payment. Check your email and WhatsApp for your class details.'
          : 'We’ve got your registration and payment details. Once we’ve matched your transfer to our account, we’ll confirm your place by email and WhatsApp.'
      }
      course={row.course}
      status={confirmed ? 'Confirmed' : 'Being checked'}
      rows={[
        { k: 'Name on certificate', v: row.full_name },
        { k: 'Paid to', v: 'UBA · Practicode Consult' },
        { k: 'Your transaction ID', v: row.transfer_id || 'Receipt uploaded', mono: Boolean(row.transfer_id) },
        { k: 'Amount', v: naira(row.amount_kobo), big: true },
      ]}
      steps={[
        { title: 'We check your transfer', body: 'We match your transaction ID or receipt against our account.', icon: ListChecks, tone: 'ai' },
        { title: 'You get a confirmation', body: 'We email your enrolment details and message you on WhatsApp.', icon: Mail, tone: 'fe' },
        { title: 'Join your class WhatsApp group', body: 'Your invite comes with your class details and timetable.', icon: MessageCircle, tone: 'da' },
        { title: 'Start building', body: 'From your first class, you build something real every week.', icon: Hammer, tone: 'ux' },
      ]}
    />
  )
}
