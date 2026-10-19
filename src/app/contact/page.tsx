import { ArrowUpRight, HeartHandshake, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '@/components/site/forms/contact-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, localBusinessLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg } from '@/lib/tone'

export const metadata = pageMeta({
  title: 'Contact Us',
  description: 'Message PractiCode Academy on WhatsApp, call 0903 057 8667, email us, or visit our centre at 7B Oba Olagbegi, Old Bodija, Ibadan.',
  path: '/contact',
})

const methods: { label: string; value: string; href: string; icon: typeof Mail; tone: Tone }[] = [
  { label: 'WhatsApp, fastest', value: '0903 057 8667', href: site.whatsapp, icon: MessageCircle, tone: 'da' },
  { label: 'Call', value: '+234 707 277 8657', href: 'tel:+2347072778657', icon: Phone, tone: 'fe' },
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: Mail, tone: 'ux' },
  { label: 'Visit', value: 'Old Bodija, Ibadan', href: site.maps, icon: MapPin, tone: 'ai' },
]

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center gap-7 px-4 pt-8 pb-6 tab:gap-14 tab:px-10 tab:pt-20 tab:pb-12">
          <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[22px]">
            <p className={cn(t.kicker, 'text-da-text')}>Contact</p>
            <h1 className="font-display text-5xl leading-[54px] font-extrabold tracking-[-0.035em] text-ink tab:text-[88px] tab:leading-[92px]">
              Let’s <PillWord tone="da">talk.</PillWord>
            </h1>
            <p className="max-w-[520px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">
              Questions about a programme, SIWES or working with us? Message, call or visit our centre in Old Bodija, Ibadan.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={site.whatsapp} className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 font-semibold text-on-primary tab:w-auto">
                <Tile icon={MessageCircle} tone="da" size={26} className="rounded-lg" />
                Chat on WhatsApp
              </a>
              <a href={site.tel} className="press inline-flex h-[54px] w-full items-center justify-center rounded-full border-[1.5px] border-line-control px-6 font-semibold text-ink tab:w-auto">
                Call 0903 057 8667
              </a>
            </div>
          </div>
          <ul className="grid min-w-0 flex-[1_1_460px] grid-cols-2 gap-3 tab:gap-4">
            {methods.map((m) => (
              <li key={m.label}>
                <a
                  href={m.href}
                  className="flex h-full min-h-[150px] flex-col gap-1.5 rounded-3xl border border-banner-border p-4 text-white tab:min-h-[180px] tab:p-[22px]"
                  style={toneBg.banner(m.tone)}
                >
                  <Tile icon={m.icon} size={44} className="border border-white/25" />
                  <span className="mt-auto text-[13px] text-white/80">{m.label}</span>
                  <span className="text-base leading-[22px] font-semibold [overflow-wrap:anywhere]">{m.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section className="pt-6 tab:pt-8">
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 flex-[1.4_1_520px] flex-col gap-5 rounded-[32px] border border-line bg-card p-[22px] tab:p-10">
            <div className="flex flex-col gap-2">
              <h2 className={t.h2sm}>Send us a message</h2>
              <p className="text-[15px] leading-6 text-ink-muted">We usually reply the same day, by email or WhatsApp.</p>
            </div>
            <ContactForm />
          </div>

          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-6">
            <div className="overflow-hidden rounded-[28px] border border-line bg-card">
              <svg viewBox="0 0 600 340" role="img" aria-label="Map showing our centre at 7B Oba Olagbegi, Old Bodija, Ibadan" className="block h-auto w-full">
                <rect width="600" height="340" className="fill-sunken" />
                <rect x="400" y="20" width="170" height="120" rx="18" className="fill-da-tint" />
                <rect x="30" y="230" width="150" height="90" rx="18" className="fill-da-tint" />
                <g fill="none" strokeLinecap="round" className="stroke-line [[data-theme=light]_&]:stroke-white">
                  <path d="M-20 180 C 120 170 220 210 340 190 S 520 150 640 170" strokeWidth="26" />
                  <path d="M250 -20 C 260 80 240 200 280 360" strokeWidth="20" />
                  <path d="M60 -20 L 120 360" strokeWidth="12" />
                  <path d="M-20 90 L 640 60" strokeWidth="12" />
                  <path d="M380 360 L 470 -20" strokeWidth="12" />
                  <path d="M-20 290 L 640 270" strokeWidth="10" />
                </g>
                <g fontFamily="Poppins, sans-serif" fontSize="13" fontWeight="600" className="fill-ink-subtle">
                  <text x="44" y="166">Oba Olagbegi</text>
                  <text x="430" y="86">Old Bodija</text>
                  <text x="300" y="318">Ibadan</text>
                </g>
                <circle cx="300" cy="186" r="46" fill="#3D5AF5" opacity="0.18" />
                <circle cx="300" cy="186" r="26" fill="#3D5AF5" opacity="0.3" />
                <path d="M300 120c-19 0-34 15-34 34 0 26 34 58 34 58s34-32 34-58c0-19-15-34-34-34z" fill="#3D5AF5" stroke="#FFFFFF" strokeWidth="4" />
                <circle cx="300" cy="154" r="12" fill="#FED606" />
              </svg>
              <div className="flex flex-col gap-3.5 px-6 pt-5 pb-6">
                <div className="flex items-start gap-3.5">
                  <Tile icon={MapPin} tone="fe" size={40} />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-base font-semibold text-ink">PractiCode Academy</p>
                    <p className="text-sm leading-[22px] text-ink-muted">{site.address.full}</p>
                  </div>
                </div>
                <a
                  href={site.maps}
                  className="press inline-flex h-[46px] items-center gap-2 self-start rounded-full bg-primary px-5 text-[15px] font-semibold text-on-primary"
                >
                  Get Directions
                  <Icon as={ArrowUpRight} size={16} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 rounded-[28px] border border-line bg-card p-5">
              <h2 className="text-[17px] font-semibold text-ink">Follow our classes</h2>
              <ul className="flex flex-col gap-1">
                {site.socials.map((s, i) => (
                  <li key={s.label}>
                    <a href={s.href} className="flex items-center gap-3.5 rounded-2xl p-2.5 hover:bg-hover">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex size-10 shrink-0 items-center justify-center rounded-[13px] font-mono text-[13px] font-semibold text-white',
                          ['bg-ux', 'bg-fe', 'bg-ai', 'bg-da'][i],
                        )}
                      >
                        {s.short}
                      </span>
                      <span className="flex grow flex-col">
                        <span className="text-[15px] font-semibold text-ink">{s.label}</span>
                        <span className="text-[13px] text-ink-muted">{s.handle}</span>
                      </span>
                      <Icon as={ArrowUpRight} size={16} className="text-ink-muted" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="last" className="tab:pt-8">
        <div className="flex flex-wrap items-center gap-6 rounded-[32px] bg-[linear-gradient(120deg,#d9306f_0%,#6e4cf5_55%,#3d5af5_100%)] px-5 py-6 text-white tab:px-12 tab:py-10">
          <span className="flex size-16 items-center justify-center rounded-[19px] border border-white/30 bg-white/18">
            <Icon as={HeartHandshake} size={30} />
          </span>
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-2">
            <h2 className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.035em] tab:text-[34px] tab:leading-[38px]">Partner with PractiCode Academy</h2>
            <p className="text-base leading-[26px] text-white/90">
              Schools, communities, events and companies: talk to Hamdalat Omolola Akinyele, who leads our partnerships.
            </p>
          </div>
          <a
            href={`mailto:${site.email}?subject=Partnership`}
            className="press inline-flex h-[54px] w-full items-center justify-center rounded-full bg-white px-6 font-semibold text-[#07060d] tab:w-auto"
          >
            Email Our Partnerships Team
          </a>
        </div>
        <p className="mt-5 text-center text-[13px] leading-5 text-ink-subtle">
          PractiCode Academy is run by {site.publisher}, company registration no. {site.companyNumber}.
        </p>
      </Section>
      <JsonLd data={[localBusinessLd(), breadcrumbLd([{ name: 'Contact', path: '/contact' }])]} />
    </>
  )
}
