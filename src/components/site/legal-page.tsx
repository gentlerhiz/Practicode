import type { Route } from 'next'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { Tile } from '@/components/ui/tile'
import type { LegalDoc } from '@/content/legal'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

/** The privacy notice and the terms: a summary, numbered sections and a contents list. */
export function LegalPage({ doc, icon, tone, other }: { doc: LegalDoc; icon: LucideIcon; tone: Tone; other: { label: string; href: Route } }) {
  const tc = toneClass[tone]
  return (
    <>
      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[1120px] flex-col gap-[18px] px-4 pt-8 pb-7 tab:px-10 tab:pt-[72px] tab:pb-12">
          <Tile icon={icon} tone={tone} size={60} />
          <h1 className="font-display text-[40px] leading-[46px] font-extrabold tracking-[-0.035em] text-ink tab:text-[64px] tab:leading-[70px]">{doc.title}</h1>
          <p className="max-w-[680px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">{doc.lead}</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-line px-3.5 py-[7px] text-[13px] text-ink-muted">Last updated {doc.updated}</span>
            <Link href={other.href} className={cn('inline-flex items-center gap-1.5 rounded-full px-3.5 py-[7px] text-[13px] font-semibold', tc.tint, tc.text)}>
              {other.label}
              <Icon as={ArrowRight} size={14} />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1120px] flex-wrap items-start gap-6 px-4 pt-2 pb-14 tab:gap-14 tab:px-10 tab:pt-4 tab:pb-24">
        <nav aria-label="Sections" className="flex min-w-0 flex-[1_1_240px] flex-col gap-0.5 rounded-[22px] border border-line bg-card p-4 tab:sticky tab:top-32 tab:max-w-[280px]">
          <p className="mb-1.5 text-[13px] font-semibold text-ink-muted">On this page</p>
          {doc.sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-ink-soft hover:bg-hover hover:text-ink">
              <span className={cn('flex size-[26px] shrink-0 items-center justify-center rounded-lg font-mono text-xs font-semibold', tc.tint, tc.text)}>{i + 1}</span>
              {s.title}
            </a>
          ))}
        </nav>

        <article className="flex max-w-[760px] min-w-0 flex-[999_1_560px] flex-col gap-9">
          <div className="flex flex-col gap-3.5 rounded-3xl border border-line p-6" style={toneBg.soft(tone)}>
            <p className="text-[15px] font-semibold text-ink">In short</p>
            <ul className="flex flex-col gap-2.5">
              {doc.short.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[15px] leading-6 text-ink-soft">
                  <span className={cn('mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full text-white', tc.fill)}>
                    <Icon as={Check} size={12} strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="flex scroll-mt-28 flex-col gap-3">
              <h2 className="flex items-center gap-3 font-display text-2xl leading-[30px] font-bold tracking-[-0.02em] text-ink tab:text-[28px] tab:leading-[34px]">
                <span className={cn('flex size-[34px] shrink-0 items-center justify-center rounded-[11px] font-mono text-sm font-semibold text-white', tc.fill)}>{i + 1}</span>
                {s.title}
              </h2>
              {s.paras.map((p) => (
                <p key={p} className="text-base leading-7 text-ink-soft">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-2 pl-1">
                  {s.list.map((li) => (
                    <li key={li} className="flex items-start gap-3 text-base leading-[27px] text-ink-soft">
                      <span aria-hidden="true" className={cn('mt-[11px] size-[7px] shrink-0 rounded-full', tc.fill)} />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="flex flex-wrap items-center gap-4 rounded-[22px] border border-line bg-card p-[22px]">
            <Tile icon={Mail} tone="ux" size={44} />
            <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-1">
              <p className="text-base font-semibold text-ink">Questions about this page?</p>
              <p className="text-sm leading-[22px] text-ink-muted">
                Email {site.email} or write to {site.publisher}, {site.address.full}.
              </p>
            </div>
            <a href={`mailto:${site.email}`} className="press inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-on-primary">
              Email Us
            </a>
          </div>
        </article>
      </div>
    </>
  )
}
