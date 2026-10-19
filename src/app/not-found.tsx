import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight, GraduationCap, House, ListChecks, MessageCircle, Stamp } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Tile } from '@/components/ui/tile'
import type { Tone } from '@/content/programmes'
import { site } from '@/lib/site'
import { toneBg } from '@/lib/tone'

export const metadata = { title: 'Page not found' }

const links: { title: string; note: string; href: Route; icon: typeof House; tone: Tone }[] = [
  { title: 'Programmes', note: 'Front-End, Data, UI/UX', href: '/programmes', icon: GraduationCap, tone: 'fe' },
  { title: 'SIWES and IT', note: 'Industrial training with us', href: '/siwes', icon: Stamp, tone: 'da' },
  { title: 'FAQs', note: 'Quick answers', href: '/faq', icon: ListChecks, tone: 'ux' },
  { title: 'Contact', note: 'WhatsApp, call or visit', href: '/contact', icon: MessageCircle, tone: 'ai' },
]

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-wash" />
      <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center gap-8 px-4 pt-10 pb-6 tab:gap-16 tab:px-10 tab:pt-24 tab:pb-12">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px]">
          <p className="self-start rounded-full bg-ux-tint px-3 py-1.5 font-mono text-[13px] font-semibold text-ux-text">Error 404</p>
          <h1 className="font-display text-[42px] leading-[50px] font-extrabold tracking-[-0.035em] text-ink tab:text-[72px] tab:leading-[82px]">
            This page took a <PillWord tone="ux">wrong turn.</PillWord>
          </h1>
          <p className="text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">The link may be old or mistyped. Try one of these instead.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 font-semibold text-on-primary tab:w-auto">
              <Icon as={House} />
              Go to the Home Page
            </Link>
            <a href={site.whatsapp} className="press inline-flex h-[54px] w-full items-center justify-center rounded-full border-[1.5px] border-line-control px-6 font-semibold text-ink tab:w-auto">
              Tell Us What Broke
            </a>
          </div>
        </div>
        {/* Code panels keep their glow (the one exception to the no-glow rule). */}
        <div
          aria-hidden="true"
          className="min-w-0 flex-[1_1_420px] overflow-hidden rounded-3xl border border-[#2a2540] bg-[#0e0c1a] font-mono shadow-[0_30px_80px_rgba(61,90,245,0.25)] tab:rotate-[1.5deg]"
        >
          <div className="flex items-center gap-1.5 border-b border-[#2a2540] bg-[#13101f] px-4 py-3 text-[13px] text-[#8b88a0]">
            <span className="size-[9px] rounded-full bg-[#f0407f]" />
            <span className="size-[9px] rounded-full bg-[#ff8a3d]" />
            <span className="size-[9px] rounded-full bg-[#2fe6b0]" />
            <span className="ml-2">terminal</span>
          </div>
          <div className="flex flex-col px-[22px] py-5 text-[13px] leading-[1.9] text-[#dcd9ea] tab:text-[15px]">
            <span>
              <span className="text-[#8b88a0]">$</span> <span className="text-[#8ea2ff]">open</span> <span className="text-[#4be3a8]">practicode.tech/this-page</span>
            </span>
            <span className="-mx-[22px] bg-[#3a1426] px-[22px] text-[#ff7db0]">✗ 404 Not Found</span>
            <span className="text-[#8b88a0]"># try one of these</span>
            {['/programmes', '/siwes', '/contact'].map((p, i) => (
              <span key={p}>
                <span className="text-[#b9a2ff]">→</span> <span className="text-white">{p}</span>
                {i === 2 && <span className="ml-1 inline-block h-[18px] w-[9px] bg-[#8ea2ff] align-[-3px]" />}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-[1280px] px-4 pt-4 pb-14 tab:px-10 tab:pt-6 tab:pb-24">
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="flex items-center gap-3.5 rounded-[22px] border border-line p-[18px] hover:border-line-strong" style={toneBg.soft(l.tone)}>
                <Tile icon={l.icon} tone={l.tone} size={44} />
                <span className="flex min-w-0 grow flex-col gap-0.5">
                  <span className="text-base font-semibold text-ink">{l.title}</span>
                  <span className="text-[13px] text-ink-muted">{l.note}</span>
                </span>
                <Icon as={ArrowRight} className="shrink-0 text-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
