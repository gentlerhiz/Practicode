import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Pure helpers behind the administrator sign-in. They take their secret and clock as arguments, so the
 * unit tests can check them without a database or environment.
 */

export const CODE_LENGTH = 6
export const CODE_TTL_MS = 10 * 60 * 1000
export const CODE_WINDOW_MS = 15 * 60 * 1000
export const CODES_PER_WINDOW = 3
export const MAX_CODE_ATTEMPTS = 5
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000

/** The key for code hashes: derived from the server secret, so it is never stored anywhere. */
export const deriveCodeKey = (secret: string) => createHmac('sha256', secret).update('academy-admin-code').digest()

/** A six-digit code with leading zeros kept. `randomInt` is crypto.randomInt in real use. */
export const generateCode = (randomInt: (max: number) => number) => String(randomInt(10 ** CODE_LENGTH)).padStart(CODE_LENGTH, '0')

/** HMAC of the code bound to the email it was sent to, as hex. Only this is stored. */
export const hashCode = (key: Buffer, email: string, code: string) =>
  createHmac('sha256', key).update(`${email.trim().toLowerCase()}:${code}`).digest('hex')

const sameHex = (a: string, b: string) => {
  const x = Buffer.from(a, 'hex')
  const y = Buffer.from(b, 'hex')
  // Equal lengths first: timingSafeEqual throws otherwise. Both are 32-byte digests in normal use.
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y)
}

/** Checks a typed code against the stored hash in constant time. Anything not six digits fails. */
export function verifyCode(key: Buffer, email: string, code: string, storedHash: string): boolean {
  const typed = code.replace(/\s+/g, '')
  if (!/^\d{6}$/.test(typed)) return false
  return sameHex(hashCode(key, email, typed), storedHash)
}

export const isExpired = (expiresAt: string | Date, now: Date) => new Date(expiresAt).getTime() <= now.getTime()

/** True when another code may be sent: fewer than three in the last fifteen minutes. */
export function mayRequestCode(recentCreatedAt: (string | Date)[], now: Date): boolean {
  const since = now.getTime() - CODE_WINDOW_MS
  return recentCreatedAt.filter((t) => new Date(t).getTime() > since).length < CODES_PER_WINDOW
}

/** A code is usable while it is unused, unexpired and has had fewer than five wrong tries. */
export function codeUsable(row: { expires_at: string; attempts: number; used_at: string | null }, now: Date): boolean {
  return row.used_at === null && row.attempts < MAX_CODE_ATTEMPTS && !isExpired(row.expires_at, now)
}

/** Session tokens: 32 random bytes in the cookie, and only their SHA-256 in the database. */
export const newSessionToken = (randomBytes: (n: number) => Buffer) => randomBytes(32).toString('base64url')
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')
export const looksLikeToken = (token: string | undefined): token is string => !!token && /^[A-Za-z0-9_-]{43}$/.test(token)
