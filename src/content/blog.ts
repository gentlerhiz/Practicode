import { photos } from './academy'

export type Block = { type: 'p'; text: string } | { type: 'h2'; text: string; id: string } | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  /** ISO date the post went up. */
  date: string
  author: string
  category: 'Academy news' | 'Tutorials' | 'SIWES guides' | 'Tech tips'
  readMinutes: number
  image: { src: string; alt: string }
  body: Block[]
}

/** Newest first. Add posts here; each gets its own page at /blog/[slug]. */
export const posts: Post[] = [
  {
    slug: 'community-partner-muslim-tech-expo-4',
    title: 'We’re a Community Partner of Muslim Tech Expo 4.0',
    excerpt:
      'Muslim Tech Expo 4.0 took place at Zone Tech Park, Gbagada, on 18 October 2026, with the theme “Evolving Our Tech, Preserving Our Values”. Here’s why we support it.',
    date: '2026-10-19',
    author: 'PractiCode Academy',
    category: 'Academy news',
    readMinutes: 2,
    image: photos.classLaptops,
    body: [
      { type: 'p', text: 'PractiCode Academy is a Community Partner of Muslim Tech Expo 4.0, held at Zone Tech Park, Gbagada, Lagos, on 18 October 2026.' },
      {
        type: 'p',
        text: 'This year’s theme was “Evolving Our Tech, Preserving Our Values”: a day for builders, students and founders to talk about technology and the values they bring to it.',
      },
      { type: 'h2', id: 'why', text: 'Why we support it' },
      {
        type: 'p',
        text: 'We teach tech by building real things, and we want our students in rooms where people build. Community events like Muslim Tech Expo are where students meet working developers, designers and analysts, see what’s possible, and ask questions a classroom can’t answer.',
      },
      { type: 'h2', id: 'next', text: 'What’s next' },
      { type: 'p', text: 'Follow us on Instagram, X, LinkedIn and TikTok for photos from the day and news of the next events we support.' },
    ],
  },
  {
    slug: 'devfest-2026-google-developer-groups',
    title: 'We’re partnering with Google Developer Groups for DevFest 2026',
    excerpt:
      'PractiCode Academy is a partner of DevFest 2026, the developer festival run by Google Developer Groups. Here’s what DevFest is and why it matters for our students.',
    date: '2026-10-19',
    author: 'PractiCode Academy',
    category: 'Academy news',
    readMinutes: 2,
    image: photos.cohort,
    body: [
      { type: 'p', text: 'PractiCode Academy is partnering with Google Developer Groups (GDG) for DevFest 2026.' },
      {
        type: 'p',
        text: 'DevFest is a series of community-run developer festivals that GDG chapters host around the world each year, with talks, workshops and time to meet other people who build with technology.',
      },
      { type: 'h2', id: 'why', text: 'Why it matters for our students' },
      {
        type: 'p',
        text: 'Our classes are hands-on, and DevFest is the same idea at a bigger scale: learning from people who build every day. It’s a good place for front-end, data and design students to see where their skills can take them.',
      },
      { type: 'h2', id: 'next', text: 'Stay in the loop' },
      { type: 'p', text: 'We’ll share event details, and how our students can take part, on our socials and in our class WhatsApp groups.' },
    ],
  },
]

export const findPost = (slug: string) => posts.find((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
