import type { Route } from 'next'
import Link from 'next/link'
import { ActionButtons, ActionForm, CheckField, ConfirmDelete, TextField } from '@/components/admin/forms'
import { Badge, PageHead, Panel } from '@/components/admin/ui'
import { day } from '@/lib/admin/format'
import { requireAdmin } from '@/lib/server/admin/auth'
import { cohortCounts, listCohorts } from '@/lib/server/admin/data'
import { addCohort, makeCohortCurrent, removeCohort, saveCohort } from '../../actions'

export const metadata = { title: 'Cohorts' }

export default async function CohortsPage() {
  await requireAdmin()
  const [cohorts, counts] = await Promise.all([listCohorts(), cohortCounts()])

  return (
    <>
      <PageHead
        title="Cohorts"
        note="The current cohort is the one the public forms add new sign-ups to. Only one cohort is current at a time."
      />
      <div className="grid grid-cols-1 gap-4 wide:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-4">
          {cohorts.map((c) => {
            const n = counts.get(c.id) ?? { registrations: 0, enrolments: 0 }
            return (
              <Panel
                key={c.id}
                title={c.name}
                aside={
                  <div className="flex flex-wrap items-center gap-2">
                    {c.is_current && <Badge tone="green">Current</Badge>}
                    <Badge tone={c.registration_open ? 'blue' : 'neutral'}>{c.registration_open ? 'Registration open' : 'Registration closed'}</Badge>
                    <Badge tone={c.enrolment_open ? 'blue' : 'neutral'}>{c.enrolment_open ? 'Enrolment open' : 'Enrolment closed'}</Badge>
                  </div>
                }
              >
                <p className="mb-4 text-sm text-ink-muted">
                  Starts {day(c.starts_on)} ·{' '}
                  <Link className="font-semibold text-fe-text hover:underline" href={`/code/administrator/console/registrations?cohort=${c.id}` as Route}>
                    {n.registrations} registration{n.registrations === 1 ? '' : 's'}
                  </Link>{' '}
                  ·{' '}
                  <Link className="font-semibold text-fe-text hover:underline" href={`/code/administrator/console/enrolments?cohort=${c.id}` as Route}>
                    {n.enrolments} enrolment{n.enrolments === 1 ? '' : 's'}
                  </Link>
                </p>
                <ActionForm action={saveCohort} submit="Save cohort" variant="secondary">
                  <input type="hidden" name="id" value={c.id} />
                  <div className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-4">
                    <TextField name="name" label="Name" defaultValue={c.name} maxLength={80} required className="ph:col-span-2" />
                    <TextField name="starts_on" label="Start date" type="date" defaultValue={c.starts_on ?? ''} />
                    <div className="flex flex-col">
                      <CheckField name="registration_open" label="Registration open" defaultChecked={c.registration_open} />
                      <CheckField name="enrolment_open" label="Enrolment open" defaultChecked={c.enrolment_open} />
                    </div>
                  </div>
                </ActionForm>
                <div className="mt-4 flex flex-wrap items-start gap-3 border-t border-line-subtle pt-4">
                  <ActionButtons action={makeCohortCurrent} values={{ id: c.id }} buttons={c.is_current ? [] : [{ to: 'current', label: 'Set as current' }]} />
                  {!c.is_current && <ConfirmDelete action={removeCohort} values={{ id: c.id }} label="Delete cohort" question={`Delete ${c.name}?`} />}
                </div>
              </Panel>
            )
          })}
        </div>
        <Panel title="New cohort" className="self-start">
          <ActionForm action={addCohort} submit="Create cohort" reset>
            <TextField name="name" label="Name" placeholder="2027 Cohort 2" maxLength={80} required />
            <TextField name="starts_on" label="Start date" type="date" hint="Optional." />
            <CheckField name="registration_open" label="Registration open" defaultChecked />
            <CheckField name="enrolment_open" label="Enrolment open" defaultChecked />
          </ActionForm>
          <p className="mt-4 text-xs leading-[18px] text-ink-subtle">A new cohort isn’t current until you set it. A cohort with registrations or enrolments can’t be deleted.</p>
        </Panel>
      </div>
    </>
  )
}
