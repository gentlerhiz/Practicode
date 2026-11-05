'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { register } from '@/app/actions'
import { Field } from '@/components/ui/field'
import { Icon } from '@/components/ui/icon'
import { Spinner } from '@/components/ui/spinner'
import { Tile } from '@/components/ui/tile'
import { liveProgrammes } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { HEARD_FROM, REGISTRATION_STATES, type Enrollable } from '@/lib/enrolment'
import { toneVars } from '@/lib/tone'
import { ErrorText, FormAlert, Honeypot, inputClass } from './form-bits'

const card = 'm-0 flex min-w-0 flex-col gap-[18px] rounded-3xl border border-line bg-card p-5 tab:p-7'
const legend = 'float-left mb-[18px] w-full p-0 font-display text-[22px] leading-[30px] font-bold tracking-[-0.02em] text-ink'
const stepTone = ['fe', 'da', 'ux'] as const

function Step({ n }: { n: number }) {
  return (
    <span
      className="mr-3 inline-flex size-[30px] items-center justify-center rounded-[10px] bg-[var(--tone)] align-[3px] font-mono text-sm font-semibold text-white"
      style={toneVars(stepTone[n - 1]!)}
    >
      {n}
    </span>
  )
}

const option = (on: boolean) =>
  cn(
    'press flex cursor-pointer items-center gap-3 rounded-[18px] p-3.5 text-left text-ink',
    on ? 'border-[1.5px] border-fe-text bg-fe-tint' : 'border border-line bg-row hover:border-line-strong',
  )

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T | ''
  onChange: (v: T) => void
  options: [T, string][]
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5 self-start rounded-[28px] border border-line bg-sunken p-1">
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={cn('h-10 cursor-pointer rounded-full px-[18px] text-sm font-semibold', value === v ? 'bg-primary text-on-primary' : 'text-ink-soft hover:text-ink')}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

/** Free registration: no payment, no prices. The server action checks everything again. */
export function RegisterForm({ initialCourse, liveCourses }: { initialCourse: Enrollable; liveCourses: Enrollable[] }) {
  const [course, setCourse] = useState<Enrollable>(initialCourse)
  const [attendance, setAttendance] = useState<'in_person' | 'online' | ''>('')
  const [siwes, setSiwes] = useState<'yes' | 'no' | ''>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string>()
  const [pending, startTransition] = useTransition()
  const [leaving, setLeaving] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  const err = (k: string) => errors[k]
  const aria = (k: string) => ({ 'aria-invalid': err(k) ? true : undefined, 'aria-describedby': err(k) ? `${k}-error` : undefined })
  const options = liveProgrammes.filter((o) => liveCourses.includes(o.id as Enrollable))

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('course', course)
    fd.set('attendance', attendance)
    fd.set('siwes', siwes)
    startTransition(async () => {
      const result = await register(fd)
      if (result.ok) {
        setLeaving(true)
        window.location.assign(result.redirect ?? '/register/done')
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

  const busy = pending || leaving

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="relative flex max-w-[760px] flex-col gap-5">
      <Honeypot />
      <fieldset className={card}>
        <legend className={legend}>
          <Step n={1} />
          About you
        </legend>
        <Field id="fullName" label="Full name" error={err('fullName')}>
          <input id="fullName" name="fullName" type="text" autoComplete="name" required placeholder="Adaeze Okafor" className={inputClass} {...aria('fullName')} />
        </Field>
        <Field id="email" label="Email address" error={err('email')}>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={inputClass} {...aria('email')} />
        </Field>
        <Field id="whatsapp" label="WhatsApp number" error={err('whatsapp')} hint="We’ll add you to the cohort’s WhatsApp group on this number.">
          <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" required placeholder="0803 123 4567" className={inputClass} {...aria('whatsapp')} />
        </Field>
        <div className="flex flex-wrap gap-4">
          <div className="min-w-0 flex-[1_1_220px]">
            <Field id="city" label="City or town" error={err('city')}>
              <input id="city" name="city" type="text" autoComplete="address-level2" required placeholder="Ibadan" className={inputClass} {...aria('city')} />
            </Field>
          </div>
          <div className="min-w-0 flex-[1_1_220px]">
            <Field id="state" label="State" error={err('state')}>
              <select id="state" name="state" defaultValue="" autoComplete="address-level1" required className={inputClass} {...aria('state')}>
                <option value="" disabled>
                  Choose your state
                </option>
                {REGISTRATION_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset className={card}>
        <legend className={legend}>
          <Step n={2} />
          Your course
        </legend>
        <div role="radiogroup" aria-label="Course" className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
          {options.map((o) => (
            <button key={o.id} type="button" role="radio" aria-checked={course === o.id} onClick={() => setCourse(o.id as Enrollable)} className={option(course === o.id)}>
              <Tile icon={o.icon} tone={o.id} size={42} />
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] leading-[22px] font-semibold">{o.title}</span>
                <span className="text-[13px] text-ink-muted">{o.meta.replace('Beginner · ', '')}</span>
              </span>
            </button>
          ))}
        </div>
        <ErrorText id="course" error={err('course')} />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">How you’ll attend</span>
          <Segmented
            label="How you’ll attend"
            value={attendance}
            onChange={setAttendance}
            options={[
              ['in_person', 'In person in Ibadan'],
              ['online', 'Online'],
            ]}
          />
          <ErrorText id="attendance" error={err('attendance')} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">Are you a SIWES or IT student?</span>
          <Segmented
            label="SIWES or IT student"
            value={siwes}
            onChange={setSiwes}
            options={[
              ['no', 'No'],
              ['yes', 'Yes'],
            ]}
          />
          <ErrorText id="siwes" error={err('siwes')} />
        </div>
      </fieldset>

      <fieldset className={card}>
        <legend className={legend}>
          <Step n={3} />A little more
        </legend>
        <Field id="heardFrom" label="How did you hear about us? (optional)" error={err('heardFrom')}>
          <select id="heardFrom" name="heardFrom" defaultValue="" className={inputClass} {...aria('heardFrom')}>
            <option value="">Choose one</option>
            {HEARD_FROM.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <div className="flex flex-col gap-4">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-6 text-ink-soft">
          <input name="consent" type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#3d5af5]" {...aria('consent')} />
          I’m happy to get course updates by email and WhatsApp.
        </label>
        <ErrorText id="consent" error={err('consent')} />
        <FormAlert message={message} />
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy || undefined}
          className="press flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-8 font-semibold text-on-primary disabled:opacity-80 tab:w-auto tab:self-start"
        >
          {busy && <Spinner />}
          {busy ? 'Registering…' : 'Register Free'}
          {!busy && <Icon as={ArrowRight} />}
        </button>
        <p className="text-[13px] leading-5 text-ink-subtle">
          We use your details only to run your cohort and keep you updated. See our{' '}
          <Link href="/privacy" className="text-fe-text underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
