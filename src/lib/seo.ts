import type { Metadata } from 'next'
import type { Programme } from '@/content/programmes'
import { absoluteUrl, site } from '@/lib/site'

/** JSON for a <script> element. Escaping "<" stops any value from closing the element early. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

/** Page metadata with a canonical address and matching Open Graph and Twitter cards. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: absoluteUrl(path), siteName: site.name, locale: site.locale, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
}

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': absoluteUrl('/#organization'),
  name: site.name,
  url: site.url,
  logo: absoluteUrl('/icon.svg'),
  email: site.email,
  telephone: '+2349030578667',
  foundingDate: '2023',
  address,
  parentOrganization: { '@type': 'Organization', name: site.publisher },
  sameAs: [...site.socials.map((s) => s.href), site.learn],
})

export const localBusinessLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: `${site.name}, Ibadan`,
  url: site.url,
  telephone: '+2349030578667',
  address,
})

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  inLanguage: 'en-GB',
  publisher: { '@id': absoluteUrl('/#organization') },
})

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
})

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
})

export const courseLd = (p: Programme) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: p.title,
  description: p.lead,
  url: absoluteUrl(`/programmes/${p.slug}`),
  provider: { '@id': absoluteUrl('/#organization') },
  educationalLevel: p.level,
  inLanguage: 'en-GB',
  hasCourseInstance: p.live
    ? [
        { '@type': 'CourseInstance', courseMode: 'Onsite', location: { '@type': 'Place', name: 'PractiCode Academy, Ibadan', address } },
        { '@type': 'CourseInstance', courseMode: 'Online' },
      ]
    : undefined,
})

export const articleLd = (a: { title: string; description: string; path: string; date: string; author: string; image: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  author: { '@type': a.author === site.name ? 'Organization' : 'Person', name: a.author },
  publisher: { '@id': absoluteUrl('/#organization') },
  image: absoluteUrl(a.image),
  mainEntityOfPage: absoluteUrl(a.path),
})
