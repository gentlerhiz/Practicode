import { cn } from '@/lib/cn'
import { Container } from './container'

const spacings = { md: 'py-9 tab:py-16', tight: 'pt-2 pb-6', last: 'pt-10 pb-14 tab:pt-16 tab:pb-24', none: '' } as const

/** A page section inside the content column. `spacing` follows the canvas rhythm (36 px phone, 64 px desktop). */
export function Section({
  spacing = 'md',
  className,
  inner,
  children,
  ...props
}: { spacing?: keyof typeof spacings; inner?: string } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('relative scroll-mt-24', spacings[spacing], className)} {...props}>
      <Container className={inner}>{children}</Container>
    </section>
  )
}
