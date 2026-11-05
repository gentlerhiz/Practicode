import 'server-only'
import { randomBytes, randomInt } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import {
  codeUsable,
  CODE_TTL_MS,
  CODE_WINDOW_MS,
  deriveCodeKey,
  generateCode,
  hashCode,
  hashToken,
  isExpired,
  looksLikeToken,
  mayRequestCode,
  newSessionToken,
  SESSION_TTL_MS,
  verifyCode,
} from '@/lib/admin/security'
import { serverEnv } from '../env'
import { admin } from '../supabase'
import { logAction } from './log'
import { sendCodeEmail } from './mail'

export const CONSOLE_PATH = '/code/administrator/console'
export const SIGN_IN_PATH = `${CONSOLE_PATH}/sign-in`

/**
 * The session cookie. `__Host-` makes browsers insist on Secure, Path=/ and no Domain, so no other
 * subdomain can set or read it. Browsers treat http://localhost as secure, so it works there too.
 */
const COOKIE = '__Host-pca_console'

export type AdminSession = { email: string; tokenHash: string }

function codeKey() {
  const secret = serverEnv.supabaseSecret
  if (!secret) throw new Error('SUPABASE_SECRET_KEY is not set.')
  return deriveCodeKey(secret)
}

const isAdminEmail = async (email: string) => {
  const { data, error } = await admin().from('academy_admins').select('email').eq('email', email).maybeSingle()
  if (error) throw new Error(`academy_admins: ${error.message}`)
  return Boolean(data)
}

/**
 * The signed-in administrator, or null. Checks the session row (and its expiry) and that the email is
 * still on the allow-list, on every request. Cached for the length of one request.
 */
export const getAdmin = cache(async (): Promise<AdminSession | null> => {
  const token = (await cookies()).get(COOKIE)?.value
  if (!looksLikeToken(token)) return null
  const tokenHash = hashToken(token)
  const db = admin()
  const { data: session, error } = await db
    .from('academy_admin_sessions')
    .select('email, expires_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()
  if (error) throw new Error(`academy_admin_sessions: ${error.message}`)
  if (!session) return null
  if (isExpired(session.expires_at, new Date())) {
    await db.from('academy_admin_sessions').delete().eq('token_hash', tokenHash)
    return null
  }
  if (!(await isAdminEmail(session.email))) return null
  return { email: session.email, tokenHash }
})

/** Every console page, server action and route handler calls this first. Without a session: sign in. */
export async function requireAdmin(): Promise<AdminSession> {
  const me = await getAdmin()
  if (!me) redirect(SIGN_IN_PATH)
  return me
}

/**
 * Emails a sign-in code when the address is on the allow-list and under the rate limit (three codes per
 * fifteen minutes). Says nothing either way: the caller shows the same message to everyone.
 */
export async function sendSignInCode(email: string): Promise<void> {
  if (!(await isAdminEmail(email))) return
  const db = admin()
  const now = new Date()
  const { data: recent, error } = await db
    .from('academy_admin_codes')
    .select('created_at')
    .eq('email', email)
    .gt('created_at', new Date(now.getTime() - CODE_WINDOW_MS).toISOString())
  if (error) throw new Error(`academy_admin_codes: ${error.message}`)
  if (!mayRequestCode((recent ?? []).map((r) => r.created_at as string), now)) return

  const code = generateCode(randomInt)
  const { error: insertError } = await db.from('academy_admin_codes').insert({
    email,
    code_hash: hashCode(codeKey(), email, code),
    expires_at: new Date(now.getTime() + CODE_TTL_MS).toISOString(),
  })
  if (insertError) throw new Error(`academy_admin_codes: ${insertError.message}`)
  await sendCodeEmail(email, code)

  // Tidy up: codes older than a day are of no use to anyone.
  await db.from('academy_admin_codes').delete().lt('created_at', new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())
}

/**
 * Checks a typed code against the newest code for that email. Each check uses up one of five tries
 * before comparing, so parallel guesses can't exceed the limit; a right code is marked used once.
 */
export async function redeemSignInCode(email: string, code: string): Promise<boolean> {
  const db = admin()
  const now = new Date()
  const { data: row, error } = await db
    .from('academy_admin_codes')
    .select('id, code_hash, expires_at, attempts, used_at')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw new Error(`academy_admin_codes: ${error.message}`)
  if (!row || !codeUsable(row, now)) return false

  const { data: claimed } = await db
    .from('academy_admin_codes')
    .update({ attempts: row.attempts + 1 })
    .eq('id', row.id)
    .eq('attempts', row.attempts)
    .is('used_at', null)
    .select('id')
  if (!claimed?.length) return false
  if (!verifyCode(codeKey(), email, code, row.code_hash)) return false

  const { data: used } = await db
    .from('academy_admin_codes')
    .update({ used_at: now.toISOString() })
    .eq('id', row.id)
    .is('used_at', null)
    .select('id')
  if (!used?.length) return false
  return isAdminEmail(email)
}

/** Starts a twelve-hour session: the cookie holds the token, the database only its hash. */
export async function startSession(email: string): Promise<void> {
  const db = admin()
  const token = newSessionToken(randomBytes)
  const expires = new Date(Date.now() + SESSION_TTL_MS)
  const { error } = await db.from('academy_admin_sessions').insert({ token_hash: hashToken(token), email, expires_at: expires.toISOString() })
  if (error) throw new Error(`academy_admin_sessions: ${error.message}`)
  ;(await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires,
  })
  await logAction(email, 'sign_in', 'academy_admin_sessions', null, null)
  // Tidy up sessions that have run out.
  await db.from('academy_admin_sessions').delete().lt('expires_at', new Date().toISOString())
}

/** Ends this browser's session: deletes the row and the cookie. */
export async function endSession(me: AdminSession): Promise<void> {
  await admin().from('academy_admin_sessions').delete().eq('token_hash', me.tokenHash)
  ;(await cookies()).delete({ name: COOKIE, path: '/', secure: true, httpOnly: true, sameSite: 'strict' })
  await logAction(me.email, 'sign_out', 'academy_admin_sessions', null, null)
}
