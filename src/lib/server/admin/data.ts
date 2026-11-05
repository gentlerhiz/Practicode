import 'server-only'
import {
  searchTerm,
  type EnrolmentFilter,
  type MessageFilter,
  type RegistrationFilter,
  type WaitlistFilter,
} from '@/lib/admin/schemas'
import type {
  AdminRow,
  Cohort,
  Course,
  Enrolment,
  LogRow,
  Message,
  Registration,
  SessionRow,
  Settings,
  WaitlistEntry,
} from '@/lib/admin/types'
import { admin } from '../supabase'

/**
 * Reads for the console. Callers have already passed requireAdmin(); nothing here checks again, so
 * nothing here may be imported by a page or action that hasn't.
 */

export const PAGE_SIZE = 50
const EXPORT_MAX = 20_000

const fail = (what: string, error: { message: string } | null) => {
  if (error) throw new Error(`${what}: ${error.message}`)
}

export async function listCohorts(): Promise<Cohort[]> {
  const { data, error } = await admin().from('academy_cohorts').select('*').order('created_at', { ascending: false })
  fail('academy_cohorts', error)
  return (data ?? []) as Cohort[]
}

/** The cohort a filter means: "all" is every cohort (null), a missing value is the current cohort. */
export function pickCohort(param: string | undefined, cohorts: Cohort[]): { id: string | null; cohort: Cohort | null } {
  if (param === 'all') return { id: null, cohort: null }
  const chosen = (param && cohorts.find((c) => c.id === param)) || cohorts.find((c) => c.is_current) || null
  return { id: chosen?.id ?? null, cohort: chosen }
}

export async function listCourses(): Promise<Course[]> {
  const { data, error } = await admin().from('academy_courses').select('*').order('sort')
  fail('academy_courses', error)
  return (data ?? []) as Course[]
}

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await admin().from('academy_settings').select('*').eq('id', 1).maybeSingle()
  fail('academy_settings', error)
  return data as Settings | null
}

type Page = { limit: number; offset: number } | 'all'

/** Runs a query a page at a time (PostgREST returns at most 1000 rows per request). */
async function everything<T>(run: (from: number, to: number) => PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>, what: string) {
  const out: T[] = []
  for (let from = 0; from < EXPORT_MAX; from += 1000) {
    const { data, error } = await run(from, from + 999)
    fail(what, error)
    out.push(...((data ?? []) as T[]))
    if (!data || data.length < 1000) break
  }
  return out
}

const ilikeAny = (columns: string[], q: string | undefined) => {
  const term = searchTerm(q)
  return term ? columns.map((c) => `${c}.ilike."*${term}*"`).join(',') : null
}

function registrationQuery(f: RegistrationFilter, cohortId: string | null, count: boolean) {
  let q = admin().from('academy_registrations').select('*', count ? { count: 'exact' } : undefined)
  if (cohortId) q = q.eq('cohort_id', cohortId)
  if (f.course) q = q.eq('course', f.course)
  if (f.status) q = q.eq('status', f.status)
  if (f.attendance) q = q.eq('attendance', f.attendance)
  if (f.siwes) q = q.eq('siwes', f.siwes === 'yes')
  const or = ilikeAny(['full_name', 'email', 'whatsapp'], f.q)
  if (or) q = q.or(or)
  return q.order('created_at', { ascending: f.sort === 'old' }).order('id')
}

export async function listRegistrations(f: RegistrationFilter, cohortId: string | null, page: Page) {
  if (page === 'all') return { rows: await everything<Registration>((a, b) => registrationQuery(f, cohortId, false).range(a, b), 'academy_registrations'), total: 0 }
  const { data, error, count } = await registrationQuery(f, cohortId, true).range(page.offset, page.offset + page.limit - 1)
  fail('academy_registrations', error)
  return { rows: (data ?? []) as Registration[], total: count ?? 0 }
}

function enrolmentQuery(f: EnrolmentFilter, cohortId: string | null, count: boolean) {
  let q = admin().from('academy_enrolments').select('*', count ? { count: 'exact' } : undefined)
  if (cohortId) q = q.eq('cohort_id', cohortId)
  if (f.course) q = q.eq('course', f.course)
  if (f.status) q = q.eq('status', f.status)
  if (f.method) q = q.eq('method', f.method)
  if (f.siwes) q = q.eq('siwes', f.siwes === 'yes')
  const or = ilikeAny(['full_name', 'email', 'whatsapp', 'paystack_reference', 'transfer_id'], f.q)
  if (or) q = q.or(or)
  return q.order('created_at', { ascending: f.sort === 'old' }).order('id')
}

export async function listEnrolments(f: EnrolmentFilter, cohortId: string | null, page: Page) {
  if (page === 'all') return { rows: await everything<Enrolment>((a, b) => enrolmentQuery(f, cohortId, false).range(a, b), 'academy_enrolments'), total: 0 }
  const { data, error, count } = await enrolmentQuery(f, cohortId, true).range(page.offset, page.offset + page.limit - 1)
  fail('academy_enrolments', error)
  return { rows: (data ?? []) as Enrolment[], total: count ?? 0 }
}

function messageQuery(f: MessageFilter, count: boolean) {
  let q = admin().from('academy_messages').select('*', count ? { count: 'exact' } : undefined)
  if (f.topic) q = q.eq('topic', f.topic)
  const or = ilikeAny(['name', 'email', 'whatsapp', 'message'], f.q)
  if (or) q = q.or(or)
  return q.order('created_at', { ascending: f.sort === 'old' }).order('id')
}

