'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, Moon, Sun } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/cn'
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function useTheme() {
  // Server render and first client render agree; the real theme is read after mount.
  const [theme, setTheme] = useState<Theme | null>(null)
  useEffect(() => {
    // <html> is the source of truth: the boot script set it before first paint, and every switch on the
    // page changes it, so all switches follow it.
    const sync = () => setTheme(read())
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  const flip = () => {
    const next: Theme = read() === 'light' ? 'dark' : 'light'
    const root = document.documentElement
    root.dataset.theme = next
    root.dataset.themePref = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode). The theme still applies for this page.
    }
  }
  return { theme, flip }
}

/** The sun/moon switch: a round button in the header, or a full-width row in the phone menu. */
export function ThemeToggle({ variant = 'icon', className }: { variant?: 'icon' | 'row'; className?: string }) {
  const { theme, flip } = useTheme()
  const isLight = theme === 'light'
  const label = isLight ? 'Switch to dark mode' : 'Switch to light mode'

  if (variant === 'row') {
    return (
      <button
        type="button"
        onClick={flip}
        className={cn(
          'press flex h-[52px] w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-wash px-4 text-[15px] font-medium text-ink hover:border-line-control hover:bg-hover',
          className,
        )}
      >
        <Icon as={isLight ? Moon : Sun} />
        <span>{isLight ? 'Dark mode' : 'Light mode'}</span>
        <Icon as={ChevronRight} size={16} className="ml-auto text-ink-subtle" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={flip}
      aria-label={label}
      title={label}
      className={cn(
        'press inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-control text-ink hover:border-line-strong hover:bg-hover',
        className,
      )}
    >
      <Icon as={isLight ? Moon : Sun} />
    </button>
  )
}
