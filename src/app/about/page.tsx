import Image from 'next/image'
import { ArrowUpRight, BadgeCheck, BookOpen, Calendar, GraduationCap, Hammer, Laptop, Mail, MapPin, Phone } from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { Gallery } from '@/components/site/gallery'
import { Partners } from '@/components/site/partners'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import { founder, galleryAbout, photos, team } from '@/content/academy'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

export const metadata = pageMeta({
  title: 'About PractiCode Academy',
  description:
    'PractiCode Academy started in Ibadan in 2023. We run live tech classes onsite in Old Bodija and online, and host SIWES and IT students every year. Meet the team.',
  path: '/about',
})

const facts: { value: string; label: string; icon: typeof Calendar; tone: Tone }[] = [
  { value: '2023', label: 'Founded in Ibadan', icon: Calendar, tone: 'fe' },
  { value: '100+', label: 'SIWES students hosted', icon: GraduationCap, tone: 'da' },
  { value: 'Ibadan + online', label: 'Onsite in Old Bodija or live online', icon: MapPin, tone: 'ux' },
]

const values: { title: string; body: string; icon: typeof Calendar; tone: Tone }[] = [
  { title: 'You build in every lesson', body: 'Each 60-minute lesson ends with you writing, designing or analysing something yourself.', icon: Hammer, tone: 'fe' },
  { title: 'Instructors review your work', body: 'Your projects get feedback from people who do this work, not just a grade.', icon: BadgeCheck, tone: 'da' },
  { title: 'Examples from home', body: 'We teach with examples from everyday Nigerian life: local businesses, naira prices and WhatsApp.', icon: MapPin, tone: 'ux' },
]

const creds: { text: string; icon: typeof Calendar; tone: Tone }[] = [
  { text: 'Software engineer', icon: Laptop, tone: 'fe' },
  { text: 'Educator', icon: BookOpen, tone: 'da' },
  { text: 'BSc Computer Science, University of Ibadan', icon: GraduationCap, tone: 'ai' },
]

