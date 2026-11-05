/**
 * The PractiCode email kit: one responsive, table-based layout in the PractiCode Learn look (Prism light,
 * white cards with hairline borders, one blue accent, a Practi Yellow highlight, the Academy logo).
 * Pure functions with no server imports, so they can be unit-tested. Every caller escapes user text with
 * `esc` before it reaches these helpers; helpers that take plain text escape it themselves.
 */

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export const C = {
  page: '#F5F4FA',
  surface: '#FFFFFF',
  sunken: '#F2F0F8',
  line: '#DFDCE9',
  lineSubtle: '#E9E7F1',
  ink: '#15122A',
  inkSoft: '#3B3752',
  muted: '#5D5972',
  subtle: '#66627A',
  blue: '#3D5AF5',
  blueText: '#3550E6',
  blueTint: '#EAEDFF',
  yellow: '#FED606',
  success: '#08704F',
  successTint: '#E6F1ED',
  warning: '#B23A0A',
  warningTint: '#FFEFE4',
} as const

/** Course colours, matching the site. White text on each passes 4.5:1. */
export const COURSE_COLOUR: Record<string, string> = {
  fe: '#3D5AF5',
  da: '#0A7D5C',
  ux: '#D9306F',
  cs: '#0E7490',
  dm: '#C2410C',
  ai: '#6E4CF5',
}

const SANS = "Poppins,'Segoe UI',Helvetica,Arial,sans-serif"
const DISPLAY = "'Bricolage Grotesque',Poppins,'Segoe UI',Helvetica,Arial,sans-serif"
const MONO = "'JetBrains Mono',Consolas,'Courier New',monospace"

export type Social = { label: string; href: string }
export type Brand = {
  siteUrl: string
  logoUrl: string
  publisher: string
  companyNumber: string
  address: string
  phone: string
  socials: Social[]
}

/** A paragraph. `html` must already be escaped. */
export const p = (html: string, o: { muted?: boolean; size?: number; last?: boolean } = {}) =>
  `<p style="margin:0 0 ${o.last ? 0 : 16}px;font-family:${SANS};font-size:${o.size ?? 16}px;line-height:${Math.round((o.size ?? 16) * 1.6)}px;color:${o.muted ? C.muted : C.inkSoft}">${html}</p>`

export const h2 = (text: string) =>
  `<h2 style="margin:28px 0 14px;font-family:${DISPLAY};font-size:19px;line-height:26px;font-weight:700;letter-spacing:-0.3px;color:${C.ink}">${esc(text)}</h2>`

/** A small rounded label, e.g. the cohort name. */
export const chip = (text: string, tone: 'blue' | 'success' | 'warning' = 'blue') => {
  const [bg, fg] = tone === 'success' ? [C.successTint, C.success] : tone === 'warning' ? [C.warningTint, C.warning] : [C.blueTint, C.blueText]
  return `<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${bg};color:${fg};font-family:${SANS};font-size:13px;line-height:18px;font-weight:600">${esc(text)}</span>`
}

/** A bulletproof button: a table cell with a background, so Outlook draws it too. */
export function button(label: string, href: string, kind: 'primary' | 'secondary' = 'primary') {
  const primary = kind === 'primary'
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="pc-btn" style="margin:8px 0 4px"><tr><td align="center" style="border-radius:999px;background:${primary ? C.blue : C.surface};${primary ? '' : `border:1px solid ${C.line};`}">
<a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:15px;line-height:20px;font-weight:600;color:${primary ? '#FFFFFF' : C.ink};text-decoration:none;border-radius:999px">${esc(label)}&nbsp;&rarr;</a>
</td></tr></table>`
}

/** Label and value rows on a sunken panel. Values must already be escaped. */
export function details(items: [string, string][]) {
  const rows = items
    .map(
      ([k, v], i) => `<tr>
<td class="pc-dt" style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ''}font-family:${SANS};font-size:14px;line-height:20px;color:${C.muted};width:42%;vertical-align:top">${esc(k)}</td>
<td class="pc-dd" style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ''}font-family:${SANS};font-size:14px;line-height:20px;color:${C.ink};font-weight:600;text-align:right;vertical-align:top;word-break:break-word">${v}</td>
</tr>`,
    )
    .join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px;background:${C.sunken};border-radius:16px"><tr><td style="padding:6px 20px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
</td></tr></table>`
}

/** The student's course, on a card with a coloured edge. Text is plain and escaped here. */
export function courseCard(o: { id: string; title: string; meta: string; summary: string }) {
  const colour = COURSE_COLOUR[o.id] ?? C.blue
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px;border:1px solid ${C.line};border-radius:16px;border-collapse:separate"><tr>
<td width="6" style="width:6px;background:${colour};border-radius:16px 0 0 16px;font-size:0;line-height:0">&nbsp;</td>
<td style="padding:18px 20px">
<p style="margin:0 0 4px;font-family:${SANS};font-size:13px;line-height:18px;font-weight:600;color:${colour}">${esc(o.meta)}</p>
<p style="margin:0 0 6px;font-family:${DISPLAY};font-size:20px;line-height:26px;font-weight:700;letter-spacing:-0.3px;color:${C.ink}">${esc(o.title)}</p>
<p style="margin:0;font-family:${SANS};font-size:15px;line-height:23px;color:${C.inkSoft}">${esc(o.summary)}</p>
</td></tr></table>`
}

/** Numbered next steps. Each step's `html` must already be escaped. */
export function steps(items: { title: string; html: string }[]) {
  const rows = items
    .map(
      (s, i) => `<tr>
<td width="44" style="width:44px;padding:0 0 18px;vertical-align:top">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" width="30" height="30" style="width:30px;height:30px;border-radius:999px;background:${C.blueTint};font-family:${SANS};font-size:14px;line-height:30px;font-weight:700;color:${C.blueText}">${i + 1}</td></tr></table>
</td>
<td style="padding:4px 0 18px;vertical-align:top">
<p style="margin:0 0 3px;font-family:${SANS};font-size:15px;line-height:22px;font-weight:600;color:${C.ink}">${esc(s.title)}</p>
<p style="margin:0;font-family:${SANS};font-size:14px;line-height:22px;color:${C.muted}">${s.html}</p>
</td></tr>`,
    )
    .join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 8px">${rows}</table>`
}

