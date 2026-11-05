/** Formatting and small conversions for the administrator console. Pure: safe anywhere. */

export const naira = (kobo: number | null | undefined) =>
  kobo == null ? '—' : `₦${(kobo / 100).toLocaleString('en-NG', { maximumFractionDigits: 2 })}`

/** Naira typed by a person ("120,000" or "120000.50") to kobo. Returns null for anything else. */
export function nairaToKobo(input: string): number | null {
  const clean = input.replace(/[₦,\s]/g, '')
  if (!/^\d+(\.\d{1,2})?$/.test(clean)) return null
  return Math.round(Number(clean) * 100)
}

export const koboToNairaInput = (kobo: number | null | undefined) => (kobo == null ? '' : String(kobo / 100))

const dateTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Lagos',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})
const dateOnly = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' })

export const when = (iso: string | null | undefined) => (iso ? dateTime.format(new Date(iso)) : '—')
export const day = (isoDate: string | null | undefined) => (isoDate ? dateOnly.format(new Date(`${isoDate.slice(0, 10)}T00:00:00Z`)) : '—')

/**
 * A Nigerian WhatsApp number in the international form wa.me needs: 0803… becomes 234803…, +234 and
 * spaces are dropped. Returns null when there are too few digits to be a number.
 */
export function waNumber(raw: string | null | undefined): string | null {
  if (!raw) return null
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  if (digits.startsWith('0') && digits.length === 11) digits = `234${digits.slice(1)}`
  else if (digits.length === 10 && /^[789]/.test(digits)) digits = `234${digits}`
  return digits.length >= 10 && digits.length <= 15 ? digits : null
}

export const waLink = (raw: string | null | undefined) => {
  const n = waNumber(raw)
  return n ? `https://wa.me/${n}` : null
}

/** Status words for people: "transfer_submitted" reads as "Transfer submitted". */
export const label = (s: string | null | undefined) => (s ? (s.charAt(0).toUpperCase() + s.slice(1)).replace(/_/g, ' ') : '—')
