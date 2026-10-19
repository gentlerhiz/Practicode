'use client'

import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { Tile } from '@/components/ui/tile'
import { faqTopics } from '@/content/faq'
import { cn } from '@/lib/cn'
import { toneVars } from '@/lib/tone'
import { FaqList } from './faq-list'

const total = faqTopics.reduce((n, t) => n + t.items.length, 0)

/** Every question, by topic, with a search box. Searching opens the matching answers. */
export function FaqBrowser() {
  const [topic, setTopic] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const groups = faqTopics
    .filter((g) => !topic || g.id === topic)
    .map((g) => ({ ...g, items: g.items.filter((i) => words.every((w) => `${i.q} ${i.a}`.toLowerCase().includes(w))) }))
    .filter((g) => g.items.length)

  const topicButton = (id: string | null, label: string, n: number, tile: React.ReactNode, tone?: (typeof faqTopics)[number]['tone']) => {
    const on = topic === id
    return (
      <button
        key={id ?? 'all'}
        type="button"
        aria-pressed={on}
        onClick={() => setTopic(id)}
        style={tone ? toneVars(tone) : undefined}
        className={cn(
          'flex shrink-0 cursor-pointer items-center gap-2 rounded-full border py-0 pr-3 pl-2 text-sm whitespace-nowrap tab:w-full tab:gap-3 tab:rounded-[14px] tab:px-2.5 tab:py-2',
          'h-10 tab:h-auto',
          on
            ? cn('font-semibold text-ink', tone ? 'border-[var(--tone-text)] bg-[var(--tone-tint)]' : 'border-line-control bg-sunken')
            : 'border-line-control font-medium text-ink-soft hover:text-ink tab:border-transparent',
        )}
      >
        {tile}
        <span className="grow text-left">{label}</span>
        <span className="font-mono text-xs text-ink-subtle">{n}</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <label className="relative mx-auto flex h-[58px] w-full max-w-[620px] items-center gap-3 rounded-full border border-line-control bg-card px-5 focus-within:border-focus">
        <span className="sr-only">Search the FAQs</span>
        <Icon as={Search} size={20} className="shrink-0 text-ink-subtle" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search, for example “bank transfer”"
          className="h-full min-w-0 grow bg-transparent text-base text-ink outline-none placeholder:text-ink-subtle"
        />
      </label>
      <div className="flex flex-wrap items-start gap-6 tab:gap-12">
        <nav
          aria-label="FAQ topics"
          className="snap-row -mx-4 flex flex-[1_1_100%] gap-2 overflow-x-auto px-4 pb-1 tab:mx-0 tab:max-w-[300px] tab:flex-[1_1_280px] tab:flex-col tab:gap-1.5 tab:overflow-visible tab:rounded-3xl tab:border tab:border-line tab:bg-card tab:p-3"
        >
          {topicButton(null, 'All questions', total, <Tile icon={BookOpen} size={28} className="bg-ink text-bg tab:size-8" />)}
          {faqTopics.map((g) => topicButton(g.id, g.label, g.items.length, <Tile icon={g.icon} tone={g.tone} size={28} />, g.tone))}
        </nav>
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`topic-${g.id}`} className="flex flex-col gap-3">
              <div className="mb-1 flex items-center gap-3">
                <Tile icon={g.icon} tone={g.tone} size={40} />
                <h2 id={`topic-${g.id}`} className="font-display text-2xl leading-[30px] font-bold tracking-[-0.02em] text-ink">
                  {g.label}
                </h2>
              </div>
              <FaqList key={words.join(' ')} items={g.items} name={`faq-${g.id}`} tone={g.tone} openFirst={words.length > 0 || (g.id === 'pay' && !topic)} />
            </section>
          ))}
          {groups.length === 0 && (
            <div className="flex flex-col items-start gap-2 rounded-3xl border border-dashed border-line-control p-7">
              <p className="text-[17px] font-semibold text-ink">No answer matches that yet.</p>
              <p className="text-[15px] leading-6 text-ink-muted">Try another word, or ask us directly on WhatsApp.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setTopic(null)
                }}
                className="mt-1 cursor-pointer text-[15px] font-semibold text-ink underline underline-offset-2"
              >
                Clear the search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
