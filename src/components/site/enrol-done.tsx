import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Laptop } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { Tile } from '@/components/ui/tile'
import { programmeById, type ProgrammeId, type Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'
import { toneClass } from '@/lib/tone'
import { PrintButton } from './print-button'

export type DoneStep = { title: string; body: string; icon: LucideIcon; tone: Tone }

/** What students see after enrolling: the status, a receipt-style summary and what happens next. */
export function EnrolDone({
  tone,
  badge,
  kicker,
  title,
  lead,
  course,
  status,
  rows,
  steps,
  printable,
}: {
  tone: Tone
  badge: LucideIcon
  kicker: string
  title: string
  lead: string
  course?: ProgrammeId
  status?: string
  rows?: { k: string; v: string; mono?: boolean; big?: boolean }[]
  steps: DoneStep[]
  printable?: boolean
}) {
  const p = course ? programmeById(course) : undefined
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-wash" />
      <div className="relative mx-auto flex max-w-[760px] flex-col gap-8 px-4 pt-10 pb-14 tab:gap-11 tab:px-10 tab:pt-[88px] tab:pb-24">
        <div className="flex flex-col items-center gap-[18px] text-center">
          <span className={cn('flex size-24 items-center justify-center rounded-full text-white', toneClass[tone].fill)}>
            <Icon as={badge} size={44} />
          </span>
          <p className={cn('mt-2 text-sm font-semibold', toneClass[tone].text)}>{kicker}</p>
          <h1 className="font-display text-[36px] leading-[42px] font-extrabold tracking-[-0.035em] text-ink tab:text-[56px] tab:leading-[62px]">{title}</h1>
          <p className="max-w-[580px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">{lead}</p>
        </div>

        {p && rows && (
          <section aria-labelledby="summary-title" className="overflow-hidden rounded-[28px] border border-line bg-card">
            <div className="flex flex-wrap items-center gap-3.5 px-[18px] py-[18px] tab:px-7 tab:py-[22px]" style={{ background: `var(--pc-banner-${p.id})` }}>
              <Tile icon={p.icon} size={48} />
              <div className="flex min-w-0 grow flex-col gap-0.5">
                <h2 id="summary-title" className="text-[13px] font-medium text-white/80">
                  Your programme
                </h2>
                <p className="font-display text-[22px] leading-7 font-bold tracking-[-0.02em] text-white">{p.title}</p>
              </div>
              {status && <span className="rounded-full bg-white px-3 py-1.5 text-[13px] font-bold text-[#15122a]">{status}</span>}
            </div>
            <dl className="flex flex-col px-[18px] py-2 tab:px-7">
              {rows.map((r) => (
                <div key={r.k} className="flex items-baseline justify-between gap-4 border-b border-line-subtle py-3.5 text-[15px] last:border-0">
                  <dt className="text-ink-muted">{r.k}</dt>
                  <dd className={cn('text-right font-medium text-ink', r.mono && 'font-mono text-sm', r.big && 'font-display text-[22px] font-extrabold')}>{r.v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 px-[18px] pb-[18px] tab:px-7 tab:pb-[22px]">
              {printable && <PrintButton />}
              <a
                href={site.whatsapp}
                className="press inline-flex h-[50px] w-full items-center justify-center rounded-full border-[1.5px] border-line-control px-[22px] text-[15px] font-semibold text-ink tab:w-auto print:hidden"
              >
                Chat on WhatsApp
              </a>
            </div>
          </section>
        )}

        <section aria-labelledby="next-title" className="flex flex-col gap-5">
          <h2 id="next-title" className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.035em] text-ink tab:text-[34px] tab:leading-[38px]">
            What happens next
          </h2>
          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <div className="flex shrink-0 flex-col items-center">
                  <Tile icon={s.icon} tone={s.tone} size={44} />
                  {i < steps.length - 1 && <span aria-hidden="true" className="my-1.5 w-0.5 grow rounded bg-line" />}
                </div>
                <div className="flex min-w-0 flex-col gap-1 pt-1.5 pb-6">
                  <p className={cn('font-mono text-xs font-semibold', toneClass[s.tone].text)}>Step {i + 1}</p>
                  <p className="text-[17px] font-semibold text-ink">{s.title}</p>
                  <p className="text-[15px] leading-6 text-ink-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-wrap items-center gap-[18px] rounded-3xl border border-line p-[22px] print:hidden" style={{ background: 'var(--pc-soft-fe)' }}>
          <Tile icon={Laptop} tone="fe" size={52} />
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-1">
            <h2 className="text-lg font-semibold text-ink">Want a head start?</h2>
            <p className="text-[15px] leading-6 text-ink-muted">Module 1 of Front-End is free on PractiCode Learn, and it runs in your browser.</p>
          </div>
          <a
            href={site.learn}
            className="press inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-line-control px-[18px] text-sm font-semibold text-ink tab:w-auto"
          >
            Open PractiCode Learn
            <Icon as={ArrowUpRight} size={16} />
          </a>
        </section>

        <p className="text-center text-sm text-ink-muted print:hidden">
          <Link href="/" className="font-semibold text-ink">
            Back to the home page
          </Link>
        </p>
      </div>
    </div>
  )
}
