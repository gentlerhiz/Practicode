import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { FaqBrowser } from '@/components/site/faq-browser'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import { faqTopics } from '@/content/faq'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

export const metadata = pageMeta({
  title: 'Frequently Asked Questions',
  description: 'Answers about enrolling, paying, classes in Ibadan and online, SIWES and IT placements, and certificates at PractiCode Academy.',
  path: '/faq',
})

const help: { title: string; body: string; action: string; href: string; icon: typeof Mail; tone: Tone }[] = [
  { title: 'Chat on WhatsApp', body: 'The fastest way to reach us. Send a message any time.', action: 'Open WhatsApp', href: site.whatsapp, icon: MessageCircle, tone: 'da' },
  { title: 'Call us', body: '0903 057 8667 or +234 707 277 8657.', action: 'Call Now', href: site.tel, icon: Phone, tone: 'fe' },
  { title: 'Email us', body: `${site.email}, for anything that needs detail or attachments.`, action: 'Send an Email', href: `mailto:${site.email}`, icon: Mail, tone: 'ux' },
]

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-4 pt-9 pb-7 text-center tab:px-10 tab:pt-20 tab:pb-12">
          <p className={cn(t.kicker, 'text-fe-text')}>Help centre</p>
          <h1 className="max-w-[900px] font-display text-[40px] leading-[48px] font-extrabold tracking-[-0.035em] text-ink tab:text-[72px] tab:leading-[82px]">
            Got <PillWord tone="ai">questions?</PillWord> We have answers.
          </h1>
          <p className="max-w-[620px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">
            Everything about enrolling, paying, classes and SIWES in one place. Can’t find yours? We reply on WhatsApp.
          </p>
        </div>
      </section>

      <Section spacing="none" className="pb-8 tab:pb-16">
        <FaqBrowser />
      </Section>

      <Section aria-labelledby="help-title">
        <div className="mb-7 flex flex-col gap-2.5">
          <h2 id="help-title" className={t.h2}>
            Still have a question?
          </h2>
          <p className="text-base leading-[26px] text-ink-muted">Talk to a person. We usually reply the same day.</p>
        </div>
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3">
          {help.map((h) => (
            <li key={h.title}>
              <a href={h.href} className="flex h-full flex-col gap-4 rounded-3xl border border-line p-6 hover:border-line-strong" style={toneBg.soft(h.tone)}>
                <Tile icon={h.icon} tone={h.tone} size={52} />
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-ink">{h.title}</span>
                  <span className="text-sm leading-[22px] text-ink-muted">{h.body}</span>
                </span>
                <span className={cn('mt-auto inline-flex items-center gap-2 text-[15px] font-semibold', toneClass[h.tone].text)}>
                  {h.action}
                  <Icon as={ArrowRight} size={16} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="last" className="tab:pt-8">
        <CtaBand title="Ready when you are." text="Registration takes about five minutes, and you’ll see the fee before you pay." />
      </Section>
      <JsonLd data={[faqLd([...new Map(faqTopics.flatMap((g) => g.items).map((i) => [i.q, i])).values()]), breadcrumbLd([{ name: 'FAQs', path: '/faq' }])]} />
    </>
  )
}
