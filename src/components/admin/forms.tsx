'use client'

import { createContext, startTransition, useActionState, useContext, useEffect, useId as useReactId, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button, type ButtonStyle } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import type { ActionState } from '@/lib/admin/types'
import { cn } from '@/lib/cn'
import { selectClass, smallInputClass } from './ui'

/**
 * Forms for the console. Each posts to a server action and shows its result. They submit through a
 * transition rather than the form's own action so a failed save keeps what was typed (React resets
 * uncontrolled fields after a form action).
 */

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>

const Errors = createContext<Record<string, string> | undefined>(undefined)

function useSubmit(action: Action, onDone?: (s: ActionState, form: HTMLFormElement) => void) {
  const [state, run, pending] = useActionState(action, {})
  const ref = useRef<HTMLFormElement>(null)
  const seen = useRef(state)
  useEffect(() => {
    if (state === seen.current) return
    seen.current = state
    if (ref.current) onDone?.(state, ref.current)
  }, [state, onDone])
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter)
    startTransition(() => run(fd))
  }
  return { state, pending, ref, onSubmit }
}

export function Result({ state, className }: { state: ActionState; className?: string }) {
  if (!state.message) return null
  return (
    <p
      role={state.ok ? 'status' : 'alert'}
      className={cn('flex items-start gap-2 text-sm leading-5', state.ok ? 'text-success' : 'text-error', className)}
    >
      <Icon as={state.ok ? CheckCircle2 : AlertCircle} size={16} className="mt-0.5 shrink-0" />
      {state.message}
    </p>
  )
}

/** A form with a submit button and a result line. `reset` clears it after a successful save. */
export function ActionForm({
  action,
  submit,
  className,
  reset,
  variant,
  children,
}: {
  action: Action
  submit: string
  className?: string
  reset?: boolean
  variant?: ButtonStyle['variant']
  children: React.ReactNode
}) {
  const { state, pending, ref, onSubmit } = useSubmit(action, reset ? (s, form) => s.ok && form.reset() : undefined)
  return (
    <form ref={ref} onSubmit={onSubmit} className={cn('flex flex-col gap-4', className)} noValidate>
      <Errors.Provider value={state.errors}>{children}</Errors.Provider>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="sm" variant={variant} pending={pending}>
          {pending ? 'Saving…' : submit}
        </Button>
        <Result state={state} />
      </div>
    </form>
  )
}

/** One button that runs an action with fixed hidden values (mark paid, set as current). */
export function ActionButton({
  action,
  values,
  children,
  variant = 'secondary',
}: {
  action: Action
  values: Record<string, string>
  children: React.ReactNode
  variant?: ButtonStyle['variant']
}) {
  const { state, pending, ref, onSubmit } = useSubmit(action)
  return (
    <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-1.5">
      {Object.entries(values).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <Button type="submit" size="sm" variant={variant} pending={pending}>
        {children}
      </Button>
      <Result state={state} />
    </form>
  )
}

/**
 * A row of buttons for one action, each sending its own `to` value (transfer confirmed, paid, cancelled).
 * One form, so the result stays on screen after the page re-renders without the button just used.
 */
export function ActionButtons({
  action,
  values,
  buttons,
}: {
  action: Action
  values: Record<string, string>
  buttons: { to: string; label: string; variant?: ButtonStyle['variant'] }[]
}) {
  const { state, pending, ref, onSubmit } = useSubmit(action)
  return (
    <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-2">
      {Object.entries(values).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      {buttons.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {buttons.map((b) => (
            <Button key={b.to} type="submit" name="to" value={b.to} size="sm" variant={b.variant ?? 'secondary'} disabled={pending}>
              {b.label}
            </Button>
          ))}
        </div>
      )}
      <Result state={state} />
    </form>
  )
}

/** A delete button that asks once more before it acts, and shows why when the server refuses. */
export function ConfirmDelete({
  action,
  values,
  label = 'Delete',
  question,
}: {
  action: Action
  values: Record<string, string>
  label?: string
  question: string
}) {
  const [asking, setAsking] = useState(false)
  const { state, pending, ref, onSubmit } = useSubmit(action)
  return (
    <div className="flex flex-col gap-2">
      {asking ? (
        <form ref={ref} onSubmit={onSubmit} className="flex flex-wrap items-center gap-2 rounded-2xl border border-error/40 bg-error/10 p-3">
          {Object.entries(values).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
          <span className="text-sm text-ink">{question}</span>
          <Button type="submit" size="sm" pending={pending} className="bg-error text-white">
            Yes, delete
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setAsking(false)} disabled={pending}>
            Keep it
          </Button>
        </form>
      ) : (
        <Button size="sm" variant="ghost" className="self-start text-error hover:text-error" onClick={() => setAsking(true)}>
          {label}
        </Button>
      )}
      <Result state={state} />
    </div>
  )
}

/* Fields: each reads its error from the surrounding ActionForm. */

function useFieldError(name: string) {
  return useContext(Errors)?.[name]
}

function FieldShell({ id, label, hint, error, children, className }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-xs font-semibold text-ink-soft">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs leading-[18px] text-ink-subtle">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs leading-[18px] text-error">
          {error}
        </p>
      )}
    </div>
  )
}

const useId = (name: string) => `f-${name}${useReactId().replace(/:/g, '')}`

export function TextField({
  name,
  label,
  hint,
  className,
  ...props
}: { name: string; label: string; hint?: string; className?: string } & Omit<React.ComponentProps<'input'>, 'name' | 'className'>) {
  const id = useId(name)
  const error = useFieldError(name)
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <input id={id} name={name} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} className={smallInputClass} {...props} />
    </FieldShell>
  )
}

export function TextArea({ name, label, hint, className, ...props }: { name: string; label: string; hint?: string; className?: string } & Omit<React.ComponentProps<'textarea'>, 'name' | 'className'>) {
  const id = useId(name)
  const error = useFieldError(name)
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        name={name}
        rows={4}
        aria-invalid={error ? true : undefined}
        className={cn(smallInputClass, 'h-auto min-h-24 py-2.5 leading-[22px]')}
        {...props}
      />
    </FieldShell>
  )
}

export function SelectField({
  name,
  label,
  options,
  defaultValue,
  className,
}: {
  name: string
  label: string
  options: readonly (readonly [string, string])[]
  defaultValue?: string
  className?: string
}) {
  const id = useId(name)
  const error = useFieldError(name)
  return (
    <FieldShell id={id} label={label} error={error} className={className}>
      <select id={id} name={name} defaultValue={defaultValue} aria-invalid={error ? true : undefined} className={cn(selectClass, 'w-full')}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function CheckField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  const id = useId(name)
  return (
    <label htmlFor={id} className="flex h-10 cursor-pointer items-center gap-2.5 self-end text-sm text-ink">
      <input id={id} type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 accent-[var(--color-primary)]" />
      {label}
    </label>
  )
}
