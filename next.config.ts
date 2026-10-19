import type { NextConfig } from 'next'
import { buildCsp, securityHeaders } from './src/lib/security/csp'

const gone = ['/store', '/solutions', '/marketers', '/internship', '/mentorship']

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // Uploads (receipts, letters) go through the enrolment action. Vercel caps a request at 4.5 MB; the form
  // shrinks large photos before sending.
  experimental: { serverActions: { bodySizeLimit: '4.5mb' } },

  // Links to the old site land on the matching new page.
  async redirects() {
    return [
      { source: '/courses', destination: '/programmes', permanent: true },
      { source: '/courses/responsive-web-design', destination: '/programmes/front-end-web-development', permanent: true },
      { source: '/courses/javascript-web-development', destination: '/programmes/front-end-web-development', permanent: true },
      { source: '/courses/data-analysis', destination: '/programmes/data-analysis', permanent: true },
      { source: '/courses/ui-ux-design', destination: '/programmes/ui-ux-design', permanent: true },
      { source: '/courses/python-machine-learning', destination: '/programmes/ai-machine-learning', permanent: true },
      { source: '/courses/:slug', destination: '/programmes', permanent: true },
      ...gone.flatMap((p) => [
        { source: p, destination: '/', permanent: true },
        { source: `${p}/:path*`, destination: '/', permanent: true },
      ]),
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: buildCsp({ dev: process.env.NODE_ENV === 'development' }) },
        ],
      },
    ]
  },
}

export default nextConfig
