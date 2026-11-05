import type { Route } from 'next'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { label } from '@/lib/admin/format'
import { cn } from '@/lib/cn'

/** Small server-safe building blocks for the administrator console. */

export const selectClass =
  'h-10 rounded-xl border border-line-control bg-sunken px-3 text-sm text-ink focus:border-focus focus:shadow-[0_0_0_3px_rgba(77,107,255,0.25)] focus:outline-none'
export const smallInputClass =
  'h-10 w-full rounded-xl border border-line-control bg-sunken px-3 text-sm text-ink placeholder:text-ink-subtle focus:border-focus focus:shadow-[0_0_0_3px_rgba(77,107,255,0.25)] focus:outline-none aria-invalid:border-error'

export function PageHead({ title, note, actions }: { title: string; note?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h1 className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.03em] text-ink tab:text-[34px] tab:leading-[38px]">{title}</h1>
        {note && <p className="max-w-[720px] text-sm leading-[22px] text-ink-muted">{note}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Panel({ title, className, children, aside }: { title?: string; className?: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className={cn('rounded-[20px] border border-line bg-card p-5', className)}>
      {(title || aside) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {title && <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-ink">{title}</h2>}
          {aside}
        </div>
      )}
      {children}
    </section>
  )
}

export function Stat({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[20px] border border-line bg-card p-5">
      <span className="text-[13px] font-medium text-ink-muted">{label}</span>
      <span className="font-display text-[30px] leading-9 font-extrabold tracking-[-0.03em] text-ink">{value}</span>
      {note && <span className="text-xs leading-[18px] text-ink-subtle">{note}</span>}
    </div>
  )
}

const tones = {
  neutral: 'bg-control text-ink-soft',
  blue: 'bg-fe-tint text-fe-text',
  green: 'bg-da-tint text-da-text',
  pink: 'bg-ux-tint text-ux-text',
  violet: 'bg-ai-tint text-ai-text',
} as const

export function Badge({ tone = 'neutral', children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap', tones[tone])}>{children}</span>
}

const STATUS_TONE: Record<string, keyof typeof tones> = {
  new: 'blue',
  contacted: 'violet',
  in_group: 'violet',
  enrolled: 'green',
  withdrawn: 'neutral',
  awaiting_payment: 'neutral',
  transfer_submitted: 'pink',
  paid: 'green',
  confirmed: 'green',
  cancelled: 'neutral',
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={STATUS_TONE[status] ?? 'neutral'}>{label(status)}</Badge>
}

/** A horizontally scrolling table frame: wide tables stay readable on phones. */
export function TableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-line bg-card">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">{children}</table>
    </div>
  )
}

export const th = 'border-b border-line px-4 py-3 text-xs font-semibold text-ink-muted whitespace-nowrap'
export const td = 'border-b border-line-subtle px-4 py-3 align-top text-ink-soft'

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-[20px] border border-dashed border-line-control px-5 py-10 text-center text-sm text-ink-muted">{children}</p>
}

/** Previous and next page links, keeping the rest of the filter. */
export function Pager({ page, total, size, href }: { page: number; total: number; size: number; href: (page: number) => string }) {
  const pages = Math.max(1, Math.ceil(total / size))
  const link = 'press inline-flex h-9 items-center gap-1 rounded-full border border-line-control px-3.5 text-sm font-semibold text-ink hover:bg-hover'
  const off = 'inline-flex h-9 items-center gap-1 rounded-full border border-line-subtle px-3.5 text-sm font-semibold text-ink-subtle'
  const from = total === 0 ? 0 : (page - 1) * size + 1
  return (
    <nav aria-label="Pages" className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-ink-muted">
        {total === 0 ? 'No rows' : `${from}–${Math.min(page * size, total)} of ${total}`}
      </p>
      <div className="flex gap-2">
        {page > 1 ? (
          <Link className={link} href={href(page - 1) as Route}>
            <Icon as={ChevronLeft} size={16} /> Previous
          </Link>
        ) : (
          <span className={off} aria-disabled="true">
            <Icon as={ChevronLeft} size={16} /> Previous
          </span>
        )}
        {page < pages ? (
          <Link className={link} href={href(page + 1) as Route}>
            Next <Icon as={ChevronRight} size={16} />
          </Link>
        ) : (
          <span className={off} aria-disabled="true">
            Next <Icon as={ChevronRight} size={16} />
          </span>
        )}
      </div>
    </nav>
  )
}

/** A labelled select for GET filter forms. */
export function FilterSelect({
  name,
  label,
  value,
  options,
  any = 'Any',
}: {
  name: string
  label: string
  value: string | undefined
  options: readonly (readonly [string, string])[]
  any?: string | null
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-ink-muted">
      {label}
      <select name={name} defaultValue={value ?? ''} className={selectClass}>
        {any !== null && <option value="">{any}</option>}
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  )
}

/** A label and value pair in a details list. */
export function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-ink-muted">{label}</dt>
      <dd className="text-sm break-words text-ink">{children}</dd>
    </div>
  )
}
