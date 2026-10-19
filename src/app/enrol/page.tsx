import { MessageCircle } from 'lucide-react'
import { EnrolForm } from '@/components/site/forms/enrol-form'
import { Icon } from '@/components/ui/icon'
import { Container } from '@/components/ui/container'
import { ENROLLABLE, type Enrollable } from '@/lib/enrolment'
import { pageMeta } from '@/lib/seo'
import { canStore, paystackEnabled } from '@/lib/server/env'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Enrol',
  description: 'Enrol at PractiCode Academy in about five minutes: choose Front-End, Data Analysis or UI/UX, then pay online with Paystack or by bank transfer.',
  path: '/enrol',
})

export default async function EnrolPage({ searchParams }: PageProps<'/enrol'>) {
  const sp = await searchParams
  const asked = sp.course
  const course: Enrollable = ENROLLABLE.includes(asked as Enrollable) ? (asked as Enrollable) : 'fe'
  const available = canStore()

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-wash" />
      <Container className="relative pt-8 pb-14 tab:pt-14 tab:pb-24">
        <div className="mb-8 flex max-w-[720px] flex-col gap-3">
          <h1 className="font-display text-[36px] leading-10 font-extrabold tracking-[-0.035em] text-ink tab:text-[56px] tab:leading-[60px]">
            Enrol and start learning
          </h1>
          <p className="text-base leading-[26px] text-ink-soft">
            It takes about five minutes. You’ll get a confirmation by email and a WhatsApp message from our team.
          </p>
        </div>
        {available ? (
          <EnrolForm initialCourse={course} initialSiwes={sp.siwes === 'yes'} paystackOn={paystackEnabled()} />
        ) : (
          <div role="alert" className="flex max-w-[720px] flex-col gap-4 rounded-3xl border border-line bg-card p-7">
            <p className="text-lg font-semibold text-ink">Our online form is taking a short break.</p>
            <p className="text-[15px] leading-6 text-ink-muted">
              You can still enrol today: message us on WhatsApp, or use our registration form.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={site.whatsapp} className="press inline-flex h-[52px] items-center gap-2.5 rounded-full bg-primary px-6 font-semibold text-on-primary">
                <Icon as={MessageCircle} />
                Enrol on WhatsApp
              </a>
              <a href={site.googleForm} className="press inline-flex h-[52px] items-center rounded-full border border-line-control px-6 font-semibold text-ink">
                Open the Registration Form
              </a>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
