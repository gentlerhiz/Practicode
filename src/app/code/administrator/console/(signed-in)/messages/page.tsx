import { MessageCircle } from 'lucide-react'
import { ConfirmDelete } from '@/components/admin/forms'
import { FilterBar } from '@/components/admin/filters'
import { Badge, Empty, PageHead, Pager } from '@/components/admin/ui'
import { Icon } from '@/components/ui/icon'
import { waLink, when } from '@/lib/admin/format'
import { filterQuery, MessageFilter } from '@/lib/admin/schemas'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listMessages, PAGE_SIZE } from '@/lib/server/admin/data'
import { removeMessage } from '../../actions'

export const metadata = { title: 'Messages' }

const BASE = '/code/administrator/console/messages'
const TOPICS = [
  ['programmes', 'A programme'],
  ['siwes', 'SIWES / IT'],
  ['partner', 'Partnerships'],
  ['other', 'Something else'],
] as const

export default async function MessagesPage({ searchParams }: PageProps<'/code/administrator/console/messages'>) {
  await requireAdmin()
  const f = MessageFilter.parse(await searchParams)
  const { rows, total } = await listMessages(f, { limit: PAGE_SIZE, offset: (f.page - 1) * PAGE_SIZE })

  return (
    <>
      <PageHead title="Messages" note="From the contact form. Open one to read it in full." />
      <FilterBar
        action={BASE}
        q={f.q}
        sort={f.sort}
        placeholder="Name, email, WhatsApp or words in the message"
        csv={`/code/administrator/console/export/messages${filterQuery(f, { page: undefined })}`}
        selects={[{ name: 'topic', label: 'Topic', value: f.topic, options: TOPICS }]}
      />
      {rows.length === 0 ? (
        <Empty>No messages match this filter.</Empty>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((m) => {
            const wa = waLink(m.whatsapp)
            return (
              <li key={m.id}>
                <details className="group rounded-[20px] border border-line bg-card open:border-line-strong">
                  <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-hover">
                    <span className="w-[150px] shrink-0 text-xs text-ink-muted">{when(m.created_at)}</span>
                    <span className="font-semibold text-ink">{m.name}</span>
                    <Badge tone="blue">{TOPICS.find(([k]) => k === m.topic)?.[1] ?? m.topic}</Badge>
                    <span className="min-w-0 grow basis-[240px] truncate text-sm text-ink-muted">{m.message}</span>
                  </summary>
                  <div className="flex flex-col gap-4 border-t border-line-subtle px-5 py-4">
                    <p className="text-sm leading-6 whitespace-pre-wrap text-ink">{m.message}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <a className="font-semibold text-fe-text hover:underline" href={`mailto:${m.email}`}>
                        {m.email}
                      </a>
                      {wa && (
                        <a className="inline-flex items-center gap-1.5 font-semibold text-da-text hover:underline" href={wa} target="_blank" rel="noopener noreferrer">
                          <Icon as={MessageCircle} size={15} /> {m.whatsapp}
                        </a>
                      )}
                    </div>
                    <ConfirmDelete action={removeMessage} values={{ id: m.id }} label="Delete message" question="Delete this message?" />
                  </div>
                </details>
              </li>
            )
          })}
        </ul>
      )}
      <Pager page={f.page} total={total} size={PAGE_SIZE} href={(p) => `${BASE}${filterQuery(f, { page: p })}`} />
    </>
  )
}
