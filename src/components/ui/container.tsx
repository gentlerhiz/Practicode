import { cn } from '@/lib/cn'

/** Centres content: 1200 px of content with 40 px gutters on desktop, 16 px on phones (the canvas grid). */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[1280px] px-4 tab:px-10', className)} {...props} />
}
