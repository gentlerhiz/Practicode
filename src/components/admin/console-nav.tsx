'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  CalendarRange,
  ClipboardList,
  CreditCard,
  History,
  LayoutDashboard,
  ListOrdered,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/cn'

const BASE = '/code/administrator/console'

const items = [
  { href: BASE, label: 'Overview', icon: LayoutDashboard },
  { href: `${BASE}/registrations`, label: 'Registrations', icon: ClipboardList },
  { href: `${BASE}/enrolments`, label: 'Enrolments', icon: CreditCard },
  { href: `${BASE}/messages`, label: 'Messages', icon: Mail },
  { href: `${BASE}/waitlist`, label: 'Waitlist', icon: ListOrdered },
  { href: `${BASE}/cohorts`, label: 'Cohorts', icon: CalendarRange },
  { href: `${BASE}/courses`, label: 'Courses and prices', icon: BookOpen },
  { href: `${BASE}/administrators`, label: 'Administrators', icon: ShieldCheck },
  { href: `${BASE}/activity`, label: 'Activity log', icon: History },
] as const

/** The console's section menu: a column on desktop, a scrolling row of tabs on phones. */
export function ConsoleNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Console sections" className="-mx-4 overflow-x-auto px-4 tab:mx-0 tab:overflow-visible tab:px-0">
      <ul className="flex gap-1 tab:flex-col">
        {items.map((item) => {
          const on = item.href === BASE ? pathname === BASE : pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href as Route}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  'flex h-10 items-center gap-2.5 rounded-xl px-3 text-sm font-medium whitespace-nowrap',
                  on ? 'bg-primary text-on-primary' : 'text-ink-soft hover:bg-hover hover:text-ink',
                )}
              >
                <Icon as={item.icon} size={17} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
