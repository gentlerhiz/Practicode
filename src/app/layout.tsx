import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, JetBrains_Mono, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeScript } from '@/components/layout/theme-script'
import { JsonLd } from '@/components/seo/json-ld'
import { SkipLink } from '@/components/ui/skip-link'
import { organizationLd, websiteLd } from '@/lib/seo'
import { site } from '@/lib/site'
import './globals.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz'], variable: '--font-bricolage', display: 'swap' })
const sans = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'PractiCode Academy | Tech Classes in Ibadan and Online: Front-End, Data Analysis, UI/UX',
    template: '%s · PractiCode Academy',
  },
  description: site.description,
  applicationName: site.name,
  publisher: site.publisher,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { siteName: site.name, locale: site.locale, type: 'website' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07060D' },
    { media: '(prefers-color-scheme: light)', color: '#F5F4FA' },
  ],
  colorScheme: 'dark light',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // The boot script changes data-theme before React hydrates, hence suppressHydrationWarning.
    <html
      lang="en-GB"
      data-theme="dark"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-bg font-sans text-ink antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {/* Cookieless: counts visits and page speed without identifying anyone (named in the privacy notice). */}
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
