'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import type { Photo } from '@/content/academy'
import { cn } from '@/lib/cn'

/** Real class photos that slide sideways, with arrows on desktop and dots that follow the scroll. */
export function Gallery({ photos, label }: { photos: Photo[]; label: string }) {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const go = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }
  const onScroll = () => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    setIndex(Math.round(el.scrollLeft / (card.offsetWidth + 16)))
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex flex-col gap-5">
      <ul ref={track} onScroll={onScroll} className="snap-row -mx-4 flex gap-4 overflow-x-auto px-4 tab:mx-0 tab:px-0">
        {photos.map((p, i) => (
          <li key={p.src + i} className="w-[84%] shrink-0 tab:w-[calc((100%-32px)/3)]">
            <figure className="flex flex-col gap-3">
              <Image
                src={p.src}
                alt={p.alt}
                width={800}
                height={560}
                sizes="(min-width: 960px) 400px, 84vw"
                className="h-[240px] w-full rounded-3xl border border-line object-cover tab:h-[300px]"
              />
              <figcaption className="text-sm font-medium text-ink-soft">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {photos.map((p, i) => (
            <span key={p.src + i} className={cn('h-2 rounded-full transition-all', i === index ? 'w-6 bg-ink' : 'w-2 bg-line-strong')} />
          ))}
        </div>
        <div className="hidden gap-2 tab:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photos"
            className="press flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-control text-ink hover:bg-hover"
          >
            <Icon as={ChevronLeft} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photos"
            className="press flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-control text-ink hover:bg-hover"
          >
            <Icon as={ChevronRight} />
          </button>
        </div>
      </div>
    </div>
  )
}
