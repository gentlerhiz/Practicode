import type { Route } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Braces,
  ChartPie,
  Frame,
  Funnel,
  GraduationCap,
  Hammer,
  MapPin,
  MessageCircle,
  Rocket,
  Sheet,
  FileCode,
  Users,
  Workflow,
} from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { ProgrammeFinder } from '@/components/site/programme-finder'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import { programmeById, type ProgrammeId, type Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { toneBg, toneClass } from '@/lib/tone'

export const metadata = pageMeta({
  title: 'Tech Programmes in Ibadan and Online',
  description:
    'Front-End Web Development, Data Analysis and UI/UX Design, taught in live classes in Ibadan or online, with a project every week. AI and Machine Learning is coming soon.',
  path: '/programmes',
})

const paths: { id: ProgrammeId; title: string; summary: string; steps: { when: string; text: string; icon: typeof Sheet }[] }[] = [
  {
    id: 'fe',
    title: 'You like building things',
    summary: 'Make websites people can visit, tap and use, on any phone or laptop.',
    steps: [
      { when: 'Weeks 1–4', text: 'Write your first pages in HTML and CSS', icon: FileCode },
      { when: 'Weeks 8–11', text: 'Make them interactive with JavaScript', icon: Braces },
      { when: 'Weeks 16–17', text: 'Publish your own live site', icon: Rocket },
    ],
  },
  {
    id: 'da',
    title: 'You like numbers and patterns',
    summary: 'Turn messy spreadsheets into answers people can act on.',
    steps: [
      { when: 'Weeks 1–3', text: 'Summarise data in Excel', icon: Sheet },
      { when: 'Weeks 4–9', text: 'Clean and model it with Power Query and DAX', icon: Funnel },
      { when: 'Weeks 10–12', text: 'Build a Power BI dashboard', icon: ChartPie },
    ],
  },
  {
    id: 'ux',
    title: 'You like people and visuals',
    summary: 'Find out what people need, then design screens that make it easy.',
    steps: [
      { when: 'Weeks 1–3', text: 'Talk to real users', icon: Users },
      { when: 'Weeks 4–6', text: 'Design screens in Figma', icon: Frame },
      { when: 'Weeks 7–12', text: 'Test a clickable prototype', icon: Workflow },
    ],
  },
]

const included: { title: string; body: string; icon: typeof Sheet; tone: Tone }[] = [
  { title: 'Onsite or online', body: 'Come to our Old Bodija centre or join the same class live online.', icon: MapPin, tone: 'fe' },
  { title: 'A project every week', body: 'You build something in every class, not just watch.', icon: Hammer, tone: 'da' },
  { title: 'Feedback on your work', body: 'Instructors review your projects and tell you what to improve.', icon: BadgeCheck, tone: 'ux' },
  { title: 'A class WhatsApp group', body: 'Ask questions between classes and get class updates.', icon: MessageCircle, tone: 'ai' },
  { title: 'A certificate', body: 'A PractiCode Academy certificate of completion when you finish.', icon: Award, tone: 'fe' },
  { title: 'Start from zero', body: 'No experience needed for our beginner programmes.', icon: Rocket, tone: 'da' },
]

export default function ProgrammesPage() {
  return (
    <>
      <section aria-labelledby="programmes-title" className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto max-w-[1280px] px-4 pt-7 pb-8 tab:px-10 tab:pt-14 tab:pb-12">
          <ProgrammeFinder />
        </div>
      </section>

      <Section aria-labelledby="paths-title" className="tab:py-[72px]">
        <div className="mb-8 flex max-w-[680px] flex-col gap-3">
          <h2 id="paths-title" className={t.h2}>
            Not sure where to start?
          </h2>
          <p className="text-[17px] leading-7 text-ink-muted">
            Start with what you enjoy. Every programme begins from zero, so nothing assumes you’ve done it before.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3 tab:gap-6">
          {paths.map((path) => {
            const p = programmeById(path.id)
            return (
              <li key={path.id} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-card">
                <div className="flex flex-col gap-3 p-[22px] text-white" style={toneBg.card(path.id)}>
                  <span className="flex size-12 items-center justify-center rounded-[15px] bg-white/15">
                    <Icon as={p.icon} size={24} />
                  </span>
                  <h3 className="font-display text-[22px] leading-7 font-bold tracking-[-0.02em]">{path.title}</h3>
                  <p className="text-sm leading-[22px] text-white/85">{path.summary}</p>
                </div>
                <ol className="flex grow flex-col gap-0.5 p-3">
                  {path.steps.map((s) => (
                    <li key={s.text} className="flex items-center gap-3 px-2 py-2.5">
                      <Tile icon={s.icon} tone={path.id} size={36} />
                      <span className="flex min-w-0 flex-col gap-px">
                        <span className="text-xs text-ink-subtle">{s.when}</span>
                        <span className="text-sm font-semibold text-ink">{s.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="px-5 pb-5">
                  <Link
                    href={`/programmes/${p.slug}` as Route}
                    className="press flex h-[46px] items-center justify-center gap-2 rounded-full border border-line-control text-sm font-semibold text-ink hover:border-line-strong hover:bg-hover"
                  >
                    Start with {p.short}
                    <Icon as={ArrowRight} size={16} />
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section aria-labelledby="included-title" className="tab:py-[72px]">
        <div className="rounded-[32px] border border-line px-5 py-6 tab:p-12" style={toneBg.soft('ai')}>
          <div className="mb-8 flex max-w-[640px] flex-col gap-3">
            <p className={cn(t.kicker, toneClass.ai.text)}>In every programme</p>
            <h2 id="included-title" className={t.h2}>
              What comes with your place
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-6 ph:grid-cols-2 tab:grid-cols-3">
            {included.map((x) => (
              <li key={x.title} className="flex items-start gap-4">
                <Tile icon={x.icon} tone={x.tone} size={48} />
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-[17px] font-semibold text-ink">{x.title}</span>
                  <span className="text-sm leading-[22px] text-ink-muted">{x.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center gap-6 rounded-[32px] border border-banner-border px-5 py-6 text-white tab:px-12 tab:py-10" style={toneBg.banner('da')}>
          <span className="flex size-[68px] items-center justify-center rounded-[20px] border border-white/25 bg-white/15">
            <Icon as={GraduationCap} size={34} />
          </span>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
            <h2 className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.035em] tab:text-[34px] tab:leading-[38px]">Doing SIWES or IT?</h2>
            <p className="text-base leading-[26px] text-white/90">
              Join Front-End, Data Analysis or UI/UX for your industrial training at half the usual tuition, with your logbook signed every
              week.
            </p>
          </div>
          <Link
            href="/siwes"
            className="press inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 text-[15px] font-semibold text-[#05503b] tab:w-auto"
          >
            See SIWES Details
            <Icon as={ArrowRight} />
          </Link>
        </div>
      </Section>

      <Section spacing="last">
        <CtaBand title="Found your programme?" text="Registration takes about five minutes, and you’ll see the fee before you pay. Questions first? Message us on WhatsApp." />
      </Section>
      <JsonLd data={breadcrumbLd([{ name: 'Programmes', path: '/programmes' }])} />
    </>
  )
}
