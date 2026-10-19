import { createHash } from 'node:crypto'
// Relative import: next.config.ts loads this file, and its loader doesn't resolve the @/ alias.
import { THEME_BOOT_SCRIPT } from '../theme'

export const themeScriptHash = () =>
  `'sha256-${createHash('sha256').update(THEME_BOOT_SCRIPT).digest('base64')}'`

/**
 * One policy for every page. Static pages can't carry a per-request nonce and Next.js needs inline
 * scripts, so scripts are limited to this site plus inline ones (as on PractiCode Learn's static pages).
 */
export function buildCsp({ dev }: { dev: boolean }): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "frame-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    // The enrolment form redirects to Paystack's checkout; Chrome applies form-action to that redirect.
    "form-action 'self' https://checkout.paystack.com",
    "frame-ancestors 'none'",
  ].join('; ')
}

export const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]
