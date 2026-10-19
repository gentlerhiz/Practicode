'use client'

import { Download } from 'lucide-react'
import { Icon } from '@/components/ui/icon'

/** Opens the browser's print dialog, where students can print the receipt or save it as a PDF. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="press inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-[22px] text-[15px] font-semibold text-on-primary tab:w-auto print:hidden"
    >
      <Icon as={Download} />
      Save or Print Receipt
    </button>
  )
}
