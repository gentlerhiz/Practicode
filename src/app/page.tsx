import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgePercent,
  Braces,
  Calendar,
  ChartPie,
  ClipboardList,
  Code,
  FileCode,
  Frame,
  GitBranch,
  GraduationCap,
  Hammer,
  Laptop,
  MapPin,
  NotebookPen,
  Paintbrush,
  Presentation,
  Rocket,
  Sheet,
  Sigma,
  Stamp,
  StickyNote,
  Table,
  Users,
} from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { FaqSection } from '@/components/site/faq-section'
import { Gallery } from '@/components/site/gallery'
import { Partners } from '@/components/site/partners'
import { ProgrammeCards } from '@/components/site/programme-cards'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import { galleryHome, photos } from '@/content/academy'
import { homeFaq } from '@/content/faq'
import type { Tone } from '@/content/programmes'
import { faqLd, localBusinessLd } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

export const metadata = {
  title: { absolute: 'PractiCode Academy | Tech Classes in Ibadan and Online: Front-End, Data Analysis, UI/UX' },
  alternates: { canonical: '/' },
}

const tools: { name: string; icon: typeof Code; tone: Tone }[] = [
  { name: 'HTML5', icon: FileCode, tone: 'fe' },
  { name: 'CSS3', icon: Paintbrush, tone: 'fe' },
  { name: 'JavaScript', icon: Braces, tone: 'fe' },
  { name: 'Git', icon: GitBranch, tone: 'fe' },
  { name: 'Excel', icon: Sheet, tone: 'da' },
  { name: 'Power BI', icon: ChartPie, tone: 'da' },
  { name: 'DAX', icon: Sigma, tone: 'da' },
  { name: 'Figma', icon: Frame, tone: 'ux' },
  { name: 'FigJam', icon: StickyNote, tone: 'ux' },
  { name: 'Python', icon: Code, tone: 'ai' },
  { name: 'pandas', icon: Table, tone: 'ai' },
  { name: 'Netlify', icon: Rocket, tone: 'fe' },
]

const facts: { value: string; label: string; icon: typeof Code; tone: Tone }[] = [
  { value: '2023', label: 'Teaching in Ibadan since', icon: Calendar, tone: 'fe' },
  { value: 'Ibadan + online', label: 'Onsite in Old Bodija or live online', icon: MapPin, tone: 'da' },
  { value: '200+', label: 'SIWES students hosted', icon: GraduationCap, tone: 'ux' },
  { value: 'Certificate', label: 'On completion of every programme', icon: Award, tone: 'ai' },
]

const steps: { n: string; title: string; body: string; icon: typeof Code; tone: Tone }[] = [
  { n: '01', title: 'Enrol online', body: 'Fill one short form and pay securely online. We confirm by email and WhatsApp.', icon: ClipboardList, tone: 'fe' },
  { n: '02', title: 'Learn in class', body: 'Live 60-minute lessons, onsite or online, with a live demo every time.', icon: Presentation, tone: 'da' },
  { n: '03', title: 'Build real projects', body: 'Practise every week on projects your instructors review with you.', icon: Hammer, tone: 'ux' },
  { n: '04', title: 'Graduate', body: 'Finish your capstone and receive your certificate of completion.', icon: GraduationCap, tone: 'ai' },
]

const logbook = [
  { wk: 'Week 4', topic: 'Flexbox layouts', signed: true },
  { wk: 'Week 5', topic: 'Grid and responsive design', signed: true },
  { wk: 'Week 6', topic: 'JavaScript fundamentals', signed: false },
]

const siwesPoints: { text: string; icon: typeof Code; tone: Tone }[] = [
  { text: 'Half-price tuition for SIWES and IT students', icon: BadgePercent, tone: 'da' },
  { text: 'Your logbook reviewed and signed every week', icon: Stamp, tone: 'fe' },
  { text: '200+ SIWES students hosted since 2023', icon: Users, tone: 'ux' },
]

