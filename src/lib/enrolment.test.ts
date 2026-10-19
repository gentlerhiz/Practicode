import { describe, expect, it } from 'vitest'
import { chargeCovers, EnrolFields, feeKobo, fieldErrors, naira, newReference, sniffUpload } from './enrolment'

const base = {
  email: 'ada@example.com',
  fullName: 'Adaeze Bello',
  whatsapp: '0803 123 4567',
  course: 'fe',
  siwes: 'no',
  method: 'paystack',
  confirm: 'on',
}

describe('fees', () => {
  it('charges ₦80,000, or ₦40,000 for SIWES and IT students', () => {
    expect(feeKobo(false)).toBe(8_000_000)
    expect(feeKobo(true)).toBe(4_000_000)
    expect(naira(feeKobo(false))).toBe('₦80,000')
    expect(naira(feeKobo(true))).toBe('₦40,000')
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

  it('rejects AI, which is not open yet', () => {
    expect(EnrolFields.safeParse({ ...base, course: 'ai' }).success).toBe(false)
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
