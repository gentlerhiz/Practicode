'use client'

import { useState } from 'react'
import { Download, FileText, Search } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { Tile } from '@/components/ui/tile'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { toneClass } from '@/lib/tone'

type Cat = 'web' | 'data' | 'db' | 'tools'
const CATS: Record<Cat, { label: string; tone: Tone }> = {
  web: { label: 'Web', tone: 'fe' },
  data: { label: 'Data', tone: 'da' },
  db: { label: 'Databases', tone: 'ux' },
  tools: { label: 'Tools', tone: 'ai' },
}

const pdf = (file: string) => `/resources/${encodeURIComponent(file)}`
const books: { cat: Cat; title: string; body: string; href: string }[] = [
  { cat: 'web', title: 'HTML5 Notes for Professionals', body: 'Semantic elements, forms, media and the APIs built into the browser.', href: pdf('HTML5NotesForProfessionals (2).pdf') },
  { cat: 'web', title: 'JavaScript Notes for Professionals', body: 'From variables and functions to closures, promises and async/await.', href: pdf('JavaScriptNotesForProfessionals.pdf') },
  { cat: 'web', title: 'React Notes for Professionals', body: 'Components, props, state and hooks, for when you go beyond plain JavaScript.', href: pdf('ReactJSNotesForProfessionals.pdf') },
  { cat: 'web', title: 'Node.js Notes for Professionals', body: 'JavaScript on the server: modules, streams, events and Express.', href: pdf('NodeJSNotesForProfessionals.pdf') },
  { cat: 'data', title: 'Python Notes for Professionals', body: 'Data structures, functions, classes, files and the standard library.', href: pdf('PythonNotesForProfessionals.pdf') },
  { cat: 'data', title: 'R Notes for Professionals', body: 'Data frames, statistics and charts with R.', href: pdf('RNotesForProfessionals.pdf') },
  { cat: 'db', title: 'SQL Notes for Professionals', body: 'Queries, joins, grouping and database design.', href: pdf('SQLNotesForProfessionals.pdf') },
  { cat: 'db', title: 'PostgreSQL Notes for Professionals', body: 'JSON, full-text search, window functions and more.', href: pdf('PostgreSQLNotesForProfessionals.pdf') },
  { cat: 'db', title: 'MySQL Notes for Professionals', body: 'Tables, indexes, stored procedures and performance.', href: pdf('MySQLNotesForProfessionals.pdf') },
  { cat: 'tools', title: 'Git Notes for Professionals', body: 'Branching, merging, rebasing and working in a team.', href: pdf('GitNotesForProfessionals.pdf') },
  { cat: 'tools', title: 'Linux Notes for Professionals', body: 'The command line, files and permissions, processes and scripts.', href: pdf('LinuxNotesForProfessionals.pdf') },
  { cat: 'tools', title: 'Algorithms Notes for Professionals', body: 'Sorting, searching, graphs and how to measure speed.', href: pdf('AlgorithmsNotesForProfessionals.pdf') },
]

const chip = 'press inline-flex h-[38px] shrink-0 cursor-pointer items-center gap-2 rounded-full border pr-3 pl-3.5 text-[13px] font-medium whitespace-nowrap'

/** The free reference books, with a search box and topic chips. */
export function BookFinder() {
  const [cat, setCat] = useState<Cat | null>(null)
  const [query, setQuery] = useState('')
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const shown = books.filter((b) => (!cat || b.cat === cat) && words.every((w) => `${b.title} ${b.body}`.toLowerCase().includes(w)))
  const count = (c: Cat | null) => books.filter((b) => !c || b.cat === c).length

  const chipFor = (id: Cat | null, label: string, tone?: Tone) => {
    const on = cat === id
    return (
      <button
        key={id ?? 'all'}
        type="button"
        aria-pressed={on}
        onClick={() => setCat(on && id ? null : id)}
        className={cn(chip, on ? 'border-transparent bg-primary text-on-primary' : 'border-line-control text-ink-soft hover:bg-hover')}
      >
        {tone && <span aria-hidden="true" className={cn('size-2 rounded-full', toneClass[tone].fill)} />}
        {label}
        <span className={cn('rounded-full px-[7px] py-0.5 font-mono text-[11px]', on ? 'bg-on-primary/15' : 'bg-sunken text-ink-subtle')}>{count(id)}</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex min-w-0 flex-col gap-2.5">
          <h2 id="books-title" className="font-display text-[30px] leading-[34px] font-extrabold tracking-[-0.035em] text-ink tab:text-[42px] tab:leading-[46px]">
            Free reference books
          </h2>
          <p className="max-w-[620px] text-[15px] leading-6 text-ink-muted">
            PDFs from the Notes for Professionals series, compiled from Stack Overflow Documentation and shared under the CC BY-SA licence.
          </p>
        </div>
        <label className="relative flex h-12 w-full items-center gap-2.5 rounded-full border border-line-control bg-card px-4 focus-within:border-focus tab:w-[320px]">
          <span className="sr-only">Search the books</span>
          <Icon as={Search} className="shrink-0 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, for example “Git”"
            className="h-full min-w-0 grow bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-subtle"
          />
        </label>
      </div>
      <div role="group" aria-label="Topic" className="snap-row -mx-4 flex gap-2 overflow-x-auto px-4 tab:mx-0 tab:flex-wrap tab:px-0">
        {chipFor(null, 'All books')}
        {(Object.keys(CATS) as Cat[]).map((c) => chipFor(c, CATS[c].label, CATS[c].tone))}
      </div>
      <ul className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-4">
        {shown.map((b) => {
          const tone = CATS[b.cat].tone
          return (
            <li key={b.title} className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-card p-5">
              <div className="flex items-center justify-between gap-2.5">
                <Tile icon={FileText} tone={tone} size={44} />
                <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', toneClass[tone].tint, toneClass[tone].text)}>{CATS[b.cat].label}</span>
              </div>
              <h3 className="mt-1 font-display text-[19px] leading-[25px] font-bold tracking-[-0.015em] text-ink">{b.title}</h3>
              <p className="grow text-sm leading-[22px] text-ink-muted">{b.body}</p>
              <div className="flex items-center justify-between gap-2.5 border-t border-line-subtle pt-3">
                <span className="font-mono text-xs text-ink-subtle">PDF · Free</span>
                <a
                  href={b.href}
                  download
                  aria-label={`Download ${b.title} (PDF)`}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line-control pr-3.5 pl-2 text-[13px] font-semibold text-ink hover:bg-hover"
                >
                  <Tile icon={Download} tone={tone} size={22} className="rounded-md" />
                  Download
                </a>
              </div>
            </li>
          )
        })}
      </ul>
      {shown.length === 0 && (
        <p aria-live="polite" className="text-center text-[15px] text-ink-muted">
          No book matches that yet.{' '}
          <button
            type="button"
            onClick={() => {
              setCat(null)
              setQuery('')
            }}
            className="cursor-pointer font-semibold text-ink underline underline-offset-2"
          >
            Clear the filters
          </button>
        </p>
      )}
    </div>
  )
}
