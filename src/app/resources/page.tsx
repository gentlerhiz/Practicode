import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChartPie, Code, Frame, GitBranch, Image as ImageIcon, Laptop, NotebookPen, Rocket } from 'lucide-react'
import { BookFinder } from '@/components/site/book-finder'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { PillWord } from '@/components/ui/pill-word'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'
import { toneBg, toneClass } from '@/lib/tone'

export const metadata = pageMeta({
  title: 'Free Resources for Learning Tech',
  description: 'Free reference books on HTML, JavaScript, Python, SQL, Git and more, the free tools we teach with, and a free module on PractiCode Learn.',
  path: '/resources',
})

const tools: { name: string; price: string; use: string; href: string; icon: typeof Code; tone: Tone }[] = [
  { name: 'VS Code', price: 'Free', use: 'The code editor for Front-End.', href: 'https://code.visualstudio.com', icon: Code, tone: 'fe' },
  { name: 'Git and GitHub', price: 'Free', use: 'Save your work and share it.', href: 'https://github.com', icon: GitBranch, tone: 'fe' },
  { name: 'Netlify', price: 'Free plan', use: 'Put your sites online.', href: 'https://www.netlify.com', icon: Rocket, tone: 'fe' },
  { name: 'Power BI Desktop', price: 'Free', use: 'Build dashboards in Data Analysis.', href: 'https://www.microsoft.com/en-us/power-platform/products/power-bi/desktop', icon: ChartPie, tone: 'da' },
  { name: 'Figma and FigJam', price: 'Free plan', use: 'Design and prototype in UI/UX.', href: 'https://www.figma.com', icon: Frame, tone: 'ux' },
  { name: 'Unsplash', price: 'Free', use: 'Free photos for your designs.', href: 'https://unsplash.com', icon: ImageIcon, tone: 'ux' },
]

export default function ResourcesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center gap-7 px-4 pt-8 pb-4 tab:gap-14 tab:px-10 tab:pt-[72px] tab:pb-8">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
            <p className={cn(t.kicker, 'text-ai-text')}>Free resources</p>
            <h1 className="font-display text-[42px] leading-[50px] font-extrabold tracking-[-0.035em] text-ink tab:text-[72px] tab:leading-[82px]">
              Keep learning, <PillWord tone="ai">for free.</PillWord>
            </h1>
            <p className="max-w-[600px] text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">
              Free reference books, the free tools we teach with, and a free module on PractiCode Learn. Use them before, during or after a class.
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5 rounded-[28px] border border-banner-border p-[22px] text-white tab:rotate-1 tab:p-8" style={toneBg.banner('fe')}>
            <div className="flex items-center gap-3">
              <Tile icon={Laptop} size={48} />
              <span className="rounded-full bg-white px-3 py-[5px] text-xs font-bold text-[#15122a]">Free</span>
            </div>
            <h2 className="font-display text-[26px] leading-8 font-extrabold tracking-[-0.025em]">Module 1 of Front-End on PractiCode Learn</h2>
            <p className="text-[15px] leading-6 text-white/90">Short lessons that run in your browser, with code you write and check yourself.</p>
            <a href={site.learn} className="press inline-flex h-[46px] items-center gap-2 self-start rounded-full bg-white px-5 text-[15px] font-semibold text-[#1f33a8]">
              Start Module 1
              <Icon as={ArrowUpRight} size={16} />
            </a>
          </div>
        </div>
      </section>

      <Section aria-labelledby="books-title">
        <BookFinder />
      </Section>

      <Section aria-labelledby="tools-title">
        <div className="rounded-[32px] border border-line px-5 py-6 tab:p-12" style={toneBg.soft('da')}>
          <div className="mb-7 flex max-w-[640px] flex-col gap-2.5">
            <p className={cn(t.kicker, toneClass.da.text)}>Set up before your first class</p>
            <h2 id="tools-title" className={t.h2}>
              Free tools we teach with
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-3 tab:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.name}>
                <a href={tool.href} className="flex items-center gap-3.5 rounded-[20px] border border-line bg-card p-4 hover:border-line-strong">
                  <Tile icon={tool.icon} tone={tool.tone} size={44} />
                  <span className="flex min-w-0 grow flex-col gap-[3px]">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-ink">{tool.name}</span>
                      <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-semibold', toneClass[tool.tone].tint, toneClass[tool.tone].text)}>{tool.price}</span>
                    </span>
                    <span className="text-[13px] leading-5 text-ink-muted">{tool.use}</span>
                  </span>
                  <Icon as={ArrowUpRight} size={16} className="shrink-0 text-ink-muted" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <Link href="/blog" className="flex flex-wrap items-center gap-5 rounded-[28px] border border-line p-[22px] hover:border-line-strong tab:px-8 tab:py-7" style={toneBg.soft('ux')}>
          <Tile icon={NotebookPen} tone="ux" size={56} />
          <span className="flex min-w-0 flex-[1_1_320px] flex-col gap-1">
            <span className="text-[19px] font-semibold text-ink">News and guides on our blog</span>
            <span className="text-[15px] leading-6 text-ink-muted">Academy news now, with tutorials and SIWES guides on the way.</span>
          </span>
          <span className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-[22px] text-[15px] font-semibold text-on-primary tab:w-auto">
            Read the Blog
            <Icon as={ArrowRight} size={16} />
          </span>
        </Link>
      </Section>

      <Section spacing="last" className="tab:pt-8">
        <CtaBand title="Learn faster with an instructor." text="Join a class in Ibadan or online, and get feedback on what you build every week." />
      </Section>
      <JsonLd data={breadcrumbLd([{ name: 'Resources', path: '/resources' }])} />
    </>
  )
}
