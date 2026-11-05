'use server'

import { refresh } from 'next/cache'
import { after } from 'next/server'
import { redirect } from 'next/navigation'
import {
  AdminAdd,
  AdminRemove,
  CodeEntry,
  CodeRequest,
  CohortEdit,
  CohortFields,
  CourseEdit,
  EnrolmentEdit,
  EnrolmentQuick,
  fieldErrors,
  formFields,
  IdOnly,
  RegistrationEdit,
  SessionRevoke,
  SettingsEdit,
} from '@/lib/admin/schemas'
import type { ActionState } from '@/lib/admin/types'
import {
  CONSOLE_PATH,
  endSession,
  redeemSignInCode,
  requireAdmin,
  sendSignInCode,
  startSession,
} from '@/lib/server/admin/auth'
import * as write from '@/lib/server/admin/write'

/**
 * Server actions for the administrator console. Each one checks the session first (requireAdmin), then
 * validates its input with Zod, then writes through src/lib/server/admin/write.ts, which logs.
 */

const invalid = (error: Parameters<typeof fieldErrors>[0]): ActionState => ({
  ok: false,
  errors: fieldErrors(error),
  message: 'Please check the highlighted fields.',
})

/** After a change: re-render the page so it shows the new data. */
const done = (result: ActionState) => {
  if (result.ok) refresh()
  return result
}

/* Sign-in */

export type SignInState = ActionState & { step: 'email' | 'code'; email?: string }

const SENT = 'If that address can sign in, we’ve sent it a six-digit code. It works for 10 minutes.'

export async function requestCode(_prev: SignInState, fd: FormData): Promise<SignInState> {
  const parsed = CodeRequest.safeParse(formFields(fd))
  if (!parsed.success) return { step: 'email', ok: false, errors: fieldErrors(parsed.error) }
  const { email } = parsed.data
  // The lookup and email happen after the response, so the reply is the same, and as quick, for every
  // address: nobody can tell from it which emails are administrators.
  after(async () => {
    try {
      await sendSignInCode(email)
    } catch (error) {
      console.error('Console sign-in code', error)
    }
  })
  return { step: 'code', email, ok: true, message: SENT }
}

export async function enterCode(_prev: SignInState, fd: FormData): Promise<SignInState> {
  const parsed = CodeEntry.safeParse(formFields(fd))
  const email = typeof fd.get('email') === 'string' ? String(fd.get('email')) : undefined
  if (!parsed.success) return { step: 'code', email, ok: false, errors: fieldErrors(parsed.error) }
  const ok = await redeemSignInCode(parsed.data.email, parsed.data.code)
  if (!ok) {
    return {
      step: 'code',
      email: parsed.data.email,
      ok: false,
      errors: { code: 'That code is wrong or has expired. After five wrong tries a code stops working: ask for a new one.' },
    }
  }
  await startSession(parsed.data.email)
  redirect(CONSOLE_PATH)
}

export async function signOut(): Promise<void> {
  const me = await requireAdmin()
  await endSession(me)
  redirect(`${CONSOLE_PATH}/sign-in`)
}

/* Registrations */

export async function saveRegistration(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = RegistrationEdit.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.updateRegistration(me, parsed.data))
}

export async function removeRegistration(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = IdOnly.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  const result = await write.deleteRegistration(me, parsed.data.id)
  if (result.ok) redirect(`${CONSOLE_PATH}/registrations`)
  return result
}

/* Enrolments */

export async function saveEnrolment(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = EnrolmentEdit.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.updateEnrolment(me, parsed.data))
}

export async function quickEnrolment(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = EnrolmentQuick.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.setEnrolmentStatus(me, parsed.data.id, parsed.data.to))
}

export async function removeEnrolment(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = IdOnly.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  const result = await write.deleteEnrolment(me, parsed.data.id)
  if (result.ok) redirect(`${CONSOLE_PATH}/enrolments`)
  return result
}

/* Messages and waitlist */

export async function removeMessage(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = IdOnly.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.deleteSimple(me, 'academy_messages', parsed.data.id))
}

export async function removeWaitlistEntry(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = IdOnly.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.deleteSimple(me, 'academy_waitlist', parsed.data.id))
}

/* Cohorts */

export async function addCohort(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = CohortFields.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.createCohort(me, parsed.data))
}

export async function saveCohort(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = CohortEdit.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.updateCohort(me, parsed.data))
}

export async function makeCohortCurrent(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = IdOnly.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.setCurrentCohort(me, parsed.data.id))
}

export async function removeCohort(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = IdOnly.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.deleteCohort(me, parsed.data.id))
}

/* Courses and settings */

export async function saveCourse(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = CourseEdit.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.updateCourse(me, parsed.data))
}

export async function saveSettings(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = SettingsEdit.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.updateSettings(me, parsed.data))
}

/* Administrators */

export async function addAdministrator(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = AdminAdd.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.addAdmin(me, parsed.data.email))
}

export async function removeAdministrator(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = AdminRemove.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  return done(await write.removeAdmin(me, parsed.data.email))
}

export async function revokeAdminSession(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const me = await requireAdmin()
  const parsed = SessionRevoke.safeParse(formFields(fd))
  if (!parsed.success) return invalid(parsed.error)
  const result = await write.revokeSession(me, parsed.data.token_hash)
  // Revoking this browser's own session is signing out.
  if (result.ok && parsed.data.token_hash === me.tokenHash) redirect(`${CONSOLE_PATH}/sign-in`)
  return done(result)
}