const contact: { label: string; value: string; href: string; icon: typeof Calendar; tone: Tone }[] = [
  { label: 'Address', value: '7B Oba Olagbegi, Old Bodija, Ibadan', href: site.maps, icon: MapPin, tone: 'fe' },
  { label: 'Phone and WhatsApp', value: '0903 057 8667', href: site.whatsapp, icon: Phone, tone: 'da' },
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: Mail, tone: 'ux' },
  { label: 'Self-paced learning', value: 'learn.practicode.tech', href: site.learn, icon: Laptop, tone: 'ai' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto max-w-[1280px] px-4 pt-8 pb-6 tab:px-10 tab:pt-20 tab:pb-10">
          <div className="flex max-w-[900px] flex-col gap-[22px]">
            <p className={cn(t.kicker, 'text-fe-text')}>About PractiCode Academy</p>
            <h1 className={t.hero}>
              We teach tech by building real things, <PillWord tone="ai">together.</PillWord>
            </h1>
            <p className="max-w-[760px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">
              PractiCode Academy started in Ibadan in 2023. We run live classes in front-end development, data analysis and UI/UX design,
              onsite in Old Bodija and live online, and we host SIWES and IT students every year.
            </p>
          </div>
          <Image
            src={photos.cohort.src}
            alt={photos.cohort.alt}
            width={1400}
            height={800}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="mt-7 h-60 w-full rounded-[32px] border border-line object-cover tab:mt-12 tab:h-[520px]"
          />
        </div>
      </section>

      <Section spacing="tight" aria-label="PractiCode Academy at a glance" className="tab:pt-4">
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3">
          {facts.map((f) => (
            <li key={f.label} className="flex flex-col gap-2.5 rounded-3xl border border-banner-border p-6 text-white" style={toneBg.banner(f.tone)}>
              <Tile icon={f.icon} size={44} />
              <p className="mt-1 font-display text-[32px] leading-9 font-extrabold tracking-[-0.03em]">{f.value}</p>
              <p className="text-sm leading-5 text-white/85">{f.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="teach-title">
        <h2 id="teach-title" className={cn(t.h2, 'mb-6 tab:mb-8')}>
          How we teach
        </h2>
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="flex flex-col gap-3 rounded-3xl border border-line p-7" style={toneBg.soft(v.tone)}>
              <Tile icon={v.icon} tone={v.tone} size={48} />
              <h3 className="text-[19px] leading-[26px] font-semibold text-ink">{v.title}</h3>
              <p className="text-[15px] leading-6 text-ink-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="team-title">
        <div className="mb-8 flex flex-col gap-2.5">
          <p className={cn(t.kicker, 'text-ux-text')}>The team</p>
          <h2 id="team-title" className={t.h2}>
            The people behind your classes
          </h2>
        </div>
        <article className="mb-5 flex flex-wrap items-center gap-6 rounded-[32px] border border-line p-5 tab:gap-14 tab:p-10" style={toneBg.soft('fe')}>
          <div className="relative min-w-0 flex-[0_1_100%] tab:flex-[0_1_360px]">
            <div aria-hidden="true" className="absolute inset-0 -rotate-[4deg] rounded-[28px] bg-[linear-gradient(135deg,#3d5af5_0%,#6e4cf5_50%,#d9306f_100%)]" />
            <Image
              src={founder.photo}
              alt={founder.name}
              width={600}
              height={750}
              className="relative aspect-[4/5] w-full rounded-[28px] border-4 border-card object-cover object-top"
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[18px]">
            <span className={cn('self-start rounded-full px-3 py-[5px] text-[13px] font-semibold', toneClass.fe.tint, toneClass.fe.text)}>{founder.role}</span>
            <h3 className="font-display text-[32px] leading-9 font-extrabold tracking-[-0.035em] text-ink tab:text-[44px] tab:leading-[48px]">{founder.name}</h3>
            <p className="text-base leading-[26px] text-ink-soft">{founder.bio}</p>
            <ul className="flex flex-col gap-3">
              {creds.map((c) => (
                <li key={c.text} className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <Tile icon={c.icon} tone={c.tone} size={32} />
                  {c.text}
                </li>
              ))}
            </ul>
            <a
              href={founder.linkedin}
              className="press inline-flex h-[46px] items-center gap-2 self-start rounded-full bg-primary px-5 text-[15px] font-semibold text-on-primary"
            >
              View on LinkedIn
              <Icon as={ArrowUpRight} size={16} />
            </a>
          </div>
        </article>
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          {team.map((m) => (
            <li key={m.name} className="flex items-center gap-5 rounded-[28px] border border-line p-6" style={toneBg.soft(m.tone)}>
              {m.photo ? (
                <Image src={m.photo} alt={m.name} width={208} height={208} className={cn('size-[104px] shrink-0 rounded-full border-[3px] object-cover object-top', m.tone === 'da' ? 'border-da' : 'border-ux')} />
              ) : (
                <div
                  role="img"
                  aria-label={m.name}
                  className="flex size-[104px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d9306f_0%,#3d5af5_100%)] font-display text-4xl font-extrabold text-white"
                >
                  {m.initials}
                </div>
              )}
              <div className="flex min-w-0 flex-col gap-2">
                <span className={cn('self-start rounded-full px-3 py-[5px] text-[13px] font-semibold', toneClass[m.tone].tint, toneClass[m.tone].text)}>{m.role}</span>
                <h3 className="text-xl leading-[26px] font-bold text-ink">{m.name}</h3>
                <p className="text-sm leading-[22px] text-ink-muted">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Partners title="Partners and communities" />
      </Section>

      <Section aria-labelledby="gallery-title">
        <h2 id="gallery-title" className={cn(t.h2, 'mb-6 tab:mb-8')}>
          From our classrooms
        </h2>
        <Gallery photos={galleryAbout} label="Photos from our classrooms" />
      </Section>

      <Section aria-labelledby="visit-title">
        <div className="mb-7 flex flex-col gap-2.5">
          <h2 id="visit-title" className={t.h2}>
            Visit or reach us
          </h2>
          <p className="text-[15px] leading-6 text-ink-muted">
            PractiCode Academy is run by {site.publisher}, registered in Nigeria with company registration no. {site.companyNumber}.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 tab:grid-cols-4">
          {contact.map((c) => (
            <li key={c.label}>
              <a href={c.href} className="flex h-full flex-col gap-1 rounded-3xl border border-line bg-card p-[22px] hover:border-line-strong">
                <Tile icon={c.icon} tone={c.tone} size={44} />
                <span className="mt-1.5 text-[13px] text-ink-muted">{c.label}</span>
                <span className="text-[15px] leading-[22px] font-semibold break-words text-ink">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="last">
        <CtaBand title="Learn with us." text="Join a class in Ibadan or online, and build real projects from week one." />
      </Section>
      <JsonLd
        data={[
          breadcrumbLd([{ name: 'About', path: '/about' }]),
          { '@context': 'https://schema.org', '@type': 'Person', name: founder.name, jobTitle: 'Founder', worksFor: { '@type': 'Organization', name: site.name }, sameAs: [founder.linkedin] },
        ]}
      />
    </>
  )
}
