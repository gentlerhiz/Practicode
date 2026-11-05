import 'server-only'
import { programmeById, type ProgrammeId } from '@/content/programmes'
import { naira, type RegisterInput } from '@/lib/enrolment'
import { button, courseCard, details, esc, h2, layout, note, p, plain, signOff, steps, type Brand } from '@/lib/email/kit'
import { absoluteUrl, site } from '@/lib/site'
import { getCatalogue } from './catalogue'
import { serverEnv } from './env'
import { signedUpload, type EnrolmentRow } from './supabase'

export const brand: Brand = {
  siteUrl: site.url,
  logoUrl: absoluteUrl('/images/email/academy-logo.png'),
  publisher: site.publisher,
  companyNumber: site.companyNumber,
  address: site.address.full,
  phone: site.phones[0]!,
  socials: site.socials.map((s) => ({ label: s.label, href: s.href })),
}

const CONSOLE = '/code/administrator/console'
const LINK = 'color:#3550E6;font-weight:600'

/** Sends one email through Resend. Failures are logged, never shown to the student: the record is saved. */
export async function send(o: { to: string; subject: string; html: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = serverEnv.resendKey
  if (!key) {
    console.warn('RESEND_API_KEY is not set; skipped email:', o.subject)
    return false
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: serverEnv.emailFrom, to: [o.to], subject: o.subject, html: o.html, text: o.text, reply_to: o.replyTo ?? site.email }),
    })
    if (!res.ok) console.error('Resend', res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error('Resend failed', error)
    return false
  }
}

const firstName = (full: string) => full.trim().split(/\s+/)[0] ?? full
const spacer = `<div style="height:20px;line-height:20px;font-size:0">&nbsp;</div>`
const mailto = (email: string) => `<a href="mailto:${esc(email)}" style="${LINK}">${esc(email)}</a>`
const whatsappHelp = () =>
  p(
    `Questions? Just reply to this email, or chat with us on WhatsApp at <a href="${esc(site.whatsapp)}" style="${LINK}">${esc(site.phones[0]!)}</a>. A real person reads every message.`,
    { muted: true, size: 15, last: true },
  )
const attendLine = (attendance: 'in_person' | 'online') =>
  attendance === 'in_person' ? `You’ll learn in person at our centre, ${site.address.full}.` : 'You’ll join live classes online, from wherever you are.'

