import type { Metadata, Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Laptop } from 'lucide-react'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { Icon } from '@/components/ui/icon'
import { Section } from '@/components/ui/section'
import { Tile } from '@/components/ui/tile'
import { findPost, formatDate, posts } from '@/content/blog'
import { articleLd, breadcrumbLd, pageMeta } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export const dynamicParams = false
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const post = findPost((await params).slug)
  if (!post) return {}
  const meta = pageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` })
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: post.date, images: [{ url: post.image.src, alt: post.image.alt }] } }
}

export default async function PostPage({ params }: PageProps<'/blog/[slug]'>) {
  const post = findPost((await params).slug)
  if (!post) notFound()
  const url = absoluteUrl(`/blog/${post.slug}`)
  const share = [
    { short: 'WA', label: 'Share on WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { short: 'X', label: 'Share on X', href: `https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}` },
    { short: 'in', label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  ]
  const toc = post.body.filter((b) => b.type === 'h2')
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-wash" />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-[18px] px-4 pt-7 pb-7 text-center tab:px-10 tab:pt-16 tab:pb-11">
          <nav aria-label="Breadcrumb" className="flex flex-wrap justify-center gap-2 text-[13px] text-ink-muted">
            <Link href="/blog" className="underline-offset-2 hover:underline">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{post.category}</span>
          </nav>
          <span className="rounded-full bg-ux-tint px-3 py-[5px] text-[13px] font-semibold text-ux-text">{post.category}</span>
          <h1 className="font-display text-[34px] leading-10 font-extrabold tracking-[-0.035em] text-ink tab:text-[56px] tab:leading-[62px]">{post.title}</h1>
          <p className="max-w-[680px] text-base leading-[26px] text-ink-soft tab:text-[19px] tab:leading-[31px]">{post.excerpt}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3 text-left">
              <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border border-line bg-[#15122a] font-mono text-xs font-semibold text-yellow">
                PA
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold text-ink">{post.author}</span>
                <span className="text-[13px] text-ink-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
                </span>
              </span>
            </div>
            <ul aria-label="Share this post" className="flex gap-2">
              {share.map((s) => (
                <li key={s.short}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-line-control font-mono text-xs font-semibold text-ink hover:bg-hover"
                  >
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 tab:px-10">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          width={1400}
          height={700}
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-[220px] w-full rounded-[32px] border border-line object-cover tab:h-[460px]"
        />
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-start gap-6 px-4 py-8 tab:gap-16 tab:px-10 tab:py-14">
        <article className="prose-pc flex max-w-[760px] min-w-0 flex-[999_1_560px] flex-col gap-[22px]">
          {post.body.map((b, i) =>
            b.type === 'p' ? (
              <p key={i}>{b.text}</p>
            ) : b.type === 'h2' ? (
              <h2 key={i} id={b.id} className="scroll-mt-28">
                {b.text}
              </h2>
            ) : (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            ),
          )}
        </article>
        <aside aria-label="On this page" className="flex min-w-0 flex-[1_1_260px] flex-col gap-4 tab:sticky tab:top-32 tab:max-w-[300px]">
          {toc.length > 0 && (
            <nav aria-label="Sections" className="flex flex-col gap-0.5 rounded-[22px] border border-line bg-card p-[18px]">
              <p className="mb-1.5 text-[13px] font-semibold text-ink-muted">On this page</p>
              {toc.map((h) =>
                h.type === 'h2' ? (
                  <a key={h.id} href={`#${h.id}`} className="rounded-xl px-3 py-2 text-sm text-ink-muted hover:bg-hover hover:text-ink">
                    {h.text}
                  </a>
                ) : null,
              )}
            </nav>
          )}
          <div className="hidden flex-col gap-2.5 rounded-[22px] bg-[linear-gradient(150deg,#0a7d5c_0%,#3d5af5_100%)] p-[22px] text-white tab:flex">
            <Tile icon={Laptop} size={44} />
            <p className="text-[17px] font-semibold">Try it in your browser</p>
            <p className="text-sm leading-[22px] text-white/85">Module 1 of Front-End is free on PractiCode Learn.</p>
            <a href={site.learn} className="mt-1 flex h-11 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-[#07060d]">
              Open PractiCode Learn
              <Icon as={ArrowUpRight} size={14} />
            </a>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <Section aria-labelledby="more-title" className="pt-0 tab:pt-0">
          <h2 id="more-title" className="mb-6 font-display text-[28px] leading-8 font-extrabold tracking-[-0.035em] text-ink tab:text-[38px] tab:leading-[42px]">
            Keep reading
          </h2>
          <ul className="grid grid-cols-1 gap-4 tab:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug} className="flex min-w-0">
                <Link
                  href={`/blog/${p.slug}` as Route}
                  className="flex min-h-[180px] w-full flex-col gap-3 rounded-[22px] border border-line p-[22px] hover:border-line-strong"
                  style={{ background: 'var(--pc-soft-ux)' }}
                >
                  <span className="self-start rounded-full bg-ux-tint px-2.5 py-1 text-xs font-semibold text-ux-text">{p.category}</span>
                  <span className="font-display text-xl leading-[26px] font-bold tracking-[-0.015em] text-ink">{p.title}</span>
                  <span className="mt-auto text-[13px] text-ink-muted">
                    {p.author} · {p.readMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section spacing="last" className="pt-0 tab:pt-0">
        <CtaBand title="Learn with us." text="Join a class in Ibadan or online, and build something real every week." label="See Programmes" href="/programmes" />
      </Section>
      <JsonLd
        data={[
          articleLd({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, date: post.date, author: post.author, image: post.image.src }),
          breadcrumbLd([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
        ]}
      />
    </>
  )
}
