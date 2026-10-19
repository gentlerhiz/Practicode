import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * The official PractiCode Academy lockup: yellow mark and white text on dark, black on light. Both files
 * load as images; the theme shows one.
 */
export function LogoImage({ className }: { className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- an SVG lockup, sized by its height */}
      <img src="/images/brand/academy-on-dark.svg" alt="PractiCode Academy" className={cn('w-auto [[data-theme=light]_&]:hidden', className)} />
      {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
      <img src="/images/brand/academy-on-light.svg" alt="PractiCode Academy" className={cn('hidden w-auto [[data-theme=light]_&]:block', className)} />
    </>
  )
}

export function Logo({ className, imgClassName }: { className?: string; imgClassName?: string }) {
  return (
    <Link href="/" aria-label="PractiCode Academy home" className={cn('flex shrink-0 items-center', className)}>
      <LogoImage className={imgClassName ?? 'h-[19px] tab:h-[26px]'} />
    </Link>
  )
}
