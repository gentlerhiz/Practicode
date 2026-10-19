import Image from 'next/image'
import { partners } from '@/content/academy'

/** Partner logos on white cards: a row on desktop, a sideways slider on phones. */
export function Partners({ title = 'Partners and communities we work with' }: { title?: string }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-ink-muted">{title}</p>
      <ul className="snap-row -mx-4 flex gap-3 overflow-x-auto px-4 tab:mx-0 tab:grid tab:grid-cols-4 tab:gap-4 tab:overflow-visible tab:px-0">
        {partners.map((p) => (
          <li
            key={p.name}
            className="flex h-[104px] w-[72%] shrink-0 items-center justify-center rounded-3xl border border-line bg-white px-6 tab:w-auto"
          >
            <Image src={p.src} alt={p.name} width={p.width} height={p.height} className="h-auto max-h-12 w-auto max-w-full object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}
