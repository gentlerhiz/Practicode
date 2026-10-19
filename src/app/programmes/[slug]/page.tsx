import type { Metadata, Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Award, Bell, Check } from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { FaqSection } from '@/components/site/faq-section'
import { NotifyForm } from '@/components/site/forms/notify-form'
import { ProgrammeArt } from '@/components/site/programme-art'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import { photos } from '@/content/academy'
import { programmeFaq } from '@/content/faq'
import { findProgramme, lessonShape, liveProgrammes, programmes } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, courseLd, faqLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

export const dynamicParams = false
export const generateStaticParams = () => programmes.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: PageProps<'/programmes/[slug]'>): Promise<Metadata> {
  const p = findProgramme((await params).slug)
  if (!p) return {}
  return pageMeta({ title: p.seoTitle, description: p.seoDescription, path: `/programmes/${p.slug}` })
}

const pair = { fe: '#6e4cf5', da: '#3d5af5', ux: '#6e4cf5', ai: '#d9306f' } as const
const fill = { fe: '#3d5af5', da: '#0a7d5c', ux: '#d9306f', ai: '#6e4cf5' } as const

export default async function ProgrammePage({ params }: PageProps<'/programmes/[slug]'>) {
  const p = findProgramme((await params).slug)
  if (!p) notFound()
  const k = p.id
  const tc = toneClass[k]
  const toolCols = p.tools.length <= 5 ? p.tools.length : Math.ceil(p.tools.length / 2)
  const faq = programmeFaq(k)

  return (
    <>
      {/* Hero banner */}
      <Section className="pt-5 pb-6 tab:pt-10 tab:pb-8">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-[13px] text-ink-muted">
          <Link href="/programmes" className="underline-offset-2 hover:underline">
            Programmes
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink">
            {p.title}
          </span>
        </nav>
        <div className="relative overflow-hidden rounded-[36px] border border-banner-border px-5 pt-6 pb-[120px] text-white tab:p-14" style={toneBg.banner(k)}>
          <div className="relative z-[1] flex flex-col gap-[22px] tab:max-w-[64%]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex size-[60px] items-center justify-center rounded-[18px] border border-white/25 bg-white/15">
                <Icon as={p.icon} size={30} />
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-medium">{p.meta}</span>
              <span className={cn('rounded-full border border-white/45 px-3 py-[5px] text-[13px] font-semibold', !p.live && 'bg-black/25')}>
                {p.live ? 'Enrolling Now' : 'Coming Soon'}
              </span>
            </div>
            <h1 className="font-display text-[38px] leading-[42px] font-extrabold tracking-[-0.035em] tab:text-[68px] tab:leading-[72px]">{p.title}</h1>
            <p className="max-w-[600px] text-base leading-[26px] text-white/90 tab:text-lg tab:leading-[30px]">{p.lead}</p>
            <div className="flex flex-wrap gap-3">
              {p.live ? (
                <Link
                  href={`/enrol?course=${k}` as Route}
                  className={cn('press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-[26px] font-semibold tab:w-auto', tc.ink)}
                >
                  Enrol in {p.short}
                  <Icon as={ArrowRight} />
                </Link>
              ) : (
                <a
                  href="#notify"
                  className={cn('press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-[26px] font-semibold tab:w-auto', tc.ink)}
                >
                  <Icon as={Bell} />
                  Get Notified
                </a>
              )}
              <a
                href={site.whatsapp}
                className="press inline-flex h-[54px] w-full items-center justify-center rounded-full border-[1.5px] border-white/60 px-[26px] font-semibold text-white tab:w-auto"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <ProgrammeArt id={k} className="-right-3 -bottom-3 h-[125px] w-[150px] tab:-right-5 tab:-bottom-5 tab:h-[316px] tab:w-[380px]" />
        </div>
      </Section>

      {/* Facts */}
      <Section spacing="tight" aria-label="Programme at a glance">
        <ul className="grid grid-cols-2 gap-4 tab:grid-cols-4">
          {p.facts.map((f) => (
            <li key={f.label} className="flex flex-col gap-1 rounded-3xl border border-line bg-card p-4 tab:p-[22px]">
              <Tile icon={f.icon} tone={f.tone} size={40} />
              <p className="mt-1.5 text-[13px] text-ink-muted">{f.label}</p>
              <p className="font-display text-xl leading-6 font-extrabold tracking-[-0.035em] text-ink tab:text-2xl tab:leading-7">{f.value}</p>
              <p className="text-[13px] leading-[19px] text-ink-subtle">{f.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Tools */}
      <Section aria-labelledby="tools-title">
        <h2 id="tools-title" className={cn(t.h2, 'mb-6 tab:mb-8')}>
          The tools you’ll use
        </h2>
        <ul className="grid grid-cols-2 gap-3 tab:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]" style={{ ['--cols' as string]: toolCols }}>
          {p.tools.map((tool) => (
            <li key={tool.name} className="flex items-center gap-3 rounded-[20px] border border-line p-4" style={toneBg.soft(k)}>
              <Tile icon={tool.icon} tone={k} size={42} />
              <span className="text-[15px] font-semibold text-ink">{tool.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Syllabus */}
      <Section aria-labelledby="syllabus-title">
        <div className="mb-8 flex max-w-[720px] flex-col gap-3">
          <h2 id="syllabus-title" className={t.h2}>
            {p.syllabusTitle}
          </h2>
          <p className="text-[17px] leading-7 text-ink-soft">{p.syllabusLead}</p>
        </div>
        {p.weeks ? (
          <ol className="grid grid-cols-1 gap-3 tab:grid-cols-3">
            {p.weeks.map((title, i) => (
              <li key={title} className="flex items-center gap-3.5 rounded-2xl border border-line bg-card px-4 py-3.5">
                <span className="flex h-[30px] min-w-[70px] shrink-0 items-center justify-center rounded-full bg-fe-tint px-2.5 font-mono text-xs font-semibold text-fe-text">
                  Week {i + 1}
                </span>
                <span className="text-[15px] leading-[22px] font-medium text-ink">{title}</span>
              </li>
            ))}
            <li className="flex items-center gap-3.5 rounded-2xl bg-[linear-gradient(120deg,#3d5af5_0%,#6e4cf5_100%)] px-4 py-3.5 tab:col-span-2">
              <span className="flex h-[30px] min-w-[70px] shrink-0 items-center justify-center rounded-full bg-white/20 px-2.5 font-mono text-xs font-semibold text-white">
                Wk 16–17
              </span>
              <span className="text-[15px] leading-[22px] font-medium text-white">{p.capstone}</span>
            </li>
          </ol>
        ) : (
          <ol className="grid grid-cols-1 gap-4 tab:grid-cols-2">
            {p.stages!.map((s, i, all) => {
              const hi = p.live && i === all.length - 1
              return (
                <li
                  key={s.title}
                  className={cn('flex flex-col gap-4 rounded-3xl border p-5 tab:p-7', hi ? 'border-transparent text-white' : 'border-line bg-card')}
                  style={hi ? { background: `linear-gradient(140deg, ${fill[k]} 0%, ${pair[k]} 100%)` } : undefined}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn('rounded-full px-3 py-1.5 font-mono text-xs font-semibold', hi ? 'bg-white/20 text-white' : cn(tc.tint, tc.text))}>{s.when}</span>
                    <span className={cn('font-display text-[28px] font-extrabold tracking-[-0.03em]', hi ? 'text-white/55' : 'text-line')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className={cn('font-display text-2xl leading-[30px] font-bold tracking-[-0.02em]', hi ? 'text-white' : 'text-ink')}>{s.title}</h3>
                  <ul className="flex flex-col gap-2.5">
                    {s.topics.map((topic) => (
                      <li key={topic} className={cn('flex items-start gap-2.5 text-[15px] leading-[22px]', hi ? 'text-white/90' : 'text-ink-soft')}>
                        <Icon as={Check} size={18} strokeWidth={2.2} className={cn('mt-0.5 shrink-0', hi ? 'text-white' : tc.text)} />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        )}
      </Section>

      {p.live ? (
        <>
          {/* Projects */}
          <Section aria-labelledby="projects-title">
            <div className="mb-8 flex max-w-[720px] flex-col gap-3">
              <p className={cn(t.kicker, tc.text)}>Projects</p>
              <h2 id="projects-title" className={t.h2}>
                What you’ll build
              </h2>
              <p className="text-[17px] leading-7 text-ink-soft">Real work you can show people, built with examples from home.</p>
            </div>
            <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3">
              {p.projects.map((pr, i, all) => {
                const hi = i === all.length - 1
                return (
                  <li
                    key={pr.title}
                    className={cn('flex flex-col gap-2.5 rounded-[28px] border p-[22px] tab:p-7', hi ? 'border-banner-border text-white' : 'border-line')}
                    style={hi ? toneBg.card(k) : toneBg.soft(k)}
                  >
                    <Tile icon={pr.icon} tone={hi ? undefined : k} size={52} className="mb-2" />
                    <p className={cn('font-mono text-xs font-semibold', hi ? 'text-white/85' : tc.text)}>{hi ? 'Capstone' : `Project ${i + 1}`}</p>
                    <h3 className={cn('font-display text-[22px] leading-7 font-bold tracking-[-0.02em]', hi ? 'text-white' : 'text-ink')}>{pr.title}</h3>
                    <p className={cn('text-[15px] leading-6', hi ? 'text-white/90' : 'text-ink-muted')}>{pr.body}</p>
                  </li>
                )
              })}
            </ul>
          </Section>

          {/* Lesson shape */}
          <Section aria-labelledby="lesson-title">
            <div className="rounded-[32px] border border-line px-5 py-6 tab:p-12" style={toneBg.soft(k)}>
              <h2 id="lesson-title" className={cn(t.h2, 'mb-6 tab:mb-8')}>
                How every lesson runs
              </h2>
              <ol className="flex flex-wrap gap-2.5">
                {lessonShape.map((l) => (
                  <li
                    key={l.title}
                    className={cn(
                      'flex min-w-0 basis-[150px] flex-col gap-1.5 rounded-[20px] border p-[18px]',
                      l.highlight ? 'grow-[2] border-transparent text-white' : 'grow border-line bg-row',
                      !l.highlight && (l.title === 'Teach' ? 'grow-[2]' : ''),
                    )}
                    style={l.highlight ? { background: `linear-gradient(150deg, ${fill[k]} 0%, ${pair[k]} 100%)` } : undefined}
                  >
                    <Tile icon={l.icon} tone={l.highlight ? undefined : l.tone} size={36} />
                    <p className={cn('mt-1 font-mono text-xs font-semibold', l.highlight ? 'text-white/85' : 'text-ink-muted')}>{l.mins}</p>
                    <p className={cn('text-base font-semibold', l.highlight ? 'text-white' : 'text-ink')}>{l.title}</p>
                    <p className={cn('text-[13px] leading-5', l.highlight ? 'text-white/85' : 'text-ink-muted')}>{l.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Section>

          {/* Certificate */}
          <Section aria-labelledby="cert-title">
            <div className="flex flex-wrap items-center gap-12">
              <div className="relative min-w-0 flex-[1_1_420px]">
                <Image
                  src={photos.graduation.src}
                  alt="Graduates holding PractiCode Academy certificates"
                  width={1000}
                  height={700}
                  sizes="(min-width: 960px) 600px, 100vw"
                  className="h-[260px] w-full rounded-[28px] border border-line object-cover tab:h-[400px]"
                />
                <span className="absolute top-5 right-5 flex size-16 items-center justify-center rounded-[19px] border-[3px] border-bg bg-ai text-white">
                  <Icon as={Award} size={28} />
                </span>
              </div>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
                <h2 id="cert-title" className={t.h2}>
                  Finish with a capstone and a certificate
                </h2>
                <p className="text-base leading-[26px] text-ink-soft">{p.certificate}</p>
              </div>
            </div>
          </Section>
        </>
      ) : (
        <>
          {/* Notify */}
          <Section id="notify" aria-labelledby="notify-title">
            <div className="flex flex-wrap items-start gap-7 rounded-[32px] border border-line px-5 py-6 tab:gap-14 tab:p-12" style={toneBg.soft(k)}>
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
                <Tile icon={Bell} tone={k} size={56} />
                <h2 id="notify-title" className={t.h2}>
                  Be the first to know when it opens
                </h2>
                <p className="text-base leading-[26px] text-ink-soft">
                  Leave your details and we’ll message you once, when enrolment for AI &amp; Machine Learning opens. No spam.
                </p>
              </div>
              <NotifyForm course={k} />
            </div>
          </Section>
          <Section aria-labelledby="others-title">
            <h2 id="others-title" className={cn(t.h2, 'mb-6 tab:mb-8')}>
              Start now with a live programme
            </h2>
            <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3">
              {liveProgrammes.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/programmes/${o.slug}` as Route}
                    className="flex items-center gap-3.5 rounded-[22px] border border-line p-[18px] hover:border-line-strong"
                    style={toneBg.soft(o.id)}
                  >
                    <Tile icon={o.icon} tone={o.id} size={44} />
                    <span className="flex min-w-0 grow flex-col gap-0.5">
                      <span className="text-base font-semibold text-ink">{o.title}</span>
                      <span className="text-[13px] text-ink-muted">{o.meta}</span>
                    </span>
                    <Icon as={ArrowRight} className="text-ink-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}

      <Section aria-label="Questions">
        <FaqSection items={faq} name={`faq-${k}`} />
      </Section>

      <Section spacing="last">
        {p.live ? (
          <CtaBand title={`Start ${p.short} with us.`} text="Registration takes about five minutes, and you’ll see the fee before you pay." href={`/enrol?course=${k}` as Route} />
        ) : (
          <CtaBand title="Want to start now?" text="Front-End, Data Analysis and UI/UX are enrolling now, in Ibadan and online." label="See Programmes" href="/programmes" />
        )}
      </Section>
      <JsonLd data={[courseLd(p), faqLd(faq), breadcrumbLd([{ name: 'Programmes', path: '/programmes' }, { name: p.title, path: `/programmes/${p.slug}` }])]} />
    </>
  )
}
