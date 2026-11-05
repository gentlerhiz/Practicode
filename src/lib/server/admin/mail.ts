import 'server-only'
import { serverEnv } from '../env'

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Sends the console sign-in code through Resend. Returns false (and logs) when it could not be sent. */
export async function sendCodeEmail(to: string, code: string): Promise<boolean> {
  const key = serverEnv.resendKey
  if (!key) {
    console.warn('RESEND_API_KEY is not set; the console sign-in code was not sent.')
    return false
  }
  const html = `<!doctype html><html lang="en-GB"><body style="margin:0;background:#f5f4fa;font-family:Poppins,Arial,sans-serif;color:#15122a">
<div style="max-width:520px;margin:0 auto;padding:32px 20px">
<p style="margin:0 0 24px;font-size:15px"><strong>Practi</strong>Code Academy</p>
<div style="background:#ffffff;border:1px solid #dfdce9;border-radius:20px;padding:28px">
<h1 style="margin:0 0 16px;font-size:22px;line-height:30px">Your sign-in code</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:24px;color:#3b3752">Enter this code to open the academy console. It works once, for 10 minutes.</p>
<p style="margin:0 0 18px;font-size:32px;line-height:40px;letter-spacing:8px;font-weight:700;font-family:'JetBrains Mono',Consolas,monospace">${esc(code)}</p>
<p style="margin:0;font-size:14px;line-height:22px;color:#5d5972">If you didn’t ask for this, you can ignore this email. Nobody can sign in without the code.</p>
</div></div></body></html>`
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: serverEnv.emailFrom,
        to: [to],
        subject: 'Your PractiCode Academy console sign-in code',
        html,
        text: `Your PractiCode Academy sign-in code is ${code}. It works once, for 10 minutes. If you didn't ask for it, ignore this email.`,
      }),
    })
    if (!res.ok) console.error('Resend (console code)', res.status, await res.text())
    return res.ok
  } catch (error) {
    console.error('Resend (console code) failed', error)
    return false
  }
}
