import type { Route } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { FilterBar } from '@/components/admin/filters'
import { Badge, Empty, PageHead, Pager, StatusBadge, TableFrame, td, th } from '@/components/admin/ui'
import { Icon } from '@/components/ui/icon'
import { label, waLink, when } from '@/lib/admin/format'
import { filterQuery, RegistrationFilter } from '@/lib/admin/schemas'
import { ATTENDANCE, REGISTRATION_STATUSES } from '@/lib/admin/types'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listCohorts, listCourses, listRegistrations, PAGE_SIZE, pickCohort } from '@/lib/server/admin/data'

export const metadata = { title: 'Registrations' }

const BASE = '/code/administrator/console/registrations'

export default async function RegistrationsPage({ searchParams }: PageProps<'/code/administrator/console/registrations'>) {
  await requireAdmin()
  const f = RegistrationFilter.parse(await searchParams)
  const [cohorts, courses] = await Promise.all([listCohorts(), listCourses()])
  const { id: cohortId, cohort } = pickCohort(f.cohort, cohorts)
  const { rows, total } = await listRegistrations(f, cohortId, { limit: PAGE_SIZE, offset: (f.page - 1) * PAGE_SIZE })
  const courseName = (id: string) => courses.find((c) => c.id === id)?.title ?? id
  const cohortName = (id: string) => cohorts.find((c) => c.id === id)?.name ?? '—'
  // The cohort shown is explicit in links and the export, even when it was the default.
  const view = { ...f, cohort: f.cohort === 'all' ? 'all' : cohort?.id }

  return (
    <>
      <PageHead title="Registrations" note="Free sign-ups. Open a name to edit it, change its status or cohort, add notes or delete it." />
      <FilterBar
        action={BASE}
        q={f.q}
        sort={f.sort}
        placeholder="Name, email or WhatsApp"
        csv={`/code/administrator/console/export/registrations${filterQuery(view, { page: undefined })}`}
        selects={[
          {
            name: 'cohort',
            label: 'Cohort',
            value: view.cohort,
            any: null,
            options: [...cohorts.map((c) => [c.id, c.is_current ? `${c.name} (current)` : c.name] as const), ['all', 'All cohorts'] as const],
          },
          { name: 'course', label: 'Course', value: f.course, options: courses.map((c) => [c.id, c.title] as const) },
          { name: 'status', label: 'Status', value: f.status, options: REGISTRATION_STATUSES.map((s) => [s, label(s)] as const) },
          { name: 'attendance', label: 'Attendance', value: f.attendance, options: ATTENDANCE.map((s) => [s, label(s)] as const) },
          {
            name: 'siwes',
            label: 'SIWES',
            value: f.siwes,
            options: [
              ['yes', 'SIWES only'],
              ['no', 'Not SIWES'],
            ],
          },
        ]}
      />
      {rows.length === 0 ? (
        <Empty>No registrations match this filter.</Empty>
      ) : (
        <TableFrame>
          <thead>
            <tr>
              <th className={th}>Signed up</th>
              <th className={th}>Name</th>
              <th className={th}>Course</th>
              <th className={th}>Attendance</th>
              <th className={th}>Location</th>
              <th className={th}>Status</th>
              {f.cohort === 'all' && <th className={th}>Cohort</th>}
              <th className={th}>WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const wa = waLink(r.whatsapp)
              return (
                <tr key={r.id} className="hover:bg-hover">
                  <td className={`${td} whitespace-nowrap`}>{when(r.created_at)}</td>
                  <td className={td}>
                    <Link href={`${BASE}/${r.id}` as Route} className="font-semibold text-ink hover:underline">
                      {r.full_name}
                    </Link>
                    <div className="text-xs text-ink-muted">{r.email}</div>
                  </td>
                  <td className={td}>
                    {courseName(r.course)}
                    {r.siwes && (
                      <span className="ml-1.5">
                        <Badge tone="violet">SIWES</Badge>
                      </span>
                    )}
                  </td>
                  <td className={td}>{label(r.attendance)}</td>
                  <td className={td}>
                    {r.city}, {r.state}
                  </td>
                  <td className={td}>
                    <StatusBadge status={r.status} />
                  </td>
                  {f.cohort === 'all' && <td className={td}>{cohortName(r.cohort_id)}</td>}
                  <td className={`${td} whitespace-nowrap`}>
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-da-text hover:underline">
                        <Icon as={MessageCircle} size={15} />
                        {r.whatsapp}
                      </a>
                    ) : (
                      r.whatsapp
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TableFrame>
      )}
      <Pager page={f.page} total={total} size={PAGE_SIZE} href={(p) => `${BASE}${filterQuery(view, { page: p })}`} />
    </>
  )
}