/** The student's welcome and the academy's notice for a free registration. Every user value is escaped. */
export async function sendRegistrationEmails(r: RegisterInput & { id?: string }, cohortName: string) {
  const prog = programmeById(r.course as ProgrammeId)
  const first = firstName(r.fullName)
  const attend = r.attendance === 'in_person' ? 'In person in Ibadan' : 'Online'
  const { pricing } = await getCatalogue()
  const programmeUrl = absoluteUrl(`/programmes/${prog.slug}`)

  const html = layout(brand, {
    preheader: `Your place in ${cohortName} is saved. Here’s what happens next.`,
    eyebrow: cohortName,
    title: `Welcome, ${first}. You’re registered.`,
    body:
      p(
        `Thank you for choosing PractiCode Academy, and it’s great to have you with us from <strong>${esc(r.city)}</strong>. Your place in <strong>${esc(cohortName)}</strong> is saved. Registration is free, so you haven’t paid anything yet.`,
      ) +
      courseCard({ id: prog.id, title: prog.title, meta: `${prog.meta} · ${attend}`, summary: prog.summary }) +
      (r.siwes ? note(`<strong>SIWES or IT student?</strong> You’ll get ${pricing.siwesPercent}% off tuition when you enrol. Keep your introduction letter ready.`) : '') +
      h2('What happens next') +
      steps([
        { title: 'We add you to the cohort’s WhatsApp group', html: `Within a few days, on <strong>${esc(r.whatsapp)}</strong>. Updates, dates and class details go there first.` },
        { title: 'You get to know your course', html: `${esc(attendLine(r.attendance))} Have a look at the weeks ahead and the projects you’ll build.` },
        { title: 'You enrol when you’re ready', html: 'When enrolment opens for your cohort, you pay online or by bank transfer. We’ll remind you.' },
      ]) +
      button(`Explore ${prog.short}`, programmeUrl) +
      signOff('I can’t wait to see what you build. See you in class,') +
      spacer +
      whatsappHelp(),
    reason: `You’re getting this because you registered at practicode.tech with ${r.email}.`,
  })
  const text = plain(
    [
      `Welcome, ${first}. You’re registered.`,
      '',
      `Your place in ${cohortName} is saved. Registration is free, so you haven’t paid anything yet.`,
      '',
      `Course: ${prog.title} (${prog.meta})`,
      `How you’ll attend: ${attend}`,
      r.siwes && `SIWES or IT student: you’ll get ${pricing.siwesPercent}% off tuition when you enrol.`,
      '',
      'What happens next',
      `1. We add you to the cohort’s WhatsApp group within a few days, on ${r.whatsapp}.`,
      `2. ${attendLine(r.attendance)} Explore your course: ${programmeUrl}`,
      '3. You enrol when you’re ready: pay online or by bank transfer when enrolment opens.',
      '',
      'See you in class,',
      'Idris Akande Rasaq, Founder, PractiCode Academy',
      '',
      `Questions? Reply to this email or WhatsApp us on ${site.phones[0]}.`,
    ],
    brand,
  )

  const consoleUrl = absoluteUrl(r.id ? `${CONSOLE}/registrations/${r.id}` : `${CONSOLE}/registrations`)
  const academyHtml = layout(brand, {
    preheader: `${r.fullName} registered for ${prog.title}, ${attend.toLowerCase()}.`,
    eyebrow: cohortName,
    title: `New registration: ${r.fullName}`,
    body:
      details([
        ['Course', esc(prog.title)],
        ['Attendance', esc(attend)],
        ['Email', mailto(r.email)],
        ['WhatsApp', esc(r.whatsapp)],
        ['City and state', `${esc(r.city)}, ${esc(r.state)}`],
        ['SIWES or IT', r.siwes ? 'Yes' : 'No'],
        ['Heard about us', esc(r.heardFrom ?? '—')],
      ]) +
      button('Open in the console', consoleUrl) +
      p('Reply to this email to write to them directly.', { muted: true, size: 14, last: true }),
    reason: 'Sent to the academy inbox for every new registration on practicode.tech.',
  })
  const academyText = plain(
    [
      `New registration: ${r.fullName}`,
      `Cohort: ${cohortName}`,
      `Course: ${prog.title}`,
      `Attendance: ${attend}`,
      `Email: ${r.email}`,
      `WhatsApp: ${r.whatsapp}`,
      `City and state: ${r.city}, ${r.state}`,
      `SIWES or IT: ${r.siwes ? 'Yes' : 'No'}`,
      `Heard about us: ${r.heardFrom ?? '—'}`,
      '',
      `Open in the console: ${consoleUrl}`,
    ],
    brand,
  )

  await Promise.all([
    send({ to: r.email, subject: `Welcome, ${first}. You’re registered for ${cohortName}`, html, text }),
    send({ to: serverEnv.inbox, subject: `New registration: ${r.fullName} · ${prog.title}`, html: academyHtml, text: academyText, replyTo: r.email }),
  ])
}

