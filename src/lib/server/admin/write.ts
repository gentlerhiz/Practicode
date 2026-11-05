import 'server-only'
import type { z } from 'zod'
import type {
  CohortEdit,
  CohortFields,
  CourseEdit,
  EnrolmentEdit,
  RegistrationEdit,
  SettingsEdit,
} from '@/lib/admin/schemas'
import type { ActionState } from '@/lib/admin/types'
import { sendPlaceConfirmedEmail } from '../email'
import { admin, UPLOADS_BUCKET, type EnrolmentRow } from '../supabase'
import type { AdminSession } from './auth'
import { countInCohort } from './data'
import { changes, logAction } from './log'

/**
 * Writes for the console. Every function takes the session from requireAdmin() and already-validated
 * input, and records what it did in academy_admin_log.
 */

type PgError = { code?: string; message: string; details?: string | null } | null

/** Database errors as messages a person can act on. */
function explain(error: PgError, fallback: string): ActionState {
  if (!error) return { ok: true }
  if (error.code === '23505') return { ok: false, message: 'That clashes with an existing record (the same email in this cohort, or the same name).' }
  if (error.code === '23503') return { ok: false, message: 'Other records still point to this one, so it can’t be changed that way.' }
  if (error.code === '23514') return { ok: false, message: 'The database refused a value that breaks its rules. Check the fields and try again.' }
  console.error(fallback, error)
  return { ok: false, message: `${fallback} Please try again.` }
}

const notFound: ActionState = { ok: false, message: 'That record no longer exists. It may have been deleted.' }

/* Registrations */

export async function updateRegistration(me: AdminSession, v: z.output<typeof RegistrationEdit>): Promise<ActionState> {
  const db = admin()
  const { id, ...fields } = v
  const { data: before } = await db.from('academy_registrations').select('*').eq('id', id).maybeSingle()
  if (!before) return notFound
  const { error } = await db.from('academy_registrations').update(fields).eq('id', id)
  if (error) return explain(error, 'The registration wasn’t saved.')
  await logAction(me.email, 'update', 'academy_registrations', id, changes(before, fields))
  return { ok: true, message: 'Saved.' }
}

export async function deleteRegistration(me: AdminSession, id: string): Promise<ActionState> {
  const db = admin()
  const { data, error } = await db.from('academy_registrations').delete().eq('id', id).select('email, course, cohort_id')
  if (error) return explain(error, 'The registration wasn’t deleted.')
  const row = data?.[0]
  if (!row) return notFound
  await logAction(me.email, 'delete', 'academy_registrations', id, { course: row.course, cohort_id: row.cohort_id })
  return { ok: true }
}

/* Enrolments */

export async function updateEnrolment(me: AdminSession, v: z.output<typeof EnrolmentEdit>): Promise<ActionState> {
  const db = admin()
  const { id, amount, paid_amount, ...rest } = v
  const fields = { ...rest, amount_kobo: amount, paid_amount_kobo: paid_amount }
  const { data: before } = await db.from('academy_enrolments').select('*').eq('id', id).maybeSingle()
  if (!before) return notFound
  const { error } = await db.from('academy_enrolments').update(fields).eq('id', id)
  if (error) return explain(error, 'The enrolment wasn’t saved.')
  await logAction(me.email, 'update', 'academy_enrolments', id, changes(before, fields))
  return { ok: true, message: 'Saved.' }
}

const SECURED = ['paid', 'confirmed']

/**
 * Confirm payment or cancel. A bank transfer becomes "confirmed", anything else "paid" (both mean the
 * place is secured). The first time a place is secured, the student gets their confirmation email; the
 * update only matches a row that wasn't secured yet, so a double click can't send it twice.
 */
export async function setEnrolmentStatus(me: AdminSession, id: string, to: 'confirmed' | 'paid' | 'cancelled'): Promise<ActionState> {
  const db = admin()
  const { data: e } = await db.from('academy_enrolments').select('status, method, amount_kobo, paid_at, paid_amount_kobo, paid_channel').eq('id', id).maybeSingle()
  if (!e) return notFound
  const securing = to !== 'cancelled'
  const status = securing ? (e.method === 'transfer' ? 'confirmed' : 'paid') : 'cancelled'
  const fields: Record<string, unknown> = { status }
  if (securing) {
    fields.paid_at = e.paid_at ?? new Date().toISOString()
    fields.paid_amount_kobo = e.paid_amount_kobo ?? e.amount_kobo
    fields.paid_channel = e.paid_channel ?? (e.method === 'transfer' ? 'bank transfer' : 'recorded in console')
  }
  let query = db.from('academy_enrolments').update(fields).eq('id', id)
  if (securing) query = query.not('status', 'in', `(${SECURED.join(',')})`)
  const { data: updated, error } = await query.select('*').maybeSingle<EnrolmentRow>()
  if (error) return explain(error, 'The status wasn’t changed.')
  if (!updated) return { ok: true, message: 'This payment was already confirmed, so no email was sent again.' }
  await logAction(me.email, `mark_${status}`, 'academy_enrolments', id, { from: e.status, to: status })
  if (!securing) return { ok: true, message: 'Cancelled.' }

  const sent = await sendPlaceConfirmedEmail(updated).catch((mailError) => {
    console.error('Confirmation email failed', mailError)
    return false
  })
  await logAction(me.email, sent ? 'email_confirmation' : 'email_confirmation_failed', 'academy_enrolments', id, null)
  const first = updated.full_name.trim().split(/\s+/)[0]
  return sent
    ? { ok: true, message: `Payment confirmed. We’ve emailed ${first} to say they’re in.` }
    : { ok: true, message: `Payment confirmed, but the email to ${first} didn’t send. Please message them on WhatsApp.` }
}

