import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight, Bell } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { programmes } from '@/content/programmes'
import { toneBg, toneClass } from '@/lib/tone'
import { ProgrammeArt } from './programme-art'

/** The four programmes as large colour cards, like PractiCode Learn's "Available courses". */
export function ProgrammeCards() {
  return (
    <ul className="grid grid-cols-1 gap-4 tab:grid-cols-2 tab:gap-6">
      {programmes.map((p) => (
        <li
          key={p.id}
          className="relative flex flex-col overflow-hidden rounded-[32px] border border-banner-border p-[22px] text-white tab:min-h-[400px] tab:p-8"
          style={toneBg.card(p.id)}
        >
          <div className="relative z-[1] flex grow flex-col gap-4 pb-24 tab:max-w-[62%] tab:pb-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex size-[52px] items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                <Icon as={p.icon} size={26} />
              </span>
              <span className="rounded-full bg-white/15 px-3 py-[5px] text-[13px] font-medium">{p.meta}</span>
              {!p.live && (
                <span className="rounded-full border border-white/45 bg-black/25 px-3 py-1 text-[13px] font-semibold">Coming Soon</span>
              )}
            </div>
            <h3 className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.025em] tab:text-[34px] tab:leading-[38px]">
              {p.title}
            </h3>
            <p className="text-[15px] leading-6 text-white/85">{p.summary}</p>
            <ul aria-label="Tools you’ll use" className="flex flex-wrap gap-2">
              {p.tools.slice(0, 6).map((tool) => (
                <li
                  key={tool.name}
                  className="flex items-center gap-[7px] rounded-full border border-white/15 bg-white/12 py-[5px] pr-[11px] pl-1.5 text-xs font-medium"
                >
                  <span className="flex size-[22px] items-center justify-center rounded-full bg-white/20">
                    <Icon as={tool.icon} size={13} />
                  </span>
                  {tool.name}
                </li>
              ))}
            </ul>
            {p.live ? (
              <Link
                href={`/programmes/${p.slug}` as Route}
                className={`press mt-auto inline-flex h-[46px] items-center gap-2 self-start rounded-full bg-white px-5 text-[15px] font-semibold ${toneClass[p.id].ink}`}
              >
                View Programme
                <Icon as={ArrowRight} size={16} />
              </Link>
            ) : (
              <Link
                href={`/programmes/${p.slug}` as Route}
                className="press mt-auto inline-flex h-[46px] items-center gap-2 self-start rounded-full border-[1.5px] border-white/60 px-5 text-[15px] font-semibold text-white"
              >
                <Icon as={Bell} size={16} />
                Get Notified
              </Link>
            )}
          </div>
          <ProgrammeArt id={p.id} className="-right-3 -bottom-3 h-[125px] w-[150px] tab:-right-6 tab:-bottom-4 tab:h-[216px] tab:w-[260px]" />
        </li>
      ))}
    </ul>
  )
}
