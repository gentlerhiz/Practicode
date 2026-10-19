import 'server-only'

const blank = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined)

/**
 * Server secrets, read when used. A missing secret switches off only the feature that needs it: the
 * forms then point people to WhatsApp instead of failing.
 */
export const serverEnv = {
  get supabaseUrl() {
    return blank(process.env.NEXT_PUBLIC_SUPABASE_URL)
  },
  get supabaseSecret() {
    return blank(process.env.SUPABASE_SECRET_KEY)
  },
  get paystackSecret() {
    const key = blank(process.env.PAYSTACK_SECRET_KEY)
    return key && /^sk_(test|live)_/.test(key) ? key : undefined
  },
  get resendKey() {
    return blank(process.env.RESEND_API_KEY)
  },
  get inbox() {
    return blank(process.env.ACADEMY_INBOX) ?? 'practicodeacademy@gmail.com'
  },
  get emailFrom() {
    return blank(process.env.EMAIL_FROM) ?? 'PractiCode Academy <academy@practicode.tech>'
  },
}

/** True when enrolments, messages and the waitlist can be saved. */
export const canStore = () => Boolean(serverEnv.supabaseUrl && serverEnv.supabaseSecret)

/**
 * Online payment is offered only with a live key in production. A test key on the live site would let
 * Paystack's test cards "pay", so students pay by bank transfer until a live key is set (or
 * PAYSTACK_ALLOW_TEST=1 is set on purpose).
 */
export function paystackEnabled(): boolean {
  const key = serverEnv.paystackSecret
  if (!key) return false
  if (key.startsWith('sk_live_')) return true
  return process.env.VERCEL_ENV !== 'production' || process.env.PAYSTACK_ALLOW_TEST === '1'
}
