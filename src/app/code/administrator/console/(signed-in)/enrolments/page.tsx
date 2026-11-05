import type { Route } from 'next'
import Link from 'next/link'
import { FilterBar } from '@/components/admin/filters'
import { Badge, Empty, PageHead, Pager, StatusBadge, TableFrame, td, th } from '@/components/admin/ui'
import { label, naira, when } from '@/lib/admin/format'
import { EnrolmentFilter, filterQuery } from '@/lib/admin/schemas'
import { ENROLMENT_STATUSES, METHODS } from '@/lib/admin/types'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listCohorts, listCourses, listEnrolments, PAGE_SIZE, pickCohort } from '@/lib/server/admin/data'

export const metadata = { title: 'Enrolments' }

const BASE = '/code/administrator/console/enrolments'

export default async function EnrolmentsPage({ searchParams }: PageProps<'/code/administrator/console/enrolments'>) {
  await requireAdmin()
  const f = EnrolmentFilter.parse(await searchParams)
  const [cohorts, courses] = await Promise.all([listCohorts(), listCourses()])
  const { id: cohortId, cohort } = pickCohort(f.cohort, cohorts)
  const { rows, total } = await listEnrolments(f, cohortId, { limit: PAGE_SIZE, offset: (f.page - 1) * PAGE_SIZE })
  const courseName = (id: string) => courses.find((c) => c.id === id)?.title ?? id
  const view = { ...f, cohort: f.cohort === 'all' ? 'all' : cohort?.id }

  return (
    <>
      <PageHead title="Enrolments" note="Paid enrolments and bank transfers. Open a name to check uploads, confirm a transfer, mark it paid, cancel, edit or delete." />
      <FilterBar
        action={BASE}
        q={f.q}
        sort={f.sort}
        placeholder="Name, email, WhatsApp, reference or transfer id"
        csv={`/code/administrator/console/export/enrolments${filterQuery(view, { page: undefined })}`}
        selects={[
          {
            name: 'cohort',
            label: 'Cohort',
            value: view.cohort,
            any: null,
            options: [...cohorts.map((c) => [c.id, c.is_current ? `${c.name} (current)` : c.name] as const), ['all', 'All cohorts'] as const],
          },
          { name: 'course', label: 'Course', value: f.course, options: courses.filter((c) => c.id !== 'ai').map((c) => [c.id, c.title] as const) },
          { name: 'status', label: 'Status', value: f.status, options: ENROLMENT_STATUSES.map((s) => [s, label(s)] as const) },
          { name: 'method', label: 'Method', value: f.method, options: METHODS.map((m) => [m, m === 'paystack' ? 'Paystack' : 'Bank transfer'] as const) },
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
        <Empty>No enrolments match this filter.</Empty>
      ) : (
        <TableFrame>
          <thead>
            <tr>
              <th className={th}>Started</th>
              <th className={th}>Name</th>
              <th className={th}>Course</th>
              <th className={th}>Amount</th>
              <th className={th}>Method</th>
              <th className={th}>Status</th>
              <th className={th}>Reference or transfer id</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="hover:bg-hover">
                <td className={`${td} whitespace-nowrap`}>{when(e.created_at)}</td>
                <td className={td}>
                  <Link href={`${BASE}/${e.id}` as Route} className="font-semibold text-ink hover:underline">
                    {e.full_name}
                  </Link>
                  <div className="text-xs text-ink-muted">{e.email}</div>
                </td>
                <td className={td}>
                  {courseName(e.course)}
                  {e.siwes && (
                    <span className="ml-1.5">
                      <Badge tone="violet">SIWES</Badge>
                    </span>
                  )}
                </td>
                <td className={`${td} whitespace-nowrap tabular-nums`}>
                  {naira(e.amount_kobo)}
                  {e.paid_amount_kobo != null && e.paid_amount_kobo !== e.amount_kobo && <div className="text-xs text-ink-muted">Paid {naira(e.paid_amount_kobo)}</div>}
                </td>
                <td className={td}>{e.method === 'paystack' ? 'Paystack' : 'Bank transfer'}</td>
                <td className={td}>
                  <StatusBadge status={e.status} />
                </td>
                <td className={`${td} font-mono text-xs`}>{e.paystack_reference ?? e.transfer_id ?? (e.receipt_path ? 'Receipt uploaded' : '—')}</td>
              </tr>
            ))}
          </tbody>
        </TableFrame>
      )}
      <Pager page={f.page} total={total} size={PAGE_SIZE} href={(p) => `${BASE}${filterQuery(view, { page: p })}`} />
    </>
  )
}
