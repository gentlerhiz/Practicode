'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { Tile } from '@/components/ui/tile'
import { mainNav } from '@/content/nav'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`)

/** The announcement bar, the main navigation and, on phones, the menu sheet. */
export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Close the menu when the page changes (adjusting state during render, as React recommends).
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line-subtle bg-bg/90 backdrop-blur-md">
      <Link
        href="/enrol"
        className="block bg-[linear-gradient(90deg,#3d5af5_0%,#6e4cf5_50%,#d9306f_100%)] px-4 py-[9px] text-center text-[13px] font-medium text-white tab:text-sm"
      >
        Classes are enrolling now, in Ibadan and online.{' '}
        <span className="font-bold underline underline-offset-2">Enrol now →</span>
      </Link>

      <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-2 px-4 tab:h-[84px] tab:gap-7 tab:px-10">
        <Logo className="grow tab:grow-0" />
        <ul className="hidden grow items-center justify-center gap-0.5 tab:flex">
          {mainNav.map((item) => {
            const on = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={on ? 'page' : undefined}
                  className={cn(
                    'rounded-full border px-3.5 py-2.5 text-[15px] font-medium',
                    on ? 'border-line bg-card text-ink' : 'border-transparent text-ink-soft hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <ThemeToggle />
        <a href={site.learn} className="hidden px-1 py-2.5 text-sm font-medium whitespace-nowrap text-ink-soft hover:text-ink tab:block">
          PractiCode Learn
        </a>
        <Link
          href="/enrol"
          className="press hidden h-[46px] items-center rounded-full bg-primary px-[22px] text-[15px] font-semibold whitespace-nowrap text-on-primary hover:opacity-90 tab:flex"
        >
          Enrol Now
        </Link>
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="phone-menu"
          onClick={() => setOpen(!open)}
          className={cn(
            'press inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border tab:hidden',
            open ? 'border-transparent bg-primary text-on-primary' : 'border-line-control text-ink',
          )}
        >
          <Icon as={open ? X : Menu} size={20} />
        </button>
      </nav>

      {open && (
        <div id="phone-menu" className="h-[calc(100dvh-104px)] overflow-y-auto border-t border-line-subtle bg-bg tab:hidden">
          <div className="flex flex-col gap-5 px-4 pt-2 pb-8">
            <ul className="flex flex-col gap-2">
              {mainNav.map((item) => {
                const on = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={on ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3.5 rounded-[18px] border p-3 text-ink',
                        on ? 'border-line bg-card' : 'border-transparent',
                      )}
                    >
                      <Tile icon={item.icon} tone={item.tone} size={42} />
                      <span className="flex grow flex-col gap-0.5">
                        <span className="text-base font-semibold">{item.label}</span>
                        <span className="text-[13px] text-ink-muted">{item.note}</span>
                      </span>
                      <Icon as={ChevronRight} className="text-ink-muted" />
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/enrol"
                className="press flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-primary font-semibold text-on-primary"
              >
                Enrol Now
                <Icon as={ArrowRight} />
              </Link>
              <a
                href={site.learn}
                className="flex h-12 items-center justify-center rounded-full border border-line-control text-sm font-semibold text-ink"
              >
                Learn at Your Own Pace on PractiCode Learn
              </a>
              <ThemeToggle variant="row" />
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line-subtle pt-4">
              <a href={site.whatsapp} className="rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink">
                WhatsApp
              </a>
              <a href={site.tel} className="rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink">
                Call 0903 057 8667
              </a>
              <Link href="/faq" className="rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