export async function deleteEnrolment(me: AdminSession, id: string): Promise<ActionState> {
  const db = admin()
  const { data, error } = await db.from('academy_enrolments').delete().eq('id', id).select('course, status, cohort_id, receipt_path, letter_path')
  if (error) return explain(error, 'The enrolment wasn’t deleted.')
  const row = data?.[0]
  if (!row) return notFound
  // The uploads belong to the enrolment: remove them with it.
  const files = [row.receipt_path, row.letter_path].filter((p): p is string => Boolean(p))
  if (files.length) {
    const { error: storageError } = await db.storage.from(UPLOADS_BUCKET).remove(files)
    if (storageError) console.error('academy-uploads remove', storageError.message)
  }
  await logAction(me.email, 'delete', 'academy_enrolments', id, { course: row.course, status: row.status, cohort_id: row.cohort_id, files: files.length })
  return { ok: true }
}

/** A short-lived link to a receipt or introduction letter (ten minutes), or null when there is none. */
export async function uploadLink(id: string, kind: 'receipt' | 'letter'): Promise<string | null> {
  const db = admin()
  const { data } = await db.from('academy_enrolments').select('receipt_path, letter_path').eq('id', id).maybeSingle()
  const path = kind === 'receipt' ? data?.receipt_path : data?.letter_path
  if (!path) return null
  const { data: signed } = await db.storage.from(UPLOADS_BUCKET).createSignedUrl(path, 600)
  return signed?.signedUrl ?? null
}

/* Messages and waitlist */

export async function deleteSimple(me: AdminSession, table: 'academy_messages' | 'academy_waitlist', id: string): Promise<ActionState> {
  const { data, error } = await admin().from(table).delete().eq('id', id).select('id')
  if (error) return explain(error, 'That wasn’t deleted.')
  if (!data?.length) return notFound
  await logAction(me.email, 'delete', table, id, null)
  return { ok: true }
}

/* Cohorts */

export async function createCohort(me: AdminSession, v: z.output<typeof CohortFields>): Promise<ActionState> {
  const { data, error } = await admin().from('academy_cohorts').insert(v).select('id').single()
  if (error) return explain(error, 'The cohort wasn’t created.')
  await logAction(me.email, 'insert', 'academy_cohorts', data.id, { name: v.name })
  return { ok: true, message: `Created ${v.name}.` }
}

export async function updateCohort(me: AdminSession, v: z.output<typeof CohortEdit>): Promise<ActionState> {
  const db = admin()
  const { id, ...fields } = v
  const { data: before } = await db.from('academy_cohorts').select('*').eq('id', id).maybeSingle()
  if (!before) return notFound
  const { error } = await db.from('academy_cohorts').update(fields).eq('id', id)
  if (error) return explain(error, 'The cohort wasn’t saved.')
  await logAction(me.email, 'update', 'academy_cohorts', id, changes(before, fields))
  return { ok: true, message: 'Saved.' }
}

/**
 * Makes one cohort the current one. Uses academy_set_current_cohort() when supabase/academy-003 has been
 * applied (one transaction). Otherwise: unset the old one, set the new one, and put the old one back if
 * the second step fails, so there is never more than one current cohort.
 */
export async function setCurrentCohort(me: AdminSession, id: string): Promise<ActionState> {
  const db = admin()
  const { data: target } = await db.from('academy_cohorts').select('id, name, is_current').eq('id', id).maybeSingle()
  if (!target) return notFound
  if (target.is_current) return { ok: true, message: `${target.name} is already the current cohort.` }
  const { data: old } = await db.from('academy_cohorts').select('id').eq('is_current', true).maybeSingle()

  const rpc = await db.rpc('academy_set_current_cohort', { target: id })
  if (rpc.error && rpc.error.code !== 'PGRST202') return explain(rpc.error, 'The current cohort wasn’t changed.')
  if (rpc.error) {
    const unset = await db.from('academy_cohorts').update({ is_current: false }).eq('is_current', true)
    if (unset.error) return explain(unset.error, 'The current cohort wasn’t changed.')
    const set = await db.from('academy_cohorts').update({ is_current: true }).eq('id', id)
    if (set.error) {
      if (old) await db.from('academy_cohorts').update({ is_current: true }).eq('id', old.id)
      return explain(set.error, 'The current cohort wasn’t changed.')
    }
  }
  await logAction(me.email, 'set_current', 'academy_cohorts', id, { name: target.name, previous: old?.id ?? null })
  return { ok: true, message: `${target.name} is now the current cohort. New sign-ups join it.` }
}

