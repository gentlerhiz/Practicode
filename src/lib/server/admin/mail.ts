import 'server-only'
import { code as codeBlock, layout, p, plain } from '@/lib/email/kit'
import { brand, send } from '../email'

/** Sends the console sign-in code. Returns false (and logs) when it could not be sent. */
export async function sendCodeEmail(to: string, code: string): Promise<boolean> {
  const html = layout(brand, {
    preheader: `Your sign-in code is ${code}. It works once, for 10 minutes.`,
    eyebrow: 'Academy console',
    title: 'Your sign-in code',
    body:
      p('Enter this code to open the PractiCode Academy console. It works once, for the next 10 minutes.') +
      codeBlock(code) +
      p('If you didn’t ask for this, you can ignore this email. Nobody can sign in without the code.', { muted: true, size: 14, last: true }),
    reason: `Sent to ${to} because someone asked to sign in to the academy console.`,
  })
  const text = plain(
    [`Your PractiCode Academy console sign-in code is ${code}.`, 'It works once, for 10 minutes.', '', 'If you didn’t ask for this, ignore this email.'],
    brand,
  )
  return send({ to, subject: `${code} is your PractiCode Academy sign-in code`, html, text })
}
