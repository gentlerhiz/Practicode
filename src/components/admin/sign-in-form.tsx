'use client'

import { startTransition, useActionState, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, Input } from '@/components/ui/field'
import { enterCode, requestCode, type SignInState } from '@/app/code/administrator/console/actions'
import { Result } from './forms'

/** Two steps: the email address, then the six-digit code sent to it. */
export function SignInForm() {
  const [emailState, askForCode, asking] = useActionState(requestCode, { step: 'email' } as SignInState)
  const [codeState, checkCode, checking] = useActionState(enterCode, { step: 'code' } as SignInState)
  // "Use another email" hides this particular reply; the next reply is a new object and shows again.
  const [dismissed, setDismissed] = useState<SignInState | null>(null)
  const onCodeStep = emailState.step === 'code' && emailState !== dismissed
  const email = emailState.email ?? ''

  const submit = (run: (fd: FormData) => void) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(() => run(fd))
  }

  if (!onCodeStep) {
    return (
      <form onSubmit={submit(askForCode)} className="flex flex-col gap-5" noValidate>
        <Field id="email" label="Email address" error={emailState.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={email}
            aria-invalid={emailState.errors?.email ? true : undefined}
          />
        </Field>
        <Button type="submit" size="form" pending={asking}>
          {asking ? 'Sending…' : 'Send me a code'}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={submit(checkCode)} className="flex flex-col gap-5" noValidate>
      <Result state={{ ok: true, message: emailState.message }} />
      <input type="hidden" name="email" value={email} />
      <Field id="code" label="Six-digit code" hint={`For ${email}.`} error={codeState.errors?.code}>
        <Input
          id="code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]*"
          maxLength={7}
          required
          autoFocus
          aria-invalid={codeState.errors?.code ? true : undefined}
          className="font-mono text-lg tracking-[0.3em]"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="form" pending={checking}>
          {checking ? 'Checking…' : 'Sign in'}
        </Button>
        <Button variant="ghost" onClick={() => setDismissed(emailState)}>
          Use another email or get a new code
        </Button>
      </div>
    </form>
  )
}
