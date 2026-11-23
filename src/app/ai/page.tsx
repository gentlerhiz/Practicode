import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Calendar, Check, Clock, MapPin, MessageCircle, Video } from 'lucide-react'
import { AiRegistrationForm } from '@/components/site/forms/ai-registration-form'
import { FaqSection } from '@/components/site/faq-section'
import { JsonLd } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { Icon } from '@/components/ui/icon'
import { Section } from '@/components/ui/section'
import { type as t } from '@/components/ui/type'
import type { QA } from '@/content/faq'
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneAt, toneVars } from '@/lib/tone'

export const metadata: Metadata = pageMeta({
  title: 'AI Video Creation Course',
  description: 'Learn to create professional AI videos from scratch in a beginner-friendly live course. Master prompt engineering, UGC videos, product videos and editing.',
  path: '/ai',
})

const modules = [
  {
    number: '01',
    title: 'AI Video Creation Fundamentals',
    items: ['Understanding AI Video Generation', 'Essential AI Video Terminologies', 'AI Tools & Their Applications', 'Effective Prompt Engineering'],
  },
  {
    number: '02',
    title: 'First-Person POV UGC Videos',
    items: ['POV Image & Video Generation', 'First-Person Camera Angles & Movements', 'Character & Scene Consistency', 'Creating Engaging UGC-Style Videos'],
  },
  {
    number: '03',
    title: 'Product-Only AI Videos',
    items: ['AI Product Image Generation', 'Product Animation & Cinematic Movements', 'Lighting, Composition & Visual Effects', 'Creating Professional Product Advertisements'],
  },
  {
    number: '04',
    title: 'Video Production & Editing',
    items: ['Scene Transitions & Continuity', 'Reusable Master Prompt Development', 'AI Video Editing & Sound Design', 'Final Video Production'],
  },
]

const videos = [
  'WhatsApp Video 2026-11-23 at 12.34.19 AM.mp4',
  'WhatsApp Video 2026-11-23 at 12.34.17 AM.mp4',
  'WhatsApp Video 2026-11-23 at 12.34.16 AM.mp4',
  'WhatsApp Video 2026-11-23 at 12.34.16 AM (3).mp4',
  'WhatsApp Video 2026-11-23 at 12.34.16 AM (2).mp4',
  'WhatsApp Video 2026-11-23 at 12.34.16 AM (1).mp4',
]

const aiFaq: QA[] = [
  { q: 'Do I need to have experience creating videos?', a: 'No. This course starts from the fundamentals and is designed for complete beginners.' },
  { q: 'Do I need to already know how to use AI tools?', a: 'No. You’ll learn which tools to use, how they work and how to write prompts that get better results.' },
  { q: 'What will I finish the course with?', a: 'You’ll have practical experience creating first-person UGC-style videos, product videos and polished AI video projects.' },
  { q: 'Do I need a laptop?', a: 'A laptop is strongly recommended so you can practise outside class. You should also have a steady internet connection.' },
  { q: 'How much does the course cost?', a: 'The early bird fee is ₦10,000 and the late bird fee is ₦20,000.' },
  { q: 'When does the course start?', a: 'The flyer lists 6 December 2026 as the class start date.' },
  { q: 'How do I reserve my place?', a: 'Register on this page, then use the WhatsApp button to contact us and make your payment.' },
]