export async function deleteCohort(me: AdminSession, id: string): Promise<ActionState> {
  const db = admin()
  const { data: c } = await db.from('academy_cohorts').select('name, is_current').eq('id', id).maybeSingle()
  if (!c) return notFound
  if (c.is_current) return { ok: false, message: 'This is the current cohort. Make another cohort current first.' }
  const n = await countInCohort(id)
  if (n.registrations || n.enrolments) {
    return {
      ok: false,
      message: `${c.name} still has ${n.registrations} registration${n.registrations === 1 ? '' : 's'} and ${n.enrolments} enrolment${n.enrolments === 1 ? '' : 's'}. Move or delete them first.`,
    }
  }
  const { error } = await db.from('academy_cohorts').delete().eq('id', id)
  if (error) return explain(error, 'The cohort wasn’t deleted.')
  await logAction(me.email, 'delete', 'academy_cohorts', id, { name: c.name })
  return { ok: true, message: `Deleted ${c.name}.` }
}

/* Courses and settings */

export async function updateCourse(me: AdminSession, v: z.output<typeof CourseEdit>): Promise<ActionState> {
  const db = admin()
  const { id, fee, ...rest } = v
  const fields = { ...rest, fee_kobo: fee }
  const { data: before } = await db.from('academy_courses').select('*').eq('id', id).maybeSingle()
  if (!before) return notFound
  const { error } = await db.from('academy_courses').update(fields).eq('id', id)
  if (error) return explain(error, 'The course wasn’t saved.')
  await logAction(me.email, 'update', 'academy_courses', id, changes(before, fields))
  return { ok: true, message: 'Saved.' }
}

export async function updateSettings(me: AdminSession, v: z.output<typeof SettingsEdit>): Promise<ActionState> {
  const db = admin()
  const fields = { siwes_discount_percent: v.siwes_discount_percent, siwes_admin_fee_kobo: v.siwes_admin_fee }
  const { data: before } = await db.from('academy_settings').select('*').eq('id', 1).maybeSingle()
  const { error } = await db.from('academy_settings').upsert({ id: 1, ...fields })
  if (error) return explain(error, 'The settings weren’t saved.')
  await logAction(me.email, 'update', 'academy_settings', '1', changes(before ?? {}, fields))
  return { ok: true, message: 'Saved.' }
}

/* Administrators and sessions */

export async function addAdmin(me: AdminSession, email: string): Promise<ActionState> {
  const { error } = await admin().from('academy_admins').insert({ email })
  if (error?.code === '23505') return { ok: false, message: `${email} can already sign in.` }
  if (error) return explain(error, 'The administrator wasn’t added.')
  await logAction(me.email, 'insert', 'academy_admins', email, null)
  return { ok: true, message: `${email} can now sign in.` }
}

export async function removeAdmin(me: AdminSession, email: string): Promise<ActionState> {
  if (email === me.email) return { ok: false, message: 'You can’t remove yourself. Ask another administrator.' }
  const db = admin()
  const { count } = await db.from('academy_admins').select('email', { count: 'exact', head: true })
  if ((count ?? 0) <= 1) return { ok: false, message: 'There must always be at least one administrator.' }
  // Their sessions go with them (on delete cascade).
  const { data, error } = await db.from('academy_admins').delete().eq('email', email).select('email')
  if (error) return explain(error, 'The administrator wasn’t removed.')
  if (!data?.length) return notFound
  await logAction(me.email, 'delete', 'academy_admins', email, null)
  return { ok: true, message: `${email} can no longer sign in.` }
}

export async function revokeSession(me: AdminSession, tokenHash: string): Promise<ActionState> {
  const { data, error } = await admin().from('academy_admin_sessions').delete().eq('token_hash', tokenHash).select('email')
  if (error) return explain(error, 'The session wasn’t revoked.')
  const row = data?.[0]
  if (!row) return notFound
  // The log keeps only the start of the hash: enough to tell sessions apart.
  await logAction(me.email, 'revoke_session', 'academy_admin_sessions', tokenHash.slice(0, 8), { email: row.email })
  return { ok: true, message: 'Session revoked.' }
}

export async function logExport(me: AdminSession, table: string, rows: number, filter: Record<string, unknown>) {
  await logAction(me.email, 'export_csv', table, null, { rows, filter })
}
