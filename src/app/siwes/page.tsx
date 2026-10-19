import type { Route } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BadgePercent,
  Calendar,
  Check,
  ClipboardList,
  GraduationCap,
  HandHeart,
  IdCard,
  Laptop,
  MapPin,
  NotebookPen,
  Stamp,
  Users,
  Wallet,
  Wifi,
} from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { FaqSection } from '@/components/site/faq-section'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import { siwesFaq } from '@/content/faq'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

export const metadata = pageMeta({
  title: 'SIWES and IT Placement in Ibadan for Tech Students',
  description:
    'Do your SIWES or IT at PractiCode Academy in Old Bodija, Ibadan: three months building real projects in front-end, data analysis or UI/UX, at half-price tuition, with your logbook signed every week.',
  path: '/siwes',
})

type Item = { title: string; body: string; icon: typeof Check; tone: Tone }

const logbook = [
  { wk: 'Week 1', topic: 'How the web works', signed: true },
  { wk: 'Week 2', topic: 'HTML: structure and meaning', signed: true },
  { wk: 'Week 3', topic: 'Your first live site', signed: true },
  { wk: 'Week 4', topic: 'CSS fundamentals', signed: false },
]

const expect: Item[] = [
  { title: 'Half-price tuition', body: 'SIWES and IT students pay 50% of the usual course fee.', icon: BadgePercent, tone: 'da' },
  { title: 'Administrative fee', body: 'A one-off fee, paid at registration or on resumption.', icon: Wallet, tone: 'fe' },
  { title: 'Three months', body: 'Onsite at our centre in Old Bodija, Ibadan.', icon: Calendar, tone: 'ux' },
  { title: 'Weekly logbook signing', body: 'We review your entries and sign them every week.', icon: Stamp, tone: 'ai' },
]

const courses = ['Computer Science', 'Software Engineering', 'Information Technology', 'Computer Engineering', 'Cybersecurity', 'Data Science', 'Other related technology courses']

const needs: { text: string; icon: typeof Check; tone: Tone }[] = [
  { text: 'Your matric number and level', icon: IdCard, tone: 'fe' },
  { text: 'An introduction letter from your school', icon: NotebookPen, tone: 'da' },
  { text: 'A laptop (strongly recommended)', icon: Laptop, tone: 'ux' },
  { text: 'Internet access for online resources', icon: Wifi, tone: 'ai' },
  { text: 'Commitment to attend and keep up', icon: HandHeart, tone: 'fe' },
]

const steps: Item[] = [
  { title: 'Register online', body: 'Fill the form, choose your programme and upload your introduction letter.', icon: ClipboardList, tone: 'fe' },
  { title: 'Pay online', body: 'Pay the SIWES tuition with Paystack, or by bank transfer with your receipt.', icon: Wallet, tone: 'da' },
  { title: 'Resume at the Academy', body: 'Report to our Old Bodija centre on your resumption date, ready to learn.', icon: MapPin, tone: 'ux' },
  { title: 'Settle the admin fee', body: 'Pay the administrative fee on resumption if you have not already.', icon: IdCard, tone: 'ai' },
  { title: 'Learn and log weekly', body: 'Attend classes, complete exercises and submit your logbook every week.', icon: NotebookPen, tone: 'fe' },
  { title: 'Capstone and certificate', body: 'Finish your capstone project and receive your certificate.', icon: GraduationCap, tone: 'da' },
]

const rules: { title: string; icon: typeof Check; tone: Tone; items: string[] }[] = [
  {
    title: 'Your logbook',
    icon: NotebookPen,
    tone: 'fe',
    items: ['Record your activities after each session, accurately.', 'Submit your logbook every week for review.', 'We review your entries, then sign them.', 'Late logbooks can delay signing.'],
  },
  {
    title: 'To get your certificate',
    icon: Award,
    tone: 'ai',
    items: ['Complete the full three months.', 'Meet the attendance requirement.', 'Submit all assignments on time.', 'Complete your capstone project.'],
  },
]

