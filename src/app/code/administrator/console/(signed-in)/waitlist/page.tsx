import { MessageCircle } from 'lucide-react'
import { ConfirmDelete } from '@/components/admin/forms'
import { FilterBar } from '@/components/admin/filters'
import { Empty, PageHead, Pager, TableFrame, td, th } from '@/components/admin/ui'
import { Icon } from '@/components/ui/icon'
import { waLink, when } from '@/lib/admin/format'
import { filterQuery, WaitlistFilter } from '@/lib/admin/schemas'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listCourses, listWaitlist, PAGE_SIZE } from '@/lib/server/admin/data'
import { removeWaitlistEntry } from '../../actions'

export const metadata = { title: 'Waitlist' }

const BASE = '/code/administrator/console/waitlist'

export default async function WaitlistPage({ searchParams }: PageProps<'/code/administrator/console/waitlist'>) {
  await requireAdmin()
  const f = WaitlistFilter.parse(await searchParams)
  const [{ rows, total }, courses] = await Promise.all([listWaitlist(f, { limit: PAGE_SIZE, offset: (f.page - 1) * PAGE_SIZE }), listCourses()])
  const courseName = (id: string) => courses.find((c) => c.id === id)?.title ?? id

  return (
    <>
      <PageHead title="Waitlist" note="People waiting for a course that hasn’t opened yet." />
      <FilterBar
        action={BASE}
        q={f.q}
        sort={f.sort}
        placeholder="Name, email or WhatsApp"
        csv={`/code/administrator/console/export/waitlist${filterQuery(f, { page: undefined })}`}
        selects={[]}
      />
      {rows.length === 0 ? (
        <Empty>Nobody is on the waitlist{f.q ? ' with that search' : ''}.</Empty>
      ) : (
        <TableFrame>
          <thead>
            <tr>
              <th className={th}>Joined</th>
              <th className={th}>Name</th>
              <th className={th}>Course</th>
              <th className={th}>WhatsApp</th>
              <th className={th}>
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => {
              const wa = waLink(w.whatsapp)
              return (
                <tr key={w.id} className="hover:bg-hover">
                  <td className={`${td} whitespace-nowrap`}>{when(w.created_at)}</td>
                  <td className={td}>
                    <span className="font-semibold text-ink">{w.name}</span>
                    <div className="text-xs text-ink-muted">{w.email}</div>
                  </td>
                  <td className={td}>{courseName(w.course)}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-da-text hover:underline">
                        <Icon as={MessageCircle} size={15} />
                        {w.whatsapp}
                      </a>
                    ) : (
                      (w.whatsapp ?? '—')
                    )}
                  </td>
                  <td className={td}>
                    <ConfirmDelete action={removeWaitlistEntry} values={{ id: w.id }} question="Remove from the waitlist?" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TableFrame>
      )}
      <Pager page={f.page} total={total} size={PAGE_SIZE} href={(p) => `${BASE}${filterQuery(f, { page: p })}`} />
    </>
  )
}
