'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { CircleCheck, GraduationCap, HeartHandshake, MessageCircle, Send, Stamp } from 'lucide-react'
import { sendMessage } from '@/app/actions'
import { Icon } from '@/components/ui/icon'
import { Spinner } from '@/components/ui/spinner'
import type { Tone } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { toneVars } from '@/lib/tone'
import { ErrorText, FormAlert, Honeypot, inputClass, labelClass } from './form-bits'

const topics: { id: string; label: string; tone: Tone; icon: typeof Send; placeholder: string }[] = [
  { id: 'programmes', label: 'A programme', tone: 'fe', icon: GraduationCap, placeholder: 'Which programme fits me? I enjoy…' },
  { id: 'siwes', label: 'SIWES / IT', tone: 'da', icon: Stamp, placeholder: 'I’m a 300 level computer science student and…' },
  { id: 'partner', label: 'Partnerships', tone: 'ux', icon: HeartHandshake, placeholder: 'We’re a school / community / company and…' },
  { id: 'other', label: 'Something else', tone: 'ai', icon: MessageCircle, placeholder: 'Tell us how we can help.' },
]

export function ContactForm() {
  const [topic, setTopic] = useState('programmes')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string>()
  const [sent, setSent] = useState(false)
  const [pending, startTransition] = useTransition()
  const err = (k: string) => errors[k]
  const aria = (k: string) => ({ 'aria-invalid': err(k) ? true : undefined, 'aria-describedby': err(k) ? `${k}-error` : undefined })

  if (sent)
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-da text-white">
          <Icon as={CircleCheck} size={28} />
        </span>
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">Thanks, your message is with us.</h3>
        <p className="text-[15px] leading-6 text-ink-muted">We usually reply the same day, by email or WhatsApp.</p>
        <Link href="/programmes" className="text-[15px] font-semibold text-fe-text underline underline-offset-2">
          Browse the programmes while you wait
        </Link>
      </div>
    )

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('topic', topic)
    startTransition(async () => {
      const r = await sendMessage(fd)
      if (r.ok) setSent(true)
      else {
        setErrors(r.errors)
        setMessage(r.message)
      }
    })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      <Honeypot />
      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className={cn(labelClass, 'mb-2.5 p-0')}>What is it about?</legend>
        <div role="radiogroup" aria-label="Topic" className="flex flex-wrap gap-2">
          {topics.map((t) => {
            const on = topic === t.id
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setTopic(t.id)}
                style={toneVars(t.tone)}
                className={cn(
                  'inline-flex h-10 cursor-pointer items-center gap-2 rounded-full pr-3.5 pl-1.5 text-sm',
                  on ? 'border-[1.5px] border-[var(--tone-text)] bg-[var(--tone-tint)] font-semibold text-ink' : 'border border-line-control font-medium text-ink-soft',
                )}
              >
                <span className="flex size-[22px] items-center justify-center rounded-full bg-[var(--tone)] text-white">
                  <Icon as={t.icon} size={13} />
                </span>
                {t.label}
              </button>
            )
          })}
        </div>
      </fieldset>
      <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-name" className={labelClass}>
            Full name
          </label>
          <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Your name" className={inputClass} {...aria('name')} />
          <ErrorText id="name" error={err('name')} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-email" className={labelClass}>
            Email
          </label>
          <input id="c-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} {...aria('email')} />
          <ErrorText id="email" error={err('email')} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-whatsapp" className={labelClass}>
          WhatsApp number (optional)
        </label>
        <input id="c-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="0803 000 0000" className={inputClass} {...aria('whatsapp')} />
        <ErrorText id="whatsapp" error={err('whatsapp')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-message" className={labelClass}>
          Your message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          placeholder={topics.find((t) => t.id === topic)!.placeholder}
          className={cn(inputClass, 'h-auto min-h-[140px] resize-y py-3.5 leading-6')}
          {...aria('message')}
        />
        <ErrorText id="message" error={err('message')} />
      </div>
      <FormAlert message={message} />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending || undefined}
          className="press inline-flex h-[54px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-7 font-semibold text-on-primary disabled:opacity-80 tab:w-auto"
        >
          {pending ? <Spinner /> : null}
          {pending ? 'Sending…' : 'Send Message'}
          {!pending && <Icon as={Send} />}
        </button>
        <p className="flex-[1_1_220px] text-[13px] leading-5 text-ink-subtle">
          We only use your details to reply. See our{' '}
          <Link href="/privacy" className="text-da-text underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
