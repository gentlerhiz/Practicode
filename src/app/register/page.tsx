import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { RegisterForm } from '@/components/site/forms/register-form'
import { Container } from '@/components/ui/container'
import { Icon } from '@/components/ui/icon'
import { ENROLLABLE, type Enrollable } from '@/lib/enrolment'
import { pageMeta } from '@/lib/seo'
import { getCatalogue, getCurrentCohort } from '@/lib/server/catalogue'
import { canStore } from '@/lib/server/env'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Register',
  description: 'Register free for the next PractiCode Academy cohort, in Ibadan or online. We’ll add you to the cohort’s WhatsApp group and send you course updates.',
  path: '/register',
})

export default async function RegisterPage({ searchParams }: PageProps<'/register'>) {
  const sp = await searchParams
  const asked = sp.course
  const [catalogue, cohort] = await Promise.all([getCatalogue(), getCurrentCohort()])
  const live = catalogue.live
  const course: Enrollable = ENROLLABLE.includes(asked as Enrollable) && live.includes(asked as Enrollable) ? (asked as Enrollable) : (live[0] ?? 'fe')
  const open = canStore() && cohort?.registrationOpen

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-wash" />
      <Container className="relative pt-8 pb-14 tab:pt-14 tab:pb-24">
        <div className="mb-8 flex max-w-[720px] flex-col gap-3">
          <h1 className="font-display text-[36px] leading-10 font-extrabold tracking-[-0.035em] text-ink tab:text-[56px] tab:leading-[60px]">
            {open && cohort ? `Register for ${cohort.name}` : 'Register for our next cohort'}
          </h1>
          <p className="text-base leading-[26px] text-ink-soft">
            Registration is free. We’ll add you to the cohort’s WhatsApp group and send you course updates, and you pay later, when you enrol.
          </p>
        </div>
        {open ? (
          <RegisterForm initialCourse={course} liveCourses={live} />
        ) : (
          <div role="alert" className="flex max-w-[720px] flex-col gap-4 rounded-3xl border border-line bg-card p-7">
            <p className="text-lg font-semibold text-ink">Registration isn’t open right now.</p>
            <p className="text-[15px] leading-6 text-ink-muted">
              Message us on WhatsApp and we’ll tell you when the next cohort opens, and answer any questions you have.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={site.whatsapp} className="press inline-flex h-[52px] items-center gap-2.5 rounded-full bg-primary px-6 font-semibold text-on-primary">
                <Icon as={MessageCircle} />
                Message us on WhatsApp
              </a>
              <Link href="/programmes" className="press inline-flex h-[52px] items-center gap-2.5 rounded-full border border-line-control px-6 font-semibold text-ink">
                See programmes
                <Icon as={ArrowRight} />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
