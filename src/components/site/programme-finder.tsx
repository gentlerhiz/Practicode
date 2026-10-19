'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, Search } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { programmes, type ProgrammeId } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { toneBg, toneClass, toneVars } from '@/lib/tone'
import { ProgrammeArt } from './programme-art'

const SUBJECTS: { id: ProgrammeId; label: string }[] = [
  { id: 'fe', label: 'Web Development' },
  { id: 'da', label: 'Data' },
  { id: 'ux', label: 'Design' },
  { id: 'ai', label: 'AI' },
]

const chip = 'press inline-flex h-[38px] shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium whitespace-nowrap'
const chipOff = 'border-line-control text-ink-soft hover:border-line-strong hover:bg-hover'
const chipOn = 'border-transparent bg-primary text-on-primary'

/** Every programme with a search box and filters. All cards are in the HTML; filters only hide them. */
export function ProgrammeFinder() {
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState<ProgrammeId | null>(null)
  const [level, setLevel] = useState('')
  const [openOnly, setOpenOnly] = useState(false)

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const shown = programmes.filter(
    (p) =>
      (!subject || p.id === subject) &&
      (!level || p.level === level) &&
      (!openOnly || p.live) &&
      words.every((w) => `${p.title} ${p.subject} ${p.keywords}`.toLowerCase().includes(w)),
  )
  const filtered = Boolean(query || subject || level || openOnly)
  const clear = () => {
    setQuery('')
    setSubject(null)
    setLevel('')
    setOpenOnly(false)
  }

  return (
    <div className="flex flex-col gap-5 tab:gap-7">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex min-w-0 flex-col gap-3">
          <h1 id="programmes-title" className="font-display text-[40px] leading-[46px] font-extrabold tracking-[-0.035em] text-ink tab:text-[64px] tab:leading-[70px]">
            Programmes
          </h1>
          <p className="max-w-[560px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">
            Live classes in Ibadan and online, with a project every week. Pick one and start building.
          </p>
        </div>
        <label className="relative flex h-12 w-full items-center gap-2.5 rounded-full border border-line-control bg-card px-4 focus-within:border-focus tab:w-[360px]">
          <span className="sr-only">Search programmes</span>
          <Icon as={Search} className="shrink-0 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes"
            className="h-full min-w-0 grow bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-subtle"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line-subtle pb-5">
        <div role="group" aria-label="Subject" className="snap-row -mx-4 flex gap-2 overflow-x-auto px-4 tab:mx-0 tab:flex-wrap tab:overflow-visible tab:px-0">
          <button type="button" aria-pressed={subject === null} onClick={() => setSubject(null)} className={cn(chip, subject === null ? chipOn : chipOff)}>
            All subjects
          </button>
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={subject === s.id}
              onClick={() => setSubject(subject === s.id ? null : s.id)}
              className={cn(chip, subject === s.id ? chipOn : chipOff)}
            >
              <span aria-hidden="true" className={cn('size-2 rounded-full', toneClass[s.id].fill)} />
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="relative">
            <select
              aria-label="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={cn(chip, chipOff, 'appearance-none bg-card pr-9 text-ink')}
            >
              <option value="">Any level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
            <Icon as={ChevronDown} size={14} className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-subtle" />
          </div>
          <button type="button" aria-pressed={openOnly} onClick={() => setOpenOnly(!openOnly)} className={cn(chip, openOnly ? chipOn : chipOff)}>
            <span aria-hidden="true" className={cn('flex size-4 items-center justify-center rounded-[5px] border-[1.5px]', openOnly ? 'border-current' : 'border-line-strong')}>
              {openOnly && <Icon as={Check} size={12} strokeWidth={3} />}
            </span>
            Enrolling now
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-4 tab:gap-5">
        {programmes.map((p) => (
          <li key={p.id} hidden={!shown.includes(p)} className="flex min-w-0">
            <Link
              href={`/programmes/${p.slug}` as Route}
              className="flex w-full flex-col overflow-hidden rounded-[22px] border border-line bg-card transition-colors hover:border-line-strong"
            >
              <div className="relative h-[132px] shrink-0 overflow-hidden" style={toneBg.card(p.id)}>
                <ProgrammeArt id={p.id} className="-right-3 -bottom-5 h-[128px] w-[154px]" />
                <div className="relative flex items-start justify-between gap-2 p-4 text-white">
                  <span className="flex size-11 items-center justify-center rounded-[14px] bg-white/15">
                    <Icon as={p.icon} size={22} />
                  </span>
                  {p.live ? (
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#15122a]">Enrolling now</span>
                  ) : (
                    <span className="rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-xs font-semibold">Coming soon</span>
                  )}
                </div>
              </div>
              <div className="flex grow flex-col gap-2 p-5" style={toneVars(p.id)}>
                <p className="text-xs font-semibold text-[var(--tone-text)]">{p.subject}</p>
                <h2 className="font-display text-xl leading-[26px] font-bold tracking-[-0.015em] text-ink">{p.title}</h2>
                <p className="text-[13px] leading-5 text-ink-soft">{p.meta}</p>
                <p className="text-[13px] leading-5 text-ink-subtle">Onsite in Ibadan or live online</p>
                <ul aria-label="Tools" className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.tools.slice(0, 4).map((tool) => (
                    <li key={tool.name} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--tone-tint)] py-1 pr-2.5 pl-1 text-xs font-medium text-ink-soft">
                      <span className="flex size-5 items-center justify-center rounded-full bg-[var(--tone)] text-white">
                        <Icon as={tool.icon} size={11} />
                      </span>
                      {tool.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[var(--tone-text)]">
                  {p.live ? 'See the Programme' : 'Get Notified'}
                  <Icon as={ArrowRight} size={14} />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className={cn('text-center text-[15px] text-ink-muted', shown.length > 0 && 'sr-only')}>
        {shown.length === 0 ? (
          <>
            No programme matches that yet.{' '}
            <button type="button" onClick={clear} className="cursor-pointer font-semibold text-ink underline underline-offset-2">
              Clear the filters
            </button>
          </>
        ) : filtered ? (
          `${shown.length === 1 ? 'One programme matches' : `${shown.length} programmes match`}.`
        ) : (
          ''
        )}
      </p>
    </div>
  )
}
