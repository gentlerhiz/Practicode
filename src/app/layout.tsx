import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Practicode Academy | Tech Training & Digital Solutions',
    template: '%s | Practicode Academy'
  },
  description: 'Empowering individuals and businesses with practical technology skills, mentorship, and digital solutions. Learn Web Development, Data Analytics, UI/UX Design, and Digital Marketing.',
  keywords: ['tech training', 'web development', 'data analytics', 'UI/UX design', 'digital marketing', 'Ibadan', 'Nigeria', 'coding bootcamp', 'tech education'],
  authors: [{ name: 'Practicode Academy' }],
  creator: 'Practicode Academy',
  publisher: 'Practicode Academy',
  metadataBase: new URL('https://practicode.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://practicode.com',
    siteName: 'Practicode Academy',
    title: 'Practicode Academy | Tech Training & Digital Solutions',
    description: 'Empowering individuals and businesses with practical technology skills, mentorship, and digital solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Practicode Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practicode Academy | Tech Training & Digital Solutions',
    description: 'Empowering individuals and businesses with practical technology skills, mentorship, and digital solutions.',
    creator: '@practicode',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${inter.variable}`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
