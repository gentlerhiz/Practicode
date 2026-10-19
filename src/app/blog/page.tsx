import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, NotebookPen } from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { formatDate, posts } from '@/content/blog'
import { breadcrumbLd, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Blog',
  description: 'News, guides and tutorials from PractiCode Academy’s classrooms in Ibadan.',
  path: '/blog',
})

function TeamAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full border border-line bg-[#15122a] font-mono text-[11px] font-semibold text-yellow"
      style={{ width: size, height: size }}
    >
      PA
    </span>
  )
}

export default function BlogPage() {
  const [featured, ...rest] = posts
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-3 px-4 pt-7 pb-5 tab:px-10 tab:pt-14 tab:pb-7">
          <h1 className="font-display text-[40px] leading-[46px] font-extrabold tracking-[-0.035em] text-ink tab:text-[64px] tab:leading-[70px]">Blog</h1>
          <p className="text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]">News, guides and tutorials from our classrooms in Ibadan.</p>
        </div>
      </section>

      {featured && (
        <Section spacing="none" className="pt-2 pb-2 tab:pt-4" aria-label="Latest post">
          <Link
            href={`/blog/${featured.slug}` as Route}
            className="flex flex-wrap overflow-hidden rounded-[32px] border border-line hover:border-line-strong"
            style={{ background: 'var(--pc-soft-ux)' }}
          >
            <div className="relative h-[220px] min-w-0 flex-[1.2_1_480px] tab:h-auto tab:min-h-[420px]">
              <Image src={featured.image.src} alt={featured.image.alt} fill sizes="(min-width: 960px) 640px, 100vw" className="object-cover" priority />
              <span className="absolute top-4 left-4 rounded-full bg-yellow px-3 py-1.5 text-[13px] font-bold text-[#07060d]">Latest</span>
            </div>
            <div className="flex min-w-0 flex-[1_1_400px] flex-col justify-center gap-3.5 p-[22px] tab:p-12">
              <span className="self-start rounded-full bg-ux-tint px-2.5 py-1 text-xs font-semibold text-ux-text">{featured.category}</span>
              <h2 className="font-display text-[28px] leading-[34px] font-extrabold tracking-[-0.035em] text-ink tab:text-[38px] tab:leading-[44px]">{featured.title}</h2>
              <p className="text-base leading-[26px] text-ink-soft">{featured.excerpt}</p>
              <div className="mt-1 flex items-center gap-3">
                <TeamAvatar size={40} />
                <span className="flex flex-col gap-px">
                  <span className="text-sm font-semibold text-ink">{featured.author}</span>
                  <span className="text-[13px] text-ink-muted">
                    {formatDate(featured.date)} · {featured.readMinutes} min read
                  </span>
                </span>
              </div>
              <span className="mt-2 inline-flex h-12 items-center gap-2 self-start rounded-full bg-primary px-[22px] text-[15px] font-semibold text-on-primary">
                Read the Post
                <Icon as={ArrowRight} size={16} />
              </span>
            </div>
          </Link>
        </Section>
      )}

      <Section aria-label="More posts">
        <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3 tab:gap-6">
          {rest.map((p) => (
            <li key={p.slug} className="flex min-w-0">
              <Link href={`/blog/${p.slug}` as Route} className="flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-card hover:border-line-strong">
                <Image src={p.image.src} alt={p.image.alt} width={800} height={500} sizes="(min-width: 960px) 400px, 100vw" className="h-[180px] w-full object-cover tab:h-[200px]" />
                <div className="flex grow flex-col gap-2.5 p-5">
                  <span className="self-start rounded-full bg-ux-tint px-2.5 py-1 text-xs font-semibold text-ux-text">{p.category}</span>
                  <h2 className="font-display text-[21px] leading-[27px] font-bold tracking-[-0.015em] text-ink">{p.title}</h2>
                  <p className="text-sm leading-[22px] text-ink-muted">{p.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2.5 pt-2.5">
                    <TeamAvatar />
                    <span className="text-[13px] text-ink-muted">
                      <span className="font-semibold text-ink">{p.author}</span> · {formatDate(p.date)}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          <li className="flex flex-col justify-center gap-3 rounded-3xl border border-dashed border-line-control p-6">
            <Tile icon={NotebookPen} tone="fe" size={44} />
            <p className="text-lg font-semibold text-ink">More on the way</p>
            <p className="text-sm leading-[22px] text-ink-muted">
              Guides from our instructors and tips for SIWES students are coming soon. Follow us on Instagram or LinkedIn to see them first.
            </p>
          </li>
        </ul>
      </Section>

      <Section spacing="last" className="tab:pt-8">
        <CtaBand title="Reading is good. Building is better." text="Join a class in Ibadan or online, and build something real every week." label="See Programmes" href="/programmes" />
      </Section>
      <JsonLd data={breadcrumbLd([{ name: 'Blog', path: '/blog' }])} />
    </>
  )
}
