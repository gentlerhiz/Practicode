import type { ProgrammeId } from '@/content/programmes'
import { cn } from '@/lib/cn'

/** Each programme's flat illustration for its coloured card and banner (decorative). */
export function ProgrammeArt({ id, className }: { id: ProgrammeId; className?: string }) {
  const cls = cn('pointer-events-none absolute', className)
  if (id === 'fe')
    return (
      <svg viewBox="0 0 240 200" aria-hidden="true" className={cls}>
        <rect x="10" y="20" width="220" height="170" rx="20" fill="rgba(255,255,255,0.08)" stroke="rgba(142,162,255,0.5)" strokeWidth="1.5" />
        <circle cx="34" cy="42" r="5" fill="#F0407F" />
        <circle cx="50" cy="42" r="5" fill="#FF8A3D" />
        <circle cx="66" cy="42" r="5" fill="#2FE6B0" />
        <rect x="30" y="66" width="120" height="10" rx="5" fill="#8EA2FF" />
        <rect x="30" y="88" width="170" height="10" rx="5" fill="rgba(255,255,255,0.35)" />
        <rect x="30" y="110" width="90" height="10" rx="5" fill="rgba(255,255,255,0.35)" />
        <rect x="30" y="138" width="80" height="30" rx="10" fill="#FFFFFF" />
      </svg>
    )
  if (id === 'da')
    return (
      <svg viewBox="0 0 240 200" aria-hidden="true" className={cls}>
        <rect x="20" y="110" width="34" height="80" rx="8" fill="rgba(255,255,255,0.18)" />
        <rect x="66" y="80" width="34" height="110" rx="8" fill="rgba(255,255,255,0.28)" />
        <rect x="112" y="96" width="34" height="94" rx="8" fill="rgba(255,255,255,0.18)" />
        <rect x="158" y="44" width="34" height="146" rx="8" fill="#2FE6B0" />
        <path d="M20 80 C60 70 80 40 120 56 S 180 20 220 16" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="220" cy="16" r="8" fill="#FFFFFF" />
      </svg>
    )
  if (id === 'ux')
    return (
      <svg viewBox="0 0 240 200" aria-hidden="true" className={cls}>
        <rect x="40" y="30" width="120" height="150" rx="18" fill="rgba(255,255,255,0.1)" />
        <rect x="90" y="56" width="120" height="130" rx="18" fill="rgba(255,255,255,0.2)" />
        <rect x="108" y="76" width="84" height="40" rx="10" fill="#FFFFFF" />
        <rect x="108" y="126" width="60" height="8" rx="4" fill="#FFFFFF" />
        <rect x="108" y="142" width="44" height="8" rx="4" fill="rgba(255,255,255,0.6)" />
        <path d="M176 132 l0 34 l9 -8 l7 15 l7 -3 l-7 -15 l12 0 z" fill="#07060D" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    )
  if (id === 'cs')
    return (
      <svg viewBox="0 0 240 200" aria-hidden="true" className={cls}>
        <path d="M120 16 L192 44 V100 C192 144 160 172 120 186 C80 172 48 144 48 100 V44 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinejoin="round" />
        <rect x="92" y="88" width="56" height="44" rx="10" fill="#FFFFFF" />
        <path d="M102 88 V76 a18 18 0 0 1 36 0 V88" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <circle cx="120" cy="108" r="6" fill="#0E7490" />
        <rect x="117" y="110" width="6" height="14" rx="3" fill="#0E7490" />
      </svg>
    )
  if (id === 'dm')
    return (
      <svg viewBox="0 0 240 200" aria-hidden="true" className={cls}>
        <path d="M40 120 L150 56 V160 Z" fill="#FFFFFF" />
        <rect x="24" y="104" width="30" height="34" rx="8" fill="rgba(255,255,255,0.35)" />
        <path d="M172 76 C196 88 196 128 172 140" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round" />
        <path d="M190 54 C228 80 228 136 190 162" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="66" cy="166" r="10" fill="#FFD2B0" />
      </svg>
    )
  return (
    <svg viewBox="0 0 240 200" aria-hidden="true" className={cls}>
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="2">
        <path d="M40 40 120 70M40 40 120 130M40 100 120 70M40 100 120 130M40 160 120 70M40 160 120 130M120 70 200 100M120 130 200 100" />
      </g>
      <g fill="rgba(255,255,255,0.85)">
        <circle cx="40" cy="40" r="12" />
        <circle cx="40" cy="100" r="12" />
        <circle cx="40" cy="160" r="12" />
        <circle cx="120" cy="70" r="14" />
        <circle cx="120" cy="130" r="14" />
      </g>
      <circle cx="200" cy="100" r="18" fill="#2FE6B0" />
    </svg>
  )
}
