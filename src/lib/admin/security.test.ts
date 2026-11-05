import { randomBytes } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { csvCell, toCsv } from './csv'
import { label, nairaToKobo, waLink, waNumber } from './format'
import { CodeEntry, EnrolmentEdit, filterQuery, RegistrationFilter, searchTerm, SettingsEdit } from './schemas'
import {
  codeUsable,
  CODE_TTL_MS,
  deriveCodeKey,
  generateCode,
  hashCode,
  hashToken,
  isExpired,
  looksLikeToken,
  mayRequestCode,
  newSessionToken,
  verifyCode,
} from './security'
import { receivedKobo, totalReceivedKobo } from './totals'

const key = deriveCodeKey('sb_secret_test')

describe('sign-in codes', () => {
  it('generates six digits, keeping leading zeros', () => {
    expect(generateCode(() => 42)).toBe('000042')
    expect(generateCode(() => 999999)).toBe('999999')
  })

  it('derives a stable key that depends on the secret', () => {
    expect(deriveCodeKey('sb_secret_test').equals(key)).toBe(true)
    expect(deriveCodeKey('another').equals(key)).toBe(false)
  })

  it('stores a hash, not the code, bound to the email', () => {
    const h = hashCode(key, 'a@b.co', '123456')
    expect(h).toMatch(/^[0-9a-f]{64}$/)
    expect(h).not.toContain('123456')
    expect(hashCode(key, ' A@B.co ', '123456')).toBe(h)
    expect(hashCode(key, 'c@b.co', '123456')).not.toBe(h)
  })

  it('verifies the right code only', () => {
    const h = hashCode(key, 'a@b.co', '123456')
    expect(verifyCode(key, 'a@b.co', '123456', h)).toBe(true)
    expect(verifyCode(key, 'a@b.co', '123 456', h)).toBe(true)
    expect(verifyCode(key, 'a@b.co', '123457', h)).toBe(false)
    expect(verifyCode(key, 'x@b.co', '123456', h)).toBe(false)
    expect(verifyCode(deriveCodeKey('other'), 'a@b.co', '123456', h)).toBe(false)
    expect(verifyCode(key, 'a@b.co', '12345', h)).toBe(false)
    expect(verifyCode(key, 'a@b.co', 'abcdef', h)).toBe(false)
    expect(verifyCode(key, 'a@b.co', '123456', 'zz')).toBe(false)
    expect(verifyCode(key, 'a@b.co', '123456', '')).toBe(false)
  })

  it('expires codes after ten minutes', () => {
    const now = new Date('2026-11-05T10:00:00Z')
    const expires = new Date(now.getTime() + CODE_TTL_MS).toISOString()
    expect(isExpired(expires, now)).toBe(false)
    expect(isExpired(expires, new Date(now.getTime() + CODE_TTL_MS))).toBe(true)
    expect(isExpired(expires, new Date(now.getTime() + CODE_TTL_MS + 1))).toBe(true)
  })

  it('allows three codes per fifteen minutes', () => {
    const now = new Date('2026-11-05T10:00:00Z')
    const ago = (min: number) => new Date(now.getTime() - min * 60_000).toISOString()
    expect(mayRequestCode([], now)).toBe(true)
    expect(mayRequestCode([ago(1), ago(5)], now)).toBe(true)
    expect(mayRequestCode([ago(1), ago(5), ago(14)], now)).toBe(false)
    expect(mayRequestCode([ago(1), ago(5), ago(16)], now)).toBe(true)
  })

  it('kills a code after five wrong tries, use or expiry', () => {
    const now = new Date('2026-11-05T10:00:00Z')
    const live = { expires_at: '2026-11-05T10:05:00Z', attempts: 0, used_at: null }
    expect(codeUsable(live, now)).toBe(true)
    expect(codeUsable({ ...live, attempts: 4 }, now)).toBe(true)
    expect(codeUsable({ ...live, attempts: 5 }, now)).toBe(false)
    expect(codeUsable({ ...live, used_at: '2026-11-05T09:59:00Z' }, now)).toBe(false)
    expect(codeUsable({ ...live, expires_at: '2026-11-05T09:59:59Z' }, now)).toBe(false)
  })
})

describe('session tokens', () => {
  it('makes 32-byte tokens and stores only their SHA-256', () => {
    const t = newSessionToken(randomBytes)
    expect(looksLikeToken(t)).toBe(true)
    expect(Buffer.from(t, 'base64url')).toHaveLength(32)
    expect(hashToken(t)).toMatch(/^[0-9a-f]{64}$/)
    expect(hashToken(t)).toBe(hashToken(t))
    expect(newSessionToken(randomBytes)).not.toBe(t)
  })

  it('rejects malformed cookies before touching the database', () => {
    expect(looksLikeToken(undefined)).toBe(false)
    expect(looksLikeToken('')).toBe(false)
    expect(looksLikeToken('short')).toBe(false)
    expect(looksLikeToken(`${'a'.repeat(42)};`)).toBe(false)
  })
})

