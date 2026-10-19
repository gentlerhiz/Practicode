import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PractiCode Academy',
    short_name: 'PractiCode',
    description: 'Tech classes in Ibadan and online: front-end development, data analysis and UI/UX design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07060D',
    theme_color: '#07060D',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
