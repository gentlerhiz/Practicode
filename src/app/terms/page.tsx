import { Scale } from 'lucide-react'
import { LegalPage } from '@/components/site/legal-page'
import { terms } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({ title: 'Terms of Enrolment', description: terms.lead, path: '/terms' })

export default function TermsPage() {
  return <LegalPage doc={terms} icon={Scale} tone="fe" other={{ label: 'Read our privacy notice', href: '/privacy' }} />
}