describe('csv', () => {
  it('quotes commas, quotes and new lines', () => {
    expect(csvCell('plain')).toBe('plain')
    expect(csvCell('a,b')).toBe('"a,b"')
    expect(csvCell('say "hi"')).toBe('"say ""hi"""')
    expect(csvCell('line\nbreak')).toBe('"line\nbreak"')
    expect(csvCell(null)).toBe('')
    expect(csvCell(true)).toBe('true')
  })

  it('defuses spreadsheet formulas', () => {
    expect(csvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`)
    expect(csvCell('+2348030000000')).toBe("'+2348030000000")
    expect(csvCell('-1')).toBe("'-1")
    expect(csvCell('@SUM(A1)')).toBe("'@SUM(A1)")
    expect(csvCell('\tcmd')).toBe("'\tcmd")
  })

  it('builds a whole file with a header row', () => {
    expect(toCsv(['a', 'b'], [{ a: 1, b: 'x,y' }])).toBe('﻿a,b\r\n1,"x,y"\r\n')
  })
})

describe('formatting', () => {
  it('normalises WhatsApp numbers to 234', () => {
    expect(waNumber('0803 000 0000')).toBe('2348030000000')
    expect(waNumber('+234 803 000 0000')).toBe('2348030000000')
    expect(waNumber('2348030000000')).toBe('2348030000000')
    expect(waNumber('8030000000')).toBe('2348030000000')
    expect(waNumber('12')).toBeNull()
    expect(waLink('09030578667')).toBe('https://wa.me/2349030578667')
  })

  it('reads naira as kobo', () => {
    expect(nairaToKobo('120,000')).toBe(12_000_000)
    expect(nairaToKobo('₦80000.50')).toBe(8_000_050)
    expect(nairaToKobo('12a')).toBeNull()
    expect(nairaToKobo('')).toBeNull()
    expect(label('transfer_submitted')).toBe('Transfer submitted')
  })
})

describe('money received', () => {
  const base = { method: 'paystack' as const, amount_kobo: 8_000_000, paid_amount_kobo: null }
  it('counts paid amounts and confirmed transfers only', () => {
    expect(receivedKobo({ ...base, status: 'paid', paid_amount_kobo: 8_000_000 })).toBe(8_000_000)
    expect(receivedKobo({ ...base, status: 'confirmed', method: 'transfer' })).toBe(8_000_000)
    expect(receivedKobo({ ...base, status: 'transfer_submitted', method: 'transfer' })).toBe(0)
    expect(receivedKobo({ ...base, status: 'awaiting_payment' })).toBe(0)
    expect(receivedKobo({ ...base, status: 'cancelled', paid_amount_kobo: 5 })).toBe(0)
    expect(
      totalReceivedKobo([
        { ...base, status: 'paid', paid_amount_kobo: 100 },
        { ...base, status: 'confirmed', method: 'transfer', amount_kobo: 50 },
      ]),
    ).toBe(150)
  })
})

describe('input schemas', () => {
  it('accepts a spaced code and rejects others', () => {
    expect(CodeEntry.safeParse({ email: 'A@B.co', code: '123 456' }).data).toEqual({ email: 'a@b.co', code: '123456' })
    expect(CodeEntry.safeParse({ email: 'a@b.co', code: '12345' }).success).toBe(false)
  })

  it('ignores junk in list filters', () => {
    const f = RegistrationFilter.parse({ course: 'zz', status: 'new', page: '-3', sort: 'sideways', cohort: 'x' })
    expect(f).toMatchObject({ course: undefined, status: 'new', page: 1, sort: 'new', cohort: undefined })
    expect(filterQuery(f, { page: 2 })).toBe('?status=new&page=2')
  })

  it('strips filter syntax from search text', () => {
    expect(searchTerm('ada,(x).eq*"')).toBe('ada  x .eq')
    expect(searchTerm('o’brien@x.com')).toBe('o’brien@x.com')
  })

  it('validates enrolment edits like the database', () => {
    const ok = {
      id: '0b7c1d2e-3f40-4a5b-8c6d-7e8f9a0b1c2d',
      cohort_id: '0b7c1d2e-3f40-4a5b-8c6d-7e8f9a0b1c2d',
      full_name: 'Ada Lovelace',
      email: 'ada@example.com',
      whatsapp: '0803 000 0000',
      course: 'fe',
      method: 'transfer',
      amount: '120,000',
      status: 'confirmed',
    }
    const parsed = EnrolmentEdit.parse(ok)
    expect(parsed.amount).toBe(12_000_000)
    expect(parsed.siwes).toBe(false)
    expect(parsed.paid_amount).toBeNull()
    expect(EnrolmentEdit.safeParse({ ...ok, course: 'ai' }).success).toBe(false)
    expect(EnrolmentEdit.safeParse({ ...ok, amount: '0' }).success).toBe(false)
    expect(EnrolmentEdit.safeParse({ ...ok, full_name: 'A' }).success).toBe(false)
    expect(SettingsEdit.parse({ siwes_discount_percent: '20', siwes_admin_fee: '10000' })).toEqual({ siwes_discount_percent: 20, siwes_admin_fee: 1_000_000 })
    expect(SettingsEdit.safeParse({ siwes_discount_percent: '101', siwes_admin_fee: '0' }).success).toBe(false)
  })
})
