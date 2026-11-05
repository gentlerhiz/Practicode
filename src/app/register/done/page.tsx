import type { Metadata } from 'next'
import { CircleCheck, Mail, MessageCircle, Wallet } from 'lucide-react'
import { EnrolDone } from '@/components/site/enrol-done'

export const metadata: Metadata = { title: 'You’re registered', robots: { index: false } }

export default function RegisterDonePage() {
  return (
    <EnrolDone
      tone="da"
      badge={CircleCheck}
      kicker="Registration received"
      title="You’re registered. Thank you!"
      lead="You haven’t paid anything. Registration is free, and you pay later, only when you enrol."
      steps={[
        { title: 'Check your email', body: 'We’ve sent you a confirmation. Check your spam folder if you can’t see it.', icon: Mail, tone: 'fe' },
        { title: 'Join the cohort’s WhatsApp group', body: 'We’ll add you to the group within a few days, and share course updates there.', icon: MessageCircle, tone: 'da' },
        { title: 'Enrol when you’re ready', body: 'When you decide to start, enrol on our Enrol page and pay online or by bank transfer.', icon: Wallet, tone: 'ux' },
      ]}
    />
  )
}
