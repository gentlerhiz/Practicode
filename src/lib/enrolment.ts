import { z } from 'zod'

/** Every live programme costs the same. Amounts are in kobo, as Paystack takes them. */
export const COURSE_FEE_KOBO = 80_000 * 100
/** SIWES and IT students pay half the tuition... */
export const SIWES_FEE_KOBO = COURSE_FEE_KOBO / 2
/** ...plus this administrative fee, paid on resumption (never charged online). */
export const SIWES_ADMIN_FEE_NAIRA = 10_000

export const feeKobo = (siwes: boolean) => (siwes ? SIWES_FEE_KOBO : COURSE_FEE_KOBO)

export const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString('en-NG')}`

export const ENROLLABLE = ['fe', 'da', 'ux'] as const
export type Enrollable = (typeof ENROLLABLE)[number]

export const LEVELS = ['100', '200', '300', '400', '500', 'ND1', 'ND2', 'HND1', 'HND2'] as const

const trimmed = (max: number) => z.string().trim().max(max)
// Nigerian numbers in any common form: 0803..., +234 803..., 234803...
const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ''))
  .pipe(z.string().regex(/^(\+?234|0)[789]\d{9}$/, 'Enter a WhatsApp number like 0803 000 0000.'))

export const EnrolFields = z
  .object({
    email: z.email('Enter an email address like you@example.com.').max(254),
    fullName: trimmed(120).min(2, 'Enter your full name as it should appear on your certificate.'),
    whatsapp: phone,
    course: z.enum(ENROLLABLE, 'Choose a programme.'),
    siwes: z.enum(['yes', 'no']).transform((v) => v === 'yes'),
    matric: trimmed(40).optional(),
    level: z.enum(LEVELS).optional().or(z.literal('').transform(() => undefined)),
    method: z.enum(['paystack', 'transfer'], 'Choose how you’ll pay.'),
    transferId: trimmed(80).optional(),
    confirm: z.literal('on', 'Please confirm your details are accurate.'),
  })
  .superRefine((v, ctx) => {
    if (v.siwes && !v.matric) ctx.addIssue({ code: 'custom', path: ['matric'], message: 'Enter your matric number.' })
    if (v.siwes && !v.level) ctx.addIssue({ code: 'custom', path: ['level'], message: 'Choose your level.' })
  })
export type EnrolInput = z.output<typeof EnrolFields>

export const MessageFields = z.object({
  topic: z.enum(['programmes', 'siwes', 'partner', 'other']),
  name: trimmed(120).min(2, 'Enter your name.'),
  email: z.email('Enter an email address like you@example.com.').max(254),
  whatsapp: z.union([z.literal(''), phone]).optional(),
  message: trimmed(4000).min(5, 'Tell us a little more.'),
})

export const WaitlistFields = z.object({
  course: z.literal('ai'),
  name: trimmed(120).min(2, 'Enter your name.'),
  email: z.email('Enter an email address like you@example.com.').max(254),
  whatsapp: z.union([z.literal(''), phone]).optional(),
})

/** Field errors keyed by field name, the first message for each. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    out[key] ??= issue.message
  }
  return out
}

/** Uploads: PDF or image, up to 4 MB, checked by their first bytes as well as their declared type. */
export const UPLOAD_MAX_BYTES = 4 * 1024 * 1024
const SIGNATURES: { type: string; ext: string; test: (b: Uint8Array) => boolean }[] = [
  { type: 'application/pdf', ext: 'pdf', test: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
  { type: 'image/jpeg', ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { type: 'image/png', ext: 'png', test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { type: 'image/webp', ext: 'webp', test: (b) => b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 },
]
export function sniffUpload(bytes: Uint8Array): { type: string; ext: string } | null {
  const hit = SIGNATURES.find((s) => s.test(bytes))
  return hit ? { type: hit.type, ext: hit.ext } : null
}

/** What Paystack reported for a charge. */
export type PaystackTx = { reference: string; status: string; amount: number; currency: string; channel?: string | null; paid_at?: string | null }

/**
 * Whether a charge pays for an enrolment: Paystack must say it succeeded, in naira, for at least the fee,
 * with our reference. Never trust the browser's word for it.
 */
export function chargeCovers(tx: PaystackTx, enrolment: { paystack_reference: string | null; amount_kobo: number }): boolean {
  return (
    tx.status === 'success' &&
    tx.currency === 'NGN' &&
    tx.reference === enrolment.paystack_reference &&
    tx.amount >= enrolment.amount_kobo
  )
}

/** A payment reference people can read out on the phone: PCA- and ten letters and digits. */
export function newReference(random: (n: number) => Uint8Array): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = random(10)
  let out = ''
  for (const b of bytes) out += alphabet[b % alphabet.length]
  return `PCA-${out.slice(0, 5)}-${out.slice(5)}`
}