/** The student's confirmation and the academy's notice for a new enrolment. */
export async function sendEnrolmentEmails(e: EnrolmentRow, kind: 'paid' | 'transfer') {
  const prog = programmeById(e.course as ProgrammeId)
  const first = firstName(e.full_name)
  const amount = naira(e.paid_amount_kobo ?? e.amount_kobo)
  const { pricing } = await getCatalogue()
  const programmeUrl = absoluteUrl(`/programmes/${prog.slug}`)
  const paid = kind === 'paid'
  const siwesNote = e.siwes
    ? note(`<strong>SIWES or IT student:</strong> your ${pricing.siwesPercent}% discount is applied. A ${naira(pricing.siwesAdminFeeKobo)} administrative fee is due when you resume.`)
    : ''

  const html = layout(brand, {
    preheader: paid ? `Payment received. Welcome to ${prog.title}.` : 'We’ve got your transfer details and we’re checking them now.',
    eyebrow: paid ? 'Payment received' : 'Transfer being checked',
    eyebrowTone: paid ? 'success' : 'warning',
    title: paid ? `You’re in, ${first}. Welcome to the class.` : `Thanks, ${first}. We’re checking your transfer.`,
    body:
      p(
        paid
          ? `Your payment went through, and your place on <strong>${esc(prog.title)}</strong> is confirmed. I’m really glad you’ve joined us.`
          : `We’ve received your enrolment for <strong>${esc(prog.title)}</strong> and your bank transfer details. As soon as we’ve matched the transfer to our account, we’ll confirm your place.`,
      ) +
      courseCard({ id: prog.id, title: prog.title, meta: prog.meta, summary: prog.summary }) +
      details([
        ['Name on your certificate', esc(e.full_name)],
        [paid ? 'Amount paid' : 'Amount', amount],
        paid ? ['Payment reference', esc(e.paystack_reference ?? '—')] : ['Transaction ID', esc(e.transfer_id || 'Receipt uploaded')],
      ]) +
      siwesNote +
      h2('What happens next') +
      steps(
        paid
          ? [
              { title: 'You join your class WhatsApp group', html: `We’ll add you on <strong>${esc(e.whatsapp)}</strong> and share your timetable there.` },
              { title: 'You get ready for day one', html: 'Bring a laptop if you can, and a notebook. You’ll start building from the first week.' },
              { title: 'You build real projects', html: 'Every few weeks you finish something you can show people, ending with your capstone.' },
            ]
          : [
              { title: 'We match your transfer', html: 'We check our account for your payment. If anything doesn’t match, we’ll message you.' },
              { title: 'We confirm your place', html: `You’ll get a confirmation by email and on WhatsApp at <strong>${esc(e.whatsapp)}</strong>.` },
              { title: 'You join your class group', html: 'We add you to your class WhatsApp group and share your timetable.' },
            ],
      ) +
      button('See your course outline', programmeUrl) +
      signOff(paid ? 'Welcome aboard. See you in class,' : 'Thank you for your patience. Speak soon,') +
      spacer +
      whatsappHelp(),
    reason: `You’re getting this because you enrolled at practicode.tech with ${e.email}.`,
  })
  const text = plain(
    [
      paid ? `You’re in, ${first}. Welcome to ${prog.title}.` : `Thanks, ${first}. We’re checking your transfer for ${prog.title}.`,
      '',
      `Name on your certificate: ${e.full_name}`,
      `${paid ? 'Amount paid' : 'Amount'}: ${amount}`,
      paid ? `Payment reference: ${e.paystack_reference ?? '—'}` : `Transaction ID: ${e.transfer_id || 'Receipt uploaded'}`,
      e.siwes && `SIWES or IT: ${pricing.siwesPercent}% discount applied; ${naira(pricing.siwesAdminFeeKobo)} administrative fee due when you resume.`,
      '',
      paid
        ? `Next: we’ll add you to your class WhatsApp group on ${e.whatsapp} and share your timetable. Bring a laptop if you can.`
        : `Next: once we’ve matched your transfer, we’ll confirm by email and on WhatsApp at ${e.whatsapp}.`,
      `Your course outline: ${programmeUrl}`,
      '',
      'Idris Akande Rasaq, Founder, PractiCode Academy',
      `Questions? Reply to this email or WhatsApp us on ${site.phones[0]}.`,
    ],
    brand,
  )

  const [letter, receipt] = await Promise.all([signedUpload(e.letter_path), signedUpload(e.receipt_path)])
  const link = (url: string | null, label: string) => (url ? `<a href="${esc(url)}" style="${LINK}">${label}</a>` : 'None')
  const consoleUrl = absoluteUrl(`${CONSOLE}/enrolments/${e.id}`)
  const academyHtml = layout(brand, {
    preheader: `${e.full_name} · ${prog.title} · ${amount}`,
    eyebrow: paid ? 'Paid with Paystack' : 'Bank transfer to check',
    eyebrowTone: paid ? 'success' : 'warning',
    title: `${paid ? 'New enrolment' : 'Transfer to check'}: ${e.full_name}`,
    body:
      details([
        ['Course', esc(prog.title)],
        ['Amount', amount],
        ['Email', mailto(e.email)],
        ['WhatsApp', esc(e.whatsapp)],
        ['SIWES or IT', e.siwes ? `Yes · ${esc(e.matric_number ?? '')} · ${esc(e.level ?? '')}` : 'No'],
        ...(paid
          ? ([['Paystack reference', esc(e.paystack_reference ?? '')]] as [string, string][])
          : ([['Transaction ID', esc(e.transfer_id || '—')], ['Receipt', link(receipt, 'Open the receipt')]] as [string, string][])),
        ...(e.siwes ? ([['Introduction letter', link(letter, 'Open the letter')]] as [string, string][]) : []),
      ]) +
      button(paid ? 'Open in the console' : 'Check and confirm in the console', consoleUrl) +
      p('Upload links work for seven days. Reply to this email to write to the student.', { muted: true, size: 14, last: true }),
    reason: 'Sent to the academy inbox for every new enrolment on practicode.tech.',
  })
  const academyText = plain(
    [
      `${paid ? 'New enrolment (paid)' : 'Transfer to check'}: ${e.full_name}`,
      `Course: ${prog.title}`,
      `Amount: ${amount}`,
      `Email: ${e.email}`,
      `WhatsApp: ${e.whatsapp}`,
      `SIWES or IT: ${e.siwes ? 'Yes' : 'No'}`,
      paid ? `Paystack reference: ${e.paystack_reference ?? ''}` : `Transaction ID: ${e.transfer_id || '—'}`,
      receipt && `Receipt: ${receipt}`,
      letter && `Introduction letter: ${letter}`,
      '',
      `Open in the console: ${consoleUrl}`,
    ],
    brand,
  )

  await Promise.all([
    send({ to: e.email, subject: paid ? `You’re in, ${first}. Welcome to ${prog.title}` : `We’re checking your transfer, ${first}`, html, text }),
    send({ to: serverEnv.inbox, subject: `${paid ? 'New enrolment' : 'Transfer to check'}: ${e.full_name} · ${prog.title}`, html: academyHtml, text: academyText, replyTo: e.email }),
  ])
}

