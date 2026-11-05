import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Empty, FilterSelect, PageHead, TableFrame, td, th } from '@/components/admin/ui'
import { label, when } from '@/lib/admin/format'
import { LOG_TABLES, LogFilter } from '@/lib/admin/schemas'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listLog } from '@/lib/server/admin/data'

export const metadata = { title: 'Activity log' }

const tableName = (t: string) => label(t.replace(/^academy_/, ''))

export default async function ActivityPage({ searchParams }: PageProps<'/code/administrator/console/activity'>) {
  await requireAdmin()
  const f = LogFilter.parse(await searchParams)
  const rows = await listLog(f.table)

  return (
    <>
      <PageHead
        title="Activity log"
        note="The latest 200 changes, sign-ins, sign-outs and exports made in this console."
        actions={
          <Form action="/code/administrator/console/activity" className="flex items-end gap-2">
            <FilterSelect name="table" label="Table" value={f.table} any="All tables" options={LOG_TABLES.map((t) => [t, tableName(t)] as const)} />
            <Button type="submit" size="sm" variant="secondary" className="h-10">
              Show
            </Button>
          </Form>
        }
      />
      {rows.length === 0 ? (
        <Empty>Nothing logged yet.</Empty>
      ) : (
        <TableFrame>
          <thead>
            <tr>
              <th className={th}>When</th>
              <th className={th}>Who</th>
              <th className={th}>Action</th>
              <th className={th}>Table</th>
              <th className={th}>Record</th>
              <th className={th}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={`${td} whitespace-nowrap`}>{when(r.created_at)}</td>
                <td className={td}>{r.email}</td>
                <td className={`${td} whitespace-nowrap`}>{label(r.action)}</td>
                <td className={`${td} whitespace-nowrap`}>{r.target_table ? tableName(r.target_table) : '—'}</td>
                <td className={`${td} font-mono text-xs`}>{r.target_id ?? '—'}</td>
                <td className={`${td} max-w-[360px] font-mono text-xs break-words`}>{r.detail ? JSON.stringify(r.detail) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </TableFrame>
      )}
    </>
  )
}
