import type { Tone } from '@/content/programmes'

/**
 * Each programme colour's utility classes, written out in full so Tailwind finds them. Fills carry white
 * text in both themes; `ink` is the deep shade used for text on white buttons over a coloured card.
 */
export const toneClass: Record<Tone, { fill: string; text: string; tint: string; border: string; ink: string }> = {
  fe: { fill: 'bg-fe', text: 'text-fe-text', tint: 'bg-fe-tint', border: 'border-fe-text', ink: 'text-[#1f33a8]' },
  da: { fill: 'bg-da', text: 'text-da-text', tint: 'bg-da-tint', border: 'border-da-text', ink: 'text-[#05503b]' },
  ux: { fill: 'bg-ux', text: 'text-ux-text', tint: 'bg-ux-tint', border: 'border-ux-text', ink: 'text-[#8f1745]' },
  ai: { fill: 'bg-ai', text: 'text-ai-text', tint: 'bg-ai-tint', border: 'border-ai-text', ink: 'text-[#3a20b0]' },
}

/** Inline backgrounds: the programme card gradient, the page-hero banner and the tinted "soft" card. */
export const toneBg = {
  card: (t: Tone) => ({ background: `var(--pc-card-${t})` }),
  banner: (t: Tone) => ({ background: `var(--pc-banner-${t})` }),
  soft: (t: Tone) => ({ background: `var(--pc-soft-${t})` }),
}

export const TONES: Tone[] = ['fe', 'da', 'ux', 'ai']
/** Cycles the four colours for lists of icon tiles. */
export const toneAt = (i: number): Tone => TONES[i % TONES.length]!

const FILL: Record<Tone, string> = { fe: '#3d5af5', da: '#0a7d5c', ux: '#d9306f', ai: '#6e4cf5' }

/**
 * A programme colour as CSS variables, for styles that change with state (open, selected). Classes read
 * them as bg-[var(--tone)], text-[var(--tone-text)], border-[var(--tone-text)] and [background:var(--soft)].
 */
export const toneVars = (t: Tone): React.CSSProperties =>
  ({
    '--tone': FILL[t],
    '--tone-text': `var(--pc-${t}-text)`,
    '--tone-tint': `var(--pc-${t}-tint)`,
    '--soft': `var(--pc-soft-${t})`,
  }) as React.CSSProperties
