import type { Route } from 'next'
import Form from 'next/form'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { FilterSelect, smallInputClass } from './ui'

/**
 * A GET filter form: selects, a search box, sort and Apply. Results stay in the address, so a filtered
 * view can be bookmarked, and the CSV link exports exactly that view.
 */
export function FilterBar({
  action,
  selects,
  q,
  sort,
  placeholder,
  csv,
}: {
  action: string
  selects: React.ComponentProps<typeof FilterSelect>[]
  q?: string
  sort: 'new' | 'old'
  placeholder: string
  csv?: string
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-[20px] border border-line bg-card p-4">
      <Form action={action as Route} className="flex flex-wrap items-end gap-3">
        {selects.map((s) => (
          <FilterSelect key={s.name} {...s} />
        ))}
        <label className="flex min-w-[200px] grow flex-col gap-1 text-xs font-medium text-ink-muted">
          Search
          <input type="search" name="q" defaultValue={q} placeholder={placeholder} className={smallInputClass} />
        </label>
        <FilterSelect
          name="sort"
          label="Order"
          value={sort}
          any={null}
          options={[
            ['new', 'Newest first'],
            ['old', 'Oldest first'],
          ]}
        />
        <Button type="submit" size="sm" className="h-10">
          Apply
        </Button>
        {csv && (
          <a href={csv} className="press inline-flex h-10 items-center gap-2 rounded-full border border-line-control px-4 text-sm font-semibold text-ink hover:bg-hover">
            <Icon as={Download} size={16} />
            Export CSV
          </a>
        )}
      </Form>
    </div>
  )
}
