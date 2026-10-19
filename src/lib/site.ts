/**
 * The canonical address. NEXT_PUBLIC_SITE_URL wins; if a production build forgot to set it, we still
 * point search engines at the real domain rather than localhost, and previews use their own URL.
 */
function resolveSiteUrl(): string {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
  if (!configured.includes('localhost')) return configured
  if (process.env.VERCEL_ENV === 'production') return 'https://practicode.tech'
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return configured
}

export const site = {
  name: 'PractiCode Academy',
  url: resolveSiteUrl(),
  description:
    'Tech classes in Ibadan and online: front-end development, data analysis and UI/UX design. Build real projects with expert mentors and finish with a portfolio you can show employers.',
  locale: 'en_GB' as const,
  publisher: 'Practicode Consult Limited',
  companyNumber: '8415811',
  email: 'practicodeacademy@gmail.com',
  phones: ['0903 057 8667', '+234 707 277 8657'],
  whatsapp: 'https://wa.me/2349030578667',
  tel: 'tel:+2349030578667',
  address: {
    street: '7B Oba Olagbegi, Old Bodija',
    city: 'Ibadan',
    region: 'Oyo State',
    country: 'NG',
    full: '7B Oba Olagbegi, Old Bodija, Ibadan, Oyo State',
  },
  maps: 'https://www.google.com/maps/search/?api=1&query=7B%20Oba%20Olagbegi%2C%20Old%20Bodija%2C%20Ibadan',
  learn: 'https://learn.practicode.tech',
  /** The old Google Form, shown only if the enrolment form's server secrets are missing. */
  googleForm: 'https://docs.google.com/forms/d/e/1FAIpQLScIhPcEqKHBVDa2Jqzuc8RkEo9uqSReCTFyvuJUb162zcLCpw/viewform',
  socials: [
    { label: 'Instagram', short: 'IG', handle: '@practicode_academy', href: 'https://www.instagram.com/practicode_academy' },
    { label: 'X', short: 'X', handle: '@practicodeacademy_', href: 'https://x.com/practicodeacademy_' },
    { label: 'LinkedIn', short: 'in', handle: 'PractiCode Academy', href: 'https://www.linkedin.com/company/practicode_academy/' },
    { label: 'TikTok', short: 'TT', handle: '@practicode_academy', href: 'https://www.tiktok.com/@practicode_academy' },
  ],
}

export const absoluteUrl = (path: string) => new URL(path, `${site.url}/`).toString()
