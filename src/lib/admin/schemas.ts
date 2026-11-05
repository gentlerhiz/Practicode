import { z } from 'zod'
import { nairaToKobo } from './format'
import {
  ATTENDANCE,
  COURSE_IDS,
  ENROL_COURSE_IDS,
  ENROLMENT_STATUSES,
  MESSAGE_TOPICS,
  METHODS,
  REGISTRATION_STATUSES,
} from './types'

/**
 * Zod schemas for everything the console accepts: form fields, list filters and sign-in. Lengths and
 * choices match the check constraints in supabase/academy.sql and academy-002-cohorts.sql.
 */

const text = (min: number, max: number, what: string) =>
  z.string(`Enter ${what}.`).trim().min(min, `Enter ${what}.`).max(max, `Keep ${what} under ${max + 1} characters.`)

/** Optional text: blank becomes null. */
const optText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Keep this under ${max + 1} characters.`)
    .optional()
    .transform((v) => (v ? v : null))

/** A checkbox: present ("on") is true, absent is false. */
const checkbox = z
  .enum(['on', 'true'])
  .optional()
  .transform((v) => v !== undefined)

export const Email = z.string().trim().toLowerCase().pipe(z.email('Enter an email address like you@example.com.').max(254))
export const Uuid = z.uuid('That record id is not valid.')
const phone = z
  .string()
  .trim()
  .min(7, 'Enter a WhatsApp number of 7 to 20 characters.')
  .max(20, 'Enter a WhatsApp number of 7 to 20 characters.')
  .regex(/^[+\d\s()-]+$/, 'Use digits, spaces and + only.')

/** Naira typed by a person, stored in kobo. Fits Postgres integer. */
const nairaAmount = (what: string) =>
  z
    .string()
    .trim()
    .transform((v, ctx) => {
      const kobo = nairaToKobo(v)
      if (kobo === null || kobo <= 0 || kobo > 2_000_000_000) {
        ctx.addIssue({ code: 'custom', message: `Enter ${what} in naira, such as 120000.` })
        return z.NEVER
      }
      return kobo
    })
const optNaira = (what: string) =>
  z
    .string()
    .trim()
    .optional()
    .transform((v, ctx) => {
      if (!v) return null
      const kobo = nairaToKobo(v)
      if (kobo === null || kobo <= 0 || kobo > 2_000_000_000) {
        ctx.addIssue({ code: 'custom', message: `Enter ${what} in naira, or leave it blank.` })
        return z.NEVER
      }
      return kobo
    })

/* Sign-in */

export const CodeRequest = z.object({ email: Email })
export const CodeEntry = z.object({
  email: Email,
  code: z
    .string()
    .transform((v) => v.replace(/\s+/g, ''))
    .pipe(z.string().regex(/^\d{6}$/, 'Enter the six-digit code from the email.')),
})

/* Records */

export const RegistrationEdit = z.object({
  id: Uuid,
  cohort_id: Uuid,
  full_name: text(2, 120, 'a full name'),
  email: Email,
  whatsapp: phone,
  course: z.enum(COURSE_IDS, 'Choose a course.'),
  attendance: z.enum(ATTENDANCE, 'Choose in person or online.'),
  city: text(2, 80, 'a city'),
  state: text(2, 80, 'a state'),
  siwes: checkbox,
  heard_from: optText(80),
  consent: checkbox,
  status: z.enum(REGISTRATION_STATUSES, 'Choose a status.'),
  notes: optText(4000),
})

export const EnrolmentEdit = z.object({
  id: Uuid,
  cohort_id: Uuid,
  full_name: text(2, 120, 'a full name'),
  email: Email,
  whatsapp: phone,
  course: z.enum(ENROL_COURSE_IDS, 'Choose a course.'),
  siwes: checkbox,
  matric_number: optText(40),
  level: optText(20),
  method: z.enum(METHODS, 'Choose a payment method.'),
  amount: nairaAmount('the amount due'),
  status: z.enum(ENROLMENT_STATUSES, 'Choose a status.'),
  transfer_id: optText(80),
  paid_amount: optNaira('the amount paid'),
  paid_channel: optText(40),
  notes: optText(4000),
})

export const EnrolmentQuick = z.object({ id: Uuid, to: z.enum(['confirmed', 'paid', 'cancelled']) })

export const IdOnly = z.object({ id: Uuid })

const isoDate = z
  .string()
  .trim()
  .optional()
  .transform((v, ctx) => {
    if (!v) return null
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(`${v}T00:00:00Z`))) {
      ctx.addIssue({ code: 'custom', message: 'Enter a date like 2027-01-18.' })
      return z.NEVER
    }
    return v
  })

export const CohortFields = z.object({
  name: text(3, 80, 'a cohort name'),
  starts_on: isoDate,
  registration_open: checkbox,
  enrolment_open: checkbox,
})
export const CohortEdit = CohortFields.extend({ id: Uuid })

export const CourseEdit = z.object({
  id: z.enum(COURSE_IDS),
  title: text(2, 80, 'a course title'),
  fee: optNaira('the fee'),
  live: checkbox,
  sort: z.coerce.number('Enter a whole number.').int('Enter a whole number.').min(0).max(1000),
})

export const SettingsEdit = z.object({
  siwes_discount_percent: z.coerce.number('Enter a whole number from 0 to 100.').int('Enter a whole number from 0 to 100.').min(0, 'Enter 0 to 100.').max(100, 'Enter 0 to 100.'),
  siwes_admin_fee: z
    .string()
    .trim()
    .transform((v, ctx) => {
      const kobo = v === '' ? null : v === '0' ? 0 : (nairaToKobo(v) ?? null)
      if (kobo === null || kobo < 0 || kobo > 2_000_000_000) {
        ctx.addIssue({ code: 'custom', message: 'Enter the fee in naira, such as 10000, or 0.' })
        return z.NEVER
      }
      return kobo
    }),
})

export const AdminAdd = z.object({ email: Email })
export const AdminRemove = z.object({ email: Email })
export const SessionRevoke = z.object({ token_hash: z.string().regex(/^[0-9a-f]{64}$/, 'Unknown session.') })

/* List filters: anything unexpected is ignored rather than an error. */

const opt = <T extends z.ZodType>(s: T) => s.optional().catch(undefined)
const page = z.coerce.number().int().min(1).max(100000).catch(1).default(1)
const search = opt(z.string().trim().max(100))
const cohortParam = opt(z.union([z.literal('all'), z.uuid()]))
const yesNo = opt(z.enum(['yes', 'no']))
const sort = z.enum(['new', 'old']).catch('new').default('new')

export const RegistrationFilter = z.object({
  cohort: cohortParam,
  course: opt(z.enum(COURSE_IDS)),
  status: opt(z.enum(REGISTRATION_STATUSES)),
  attendance: opt(z.enum(ATTENDANCE)),
  siwes: yesNo,
  q: search,
  sort,
  page,
})
export type RegistrationFilter = z.output<typeof RegistrationFilter>

export const EnrolmentFilter = z.object({
  cohort: cohortParam,
  course: opt(z.enum(COURSE_IDS)),
  status: opt(z.enum(ENROLMENT_STATUSES)),
  method: opt(z.enum(METHODS)),
  siwes: yesNo,
  q: search,
  sort,
  page,
})
export type EnrolmentFilter = z.output<typeof EnrolmentFilter>

export const MessageFilter = z.object({ topic: opt(z.enum(MESSAGE_TOPICS)), q: search, sort, page })
export type MessageFilter = z.output<typeof MessageFilter>

export const WaitlistFilter = z.object({ q: search, sort, page })
export type WaitlistFilter = z.output<typeof WaitlistFilter>

export const LOG_TABLES = [
  'academy_registrations',
  'academy_enrolments',
  'academy_messages',
  'academy_waitlist',
  'academy_cohorts',
  'academy_courses',
  'academy_settings',
  'academy_admins',
  'academy_admin_sessions',
] as const
export const LogFilter = z.object({ table: opt(z.enum(LOG_TABLES)) })

export const OverviewFilter = z.object({ cohort: cohortParam })

/** Search text made safe for a PostgREST or() filter: no commas, brackets, quotes or wildcards. */
export const searchTerm = (q: string | undefined) => (q ? q.replace(/[^\p{L}\p{N}@.+'’ -]/gu, ' ').trim().slice(0, 100) : '')

/** The query string pairs of a filter, for links and the CSV export. */
export function filterQuery(f: Record<string, unknown>, overrides: Record<string, string | number | undefined> = {}): string {
  const out = new URLSearchParams()
  for (const [k, v] of Object.entries({ ...f, ...overrides })) {
    if (v === undefined || v === null || v === '') continue
    if (k === 'page' && Number(v) === 1) continue
    if (k === 'sort' && v === 'new') continue
    out.set(k, String(v))
  }
  const s = out.toString()
  return s ? `?${s}` : ''
}

/** FormData to a plain object of its text fields (files are ignored). */
export const formFields = (fd: FormData) =>
  Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string')) as Record<string, string>

/** The first error message for each field. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    out[key] ??= issue.message
  }
  return out
}