export default function AiPage() {
  return (
    <>
      <Section className="pt-6 pb-8 tab:pt-10 tab:pb-10">
        <div
          className="relative grid min-h-[580px] overflow-hidden rounded-[36px] border border-banner-border tab:grid-cols-[1.08fr_0.92fr]"
          style={{ background: 'var(--pc-banner-ai)' }}
        >
          <div className="relative z-[1] flex flex-col justify-center gap-5 px-5 py-10 text-white tab:px-12 tab:py-14">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[13px] font-semibold">
              <span className="size-2 rounded-full bg-success-fill" />
              Beginner-friendly short course
            </p>
            <h1 className="font-display text-[42px] leading-[46px] font-extrabold tracking-[-0.035em] tab:text-[68px] tab:leading-[72px]">
              Learn AI
              <br />
              Video Creation
            </h1>
            <p className="max-w-[580px] text-base leading-[27px] text-white/90 tab:text-lg tab:leading-[30px]">
              Create professional AI videos from scratch, even as a beginner. Learn how to use AI tools, master visual prompting and transform simple ideas into engaging videos for businesses and brands.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href="#register" className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 font-semibold text-[#07060d] tab:w-auto">
                Register Now
                <Icon as={ArrowRight} />
              </a>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/55 px-7 font-semibold text-white tab:w-auto">
                <Icon as={MessageCircle} />
                Ask on WhatsApp
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-black/20 px-3 py-2 text-[13px]">Early bird ₦10,000</span>
              <span className="rounded-full bg-black/20 px-3 py-2 text-[13px]">Late bird ₦20,000</span>
              <span className="rounded-full bg-black/20 px-3 py-2 text-[13px]">Starts 6 Dec 2026</span>
            </div>
          </div>
          <div className="relative flex min-h-[420px] items-end justify-center overflow-hidden tab:min-h-full">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.18),transparent_42%)]" />
            <Image
              src="/ai/ai-flyer.jpeg"
              alt="AI Video Creation course flyer"
              width={840}
              height={1050}
              priority
              sizes="(min-width: 960px) 45vw, 100vw"
              className="relative z-[1] h-full w-full object-contain object-bottom tab:max-h-[580px]"
            />
          </div>
        </div>
      </Section>

      <Section spacing="tight" aria-label="Course at a glance">
        <ul className="grid grid-cols-2 gap-3 tab:grid-cols-4">
          {[
            { icon: Calendar, label: 'Starts', value: '6 December 2026' },
            { icon: Clock, label: 'Early bird', value: '₦10,000' },
            { icon: Video, label: 'Skill level', value: 'Beginner' },
            { icon: MapPin, label: 'Format', value: 'Live classes' },
          ].map((item) => (
            <li key={item.label} className="flex flex-col gap-2 rounded-[22px] border border-line bg-card p-4 tab:p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-ai-tint text-ai-text">
                <Icon as={item.icon} size={20} />
              </span>
              <p className="text-[13px] text-ink-muted">{item.label}</p>
              <p className="text-[15px] font-semibold text-ink tab:text-[17px]">{item.value}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="learn-title">
        <div className="mb-8 flex max-w-[720px] flex-col gap-3">
          <p className={t.kicker}>What you’ll learn</p>
          <h2 id="learn-title" className={t.h2}>Build the skills to create, edit and deliver AI videos</h2>
        </div>
        <ol className="grid grid-cols-1 gap-4 tab:grid-cols-2">
          {modules.map((module, i) => {
            const tone = toneAt(i)
            return (
              <li
                key={module.number}
                className="rounded-[28px] border-[1.5px] border-[var(--tone-text)] p-5 [background:var(--soft)] tab:p-7"
                style={toneVars(tone)}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--tone)] font-mono text-[13px] font-semibold text-white">
                    {module.number}
                  </span>
                  <h3 className="font-display text-[20px] leading-6 font-bold tracking-[-0.02em] text-ink tab:text-[22px]">{module.title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {module.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-[23px] text-ink-soft">
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--tone)] text-white">
                        <Icon as={Check} size={13} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </Section>

      <Section aria-labelledby="examples-title">
        <div className="mb-8 flex flex-col gap-3">
          <p className={t.kicker}>Course possibilities</p>
          <h2 id="examples-title" className={t.h2}>What you could learn to create</h2>
          <p className="max-w-[680px] text-[17px] leading-7 text-ink-soft">
            These examples show the kind of work you’ll be able to create by the end of the course. They are examples, not limits.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-3">
          {videos.map((video) => (
            <figure key={video} className="overflow-hidden rounded-[24px] border border-line bg-card">
              <video
                controls
                playsInline
                preload="metadata"
                className="aspect-[9/16] w-full bg-black object-contain"
                aria-label="Example AI video"
              >
                <source src={`/ai/ai%20videos/${encodeURIComponent(video)}`} type="video/mp4" />
              </video>
              <figcaption className="px-4 py-3 text-[13px] text-ink-muted">AI video creation example</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="register" aria-label="Register for AI Video Creation">
        <div className="grid grid-cols-1 items-start gap-8 tab:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] tab:gap-14">
          <div className="flex flex-col gap-4 tab:sticky tab:top-24">
            <p className={t.kicker}>Reserve your place</p>
            <h2 className={t.h2}>Register for AI Video Creation</h2>
            <p className="text-base leading-[26px] text-ink-soft">
              Complete the form and we’ll show you the next step. You can then message our team on WhatsApp to make your payment and reserve your place.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[20px] border border-line bg-card p-4">
                <p className="text-[13px] text-ink-muted">Early bird</p>
                <p className="mt-1 text-[22px] font-bold text-ink">₦10K</p>
              </div>
              <div className="rounded-[20px] border border-line bg-card p-4">
                <p className="text-[13px] text-ink-muted">Late bird</p>
                <p className="mt-1 text-[22px] font-bold text-ink">₦20K</p>
              </div>
            </div>
          </div>
          <AiRegistrationForm />
        </div>
      </Section>

      <Section aria-label="Questions">
        <FaqSection items={aiFaq} name="faq-ai-video" intro="Quick answers about the AI Video Creation short course." />
      </Section>

      <Container className="pb-14 tab:pb-24">
        <JsonLd data={[
          faqLd(aiFaq),
          breadcrumbLd([
            { name: 'AI Video Creation', path: '/ai' },
          ]),
        ]} />
      </Container>
    </>
  )
}