/** A tinted note, e.g. for SIWES students. `html` must already be escaped. */
export const note = (html: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 20px"><tr><td style="padding:14px 18px;border-radius:14px;background:${C.blueTint};font-family:${SANS};font-size:14px;line-height:22px;color:${C.ink}">${html}</td></tr></table>`

/** A large one-time code. */
export const code = (value: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 20px"><tr><td align="center" style="padding:22px 12px;border-radius:16px;background:${C.sunken};font-family:${MONO};font-size:34px;line-height:40px;font-weight:700;letter-spacing:10px;color:${C.ink}">${esc(value)}</td></tr></table>`

/** A personal sign-off from the founder. */
export const signOff = (closing: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;border-top:1px solid ${C.lineSubtle}"><tr><td style="padding-top:22px">
<p style="margin:0 0 4px;font-family:${SANS};font-size:15px;line-height:22px;color:${C.inkSoft}">${esc(closing)}</p>
<p style="margin:0;font-family:${SANS};font-size:15px;line-height:22px;font-weight:600;color:${C.ink}">Idris Akande Rasaq</p>
<p style="margin:0;font-family:${SANS};font-size:13px;line-height:20px;color:${C.muted}">Founder, PractiCode Academy</p>
</td></tr></table>`

export type EmailParts = {
  /** The hidden line inbox lists show after the subject. Plain text. */
  preheader: string
  /** A chip above the title, e.g. the cohort name. Plain text. */
  eyebrow?: string
  eyebrowTone?: 'blue' | 'success' | 'warning'
  /** The headline. Plain text. */
  title: string
  /** The body, built from the helpers above. */
  body: string
  /** Why the reader got this email. Plain text. */
  reason: string
}

/** The whole email: logo, one white card with a yellow top edge, and the footer. */
export function layout(brand: Brand, e: EmailParts) {
  const socials = brand.socials
    .map((s) => `<a href="${esc(s.href)}" style="color:${C.muted};text-decoration:underline">${esc(s.label)}</a>`)
    .join('&nbsp;&nbsp;·&nbsp;&nbsp;')
  return `<!doctype html>
<html lang="en-GB" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${esc(e.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  body{margin:0;padding:0;width:100%!important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table{border-collapse:collapse}
  img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}
  a{color:${C.blueText}}
  @media (max-width:620px){
    .pc-outer{padding:20px 12px!important}
    .pc-card{padding:28px 20px!important;border-radius:20px!important}
    .pc-title{font-size:26px!important;line-height:32px!important}
    .pc-btn,.pc-btn td,.pc-btn a{width:100%!important;display:block!important;text-align:center!important;box-sizing:border-box}
    .pc-dt,.pc-dd{display:block!important;width:100%!important;text-align:left!important}
    .pc-dt{padding-bottom:0!important}
    .pc-dd{border-top:0!important;padding-top:2px!important}
    .pc-hide-sm{display:none!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page}">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${C.page};opacity:0">${esc(e.preheader)}${'&nbsp;&zwnj;'.repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page}">
<tr><td align="center" class="pc-outer" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">
<tr><td style="padding:0 4px 20px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td><a href="${esc(brand.siteUrl)}" style="text-decoration:none"><img src="${esc(brand.logoUrl)}" width="200" height="22" alt="PractiCode Academy" style="display:block;width:200px;height:auto;color:${C.ink};font-family:${SANS};font-size:16px;font-weight:700"></a></td>
<td align="right" class="pc-hide-sm" style="font-family:${SANS};font-size:13px;line-height:18px"><a href="${esc(brand.siteUrl)}" style="color:${C.muted};text-decoration:none">practicode.tech</a></td>
</tr></table>
</td></tr>
<tr><td style="background:${C.yellow};height:6px;line-height:6px;font-size:0;border-radius:24px 24px 0 0">&nbsp;</td></tr>
<tr><td class="pc-card" style="background:${C.surface};border:1px solid ${C.line};border-top:0;border-radius:0 0 24px 24px;padding:36px 40px">
${e.eyebrow ? `<p style="margin:0 0 14px">${chip(e.eyebrow, e.eyebrowTone)}</p>` : ''}
<h1 class="pc-title" style="margin:0 0 16px;font-family:${DISPLAY};font-size:30px;line-height:36px;font-weight:800;letter-spacing:-0.8px;color:${C.ink}">${esc(e.title)}</h1>
${e.body}
</td></tr>
<tr><td style="padding:24px 8px 0;font-family:${SANS};font-size:12px;line-height:19px;color:${C.subtle}">
<p style="margin:0 0 10px;font-size:13px">${socials}</p>
<p style="margin:0 0 6px">${esc(e.reason)}</p>
<p style="margin:0">${esc(brand.publisher)} · Company registration no. ${esc(brand.companyNumber)}<br>${esc(brand.address)} · ${esc(brand.phone)}</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

/** The plain-text twin of an email, for clients and filters that prefer it. */
export function plain(lines: (string | false | null | undefined)[], brand: Brand) {
  return [...lines.filter((l): l is string => typeof l === 'string'), '', '--', `${brand.publisher} · ${brand.address} · ${brand.phone}`, brand.siteUrl].join('\n')
}