const floatCard = 'absolute m-0 rounded-[22px] border bg-glass p-3 text-ink backdrop-blur-sm'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-10 pb-12 tab:min-h-[640px] tab:px-10 tab:pt-[104px] tab:pb-28">
        <div aria-hidden="true" className="hero-wash" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden wide:block">
          <div className={`${floatCard} float-slower top-[400px] left-[6%] w-[200px] rotate-[5deg] border-success-fill/50`}>
            <p className="mb-3 text-[13px] font-semibold text-da-text">Weekly sales</p>
            <div className="flex h-[76px] items-end gap-2">
              {[34, 52, 44, 72, 100].map((h, i) => (
                <span key={h} className="flex-1 rounded-md" style={{ height: `${h}%`, background: i === 4 ? '#2fe6b0' : `rgba(47,230,176,${0.35 + i * 0.1})` }} />
              ))}
            </div>
          </div>
          <div className={`${floatCard} float-slower top-[72px] right-[3%] w-[236px] rotate-[6deg] border-fe/55`}>
            <div className="mb-2.5 flex gap-[5px]">
              <span className="size-2 rounded-full bg-[#f0407f]" />
              <span className="size-2 rounded-full bg-[#ff8a3d]" />
              <span className="size-2 rounded-full bg-[#2fe6b0]" />
            </div>
            <p className="font-mono text-xs leading-[21px]">
              <span className="text-fe-text">&lt;h1&gt;</span>Mama Nkechi’s<span className="text-fe-text">&lt;/h1&gt;</span>
              <br />
              <span className="text-fe-text">&lt;a</span> <span className="text-ai-text">href</span>=<span className="text-da-text">&quot;wa.me/…&quot;</span>
              <span className="text-fe-text">&gt;</span>Order<span className="text-fe-text">&lt;/a&gt;</span>
            </p>
          </div>
          <figure className={`${floatCard} float-slow top-[340px] right-[5%] w-[210px] -rotate-[5deg] border-ux/50`}>
            <Image src={photos.classData.src} alt="" width={400} height={280} className="h-[140px] w-full rounded-[14px] object-cover" />
            <figcaption className="px-1 pt-2.5 pb-0.5 text-[13px] font-semibold">Power BI class</figcaption>
          </figure>
        </div>
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-7 text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-glass px-3.5 py-2 text-[13px] font-medium text-ink-soft">
            <span className="size-2 rounded-full bg-success-fill" />
            Tech classes in Ibadan and online · Enrolling now
          </p>
          <h1 className="font-display text-[52px] leading-[66px] font-extrabold tracking-[-0.035em] text-ink tab:text-[104px] tab:leading-[120px]">
            <PillWord tone="fe" className="-rotate-2">
              Learn.
            </PillWord>{' '}
            <span className="inline-block rotate-[1.5deg] rounded-[0.2em] bg-success-fill px-[0.16em] pb-[0.04em] text-[#07060d]">Build.</span>{' '}
            <PillWord tone="ux">Launch.</PillWord>
          </h1>
          <p className="max-w-[640px] text-base leading-[26px] text-ink-soft tab:text-[19px] tab:leading-[31px]">
            Master in-demand tech skills through hands-on training in front-end development, data analysis and UI/UX design. Build
            real-world projects with expert mentors, and launch your tech journey with a portfolio you can show employers.
          </p>
          <div className="flex w-full flex-wrap justify-center gap-3 tab:w-auto">
            <Link
              href="/enrol"
              className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-primary px-[26px] font-semibold text-on-primary hover:opacity-90 tab:w-auto"
            >
              Enrol Now
              <Icon as={ArrowRight} />
            </Link>
            <Link
              href="/programmes"
              className="press inline-flex h-[54px] w-full items-center justify-center rounded-full border border-line-control bg-glass px-[26px] font-semibold text-ink hover:bg-hover tab:w-auto"
            >
              Explore Programmes
            </Link>
          </div>
        </div>
      </section>

      {/* Tools strip */}
      <section aria-label="Tools you’ll learn" className="overflow-hidden border-y border-line-subtle bg-sunken">
        <div className="marquee flex w-max gap-7 py-3 pl-7">
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} aria-hidden={i >= tools.length || undefined} className="flex shrink-0 items-center gap-2 text-[13px] font-semibold text-ink-soft">
              <Tile icon={tool.icon} tone={tool.tone} size={22} />
              {tool.name}
            </span>
          ))}
        </div>
      </section>

      {/* Facts */}
      <Section aria-label="PractiCode Academy at a glance" className="tab:py-[72px]">
        <ul className="grid grid-cols-2 gap-4 tab:grid-cols-4">
          {facts.map((f) => (
            <li
              key={f.value}
              className="flex flex-col gap-2.5 rounded-3xl border border-banner-border p-[18px] text-white tab:p-6"
              style={{ background: `var(--pc-stat-${f.tone}, var(--pc-banner-${f.tone}))` }}
            >
              <Tile icon={f.icon} size={44} />
              <p className="mt-1 font-display text-2xl leading-7 font-extrabold tracking-[-0.03em] tab:text-[34px] tab:leading-[38px]">{f.value}</p>
              <p className="text-sm leading-5 text-white/85">{f.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Programmes */}
      <Section id="programmes" aria-labelledby="programmes-title" className="tab:py-[72px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="flex flex-col gap-2.5">
            <p className={`${t.kicker} text-ai-text`}>Our programmes</p>
            <h2 id="programmes-title" className={t.h2}>
              Pick a programme. Build real things.
            </h2>
          </div>
          <p className="max-w-[380px] text-base leading-[26px] text-ink-muted">
            Every programme runs as live classes, onsite in Ibadan or online, with a project every week.
          </p>
        </div>
        <ProgrammeCards />
      </Section>

      {/* How it works */}
      <Section aria-labelledby="how-title" className="tab:py-[72px]">
        <div className="mb-9 flex max-w-[720px] flex-col gap-2.5">
          <p className={`${t.kicker} text-da-text`}>How it works</p>
          <h2 id="how-title" className={t.h2}>
            From enrolment to graduation
          </h2>
        </div>
        <ol className="grid grid-cols-1 gap-4 tab:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-3 rounded-3xl border border-line p-6" style={toneBg.soft(s.tone)}>
              <div className="flex items-center justify-between">
                <Tile icon={s.icon} tone={s.tone} size={48} />
                <span className="font-mono text-[13px] font-semibold text-ink-subtle">{s.n}</span>
              </div>
              <h3 className="text-[19px] leading-[26px] font-semibold text-ink">{s.title}</h3>
              <p className="text-sm leading-[22px] text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* SIWES band */}
      <Section aria-labelledby="siwes-title" className="tab:py-[72px]">
        <div className="flex flex-wrap overflow-hidden rounded-[32px] border border-line bg-[linear-gradient(150deg,#defbf2_0%,#ffffff_60%)] [[data-theme=dark]_&]:bg-[linear-gradient(150deg,#0a7d5c_0%,#0a4e3d_30%,#0f0d1b_70%)]">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col justify-center gap-[18px] px-5 py-6 tab:p-12">
            <div className="flex items-center gap-3.5">
              <Tile icon={GraduationCap} tone="da" size={72} />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-ink-muted">Industrial training</span>
                <span className="text-lg font-bold text-ink">SIWES / IT student</span>
              </div>
            </div>
            <div className="flex -rotate-[1.5deg] flex-col gap-2.5 rounded-[22px] border border-line bg-card p-[18px]">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <Tile icon={NotebookPen} tone="fe" size={30} />
                  SIWES logbook
                </span>
                <span className="text-xs text-ink-muted">3 months</span>
              </div>
              {logbook.map((w) => (
                <div key={w.wk} className="flex items-center gap-3 rounded-xl bg-sunken px-3 py-2.5">
                  <span className="min-w-[52px] font-mono text-xs font-semibold text-ink-subtle">{w.wk}</span>
                  <span className="grow text-[13px] text-ink-soft">{w.topic}</span>
                  <span
                    className={`rounded-full px-2.5 py-[3px] text-[11px] font-semibold whitespace-nowrap ${w.signed ? `${toneClass.da.tint} ${toneClass.da.text}` : `${toneClass.fe.tint} ${toneClass.fe.text}`}`}
                  >
                    {w.signed ? 'Signed' : 'Due Friday'}
                  </span>
                </div>
              ))}
            </div>
            <span className="inline-flex rotate-2 items-center gap-2.5 self-start rounded-full bg-ux py-2 pr-3.5 pl-2 text-[13px] font-semibold text-white">
              <Icon as={Stamp} />
              Signed weekly by PractiCode Academy
            </span>
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px] px-5 pt-1 pb-7 tab:py-14 tab:pr-14 tab:pl-4">
            <p className={`${t.kicker} text-da-text`}>For SIWES and IT students</p>
            <h2 id="siwes-title" className={t.h2}>
              Doing your SIWES? Make it count.
            </h2>
            <p className="text-base leading-[26px] text-ink-soft">
              Spend your industrial training building real projects in front-end development, data analysis or UI/UX design, instead of
              filing papers.
            </p>
            <ul className="flex flex-col gap-3">
              {siwesPoints.map((p) => (
                <li key={p.text} className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <Tile icon={p.icon} tone={p.tone} size={34} />
                  {p.text}
                </li>
              ))}
            </ul>
            <Link
              href="/siwes"
              className="press inline-flex h-[54px] items-center gap-2.5 self-start rounded-full bg-primary px-[26px] font-semibold text-on-primary"
            >
              See SIWES Details
              <Icon as={ArrowRight} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section aria-labelledby="gallery-title" className="tab:py-[72px]">
        <div className="mb-7 flex flex-col gap-2.5">
          <p className={`${t.kicker} text-ux-text`}>Inside our classes</p>
          <h2 id="gallery-title" className={t.h2}>
            Real rooms, real people, real work
          </h2>
        </div>
        <Gallery photos={galleryHome} label="Photos from our classes" />
      </Section>

      {/* Partners */}
      <Section spacing="tight" className="tab:pt-6 tab:pb-10">
        <Partners />
      </Section>

      {/* PractiCode Learn */}
      <Section aria-labelledby="learn-title" className="tab:py-[72px]">
        <div className="flex flex-wrap items-center gap-10 rounded-[32px] border border-line px-5 py-7 tab:p-14" style={toneBg.soft('fe')}>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
            <Tile icon={Laptop} tone="fe" size={52} />
            <h2 id="learn-title" className={t.h2}>
              Prefer to learn at your own pace?
            </h2>
            <p className="text-base leading-[26px] text-ink-soft">
              PractiCode Learn is our online platform. Lessons run in your browser, and Module 1 of Front-End is free.
            </p>
            <a
              href={site.learn}
              className="press inline-flex h-[54px] items-center gap-2.5 self-start rounded-full border border-line-control px-[26px] font-semibold text-ink hover:bg-hover"
            >
              Start Free on PractiCode Learn
              <Icon as={ArrowUpRight} />
            </a>
          </div>
          {/* Code panels keep their glow (the founder's one exception to the no-glow rule). */}
          <div className="min-w-0 flex-[1_1_360px] overflow-hidden rounded-3xl border border-[#2a2540] bg-[#0e0c1a] font-mono text-sm leading-[26px] shadow-[0_24px_60px_rgba(61,90,245,0.3)]">
            <div className="flex items-center gap-1.5 border-b border-[#2a2540] bg-[#13101f] px-4 py-2.5 text-[13px] text-[#8b88a0]">
              <span className="size-2 rounded-full bg-[#f0407f]" />
              <span className="size-2 rounded-full bg-[#ff8a3d]" />
              <span className="size-2 rounded-full bg-[#2fe6b0]" />
              <span className="ml-2">index.html</span>
            </div>
            <pre className="overflow-x-auto px-5 py-4 text-[#dcd9ea]">
              <span className="text-[#8ea2ff]">&lt;h1&gt;</span>
              <span className="text-white">Mama Nkechi’s Kitchen</span>
              <span className="text-[#8ea2ff]">&lt;/h1&gt;</span>
              {'\n'}
              <span className="text-[#8ea2ff]">&lt;p&gt;</span>
              <span className="text-white">Jollof rice, ₦2,500</span>
              <span className="text-[#8ea2ff]">&lt;/p&gt;</span>
              {'\n'}
              <span className="-mx-5 block bg-[#20275a] px-5">
                <span className="text-[#8ea2ff]">&lt;a</span> <span className="text-[#b9a2ff]">href</span>=
                <span className="text-[#4be3a8]">&quot;https://wa.me/234...&quot;</span>
                <span className="text-[#8ea2ff]">&gt;</span>
                <span className="text-white">Order on WhatsApp</span>
                <span className="text-[#8ea2ff]">&lt;/a&gt;</span>
              </span>
            </pre>
          </div>
        </div>
      </Section>

      <Section aria-label="Questions">
        <FaqSection items={homeFaq} name="home-faq" />
      </Section>

      <Section spacing="last">
        <CtaBand />
      </Section>
      <JsonLd data={[localBusinessLd(), faqLd(homeFaq)]} />
    </>
  )
}
