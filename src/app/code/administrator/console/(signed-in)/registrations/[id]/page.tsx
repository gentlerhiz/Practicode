import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { ActionForm, CheckField, ConfirmDelete, SelectField, TextArea, TextField } from '@/components/admin/forms'
import { Fact, PageHead, Panel, StatusBadge } from '@/components/admin/ui'
import { Icon } from '@/components/ui/icon'
import { label, waLink, when } from '@/lib/admin/format'
import { Uuid } from '@/lib/admin/schemas'
import { ATTENDANCE, REGISTRATION_STATUSES } from '@/lib/admin/types'
import { requireAdmin } from '@/lib/server/admin/auth'
import { getRegistration, listCohorts, listCourses } from '@/lib/server/admin/data'
import { removeRegistration, saveRegistration } from '../../../actions'

export const metadata = { title: 'Registration' }

export default async function RegistrationPage({ params }: PageProps<'/code/administrator/console/registrations/[id]'>) {
  await requireAdmin()
  const id = Uuid.safeParse((await params).id)
  if (!id.success) notFound()
  const [r, cohorts, courses] = await Promise.all([getRegistration(id.data), listCohorts(), listCourses()])
  if (!r) notFound()
  const wa = waLink(r.whatsapp)

  return (
    <>
      <Link href="/code/administrator/console/registrations" className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink">
        <Icon as={ArrowLeft} size={16} /> Registrations
      </Link>
      <PageHead
        title={r.full_name}
        note={
          <>
            Registered {when(r.created_at)} · <StatusBadge status={r.status} />
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
      <div className="grid grid-cols-1 gap-4 wide:grid-cols-[minmax(0,1fr)_300px]">
        <Panel title="Edit">
          <ActionForm action={saveRegistration} submit="Save changes">
            <input type="hidden" name="id" value={r.id} />
            <div className="grid grid-cols-1 gap-4 ph:grid-cols-2">
              <TextField name="full_name" label="Full name" defaultValue={r.full_name} maxLength={120} required />
              <TextField name="email" label="Email" type="email" defaultValue={r.email} maxLength={254} required />
              <TextField name="whatsapp" label="WhatsApp" defaultValue={r.whatsapp} maxLength={20} required />
              <SelectField name="course" label="Course" defaultValue={r.course} options={courses.map((c) => [c.id, c.title] as const)} />
              <SelectField name="attendance" label="Attendance" defaultValue={r.attendance} options={ATTENDANCE.map((a) => [a, label(a)] as const)} />
              <SelectField name="status" label="Status" defaultValue={r.status} options={REGISTRATION_STATUSES.map((s) => [s, label(s)] as const)} />
              <TextField name="city" label="City" defaultValue={r.city} maxLength={80} required />
              <TextField name="state" label="State" defaultValue={r.state} maxLength={80} required />
              <TextField name="heard_from" label="Heard about us from" defaultValue={r.heard_from ?? ''} maxLength={80} />
              <SelectField
                name="cohort_id"
                label="Cohort"
                defaultValue={r.cohort_id}
                options={cohorts.map((c) => [c.id, c.is_current ? `${c.name} (current)` : c.name] as const)}
              />
              <CheckField name="siwes" label="SIWES / IT student" defaultChecked={r.siwes} />
              <CheckField name="consent" label="Agreed to be contacted" defaultChecked={r.consent} />
            </div>
            <TextArea name="notes" label="Notes" defaultValue={r.notes ?? ''} maxLength={4000} hint="Only staff see notes." />
          </ActionForm>
        </Panel>
        <div className="flex flex-col gap-4">
          <Panel title="Details">
            <dl className="flex flex-col gap-3">
              <Fact label="Record id">
                <span className="font-mono text-xs">{r.id}</span>
              </Fact>
              <Fact label="Cohort">{cohorts.find((c) => c.id === r.cohort_id)?.name ?? '—'}</Fact>
              <Fact label="Email">
                <a className="hover:underline" href={`mailto:${r.email}`}>
                  {r.email}
                </a>
              </Fact>
            </dl>
          </Panel>
          <Panel title="Delete">
            <p className="mb-3 text-sm text-ink-muted">Removes this registration for good. It can’t be undone.</p>
            <ConfirmDelete action={removeRegistration} values={{ id: r.id }} label="Delete registration" question="Delete this registration?" />
          </Panel>
        </div>
      </div>
    </>
  )
}
