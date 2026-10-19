/** The canvas type scale, as class strings. Bricolage Grotesque for headings, in sentence case. */
export const display = 'font-display font-extrabold tracking-[-0.035em] text-ink'

export const type = {
  hero: `${display} text-[40px] leading-[46px] tab:text-[72px] tab:leading-[80px]`,
  h1: `${display} text-[40px] leading-[46px] tab:text-[64px] tab:leading-[70px]`,
  h2: `${display} text-[30px] leading-[34px] tab:text-[44px] tab:leading-[48px]`,
  h2sm: `${display} text-[28px] leading-8 tab:text-[34px] tab:leading-[38px]`,
  h3: 'font-display text-[22px] leading-7 font-bold tracking-[-0.02em] text-ink',
  lead: 'text-base leading-[26px] text-ink-soft tab:text-lg tab:leading-[30px]',
  kicker: 'text-sm font-semibold',
} as const
