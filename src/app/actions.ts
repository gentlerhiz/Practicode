'use server'

import { randomBytes, randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import {
  EnrolFields,
  fieldErrors,
  MessageFields,
  newReference,
  RegisterFields,
  sniffUpload,
  tuitionKobo,
  UPLOAD_MAX_BYTES,
  WaitlistFields,
} from '@/lib/enrolment'
import { getCatalogueFresh, getCurrentCohortFresh } from '@/lib/server/catalogue'
import { sendEnrolmentEmails, sendMessageEmail, sendRegistrationEmails, sendWaitlistEmail } from '@/lib/server/email'
import { canStore, paystackEnabled } from '@/lib/server/env'
import { startPayment } from '@/lib/server/paystack'
import { admin, UPLOADS_BUCKET, type EnrolmentRow } from '@/lib/server/supabase'
import { site } from '@/lib/site'

export type FormResult =
  | { ok: true; redirect?: string }
  | { ok: false; errors: Record<string, string>; message?: string; unavailable?: boolean }

const fields = (fd: FormData) => Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string')) as Record<string, string>
const blankToUndefined = (o: Record<string, string>) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v.trim() === '' ? undefined : v]))
// A hidden field people never see. Bots fill it; we act as if their form was sent.
const isBot = (fd: FormData) => String(fd.get('company') ?? '') !== ''

const unavailable: FormResult = {
  ok: false,
  unavailable: true,
  errors: {},
  message: 'We can’t take this form online right now. Please message us on WhatsApp and we’ll help you straight away.',
}

/** The address Paystack sends people back to: this deployment's own origin, so previews work too. */
async function origin() {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https')
  return host ? `${proto}://${host}` : site.url
}

async function upload(file: FormDataEntryValue | null, path: string): Promise<{ path?: string; error?: string }> {
  if (!(file instanceof File) || file.size === 0) return {}
  if (file.size > UPLOAD_MAX_BYTES) return { error: 'That file is over 4 MB. Try a smaller photo or a PDF.' }
  const bytes = new Uint8Array(await file.arrayBuffer())
  const kind = sniffUpload(bytes)
  if (!kind) return { error: 'Upload a PDF or a photo (JPG, PNG or WebP).' }
  const full = `${path}.${kind.ext}`
  const { error } = await admin().storage.from(UPLOADS_BUCKET).upload(full, bytes, { contentType: kind.type, upsert: false })
  if (error) throw new Error(`Upload failed: ${error.message}`)
  return { path: full }
}

/** Saves an enrolment, then sends the student to Paystack or to the "we've got it" page. */
export async function enrol(fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, redirect: '/' }
  if (!canStore()) return unavailable

  const parsed = EnrolFields.safeParse(blankToUndefined(fields(fd)))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), message: 'Please check the highlighted fields.' }
  const v = parsed.data

  // Read fresh: the cohort and the fees are checked against the database as they are right now.
  const [cohort, catalogue] = await Promise.all([getCurrentCohortFresh(), getCatalogueFresh()])
  if (!cohort || !cohort.enrolmentOpen) {
    return { ok: false, errors: {}, message: 'Enrolment isn’t open right now. You can register free for the next cohort, or message us on WhatsApp.' }
  }
  if (!catalogue.live.includes(v.course)) return { ok: false, errors: { course: 'That course isn’t open for enrolment right now.' } }

  const method = v.method === 'paystack' && !paystackEnabled() ? null : v.method
  if (!method) return { ok: false, errors: { method: 'Online payment isn’t available right now. Choose bank transfer.' } }

  const receiptFile = fd.get('receipt')
  const hasReceipt = receiptFile instanceof File && receiptFile.size > 0
  if (method === 'transfer' && !v.transferId && !hasReceipt) {
    return { ok: false, errors: { transferId: 'Add your transaction ID or upload your receipt.' } }
  }
  const letterFile = fd.get('letter')
  if (v.siwes && !(letterFile instanceof File && letterFile.size > 0)) {
    return { ok: false, errors: { letter: 'Upload your introduction letter.' } }
  }

  const id = randomUUID()
  try {
    const letter = v.siwes ? await upload(letterFile, `${id}/introduction-letter`) : {}
    if (letter.error) return { ok: false, errors: { letter: letter.error } }
    const receipt = method === 'transfer' ? await upload(receiptFile, `${id}/receipt`) : {}
    if (receipt.error) return { ok: false, errors: { receipt: receipt.error } }

    const amount = tuitionKobo(catalogue.pricing.feeKobo[v.course], v.siwes, catalogue.pricing.siwesPercent)
    const reference = method === 'paystack' ? newReference((n) => randomBytes(n)) : null
    const row = {
      id,
      email: v.email.toLowerCase(),
      full_name: v.fullName,
      whatsapp: v.whatsapp,
      course: v.course,
      cohort_id: cohort.id,
      siwes: v.siwes,
      matric_number: v.siwes ? (v.matric ?? null) : null,
      level: v.siwes ? (v.level ?? null) : null,
      letter_path: letter.path ?? null,
      method,
      amount_kobo: amount,
      status: method === 'paystack' ? 'awaiting_payment' : 'transfer_submitted',
      paystack_reference: reference,
      transfer_id: method === 'transfer' ? (v.transferId ?? null) : null,
      receipt_path: receipt.path ?? null,
    }
    const { data, error } = await admin().from('academy_enrolments').insert(row).select().single<EnrolmentRow>()
    if (error || !data) throw new Error(`Enrolment not saved: ${error?.message}`)

    if (method === 'transfer') {
      await sendEnrolmentEmails(data, 'transfer')
      return { ok: true, redirect: `/enrol/received/${id}` }
    }
    const url = await startPayment({
      email: row.email,
      amountKobo: amount,
      reference: reference!,
      callbackUrl: `${await origin()}/enrol/confirmed`,
      enrolmentId: id,
      course: v.course,
    })
    return { ok: true, redirect: url }
  } catch (error) {
    console.error('Enrolment failed', error)
    return {
      ok: false,
      errors: {},
      message: 'Something went wrong on our side, and nothing has been charged. Please try again, or message us on WhatsApp.',
    }
  }
}

