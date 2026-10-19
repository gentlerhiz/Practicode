import type { LucideIcon } from 'lucide-react'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { toneClass } from '@/lib/tone'

/** A rounded square in a programme colour with a white icon (the canvas icon tiles). */
export function Tile({
  icon: Glyph,
  tone,
  size = 44,
  className,
}: {
  icon: LucideIcon
  tone?: Tone
  size?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex shrink-0 items-center justify-center text-white', tone ? toneClass[tone].fill : 'bg-white/15', className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.3) }}
    >
      <Glyph size={Math.round(size * 0.5)} strokeWidth={1.85} />
    </span>
  )
}

/** A small rounded label in a programme tint. */
export function Chip({ tone, className, children }: { tone: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold', toneClass[tone].tint, toneClass[tone].text, className)}>
      {children}
    </span>
  )
}
