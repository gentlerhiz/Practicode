import type { Metadata } from 'next'
import SiwesHero from '@/components/ui/SiwesHero'
import SiwesOverview from '@/components/siwes/SiwesOverview'
import SiwesWhyChoose from '@/components/siwes/SiwesWhyChoose'
import SiwesDurationFee from '@/components/siwes/SiwesDurationFee'
import SiwesWhatYoullLearn from '@/components/siwes/SiwesWhatYoullLearn'
import SiwesTeachingMethod from '@/components/siwes/SiwesTeachingMethod'
import SiwesPolicies from '@/components/siwes/SiwesPolicies'
import SiwesAssessmentCert from '@/components/siwes/SiwesAssessmentCert'
import SiwesRequirementsEligibility from '@/components/siwes/SiwesRequirementsEligibility'
import SiwesRegistrationSteps from '@/components/siwes/SiwesRegistrationSteps'
import SiwesLogbook from '@/components/siwes/SiwesLogbook'
import SiwesSuccessStories from '@/components/siwes/SiwesSuccessStories'
import SiwesWhyMatters from '@/components/siwes/SiwesWhyMatters'
import SivesFAQ from '@/components/siwes/SivesFAQ'
import SiwesContact from '@/components/siwes/SiwesContact'

export const metadata: Metadata = {
  title: 'SIWES / Industrial Training Program',
  description:
    'Turn your 3-month SIWES into a valuable learning experience. Build real-world projects, gain industry-relevant skills, and complete your industrial training with confidence at Practicode Academy, Ibadan.',
  keywords: [
    'SIWES',
    'Industrial Training',
    'IT placement Nigeria',
    'SIWES Ibadan',
    'student industrial training',
    'SIWES placement computer science',
    'Practicode SIWES',
    'tech SIWES Nigeria',
  ],
  alternates: {
    canonical: 'https://practicodea.tech/siwes',
  },
  openGraph: {
    title: 'SIWES / Industrial Training Program | Practicode Academy',
    description:
      'Turn your 3-month SIWES into a valuable learning experience. Build real-world projects and gain industry-relevant skills at Practicode Academy.',
    url: 'https://practicodea.tech/siwes',
  },
}

export default function SiwesPage() {
  return (
    <>
      {/* ── Hero (reusing existing SiwesHero component) ────────────────── */}
      <SiwesHero />

      {/* ── Section 1: Program Overview ────────────────────────────────── */}
      <SiwesOverview />

      {/* ── Section 2: Why Choose Practicode ───────────────────────────── */}
      <SiwesWhyChoose />

      {/* ── Sections 3–5: Duration, Tuition & Admin Fee ────────────────── */}
      <SiwesDurationFee />

      {/* ── Section 6: What You'll Learn ───────────────────────────────── */}
      <SiwesWhatYoullLearn />

      {/* ── Section 7: Teaching Method ─────────────────────────────────── */}
      <SiwesTeachingMethod />

      {/* ── Sections 8–9: Attendance & Class Schedule ──────────────────── */}
      <SiwesPolicies />

      {/* ── Sections 10–11: Assessment & Certificate ───────────────────── */}
      <SiwesAssessmentCert />

      {/* ── Sections 12–13: Requirements & Eligibility ─────────────────── */}
      <SiwesRequirementsEligibility />

      {/* ── Section 14: Registration Process ───────────────────────────── */}
      <SiwesRegistrationSteps />

      {/* ── Section 15: Logbook Policy ─────────────────────────────────── */}
      <SiwesLogbook />

      {/* ── Section 16: Student Success Stories ────────────────────────── */}
      <SiwesSuccessStories />

      {/* ── Why SIWES Matters (between S16 and S17 per md content) ─────── */}
      <SiwesWhyMatters />

      {/* ── Section 17: FAQs ───────────────────────────────────────────── */}
      <SivesFAQ />

      {/* ── Section 18: Academic Coordinator, Contact & Commitment ─────── */}
      <SiwesContact />
    </>
  )
}
