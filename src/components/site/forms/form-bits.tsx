import { AlertCircle } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/cn'
import { site } from '@/lib/site'

/** The canvas field: 50 px tall, 14 px corners, sunken fill, a blue ring on focus. */
export const inputClass =
  'h-[50px] w-full rounded-[14px] border border-line-control bg-sunken px-4 text-[15px] text-ink placeholder:text-ink-subtle focus:border-focus focus:shadow-[0_0_0_3px_rgba(77,107,255,0.25)] focus:outline-none aria-invalid:border-error'

export const labelClass = 'text-sm font-semibold text-ink'

export function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={`${id}-error`} role="alert" className="text-[13px] leading-5 text-error">
      {error}
    </p>
  )
}

/** A field nobody sees. Bots fill it in; the server then ignores the form. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}

/** The form-level message after a failed send, with WhatsApp as the way out. */
export function FormAlert({ message, className }: { message?: string; className?: string }) {
  if (!message) return null
  return (
    <div role="alert" className={cn('flex items-start gap-3 rounded-2xl border border-error/40 bg-error/10 px-4 py-3 text-sm leading-[22px] text-ink', className)}>
      <Icon as={AlertCircle} className="mt-0.5 shrink-0 text-error" />
      <p>
        {message}{' '}
        <a href={site.whatsapp} className="font-semibold underline underline-offset-2">
          WhatsApp 0903 057 8667
        </a>
      </p>
    </div>
  )
}

/**
 * Phone photos are often 3 to 8 MB, and a request can carry 4.5 MB at most. Large photos are redrawn at up
 * to 1800 px as JPEG before sending; PDFs and small files go as they are.
 */
export async function shrinkPhoto(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.size <= 1_500_000) return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.82))
    return blob ? new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file
  } catch {
    return file
  }
}
