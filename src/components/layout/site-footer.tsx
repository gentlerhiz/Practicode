import type { Route } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Tile } from '@/components/ui/tile'
import { programmes } from '@/content/programmes'
import { site } from '@/lib/site'
import { LogoImage } from './logo'

const columns: { title: string; links: { label: string; href: Route }[] }[] = [
  {
    title: 'Programmes',
    links: [
      { label: 'All Programmes', href: '/programmes' },
      ...programmes.map((p) => ({ label: p.title, href: `/programmes/${p.slug}` as Route })),
      { label: 'SIWES / IT', href: '/siwes' },
    ],
  },
  {
    title: 'Academy',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Enrol', href: '/enrol' },
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line-subtle bg-bg">
      <div className="mx-auto max-w-[1280px] px-4 pt-12 pb-8 tab:px-10 tab:pt-16 tab:pb-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 tab:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 flex flex-col gap-[18px] tab:col-span-1">
            <Link href="/" aria-label="PractiCode Academy home" className="self-start">
              <LogoImage className="h-6" />
            </Link>
            <p className="max-w-[300px] text-sm leading-[22px] text-ink-muted">
              Practical tech classes in Ibadan and live online, since 2023. Learn the skills employers are hiring for.
            </p>
            <ul className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="block rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink hover:bg-hover">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex min-w-0 flex-col gap-3">
              <h2 className="mb-1 text-sm font-semibold text-ink">{col.title}</h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm leading-5 text-ink-muted hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 flex flex-col gap-3.5 tab:col-span-1">
            <h2 className="mb-1 text-sm font-semibold text-ink">Visit or Call</h2>
            <p className="flex items-start gap-3 text-sm leading-5 text-ink-muted">
              <Tile icon={MapPin} tone="fe" size={32} />
              {site.address.full}
            </p>
            <p className="flex items-start gap-3 text-sm leading-5 text-ink-muted">
              <Tile icon={Phone} tone="da" size={32} />
              {site.phones.join(' · ')}
            </p>
            <p className="flex items-start gap-3 text-sm leading-5 text-ink-muted">
              <Tile icon={Mail} tone="ux" size={32} />
              <a href={`mailto:${site.email}`} className="hover:text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line-subtle pt-6 text-[13px] leading-5 text-ink-subtle">
          <p>
            © 2026 {site.publisher} · Company registration no. {site.companyNumber}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <a href={site.learn} className="hover:text-ink">
              PractiCode Learn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
