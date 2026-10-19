import { ShieldCheck } from 'lucide-react'
import { LegalPage } from '@/components/site/legal-page'
import { privacy } from '@/content/legal'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({ title: 'Privacy Notice', description: privacy.lead, path: '/privacy' })

export default function PrivacyPage() {
  return <LegalPage doc={privacy} icon={ShieldCheck} tone="da" other={{ label: 'Read our terms', href: '/terms' }} />
}
