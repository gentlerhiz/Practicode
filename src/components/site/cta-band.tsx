import type { Route } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import { site } from '@/lib/site'

/** The closing call to action: a blue, violet and pink band with a white button and WhatsApp. */
export function CtaBand({
  title = 'Ready to start? Join us.',
  text = 'Fill the form and pay online in a few minutes. Questions first? Message us on WhatsApp.',
  label = 'Enrol Now',
  href = '/enrol',
}: {
  title?: string
  text?: string
  label?: string
  href?: Route
}) {
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#3d5af5_0%,#6e4cf5_45%,#d9306f_100%)] px-5 py-8 text-white tab:p-14">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
        <h2 className="font-display text-[30px] leading-[34px] font-extrabold tracking-[-0.035em] tab:text-[46px] tab:leading-[50px]">
          {title}
        </h2>
        <p className="max-w-[560px] text-[17px] leading-[27px] text-white/90">{text}</p>
      </div>
      <div className="flex w-full flex-wrap gap-3 tab:w-auto">
        <Link
          href={href}
          className="press inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-[26px] font-semibold text-[#07060d] tab:w-auto"
        >
          {label}
          <Icon as={ArrowRight} />
        </Link>
        <a
          href={site.whatsapp}
          className="press inline-flex h-[54px] w-full items-center justify-center rounded-full border-[1.5px] border-white/60 px-[26px] font-semibold text-white tab:w-auto"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  )
}