export async function listMessages(f: MessageFilter, page: Page) {
  if (page === 'all') return { rows: await everything<Message>((a, b) => messageQuery(f, false).range(a, b), 'academy_messages'), total: 0 }
  const { data, error, count } = await messageQuery(f, true).range(page.offset, page.offset + page.limit - 1)
  fail('academy_messages', error)
  return { rows: (data ?? []) as Message[], total: count ?? 0 }
}

function waitlistQuery(f: WaitlistFilter, count: boolean) {
  let q = admin().from('academy_waitlist').select('*', count ? { count: 'exact' } : undefined)
  const or = ilikeAny(['name', 'email', 'whatsapp'], f.q)
  if (or) q = q.or(or)
  return q.order('created_at', { ascending: f.sort === 'old' }).order('id')
}

export async function listWaitlist(f: WaitlistFilter, page: Page) {
  if (page === 'all') return { rows: await everything<WaitlistEntry>((a, b) => waitlistQuery(f, false).range(a, b), 'academy_waitlist'), total: 0 }
  const { data, error, count } = await waitlistQuery(f, true).range(page.offset, page.offset + page.limit - 1)
  fail('academy_waitlist', error)
  return { rows: (data ?? []) as WaitlistEntry[], total: count ?? 0 }
}

export async function getRegistration(id: string): Promise<Registration | null> {
  const { data, error } = await admin().from('academy_registrations').select('*').eq('id', id).maybeSingle()
  fail('academy_registrations', error)
  return data as Registration | null
}

export async function getEnrolment(id: string): Promise<Enrolment | null> {
  const { data, error } = await admin().from('academy_enrolments').select('*').eq('id', id).maybeSingle()
  fail('academy_enrolments', error)
  return data as Enrolment | null
}

/** Everything the overview needs for one cohort (or all of them). */
export async function overview(cohortId: string | null) {
  const db = admin()
  const regs = await everything<Pick<Registration, 'course' | 'status' | 'attendance' | 'siwes'>>((a, b) => {
    let q = db.from('academy_registrations').select('course, status, attendance, siwes')
    if (cohortId) q = q.eq('cohort_id', cohortId)
    return q.order('id').range(a, b)
  }, 'academy_registrations')
  const enrols = await everything<Pick<Enrolment, 'course' | 'status' | 'method' | 'amount_kobo' | 'paid_amount_kobo'>>((a, b) => {
    let q = db.from('academy_enrolments').select('course, status, method, amount_kobo, paid_amount_kobo')
    if (cohortId) q = q.eq('cohort_id', cohortId)
    return q.order('id').range(a, b)
  }, 'academy_enrolments')

  let lr = db.from('academy_registrations').select('id, created_at, full_name, course, status')
  let le = db.from('academy_enrolments').select('id, created_at, full_name, course, status')
  if (cohortId) {
    lr = lr.eq('cohort_id', cohortId)
    le = le.eq('cohort_id', cohortId)
  }
  const [r, e] = await Promise.all([lr.order('created_at', { ascending: false }).limit(10), le.order('created_at', { ascending: false }).limit(10)])
  fail('academy_registrations', r.error)
  fail('academy_enrolments', e.error)
  type Latest = { id: string; created_at: string; full_name: string; course: string; status: string }
  const latest = [
    ...((r.data ?? []) as Latest[]).map((x) => ({ ...x, kind: 'registration' as const })),
    ...((e.data ?? []) as Latest[]).map((x) => ({ ...x, kind: 'enrolment' as const })),
  ]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 10)
  return { regs, enrols, latest }
}

/** Registrations and enrolments per cohort, for the cohorts page and the delete check. */
export async function cohortCounts(): Promise<Map<string, { registrations: number; enrolments: number }>> {
  const db = admin()
  const [regs, enrols] = await Promise.all([
    everything<{ cohort_id: string }>((a, b) => db.from('academy_registrations').select('cohort_id').order('id').range(a, b), 'academy_registrations'),
    everything<{ cohort_id: string | null }>((a, b) => db.from('academy_enrolments').select('cohort_id').order('id').range(a, b), 'academy_enrolments'),
  ])
  const out = new Map<string, { registrations: number; enrolments: number }>()
  const bump = (id: string | null, k: 'registrations' | 'enrolments') => {
    if (!id) return
    const c = out.get(id) ?? { registrations: 0, enrolments: 0 }
    c[k] += 1
    out.set(id, c)
  }
  regs.forEach((r) => bump(r.cohort_id, 'registrations'))
  enrols.forEach((e) => bump(e.cohort_id, 'enrolments'))
  return out
}

export async function countInCohort(id: string) {
  const db = admin()
  const [r, e] = await Promise.all([
    db.from('academy_registrations').select('id', { count: 'exact', head: true }).eq('cohort_id', id),
    db.from('academy_enrolments').select('id', { count: 'exact', head: true }).eq('cohort_id', id),
  ])
  fail('academy_registrations', r.error)
  fail('academy_enrolments', e.error)
  return { registrations: r.count ?? 0, enrolments: e.count ?? 0 }
}

export async function listAdmins(): Promise<AdminRow[]> {
  const { data, error } = await admin().from('academy_admins').select('*').order('created_at')
  fail('academy_admins', error)
  return (data ?? []) as AdminRow[]
}

export async function listSessions(): Promise<SessionRow[]> {
  const { data, error } = await admin()
    .from('academy_admin_sessions')
    .select('*')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
  fail('academy_admin_sessions', error)
  return (data ?? []) as SessionRow[]
}

export async function listLog(table: string | undefined): Promise<LogRow[]> {
  let q = admin().from('academy_admin_log').select('*')
  if (table) q = q.eq('target_table', table)
  const { data, error } = await q.order('created_at', { ascending: false }).order('id', { ascending: false }).limit(200)
  fail('academy_admin_log', error)
  return (data ?? []) as LogRow[]
}