const TOPICS: Record<string, string> = { programmes: 'A programme', siwes: 'SIWES / IT', partner: 'Partnerships', other: 'Something else' }

export async function sendMessageEmail(m: { topic: string; name: string; email: string; whatsapp?: string; message: string }) {
  const topic = TOPICS[m.topic] ?? m.topic
  const consoleUrl = absoluteUrl(`${CONSOLE}/messages`)
  await send({
    to: serverEnv.inbox,
    replyTo: m.email,
    subject: `Website message (${topic}) from ${m.name}`,
    html: layout(brand, {
      preheader: m.message.slice(0, 120),
      eyebrow: topic,
      title: `New message from ${m.name}`,
      body:
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px"><tr><td style="padding:18px 20px;border-left:4px solid #3D5AF5;background:#F2F0F8;border-radius:0 14px 14px 0;font-family:Poppins,Arial,sans-serif;font-size:15px;line-height:24px;color:#15122A;white-space:pre-wrap">${esc(m.message)}</td></tr></table>` +
        details([
          ['Email', mailto(m.email)],
          ['WhatsApp', esc(m.whatsapp || '—')],
        ]) +
        button('Open messages in the console', consoleUrl) +
        p('Reply to this email to answer them directly.', { muted: true, size: 14, last: true }),
      reason: 'Sent to the academy inbox from the contact form on practicode.tech.',
    }),
    text: plain([`New message from ${m.name} (${topic})`, `Email: ${m.email}`, `WhatsApp: ${m.whatsapp || '—'}`, '', m.message, '', `Console: ${consoleUrl}`], brand),
  })
}

export async function sendWaitlistEmail(w: { name: string; email: string; whatsapp?: string }) {
  const consoleUrl = absoluteUrl(`${CONSOLE}/waitlist`)
  await send({
    to: serverEnv.inbox,
    replyTo: w.email,
    subject: `AI & ML waitlist: ${w.name}`,
    html: layout(brand, {
      preheader: `${w.name} wants to hear when AI & Machine Learning opens.`,
      eyebrow: 'AI & Machine Learning',
      title: `${w.name} joined the waitlist`,
      body:
        details([
          ['Name', esc(w.name)],
          ['Email', mailto(w.email)],
          ['WhatsApp', esc(w.whatsapp || '—')],
        ]) + button('Open the waitlist', consoleUrl),
      reason: 'Sent to the academy inbox for every waitlist sign-up on practicode.tech.',
    }),
    text: plain([`${w.name} joined the AI & ML waitlist`, `Email: ${w.email}`, `WhatsApp: ${w.whatsapp || '—'}`, '', `Console: ${consoleUrl}`], brand),
  })
}
