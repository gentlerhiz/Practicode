import { describe, expect, it } from 'vitest'
import { chargeCovers, EnrolFields, FALLBACK_PRICING, fieldErrors, naira, newReference, RegisterFields, sniffUpload, tuitionKobo } from './enrolment'

const base = {
  email: 'ada@example.com',
  fullName: 'Adaeze Bello',
  whatsapp: '0803 123 4567',
  course: 'fe',
  siwes: 'no',
  method: 'paystack',
  confirm: 'on',
}

describe('tuitionKobo', () => {
  it('charges the full fee, or takes the SIWES percentage off', () => {
    expect(tuitionKobo(12_000_000, false, 20)).toBe(12_000_000)
    expect(tuitionKobo(12_000_000, true, 20)).toBe(9_600_000)
    expect(naira(tuitionKobo(12_000_000, true, 20))).toBe('₦96,000')
    expect(naira(tuitionKobo(14_000_000, true, 20))).toBe('₦112,000')
    expect(naira(tuitionKobo(7_000_000, true, 20))).toBe('₦56,000')
  })
  it('rounds to a whole naira and handles 0 and 100 percent', () => {
    expect(tuitionKobo(1_000_033, true, 33)).toBe(670_000)
    expect(tuitionKobo(5_000_000, true, 0)).toBe(5_000_000)
    expect(tuitionKobo(5_000_000, true, 100)).toBe(0)
  })
  it('keeps built-in fees equal to the seeded ones', () => {
    expect(FALLBACK_PRICING.feeKobo).toEqual({ fe: 12_000_000, da: 10_000_000, ux: 8_000_000, cs: 14_000_000, dm: 7_000_000 })
    expect(FALLBACK_PRICING.siwesPercent).toBe(20)
    expect(FALLBACK_PRICING.siwesAdminFeeKobo).toBe(1_000_000)
  })
})

describe('RegisterFields', () => {
  const reg = {
    fullName: 'Adaeze Bello',
    email: 'ada@example.com',
    whatsapp: '0803 123 4567',
    course: 'cs',
    attendance: 'online',
    city: 'Ibadan',
    state: 'Oyo',
    siwes: 'no',
    consent: 'on',
  }
  it('accepts a complete registration', () => {
    const r = RegisterFields.parse(reg)
    expect(r.whatsapp).toBe('08031234567')
    expect(r.siwes).toBe(false)
    expect(r.heardFrom).toBeUndefined()
  })
  it('accepts the new courses and Outside Nigeria, and rejects AI and unknown states', () => {
    expect(RegisterFields.safeParse({ ...reg, course: 'dm', state: 'Outside Nigeria', heardFrom: 'TikTok' }).success).toBe(true)
    expect(RegisterFields.safeParse({ ...reg, course: 'ai' }).success).toBe(false)
    expect(RegisterFields.safeParse({ ...reg, state: 'Atlantis' }).success).toBe(false)
  })
  it('needs consent, attendance and the SIWES answer', () => {
    const rest: Partial<typeof reg> = { ...reg }
    delete rest.consent
    delete rest.attendance
    delete rest.siwes
    const r = RegisterFields.safeParse(rest)
    expect(r.success).toBe(false)
    if (!r.success) expect(Object.keys(fieldErrors(r.error)).sort()).toEqual(['attendance', 'consent', 'siwes'])
  })
})

describe('EnrolFields', () => {
  it('accepts a complete form and normalises the number', () => {
    const r = EnrolFields.parse(base)
    expect(r.whatsapp).toBe('08031234567')
    expect(r.siwes).toBe(false)
  })

  it('accepts +234 numbers', () => {
    expect(EnrolFields.parse({ ...base, whatsapp: '+234 803 123 4567' }).whatsapp).toBe('+2348031234567')
  })

  it('rejects AI, which is not open yet, and accepts the newer courses', () => {
    expect(EnrolFields.safeParse({ ...base, course: 'ai' }).success).toBe(false)
    expect(EnrolFields.safeParse({ ...base, course: 'cs' }).success).toBe(true)
    expect(EnrolFields.safeParse({ ...base, course: 'dm' }).success).toBe(true)
  })

  it('asks SIWES students for their matric number and level', () => {
    const r = EnrolFields.safeParse({ ...base, siwes: 'yes' })
    expect(r.success).toBe(false)
    if (!r.success) expect(Object.keys(fieldErrors(r.error)).sort()).toEqual(['level', 'matric'])
    expect(EnrolFields.safeParse({ ...base, siwes: 'yes', matric: '210456', level: '300' }).success).toBe(true)
  })

  it('needs the confirmation tick', () => {
    const rest: Partial<typeof base> = { ...base }
    delete rest.confirm
    const r = EnrolFields.safeParse(rest)
    expect(r.success).toBe(false)
    if (!r.success) expect(fieldErrors(r.error).confirm).toMatch(/confirm/)
  })

  it('rejects numbers that are not Nigerian mobiles', () => {
    expect(EnrolFields.safeParse({ ...base, whatsapp: '12345' }).success).toBe(false)
  })
})

describe('chargeCovers', () => {
  const enrolment = { paystack_reference: 'PCA-AAAAA-BBBBB', amount_kobo: 8_000_000 }
  const tx = { reference: 'PCA-AAAAA-BBBBB', status: 'success', amount: 8_000_000, currency: 'NGN' }

  it('accepts a successful naira charge for the full fee', () => {
    expect(chargeCovers(tx, enrolment)).toBe(true)
  })
  it('rejects a failed, short, foreign-currency or mismatched charge', () => {
    expect(chargeCovers({ ...tx, status: 'failed' }, enrolment)).toBe(false)
    expect(chargeCovers({ ...tx, amount: 100 }, enrolment)).toBe(false)
    expect(chargeCovers({ ...tx, currency: 'USD' }, enrolment)).toBe(false)
    expect(chargeCovers({ ...tx, reference: 'PCA-OTHER-00000' }, enrolment)).toBe(false)
  })
})

describe('sniffUpload', () => {
  it('recognises PDFs and images by their first bytes', () => {
    expect(sniffUpload(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]))?.ext).toBe('pdf')
    expect(sniffUpload(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))?.ext).toBe('jpg')
    expect(sniffUpload(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))?.ext).toBe('png')
    expect(sniffUpload(new TextEncoder().encode('<html>'))).toBeNull()
  })
})

describe('newReference', () => {
  it('makes a readable PCA- reference', () => {
    const ref = newReference((n) => new Uint8Array(n).map((_, i) => i * 7))
    expect(ref).toMatch(/^PCA-[A-Z2-9]{5}-[A-Z2-9]{5}$/)
  })
})
