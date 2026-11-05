import { describe, expect, it } from 'vitest'
import { button, courseCard, details, esc, layout, plain, type Brand } from './kit'

const brand: Brand = {
  siteUrl: 'https://practicode.tech',
  logoUrl: 'https://practicode.tech/images/email/academy-logo.png',
  publisher: 'Practicode Consult Limited',
  companyNumber: '8415811',
  address: '7B Oba Olagbegi, Old Bodija, Ibadan, Oyo State',
  phone: '0903 057 8667',
  socials: [{ label: 'Instagram', href: 'https://www.instagram.com/practicode_academy' }],
}

describe('email kit', () => {
  it('escapes HTML in plain-text inputs', () => {
    expect(esc(`<script>"x"&'y'</script>`)).toBe('&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;')
    const html = layout(brand, { preheader: '<b>', title: 'Hi <img src=x>', body: '', reason: 'r', eyebrow: '<i>' })
    expect(html).not.toContain('<img src=x>')
    expect(html).toContain('Hi &lt;img src=x&gt;')
    expect(courseCard({ id: 'fe', title: '<x>', meta: 'm', summary: 's' })).toContain('&lt;x&gt;')
    expect(button('Go', 'https://a.test/?a=1&b="2"')).toContain('href="https://a.test/?a=1&amp;b=&quot;2&quot;"')
  })

  it('builds a responsive layout with the logo, a preheader and the footer', () => {
    const html = layout(brand, { preheader: 'Your place is saved', title: 'Welcome', body: details([['Course', 'Data Analysis']]), reason: 'Because' })
    expect(html).toContain('name="viewport"')
    expect(html).toContain('@media (max-width:620px)')
    expect(html).toContain(brand.logoUrl)
    expect(html).toContain('Your place is saved')
    expect(html).toContain('Company registration no. 8415811')
  })

  it('makes a plain-text twin without empty optional lines', () => {
    expect(plain(['Hello', false, null, 'Bye'], brand)).toBe(
      'Hello\nBye\n\n--\nPracticode Consult Limited · 7B Oba Olagbegi, Old Bodija, Ibadan, Oyo State · 0903 057 8667\nhttps://practicode.tech',
    )
  })
})
