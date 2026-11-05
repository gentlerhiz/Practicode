import type { Route } from 'next'
import Form from 'next/form'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Badge, Empty, FilterSelect, PageHead, Panel, Stat, StatusBadge, td, th } from '@/components/admin/ui'
import { label, naira, when } from '@/lib/admin/format'
import { OverviewFilter } from '@/lib/admin/schemas'
import { countBy, totalReceivedKobo } from '@/lib/admin/totals'
import { ATTENDANCE, ENROLMENT_STATUSES, REGISTRATION_STATUSES } from '@/lib/admin/types'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listCohorts, listCourses, overview, pickCohort } from '@/lib/server/admin/data'

export const metadata = { title: 'Overview' }

const BASE = '/code/administrator/console'

function Counts({ rows, names }: { rows: [string, number][]; names: (k: string) => string }) {
  const total = rows.reduce((s, [, n]) => s + n, 0)
  return (
    <ul className="flex flex-col gap-2.5">
      {rows.map(([k, n]) => (
        <li key={k} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-ink-soft">{names(k)}</span>
            <span className="font-semibold text-ink tabular-nums">{n}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-meter" aria-hidden="true">
            <div className="h-full rounded-full bg-primary" style={{ width: `${total ? (n / total) * 100 : 0}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default async function OverviewPage({ searchParams }: PageProps<'/code/administrator/console'>) {
  await requireAdmin()
  const f = OverviewFilter.parse(await searchParams)
  const [cohorts, courses] = await Promise.all([listCohorts(), listCourses()])
  const { id: cohortId, cohort } = pickCohort(f.cohort, cohorts)
  const { regs, enrols, latest } = await overview(cohortId)
  const courseName = (id: string) => courses.find((c) => c.id === id)?.title ?? id
  const courseOrder = courses.map((c) => c.id)
  const received = totalReceivedKobo(enrols)
  const scope = cohort ? `cohort=${cohort.id}` : 'cohort=all'

  return (
    <>
      <PageHead
        title="Overview"
        note={cohort ? `${cohort.name}${cohort.is_current ? ' (current cohort)' : ''}.` : 'All cohorts together.'}
        actions={
          <Form action={BASE} className="flex flex-wrap items-end gap-2">
            <FilterSelect
              name="cohort"
              label="Cohort"
              value={f.cohort === 'all' ? 'all' : cohort?.id}
              any={null}
              options={[...cohorts.map((c) => [c.id, c.is_current ? `${c.name} (current)` : c.name] as const), ['all', 'All cohorts'] as const]}
            />
            <Button type="submit" size="sm" variant="secondary" className="h-10">
              Show
            </Button>
          </Form>
        }
      />

      <div className="grid grid-cols-1 gap-4 ph:grid-cols-2 wide:grid-cols-4">
        <Stat label="Registrations" value={regs.length} note="Free sign-ups for the cohort" />
        <Stat label="Enrolments" value={enrols.length} note="Started the paid enrolment" />
        <Stat
          label="Paid or confirmed"
          value={enrols.filter((e) => e.status === 'paid' || e.status === 'confirmed').length}
          note={`${enrols.filter((e) => e.status === 'transfer_submitted').length} transfers waiting to be checked`}
        />
        <Stat
          label="Money received"
          value={naira(received)}
          note="Paid amounts, plus confirmed transfers at the amount due"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 tab:grid-cols-2 wide:grid-cols-3">
        <Panel title="Registrations by course" aside={<Link className="text-sm font-semibold text-fe-text" href={`${BASE}/registrations?${scope}` as Route}>Open</Link>}>
          <Counts rows={countBy(regs, (r) => r.course, courseOrder)} names={courseName} />
        </Panel>
        <Panel title="Registrations by status">
          <Counts rows={countBy(regs, (r) => r.status, REGISTRATION_STATUSES)} names={label} />
          <div className="mt-5 border-t border-line-subtle pt-4">
            <Counts rows={countBy(regs, (r) => r.attendance, ATTENDANCE)} names={label} />
          </div>
        </Panel>
        <Panel title="Enrolments by status" aside={<Link className="text-sm font-semibold text-fe-text" href={`${BASE}/enrolments?${scope}` as Route}>Open</Link>}>
          <Counts rows={countBy(enrols, (e) => e.status, ENROLMENT_STATUSES)} names={label} />
        </Panel>
      </div>

      <Panel
        title="Latest sign-ups"
        className="mt-4"
        aside={
          <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-fe-text" href={`${BASE}/export/registrations?${scope}`}>
            <Icon as={Download} size={16} /> Registrations CSV
          </a>
        }
      >
        {latest.length === 0 ? (
          <Empty>No sign-ups yet.</Empty>
        ) : (
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className={th}>When</th>
                  <th className={th}>Name</th>
                  <th className={th}>Course</th>
                  <th className={th}>Kind</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((r) => (
                  <tr key={`${r.kind}-${r.id}`} className="hover:bg-hover">
                    <td className={`${td} whitespace-nowrap`}>{when(r.created_at)}</td>
                    <td className={td}>
                      <Link className="font-semibold text-ink hover:underline" href={`${BASE}/${r.kind}s/${r.id}` as Route}>
                        {r.full_name}
                      </Link>
                    </td>
                    <td className={td}>{courseName(r.course)}</td>
                    <td className={td}>
                      <Badge tone={r.kind === 'enrolment' ? 'green' : 'blue'}>{r.kind === 'enrolment' ? 'Enrolment' : 'Registration'}</Badge>
                    </td>
                    <td className={td}>
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  )
}
