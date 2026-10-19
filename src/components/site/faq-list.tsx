import { Minus, Plus } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import type { QA } from '@/content/faq'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { toneAt, toneVars } from '@/lib/tone'

/**
 * Questions as native disclosure widgets: they work without JavaScript, and sharing a `name` opens one
 * at a time. `numbered` adds the coloured number badges from the canvas.
 */
export function FaqList({
  items,
  name,
  numbered = false,
  tone,
  openFirst = true,
}: {
  items: QA[]
  name: string
  numbered?: boolean
  /** One colour for every item; otherwise the colours cycle. */
  tone?: Tone
  openFirst?: boolean
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const t = tone ?? toneAt(i)
        return (
          <details
            key={item.q}
            name={name}
            open={openFirst && i === 0}
            className="group overflow-hidden rounded-[22px] border border-line bg-card open:border-[1.5px] open:border-[var(--tone-text)]"
            style={toneVars(t)}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3.5 px-5 py-[18px] group-open:[background:var(--soft)] [&::-webkit-details-marker]:hidden">
              {numbered && (
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--tone-tint)] font-mono text-[13px] font-semibold text-[var(--tone-text)] group-open:bg-[var(--tone)] group-open:text-white"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <span className="grow text-base leading-6 font-semibold text-ink">{item.q}</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-control text-ink">
                <Icon as={Plus} size={16} className="group-open:hidden" />
                <Icon as={Minus} size={16} className="hidden group-open:block" />
              </span>
            </summary>
            <p
              className={cn(
                'px-5 pb-5 text-[15px] leading-[25px] text-ink-soft [background:var(--soft)]',
                numbered && 'tab:pl-[70px]',
              )}
            >
              {item.a}
            </p>
          </details>
        )
      })}
    </div>
  )
}
