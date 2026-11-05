import { redirect } from 'next/navigation'
import { LockKeyhole } from 'lucide-react'
import { SignInForm } from '@/components/admin/sign-in-form'
import { Container } from '@/components/ui/container'
import { Tile } from '@/components/ui/tile'
import { CONSOLE_PATH, getAdmin } from '@/lib/server/admin/auth'

export const metadata = { title: 'Sign in' }

export default async function SignInPage() {
  if (await getAdmin()) redirect(CONSOLE_PATH)
  return (
    <Container className="flex justify-center pt-10 pb-16 tab:pt-20 tab:pb-24">
      <div className="flex w-full max-w-[440px] flex-col gap-6 rounded-3xl border border-line bg-card p-7">
        <div className="flex flex-col gap-3">
          <Tile icon={LockKeyhole} tone="ai" size={44} />
          <h1 className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.03em] text-ink">Academy console</h1>
          <p className="text-sm leading-[22px] text-ink-muted">For PractiCode Academy staff. Enter your email and we’ll send you a one-time code.</p>
        </div>
        <SignInForm />
      </div>
    </Container>
  )
}
