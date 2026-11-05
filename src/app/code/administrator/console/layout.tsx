import type { Metadata } from 'next'

/** Private: never indexed or followed (next.config.ts also sends X-Robots-Tag for every /code/ path). */
export const metadata: Metadata = {
  title: { default: 'Console', template: '%s · Console' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: 'no-referrer',
}

export default function ConsoleRoot({ children }: LayoutProps<'/code/administrator/console'>) {
  return children
}
