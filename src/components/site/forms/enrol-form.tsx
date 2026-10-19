'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, BadgePercent, Landmark, MapPin, MessageCircle, Upload, Wallet } from 'lucide-react'
import { enrol } from '@/app/actions'
import { Icon } from '@/components/ui/icon'
import { Spinner } from '@/components/ui/spinner'
import { Tile } from '@/components/ui/tile'
import { liveProgrammes, programmeById } from '@/content/programmes'
import { cn } from '@/lib/cn'
import { feeKobo, LEVELS, naira, SIWES_ADMIN_FEE_NAIRA, type Enrollable } from '@/lib/enrolment'
import { toneVars } from '@/lib/tone'
import { ErrorText, FormAlert, Honeypot, inputClass, labelClass, shrinkPhoto } from './form-bits'

const card = 'm-0 flex min-w-0 flex-col gap-[18px] rounded-3xl border border-line bg-card p-5 tab:p-7'
const legend = 'float-left mb-[18px] w-full p-0 font-display text-[22px] leading-[30px] font-bold tracking-[-0.02em] text-ink'
const stepTone = ['fe', 'da', 'ux', 'ai'] as const

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

export function EnrolForm({
  initialCourse,
  initialSiwes = false,
  paystackOn,
}: {
  initialCourse: Enrollable
  initialSiwes?: boolean
  paystackOn: boolean
}) {
  const [course, setCourse] = useState<Enrollable>(initialCourse)
  const [siwes, setSiwes] = useState(initialSiwes)
  const [method, setMethod] = useState<'paystack' | 'transfer'>(paystackOn ? 'paystack' : 'transfer')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string>()
  const [files, setFiles] = useState<{ letter?: string; receipt?: string }>({})
  const [pending, startTransition] = useTransition()
  const [leaving, setLeaving] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  const fee = naira(feeKobo(siwes))
  const p = programmeById(course)
  const err = (k: string) => errors[k]
  const aria = (k: string) => ({ 'aria-invalid': err(k) ? true : undefined, 'aria-describedby': err(k) ? `${k}-error` : undefined })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    fd.set('course', course)
    fd.set('siwes', siwes ? 'yes' : 'no')
    fd.set('method', method)
    startTransition(async () => {
      for (const key of ['letter', 'receipt']) {
        const f = fd.get(key)
        if (f instanceof File && f.size > 0) fd.set(key, await shrinkPhoto(f))
      }
      const result = await enrol(fd)
      if (result.ok) {
        setLeaving(true)
        window.location.assign(result.redirect ?? '/')
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
    <form ref={form} onSubmit={onSubmit} noValidate className="relative flex flex-wrap items-start gap-6">
      <Honeypot />
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
        <fieldset className={card}>
          <legend className={legend}>
            <Step n={1} />
            About you
          </legend>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={inputClass} {...aria('email')} />
            <ErrorText id="email" error={err('email')} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className={labelClass}>
              Full name
            </label>
            <input id="fullName" name="fullName" type="text" autoComplete="name" required placeholder="Adaeze Okafor" className={inputClass} {...aria('fullName')} />
            {err('fullName') ? (
              <ErrorText id="fullName" error={err('fullName')} />
            ) : (
              <p className="text-[13px] leading-5 text-ink-muted">Write it exactly as it should appear on your certificate.</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="whatsapp" className={labelClass}>
              WhatsApp number
            </label>
            <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" required placeholder="0803 123 4567" className={inputClass} {...aria('whatsapp')} />
            <ErrorText id="whatsapp" error={err('whatsapp')} />
          </div>
        </fieldset>

        <fieldset className={card}>
          <legend className={legend}>
            <Step n={2} />
            Choose your programme
          </legend>
          <div role="radiogroup" aria-label="Programme" className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
            {liveProgrammes.map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={course === o.id}
                onClick={() => setCourse(o.id as Enrollable)}
                className={option(course === o.id)}
              >
                <Tile icon={o.icon} tone={o.id} size={42} />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] leading-[22px] font-semibold">{o.title}</span>
                  <span className="text-[13px] text-ink-muted">{o.meta.replace('Beginner · ', '')}</span>
                </span>
              </button>
            ))}
            <div className={cn(option(false), 'cursor-not-allowed opacity-55')} aria-disabled="true">
              <Tile icon={programmeById('ai').icon} tone="ai" size={42} />
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] leading-[22px] font-semibold">AI &amp; Machine Learning</span>
                <span className="text-[13px] text-ink-muted">Coming soon</span>
              </span>
            </div>
          </div>
        </fieldset>

        <fieldset className={card}>
          <legend className={legend}>
            <Step n={3} />
            Are you a SIWES or IT student?
          </legend>
          <div role="radiogroup" aria-label="SIWES or IT student" className="flex gap-1.5 self-start rounded-full border border-line bg-sunken p-1">
            {[
              [false, 'No'],
              [true, 'Yes, SIWES / IT'],
            ].map(([value, label]) => (
              <button
                key={String(value)}
                type="button"
                role="radio"
                aria-checked={siwes === value}
                onClick={() => setSiwes(value as boolean)}
                className={cn(
                  'h-10 cursor-pointer rounded-full px-[18px] text-sm font-semibold',
                  siwes === value ? 'bg-primary text-on-primary' : 'text-ink-soft hover:text-ink',
                )}
              >
                {label as string}
              </button>
            ))}
          </div>
          {siwes && (
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-3 rounded-[14px] bg-da-tint px-4 py-3 text-sm leading-[22px] text-da-text">
                <Tile icon={BadgePercent} tone="da" size={32} />
                SIWES and IT students get 50% off: you pay {naira(feeKobo(true))}. A ₦{SIWES_ADMIN_FEE_NAIRA.toLocaleString('en-NG')} administrative
                fee is due on resumption.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1.5">
                  <label htmlFor="matric" className={labelClass}>
                    Matric number
                  </label>
                  <input id="matric" name="matric" type="text" placeholder="e.g. 223456" className={inputClass} {...aria('matric')} />
                  <ErrorText id="matric" error={err('matric')} />
                </div>
                <div className="flex min-w-0 flex-[1_1_160px] flex-col gap-1.5">
                  <label htmlFor="level" className={labelClass}>
                    Level
                  </label>
                  <select id="level" name="level" defaultValue="" className={inputClass} {...aria('level')}>
                    <option value="" disabled>
                      Choose your level
                    </option>
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {/^\d/.test(l) ? `${l} level` : l}
                      </option>
                    ))}
                  </select>
                  <ErrorText id="level" error={err('level')} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={labelClass}>Introduction letter from your school</span>
                <label
                  htmlFor="letter"
                  className="flex cursor-pointer items-center gap-3.5 rounded-2xl border-[1.5px] border-dashed border-line-control bg-sunken p-[18px] focus-within:border-focus"
                >
                  <Tile icon={Upload} tone="fe" size={44} />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-semibold text-ink">{files.letter ?? 'Upload a PDF or photo'}</span>
                    <span className="text-[13px] text-ink-muted">{files.letter ? 'Tap to choose a different file' : 'Up to 4 MB'}</span>
                  </span>
                  <input
                    id="letter"
                    name="letter"
                    type="file"
                    accept=".pdf,image/*"
                    className="sr-only"
                    onChange={(e) => setFiles({ ...files, letter: e.target.files?.[0]?.name })}
                    {...aria('letter')}
                  />
                </label>
                <ErrorText id="letter" error={err('letter')} />
              </div>
            </div>
          )}
        </fieldset>

        <fieldset className={card}>
          <legend className={legend}>
            <Step n={4} />
            Payment
          </legend>
          <div role="radiogroup" aria-label="How you’ll pay" className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
            {paystackOn && (
              <button type="button" role="radio" aria-checked={method === 'paystack'} onClick={() => setMethod('paystack')} className={cn(option(method === 'paystack'), 'flex-col items-stretch gap-2.5')}>
                <span className="flex w-full items-center gap-3">
                  <Tile icon={Wallet} tone="fe" size={40} />
                  <span className="grow text-left text-[15px] font-semibold">Pay online with Paystack</span>
                  <span className="rounded-full bg-fe-tint px-2 py-0.5 text-xs font-semibold text-fe-text">Fastest</span>
                </span>
                <span className="text-left text-[13px] leading-5 text-ink-muted">Card, bank transfer or USSD. Confirmed instantly, with a receipt by email.</span>
              </button>
            )}
            <button type="button" role="radio" aria-checked={method === 'transfer'} onClick={() => setMethod('transfer')} className={cn(option(method === 'transfer'), 'flex-col items-stretch gap-2.5')}>
              <span className="flex items-center gap-3">
                <Tile icon={Landmark} tone="da" size={40} />
                <span className="text-[15px] font-semibold">I’ve paid by bank transfer</span>
              </span>
              <span className="text-left text-[13px] leading-5 text-ink-muted">Pay into our account, then add your transaction ID or receipt.</span>
            </button>
          </div>
          <ErrorText id="method" error={err('method')} />
          {method === 'transfer' && (
            <div className="flex flex-col gap-4">
              <dl className="flex flex-wrap gap-x-6 gap-y-2 rounded-2xl border border-line bg-sunken px-[18px] py-4 text-ink">
                {[
                  ['Bank', 'UBA'],
                  ['Account number', '1029717630'],
                  ['Account name', 'Practicode Consult'],
                  ['Amount', fee],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-xs text-ink-muted">{k}</dt>
                    <dd className={cn('text-[15px] font-semibold', k === 'Account number' && 'font-mono')}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-1.5">
                  <label htmlFor="transferId" className={labelClass}>
                    Transaction ID
                  </label>
                  <input id="transferId" name="transferId" type="text" placeholder="From your bank app or SMS" className={inputClass} {...aria('transferId')} />
                </div>
                <p className="mb-3.5 text-[13px] text-ink-muted">or</p>
                <label
                  htmlFor="receipt"
                  className="flex h-[50px] min-w-0 flex-[1_1_200px] cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-line-control bg-card px-3 text-sm font-semibold text-ink focus-within:border-focus"
                >
                  <Icon as={Upload} />
                  <span className="truncate">{files.receipt ?? 'Upload Receipt'}</span>
                  <input
                    id="receipt"
                    name="receipt"
                    type="file"
                    accept=".pdf,image/*"
                    className="sr-only"
                    onChange={(e) => setFiles({ ...files, receipt: e.target.files?.[0]?.name })}
                  />
                </label>
              </div>
              <ErrorText id="transferId" error={err('transferId') ?? err('receipt')} />
            </div>
          )}
        </fieldset>

        <div className="flex flex-col gap-4">
          <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-6 text-ink-soft">
            <input name="confirm" type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[#3d5af5]" {...aria('confirm')} />
            I confirm the information I’ve given is accurate and complete.
          </label>
          <ErrorText id="confirm" error={err('confirm')} />
          <FormAlert message={message} />
          <button
            type="submit"
            disabled={busy}
            aria-busy={busy || undefined}
            className="press flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-8 font-semibold text-on-primary disabled:opacity-80 tab:w-auto tab:self-start"
          >
            {busy && <Spinner />}
            {busy ? (method === 'paystack' ? 'Taking you to Paystack…' : 'Sending…') : method === 'paystack' ? `Continue to Pay ${fee}` : 'Submit Registration'}
            {!busy && <Icon as={ArrowRight} />}
          </button>
          <p className="text-[13px] leading-5 text-ink-subtle">
            We use your details only to manage your enrolment. See our{' '}
            <Link href="/privacy" className="text-fe-text underline underline-offset-2">
              privacy notice
            </Link>
            .
          </p>
        </div>
      </div>

      <aside
        aria-label="Your enrolment"
        className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px] rounded-[28px] border border-banner-border p-7 text-white tab:sticky tab:top-32"
        style={{ background: 'var(--pc-banner-fe)' }}
      >
        <h2 className="font-display text-[22px] font-bold tracking-[-0.02em]">Your enrolment</h2>
        <div className="flex items-center gap-3">
          <Tile icon={p.icon} size={40} />
          <span className="text-[15px] font-semibold">{p.title}</span>
        </div>
        <dl className="flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-white/80">Course fee</dt>
            <dd>₦80,000</dd>
          </div>
          {siwes && (
            <div className="flex justify-between gap-3 text-[#2fe6b0]">
              <dt>SIWES discount (50%)</dt>
              <dd>−₦40,000</dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-3 border-t border-white/20 pt-3 text-base font-semibold">
            <dt>Pay now</dt>
            <dd className="font-display text-[28px] font-extrabold">{fee}</dd>
          </div>
        </dl>
        {siwes && <p className="text-[13px] leading-5 text-white/80">Plus the ₦10,000 administrative fee, due on resumption.</p>}
        <ul className="flex flex-col gap-2.5 border-t border-white/20 pt-4 text-[13px] leading-5">
          {[
            [MapPin, 'Onsite in Ibadan or live online'],
            [Award, 'Certificate of completion'],
            [MessageCircle, 'Questions? WhatsApp 0903 057 8667'],
          ].map(([I, text]) => (
            <li key={text as string} className="flex items-center gap-2.5">
              <Tile icon={I as typeof MapPin} size={26} />
              {text as string}
            </li>
          ))}
        </ul>
      </aside>
    </form>
  )
}
