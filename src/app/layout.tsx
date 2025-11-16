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
    default: 'Practicode Academy | Transform Your Future with Tech Skills',
    template: '%s | Practicode Academy'
  },
  description: 'Learn Frontend Development, Backend Development, Data Analytics, UI/UX Design, Machine Learning, and Graphics Design. Hands-on training with expert mentorship in Ibadan, Nigeria. Build real-world projects and launch your tech career.',
  keywords: [
    'Practicode Academy',
    'tech training Nigeria',
    'web development course',
    'frontend development',
    'backend development',
    'data analytics training',
    'UI/UX design course',
    'machine learning Nigeria',
    'graphics design',
    'coding bootcamp Ibadan',
    'tech education Nigeria',
    'learn to code',
    'programming courses',
    'digital skills training',
    'tech mentorship',
    'career transition tech',
    'software development training'
  ],
  authors: [{ name: 'Practicode Academy' }],
  creator: 'Practicode Academy',
  publisher: 'Practicode Academy',
  applicationName: 'Practicode Academy',
  category: 'Education',
  classification: 'Education, Technology Training',
  metadataBase: new URL('https://practicodea.tech'),
  alternates: {
    canonical: 'https://practicodea.tech',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://practicodea.tech',
    siteName: 'Practicode',
    title: 'Practicode Academy | Transform Your Future with Tech Skills',
    description: 'Learn Frontend Development, Backend Development, Data Analytics, UI/UX Design, Machine Learning, and Graphics Design. Hands-on training with expert mentorship in Ibadan, Nigeria.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Practicode Academy - Tech Training & Digital Solutions',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@practicode',
    creator: '@practicode',
    title: 'Practicode Academy | Transform Your Future with Tech Skills',
    description: 'Learn Frontend Development, Backend Development, Data Analytics, UI/UX Design, Machine Learning, and Graphics Design. Hands-on training with expert mentorship.',
    images: ['/images/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
    // Add your verification codes when you have them
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#FFCA1A" />
        <meta name="msapplication-TileColor" content="#FFCA1A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="NG-OY" />
        <meta name="geo.placename" content="Ibadan" />
        <meta name="geo.position" content="7.3775;3.9470" />
        <meta name="ICBM" content="7.3775, 3.9470" />
        
        {/* Business Info */}
        <meta property="business:contact_data:street_address" content="7B Oba Olagbegi, Old Bodija" />
        <meta property="business:contact_data:locality" content="Ibadan" />
        <meta property="business:contact_data:region" content="Oyo State" />
        <meta property="business:contact_data:postal_code" content="200001" />
        <meta property="business:contact_data:country_name" content="Nigeria" />
        <meta property="business:contact_data:email" content="practicodeacademy@gmail.com" />
        <meta property="business:contact_data:phone_number" content="+234-707-277-8657" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
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
