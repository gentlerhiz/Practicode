import 'server-only'
import { programmeById } from '@/content/programmes'
import { naira, SIWES_ADMIN_FEE_NAIRA } from '@/lib/enrolment'
import { site } from '@/lib/site'
import { serverEnv } from './env'
import { signedUpload, type EnrolmentRow } from './supabase'

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Sends one email through Resend. Failures are logged, never shown to the student: the record is saved. */
async function send(o: { to: string; subject: string; html: string; replyTo?: string }): Promise<boolean> {
  const key = serverEnv.resendKey
  if (!key) {
    console.warn('RESEND_API_KEY is not set; skipped email:', o.subject)
    return false
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: serverEnv.emailFrom, to: [o.to], subject: o.subject, html: o.html, reply_to: o.replyTo ?? site.email }),
    })
    if (!res.ok) console.error('Resend', res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error('Resend failed', error)
    return false
  }
}

/** A plain, light email that reads well in every client. */
function layout(title: string, body: string) {
  return `<!doctype html><html lang="en-GB"><body style="margin:0;background:#f5f4fa;font-family:Poppins,Arial,sans-serif;color:#15122a">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<p style="margin:0 0 24px;font-size:15px"><strong>Practi</strong>Code Academy</p>
<div style="background:#ffffff;border:1px solid #dfdce9;border-radius:20px;padding:28px">
<h1 style="margin:0 0 16px;font-size:22px;line-height:30px">${title}</h1>
${body}
</div>
<p style="margin:24px 0 0;font-size:12px;line-height:18px;color:#66627a">${esc(site.publisher)} · Company registration no. ${site.companyNumber}<br>${esc(site.address.full)} · ${site.phones[0]}</p>
</div></body></html>`
}

const p = (s: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:24px;color:#3b3752">${s}</p>`
const rows = (items: [string, string][]) =>
  `<table role="presentation" style="width:100%;border-collapse:collapse;margin:8px 0 18px;font-size:14px">${items
    .map(([k, v]) => `<tr><td style="padding:8px 0;color:#5d5972;border-bottom:1px solid #e9e7f1">${esc(k)}</td><td style="padding:8px 0;text-align:right;border-bottom:1px solid #e9e7f1"><strong>${v}</strong></td></tr>`)
    .join('')}</table>`

/** The student's confirmation and the academy's notice for a new enrolment. */
export async function sendEnrolmentEmails(e: EnrolmentRow, kind: 'paid' | 'transfer') {
  const programme = programmeById(e.course).title
  const first = esc(e.full_name.split(/\s+/)[0] ?? e.full_name)
  const amount = naira(e.paid_amount_kobo ?? e.amount_kobo)
  const siwesNote = e.siwes ? p(`As a SIWES/IT student, a ₦${SIWES_ADMIN_FEE_NAIRA.toLocaleString('en-NG')} administrative fee is due on resumption.`) : ''

  const student =
    kind === 'paid'
      ? layout(
          `You’re in, ${first}!`,
          p(`We’ve received your payment for <strong>${esc(programme)}</strong>. Welcome to PractiCode Academy.`) +
            rows([
              ['Name on certificate', esc(e.full_name)],
              ['Programme', esc(programme)],
              ['Amount paid', amount],
              ['Reference', esc(e.paystack_reference ?? '')],
            ]) +
            siwesNote +
            p('Next, we’ll add you to your class WhatsApp group and send your class details and timetable. Bring a laptop if you can.') +
            p(`Questions? Reply to this email or message us on WhatsApp: ${site.phones[0]}.`),
        )
      : layout(
          `Thanks, ${first}. We’ve got your registration.`,
          p(`We’ve received your registration for <strong>${esc(programme)}</strong> and your bank transfer details.`) +
            rows([
              ['Name on certificate', esc(e.full_name)],
              ['Programme', esc(programme)],
              ['Amount', amount],
              ['Transaction ID', esc(e.transfer_id || 'Receipt uploaded')],
            ]) +
            siwesNote +
            p('Once we’ve matched your transfer to our account, we’ll confirm your place by email and WhatsApp, and add you to your class group.') +
            p(`Questions? Reply to this email or message us on WhatsApp: ${site.phones[0]}.`),
        )

  const [letter, receipt] = await Promise.all([signedUpload(e.letter_path), signedUpload(e.receipt_path)])
  const link = (url: string | null, label: string) => (url ? `<a href="${esc(url)}">${label}</a>` : 'None')
  const academy = layout(
    `${kind === 'paid' ? 'Paid' : 'Bank transfer to check'}: ${esc(e.full_name)}`,
    rows([
      ['Programme', esc(programme)],
      ['Status', kind === 'paid' ? 'Paid with Paystack' : 'Bank transfer: check the account'],
      ['Amount', amount],
      ['Email', esc(e.email)],
      ['WhatsApp', esc(e.whatsapp)],
      ['SIWES / IT', e.siwes ? `Yes · ${esc(e.matric_number ?? '')} · ${esc(e.level ?? '')}` : 'No'],
      ...(kind === 'paid'
        ? ([['Paystack reference', esc(e.paystack_reference ?? '')]] as [string, string][])
        : ([['Transaction ID', esc(e.transfer_id || '—')], ['Receipt', link(receipt, 'Open the receipt')]] as [string, string][])),
      ...(e.siwes ? ([['Introduction letter', link(letter, 'Open the letter')]] as [string, string][]) : []),
    ]) + p('Upload links work for seven days. Every enrolment is also in Supabase, table academy_enrolments.'),
  )

  await Promise.all([
    send({ to: e.email, subject: kind === 'paid' ? 'You’re enrolled at PractiCode Academy' : 'We’ve got your registration', html: student }),
    send({ to: serverEnv.inbox, subject: `New enrolment: ${e.full_name} · ${programme}`, html: academy, replyTo: e.email }),
  ])
}

export async function sendMessageEmail(m: { topic: string; name: string; email: string; whatsapp?: string; message: string }) {
  const topics: Record<string, string> = { programmes: 'A programme', siwes: 'SIWES / IT', partner: 'Partnerships', other: 'Something else' }
  await send({
    to: serverEnv.inbox,
    replyTo: m.email,
    subject: `Website message (${topics[m.topic] ?? m.topic}) from ${m.name}`,
    html: layout(
      `New message from ${esc(m.name)}`,
      rows([
        ['Topic', esc(topics[m.topic] ?? m.topic)],
        ['Email', esc(m.email)],
        ['WhatsApp', esc(m.whatsapp || '—')],
      ]) + `<p style="margin:0;font-size:15px;line-height:24px;white-space:pre-wrap;color:#15122a">${esc(m.message)}</p>`,
    ),
  })
}

export async function sendWaitlistEmail(w: { name: string; email: string; whatsapp?: string }) {
  await send({
    to: serverEnv.inbox,
    replyTo: w.email,
    subject: `AI & ML waitlist: ${w.name}`,
    html: layout('New name on the AI & Machine Learning waitlist', rows([['Name', esc(w.name)], ['Email', esc(w.email)], ['WhatsApp', esc(w.whatsapp || '—')]])),
  })
}
