import type { Route } from 'next'
import { GraduationCap, MessageCircle, Newspaper, NotebookPen, Stamp, Users, type LucideIcon } from 'lucide-react'
import type { Tone } from './programmes'

export type NavItem = { label: string; href: Route; note: string; icon: LucideIcon; tone: Tone }

export const mainNav: NavItem[] = [
  { label: 'Programmes', href: '/programmes', note: 'Front-End, Data Analysis, UI/UX', icon: GraduationCap, tone: 'fe' },
  { label: 'SIWES', href: '/siwes', note: 'Industrial training with us', icon: Stamp, tone: 'da' },
  { label: 'Resources', href: '/resources', note: 'Free notes and tools', icon: Newspaper, tone: 'ai' },
  { label: 'Blog', href: '/blog', note: 'Guides and academy news', icon: NotebookPen, tone: 'ux' },
  { label: 'About', href: '/about', note: 'Our story and team', icon: Users, tone: 'fe' },
  { label: 'Contact', href: '/contact', note: 'WhatsApp, call or visit', icon: MessageCircle, tone: 'da' },
]