export async function sendMessage(fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true }
  if (!canStore()) return unavailable
  const parsed = MessageFields.safeParse(fields(fd))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), message: 'Please check the highlighted fields.' }
  const m = parsed.data
  try {
    const { error } = await admin()
      .from('academy_messages')
      .insert({ topic: m.topic, name: m.name, email: m.email.toLowerCase(), whatsapp: m.whatsapp || null, message: m.message })
    if (error) throw new Error(error.message)
    await sendMessageEmail({ ...m, whatsapp: m.whatsapp || undefined })
    return { ok: true }
  } catch (error) {
    console.error('Message failed', error)
    return { ok: false, errors: {}, message: 'Your message didn’t send. Please try again, or message us on WhatsApp.' }
  }
}

export async function joinWaitlist(fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true }
  if (!canStore()) return unavailable
  const parsed = WaitlistFields.safeParse(fields(fd))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), message: 'Please check the highlighted fields.' }
  const w = parsed.data
  try {
    const { error } = await admin()
      .from('academy_waitlist')
      .upsert({ course: w.course, name: w.name, email: w.email.toLowerCase(), whatsapp: w.whatsapp || null }, { onConflict: 'course,email' })
    if (error) throw new Error(error.message)
    await sendWaitlistEmail({ ...w, whatsapp: w.whatsapp || undefined })
    return { ok: true }
  } catch (error) {
    console.error('Waitlist failed', error)
    return { ok: false, errors: {}, message: 'That didn’t save. Please try again, or message us on WhatsApp.' }
  }
}

/** Free registration for the current cohort: no payment, nothing uploaded. */
export async function register(fd: FormData): Promise<FormResult> {
  if (isBot(fd)) return { ok: true, redirect: '/register/done' }
  if (!canStore()) return unavailable

  const parsed = RegisterFields.safeParse(blankToUndefined(fields(fd)))
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error), message: 'Please check the highlighted fields.' }
  const v = parsed.data

  try {
    const [cohort, catalogue] = await Promise.all([getCurrentCohortFresh(), getCatalogueFresh()])
    if (!cohort || !cohort.registrationOpen) {
      return { ok: false, errors: {}, message: 'Registration isn’t open right now. Message us on WhatsApp and we’ll tell you what’s next.' }
    }
    if (!catalogue.live.includes(v.course)) return { ok: false, errors: { course: 'That course isn’t open for registration right now.' } }

    const email = v.email.toLowerCase()
    const { error } = await admin()
      .from('academy_registrations')
      .insert({
        cohort_id: cohort.id,
        full_name: v.fullName,
        email,
        whatsapp: v.whatsapp,
        course: v.course,
        attendance: v.attendance,
        city: v.city,
        state: v.state,
        siwes: v.siwes,
        heard_from: v.heardFrom ?? null,
        consent: true,
      })
    if (error) {
      if (error.code === '23505') return { ok: false, errors: { email: `This email is already registered for ${cohort.name}. We’ll be in touch on WhatsApp.` } }
      throw new Error(error.message)
    }
    // The registration is saved; a failed email must not undo it.
    try {
      await sendRegistrationEmails({ ...v, email }, cohort.name)
    } catch (mailError) {
      console.error('Registration emails failed', mailError)
    }
    return { ok: true, redirect: `/register/done` }
  } catch (error) {
    console.error('Registration failed', error)
    return { ok: false, errors: {}, message: 'Something went wrong on our side, and nothing has been saved. Please try again, or message us on WhatsApp.' }
  }
}