export default function SiwesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center gap-8 px-4 pt-8 pb-6 tab:gap-14 tab:px-10 tab:pt-20 tab:pb-12">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
            <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-card py-1.5 pr-3.5 pl-1.5 text-[13px] font-semibold text-ink-soft">
              <Tile icon={GraduationCap} tone="da" size={28} className="rounded-full" />
              For SIWES and IT Students
            </p>
            <h1 className={t.hero}>
              Make your <PillWord tone="da">SIWES</PillWord> count.
            </h1>
            <p className="max-w-[560px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">
              Spend your three-month industrial training building real projects in front-end development, data analysis or UI/UX design. We
              review and sign your logbook every week.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={'/enrol?siwes=yes' as Route}
                className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-primary px-[26px] font-semibold text-on-primary tab:w-auto"
              >
                Register for SIWES
                <Icon as={ArrowRight} />
              </Link>
              <a
                href={site.whatsapp}
                className="press inline-flex h-[54px] w-full items-center justify-center rounded-full border border-line-control px-[26px] font-semibold text-ink tab:w-auto"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div
            className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px] rounded-[32px] border border-line p-5 tab:p-8"
            style={{ background: 'var(--pc-soft-da)' }}
          >
            <div className="flex items-center gap-3.5">
              <Tile icon={GraduationCap} tone="da" size={76} />
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-ink-muted">Industrial training · 3 months</span>
                <span className="text-[19px] font-bold text-ink">SIWES / IT student</span>
              </div>
            </div>
            <div className="flex -rotate-[1.5deg] flex-col gap-2.5 rounded-[22px] border border-line bg-card p-[18px]">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <Tile icon={NotebookPen} tone="fe" size={30} />
                  SIWES logbook
                </span>
                <span className="text-xs text-ink-muted">Front-End</span>
              </div>
              {logbook.map((w) => (
                <div key={w.wk} className="flex items-center gap-3 rounded-xl bg-sunken px-3 py-2.5">
                  <span className="min-w-[52px] font-mono text-xs font-semibold text-ink-subtle">{w.wk}</span>
                  <span className="grow text-[13px] text-ink-soft">{w.topic}</span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-[3px] text-[11px] font-semibold whitespace-nowrap',
                      w.signed ? cn(toneClass.da.tint, toneClass.da.text) : cn(toneClass.fe.tint, toneClass.fe.text),
                    )}
                  >
                    {w.signed ? 'Signed' : 'Due Friday'}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rotate-2 items-center gap-2.5 rounded-full bg-ux py-2 pr-3.5 pl-2 text-[13px] font-semibold text-white">
                <Icon as={Stamp} />
                Signed weekly by PractiCode Academy
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-3.5 py-2.5">
                <Tile icon={Users} tone="ux" size={40} />
                <div className="flex flex-col">
                  <span className="font-display text-2xl leading-7 font-extrabold tracking-[-0.03em] text-ink">100+</span>
                  <span className="text-xs text-ink-muted">SIWES students hosted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <Section aria-labelledby="expect-title">
        <div className="mb-7 flex flex-col gap-2.5">
          <h2 id="expect-title" className={t.h2}>
            What to expect
          </h2>
          <p className="text-base leading-[26px] text-ink-muted">You’ll see the exact fees when you register, before you pay anything.</p>
        </div>
        <ul className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-4">
          {expect.map((e) => (
            <li key={e.title} className="flex flex-col gap-2.5 rounded-3xl border border-banner-border p-6 text-white" style={toneBg.banner(e.tone)}>
              <Tile icon={e.icon} size={44} />
              <h3 className="mt-1 text-lg leading-6 font-semibold">{e.title}</h3>
              <p className="text-sm leading-[22px] text-white/85">{e.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Who and what */}
      <Section>
        <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-[28px] border border-line p-6 tab:p-8" style={toneBg.soft('fe')}>
            <div className="flex items-center gap-3.5">
              <Tile icon={BadgeCheck} tone="fe" size={48} />
              <h2 className={t.h3}>Who can join</h2>
            </div>
            <p className="text-[15px] leading-6 text-ink-soft">Students on industrial training from:</p>
            <ul className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <li key={c} className="rounded-full border border-line bg-card px-3.5 py-2 text-[13px] font-medium text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-[28px] border border-line p-6 tab:p-8" style={toneBg.soft('da')}>
            <div className="flex items-center gap-3.5">
              <Tile icon={ClipboardList} tone="da" size={48} />
              <h2 className={t.h3}>What you’ll need</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {needs.map((n) => (
                <li key={n.text} className="flex items-center gap-3 text-[15px] leading-[22px] text-ink-soft">
                  <Tile icon={n.icon} tone={n.tone} size={32} />
                  {n.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Steps */}
      <Section aria-labelledby="steps-title">
        <h2 id="steps-title" className={cn(t.h2, 'mb-6 tab:mb-8')}>
          From registration to certificate
        </h2>
        <ol className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 rounded-3xl border border-line p-6" style={toneBg.soft(s.tone)}>
              <div className="flex items-center justify-between">
                <Tile icon={s.icon} tone={s.tone} size={44} />
                <span className="font-mono text-[13px] font-semibold text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-lg leading-6 font-semibold text-ink">{s.title}</h3>
              <p className="text-sm leading-[22px] text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Logbook and certificate */}
      <Section>
        <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          {rules.map((r) => (
            <div key={r.title} className="flex flex-col gap-4 rounded-[28px] border border-line bg-card p-6 tab:p-8">
              <div className="flex items-center gap-3.5">
                <Tile icon={r.icon} tone={r.tone} size={48} />
                <h2 className={t.h3}>{r.title}</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {r.items.map((i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-6 text-ink-soft">
                    <Icon as={Check} size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-da-text" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section aria-label="Questions">
        <FaqSection items={siwesFaq} name="siwes-faq" intro="Quick answers for SIWES and IT students. Can’t find yours? We reply on WhatsApp." />
      </Section>

      <Section spacing="last">
        <CtaBand
          title="Ready to start your SIWES?"
          text="Register online and upload your introduction letter. You’ll see the SIWES fee before you pay."
          label="Register Now"
          href={'/enrol?siwes=yes' as Route}
        />
      </Section>
      <JsonLd data={[faqLd(siwesFaq), breadcrumbLd([{ name: 'SIWES', path: '/siwes' }])]} />
    </>
  )
}
