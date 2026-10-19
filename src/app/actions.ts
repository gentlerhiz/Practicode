'use server'

import { randomBytes, randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import {
  EnrolFields,
  feeKobo,
  fieldErrors,
  MessageFields,
  newReference,
  sniffUpload,
  UPLOAD_MAX_BYTES,
  WaitlistFields,
} from '@/lib/enrolment'
import { sendEnrolmentEmails, sendMessageEmail, sendWaitlistEmail } from '@/lib/server/email'
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

    const amount = feeKobo(v.siwes)
    const reference = method === 'paystack' ? newReference((n) => randomBytes(n)) : null
    const row = {
      id,
      email: v.email.toLowerCase(),
      full_name: v.fullName,
      whatsapp: v.whatsapp,
      course: v.course,
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
