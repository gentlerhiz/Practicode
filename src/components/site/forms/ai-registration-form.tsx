'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowRight, CircleCheck, MessageCircle } from 'lucide-react'
import { registerAiCourse } from '@/app/actions'
import { Field } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { Spinner } from '@/components/ui/spinner'
import { REGISTRATION_STATES } from '@/lib/enrolment'
import { site } from '@/lib/site'
import { FormAlert, Honeypot, inputClass } from './form-bits'

export function AiRegistrationForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string>()
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()
  const form = useRef<HTMLFormElement>(null)
  const aria = (key: string) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    startTransition(async () => {
      const result = await registerAiCourse(fd)
      if (result.ok) {
        setDone(true)
        return
      }
      setErrors(result.errors)
      setMessage(result.message)
      const first = Object.keys(result.errors)[0]
      requestAnimationFrame(() => {
        const el = first ? form.current?.querySelector<HTMLElement>(`[name="${first}"], #${first}`) : null
        ;(el ?? form.current?.querySelector('[role="alert"]'))?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el?.focus({ preventScroll: true })
      })
    })
  }

  if (done) {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-start justify-center gap-5 rounded-3xl border border-line bg-card p-6 tab:p-9">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-da text-white">
          <Icon as={CircleCheck} size={28} />
        </span>
        <div className="flex flex-col gap-2">
          <p className="font-display text-[28px] leading-8 font-extrabold tracking-[-0.03em] text-ink">You’re registered!</p>
          <p className="max-w-[520px] text-[15px] leading-6 text-ink-soft">
            Send us a WhatsApp message to reserve your place and make your payment. We’re excited to help you start creating professional AI videos.
          </p>
        </div>
        <a
          href={`${site.whatsapp}?text=${encodeURIComponent('Hello PractiCode Academy! I just registered for the AI Video Creation course. I would like to make payment and reserve my place.')}`}
          target="_blank"
          rel="noreferrer"
          className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-primary px-7 font-semibold text-on-primary tab:w-auto"
        >
          <Icon as={MessageCircle} />
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5 rounded-3xl border border-line bg-card p-5 tab:p-7">
      <Honeypot />
      <fieldset className="flex flex-col gap-4 border-0 p-0">
        <legend className="mb-1 font-display text-[22px] font-bold tracking-[-0.02em] text-ink">About you</legend>
        <Field id="fullName" label="Full name" error={errors.fullName}>
          <input id="fullName" name="fullName" type="text" autoComplete="name" required placeholder="Adaeze Okafor" className={inputClass} {...aria('fullName')} />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={inputClass} {...aria('email')} />
        </Field>
        <Field id="whatsapp" label="WhatsApp number" error={errors.whatsapp}>
          <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" required placeholder="0803 123 4567" className={inputClass} {...aria('whatsapp')} />
        </Field>
        <div className="grid grid-cols-1 gap-4 ph:grid-cols-2">
          <Field id="city" label="City or town" error={errors.city}>
            <input id="city" name="city" type="text" autoComplete="address-level2" required placeholder="Ibadan" className={inputClass} {...aria('city')} />
          </Field>
          <Field id="state" label="State" error={errors.state}>
            <select id="state" name="state" defaultValue="" autoComplete="address-level1" required className={inputClass} {...aria('state')}>
              <option value="" disabled>Choose your state</option>
              {REGISTRATION_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-0 p-0">
        <legend className="mb-1 font-display text-[22px] font-bold tracking-[-0.02em] text-ink">Your course</legend>
        <div className="flex items-center gap-3 rounded-[18px] border border-ai/45 bg-ai-tint p-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ai font-mono text-sm font-semibold text-white">AI</span>
          <div>
            <p className="text-[15px] font-semibold text-ink">AI Video Creation</p>
            <p className="text-[13px] text-ink-muted">Beginner friendly · 6 December 2026</p>
          </div>
        </div>
        <Field id="message" label="A little more (optional)" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us what you want to create or ask a question..."
            className="w-full resize-y rounded-[14px] border border-line bg-sunken px-4 py-3 text-[15px] text-ink placeholder:text-ink-subtle focus:border-focus focus:shadow-[0_0_0_3px_rgba(77,107,255,0.25)] focus:outline-none"
            {...aria('message')}
          />
        </Field>
      </fieldset>

      <FormAlert message={message} />
      <button
        type="submit"
        disabled={pending}
        className="press flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 font-semibold text-on-primary disabled:opacity-80"
      >
        {pending ? <Spinner /> : null}
        {pending ? 'Registering…' : 'Register for AI Video Creation'}
        {!pending && <Icon as={ArrowRight} />}
      </button>
      <p className="text-center text-[13px] leading-5 text-ink-subtle">
        By registering, you agree that we may contact you about this course. <Link href="/privacy" className="underline underline-offset-2">Privacy notice</Link>
      </p>
    </form>
  )
}
