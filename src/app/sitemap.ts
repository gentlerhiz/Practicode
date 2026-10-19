import type { MetadataRoute } from 'next'
import { posts } from '@/content/blog'
import { programmes } from '@/content/programmes'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/programmes', '/siwes', '/about', '/enrol', '/faq', '/contact', '/blog', '/resources', '/privacy', '/terms']
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.7 })),
    ...programmes.map((p) => ({ url: absoluteUrl(`/programmes/${p.slug}`), changeFrequency: 'monthly' as const, priority: p.live ? 0.9 : 0.5 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.date, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ]
}
