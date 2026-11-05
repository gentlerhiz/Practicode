import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, FileText, MessageCircle } from 'lucide-react'
import { ActionButtons, ActionForm, CheckField, ConfirmDelete, SelectField, TextArea, TextField } from '@/components/admin/forms'
import { Fact, PageHead, Panel, StatusBadge } from '@/components/admin/ui'
import { Icon } from '@/components/ui/icon'
import { koboToNairaInput, label, naira, waLink, when } from '@/lib/admin/format'
import { Uuid } from '@/lib/admin/schemas'
import { ENROL_COURSE_IDS, ENROLMENT_STATUSES, METHODS } from '@/lib/admin/types'
import { requireAdmin } from '@/lib/server/admin/auth'
import { getEnrolment, listCohorts, listCourses } from '@/lib/server/admin/data'
import { quickEnrolment, removeEnrolment, saveEnrolment } from '../../../actions'

export const metadata = { title: 'Enrolment' }

const LEVELS = ['100', '200', '300', '400', '500', 'ND1', 'ND2', 'HND1', 'HND2']

export default async function EnrolmentPage({ params }: PageProps<'/code/administrator/console/enrolments/[id]'>) {
  await requireAdmin()
  const id = Uuid.safeParse((await params).id)
  if (!id.success) notFound()
  const [e, cohorts, courses] = await Promise.all([getEnrolment(id.data), listCohorts(), listCourses()])
  if (!e) notFound()
  const wa = waLink(e.whatsapp)
  const file = (kind: 'receipt' | 'letter') => `/code/administrator/console/files/${e.id}/${kind}`
  const levelOptions = [['', '—'] as const, ...[...new Set([...LEVELS, ...(e.level ? [e.level] : [])])].map((l) => [l, l] as const)]

  return (
    <>
      <Link href="/code/administrator/console/enrolments" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink">
        <Icon as={ArrowLeft} size={16} /> Enrolments
      </Link>
      <PageHead
        title={e.full_name}
        note={
          <>
            Started {when(e.created_at)} · {naira(e.amount_kobo)} by {e.method === 'paystack' ? 'Paystack' : 'bank transfer'} · <StatusBadge status={e.status} />
          </>
        }
        actions={
          wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="press inline-flex h-9 items-center gap-2 rounded-full bg-da px-4 text-sm font-semibold text-white">
              <Icon as={MessageCircle} size={16} />
              Open WhatsApp chat
            </a>
          )
        }
      />

      <Panel title="Payment" className="mb-4">
        <div className="flex flex-col gap-5">
          <dl className="grid grid-cols-1 gap-4 ph:grid-cols-2 wide:grid-cols-4">
            <Fact label="Amount due">{naira(e.amount_kobo)}</Fact>
            <Fact label="Paid">
              {naira(e.paid_amount_kobo)}
              {e.paid_at && <span className="text-ink-muted"> · {when(e.paid_at)}</span>}
            </Fact>
            <Fact label="Paystack reference">
              <span className="font-mono text-xs">{e.paystack_reference ?? '—'}</span>
            </Fact>
            <Fact label="Transfer id">
              <span className="font-mono text-xs">{e.transfer_id ?? '—'}</span>
            </Fact>
            <Fact label="Channel">{e.paid_channel ?? '—'}</Fact>
            <Fact label="Receipt">
              {e.receipt_path ? (
                <a href={file('receipt')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-fe-text hover:underline">
                  <Icon as={FileText} size={15} /> Open receipt
                </a>
              ) : (
                'None'
              )}
            </Fact>
            <Fact label="Introduction letter">
              {e.letter_path ? (
                <a href={file('letter')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-fe-text hover:underline">
                  <Icon as={FileText} size={15} /> Open letter
                </a>
              ) : (
                'None'
              )}
            </Fact>
            <Fact label="Upload links">Made when you open them; each works for 10 minutes.</Fact>
          </dl>
          <div className="border-t border-line-subtle pt-4">
            <ActionButtons
              action={quickEnrolment}
              values={{ id: e.id }}
              buttons={[
                ...(e.method === 'transfer' && e.status !== 'confirmed' ? [{ to: 'confirmed', label: 'Mark transfer confirmed', variant: 'primary' as const }] : []),
                ...(e.status !== 'paid' && e.status !== 'confirmed' ? [{ to: 'paid', label: 'Mark paid' }] : []),
                ...(e.status !== 'cancelled' ? [{ to: 'cancelled', label: 'Cancel enrolment', variant: 'ghost' as const }] : []),
              ]}
            />
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 wide:grid-cols-[minmax(0,1fr)_300px]">
        <Panel title="Edit">
          <ActionForm action={saveEnrolment} submit="Save changes">
            <input type="hidden" name="id" value={e.id} />
            <div className="grid grid-cols-1 gap-4 ph:grid-cols-2">
              <TextField name="full_name" label="Full name" defaultValue={e.full_name} maxLength={120} required />
              <TextField name="email" label="Email" type="email" defaultValue={e.email} maxLength={254} required />
              <TextField name="whatsapp" label="WhatsApp" defaultValue={e.whatsapp} maxLength={20} required />
              <SelectField
                name="course"
                label="Course"
                defaultValue={e.course}
                options={ENROL_COURSE_IDS.map((id) => [id, courses.find((c) => c.id === id)?.title ?? id] as const)}
              />
              <SelectField
                name="cohort_id"
                label="Cohort"
                defaultValue={e.cohort_id ?? cohorts.find((c) => c.is_current)?.id}
                options={cohorts.map((c) => [c.id, c.is_current ? `${c.name} (current)` : c.name] as const)}
              />
              <SelectField name="status" label="Status" defaultValue={e.status} options={ENROLMENT_STATUSES.map((s) => [s, label(s)] as const)} />
              <SelectField name="method" label="Method" defaultValue={e.method} options={METHODS.map((m) => [m, m === 'paystack' ? 'Paystack' : 'Bank transfer'] as const)} />
              <TextField name="amount" label="Amount due (naira)" inputMode="decimal" defaultValue={koboToNairaInput(e.amount_kobo)} required />
              <TextField name="paid_amount" label="Amount paid (naira)" inputMode="decimal" defaultValue={koboToNairaInput(e.paid_amount_kobo)} hint="Blank when nothing is recorded." />
              <TextField name="paid_channel" label="Payment channel" defaultValue={e.paid_channel ?? ''} maxLength={40} />
              <TextField name="transfer_id" label="Transfer id" defaultValue={e.transfer_id ?? ''} maxLength={80} />
              <TextField name="matric_number" label="Matric number" defaultValue={e.matric_number ?? ''} maxLength={40} />
              <SelectField name="level" label="Level" defaultValue={e.level ?? ''} options={levelOptions} />
              <CheckField name="siwes" label="SIWES / IT student" defaultChecked={e.siwes} />
            </div>
            <TextArea name="notes" label="Notes" defaultValue={e.notes ?? ''} maxLength={4000} hint="Only staff see notes." />
          </ActionForm>
        </Panel>
        <div className="flex flex-col gap-4">
          <Panel title="Details">
            <dl className="flex flex-col gap-3">
              <Fact label="Record id">
                <span className="font-mono text-xs">{e.id}</span>
              </Fact>
              <Fact label="Cohort">{cohorts.find((c) => c.id === e.cohort_id)?.name ?? '—'}</Fact>
              <Fact label="Email">
                <a className="hover:underline" href={`mailto:${e.email}`}>
                  {e.email}
                </a>
              </Fact>
            </dl>
          </Panel>
          <Panel title="Delete">
            <p className="mb-3 text-sm text-ink-muted">Removes this enrolment and its uploaded receipt and letter for good. It can’t be undone.</p>
            <ConfirmDelete action={removeEnrolment} values={{ id: e.id }} label="Delete enrolment" question="Delete this enrolment and its uploads?" />
          </Panel>
        </div>
      </div>
    </>
  )
}
