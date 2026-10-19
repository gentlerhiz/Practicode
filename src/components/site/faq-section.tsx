import { MessageCircle } from 'lucide-react'
import { Tile } from '@/components/ui/tile'
import { type as t } from '@/components/ui/type'
import type { QA } from '@/content/faq'
import { site } from '@/lib/site'
import { FaqList } from './faq-list'

/** "Questions people ask us": the WhatsApp support card on the left and the questions on the right. */
export function FaqSection({ items, name, intro }: { items: QA[]; name: string; intro?: string }) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 tab:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] tab:gap-14">
      <div className="flex min-w-0 flex-col gap-4">
        <p className={`${t.kicker} text-fe-text`}>FAQs</p>
        <h2 className={t.h2}>Questions people ask us</h2>
        <p className="text-base leading-[26px] text-ink-soft">
          {intro ?? 'Quick answers about classes, payment and SIWES. Can’t find yours? We reply on WhatsApp.'}
        </p>
        <div className="mt-2 flex flex-col gap-4 rounded-[28px] border border-line p-6" style={{ background: 'var(--pc-soft-fe)' }}>
          <Tile icon={MessageCircle} tone="da" size={48} />
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-semibold text-ink">Still have a question?</p>
            <p className="text-sm leading-[22px] text-ink-muted">Message our team and we’ll get back to you the same day.</p>
          </div>
          <a
            href={site.whatsapp}
            className="press inline-flex h-[46px] items-center self-start rounded-full bg-primary px-5 text-[15px] font-semibold text-on-primary"
          >
            Chat on WhatsApp
          </a>
          <div className="flex flex-col gap-1.5 text-sm text-ink-muted">
            <span>{site.phones.join(' · ')}</span>
            <span>{site.email}</span>
          </div>
        </div>
      </div>
      <FaqList items={items} name={name} numbered />
    </div>
  )
}
