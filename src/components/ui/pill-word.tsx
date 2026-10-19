import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { toneClass } from '@/lib/tone'

/** A word in a tilted colour pill, as in the canvas headlines ("Learn. Build. Launch."). */
export function PillWord({ tone, className, children }: { tone: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-block -rotate-[1.5deg] rounded-[0.2em] px-[0.16em] pb-[0.04em] text-white',
        toneClass[tone].fill,
        className,
      )}
    >
      {children}
    </span>
  )
}
