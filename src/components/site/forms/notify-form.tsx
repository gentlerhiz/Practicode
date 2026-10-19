'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowRight, CircleCheck } from 'lucide-react'
import { joinWaitlist } from '@/app/actions'
import { Icon } from '@/components/ui/icon'
import { Spinner } from '@/components/ui/spinner'
import type { ProgrammeId } from '@/content/programmes'
import { ErrorText, FormAlert, Honeypot, inputClass, labelClass } from './form-bits'

/** "Tell me when it opens" for a programme that isn't enrolling yet. */
export function NotifyForm({ course }: { course: ProgrammeId }) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string>()
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()
  const aria = (k: string) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined })

  if (done)
    return (
      <div role="status" className="flex min-w-0 flex-[1_1_420px] flex-col items-start gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-da text-white">
          <Icon as={CircleCheck} size={24} />
        </span>
        <p className="text-lg font-semibold text-ink">You’re on the list.</p>
        <p className="text-[15px] leading-6 text-ink-muted">We’ll message you once, when enrolment opens.</p>
      </div>
    )

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('course', course)
    startTransition(async () => {
      const r = await joinWaitlist(fd)
      if (r.ok) setDone(true)
      else {
        setErrors(r.errors)
        setMessage(r.message)
      }
    })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
      <Honeypot />
      <div className="flex flex-col gap-2">
        <label htmlFor="w-name" className={labelClass}>
          Full name
        </label>
        <input id="w-name" name="name" type="text" autoComplete="name" placeholder="Your name" className={inputClass} {...aria('name')} />
        <ErrorText id="name" error={errors.name} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="w-email" className={labelClass}>
          Email
        </label>
        <input id="w-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} {...aria('email')} />
        <ErrorText id="email" error={errors.email} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="w-whatsapp" className={labelClass}>
          WhatsApp number (optional)
        </label>
        <input id="w-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="0803 000 0000" className={inputClass} {...aria('whatsapp')} />
        <ErrorText id="whatsapp" error={errors.whatsapp} />
      </div>
      <FormAlert message={message} />
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="press flex h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-8 font-semibold text-on-primary disabled:opacity-80 tab:w-auto tab:self-start"
      >
        {pending ? <Spinner /> : null}
        {pending ? 'Saving…' : 'Notify Me'}
        {!pending && <Icon as={ArrowRight} />}
      </button>
      <p className="text-[13px] leading-5 text-ink-subtle">
        We only use these details to tell you about this programme. See our{' '}
        <Link href="/privacy" className="text-ai-text underline underline-offset-2">
          privacy notice
        </Link>
        .
      </p>
    </form>
  )
}
