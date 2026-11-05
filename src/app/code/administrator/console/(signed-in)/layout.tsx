import { LogOut } from 'lucide-react'
import { ConsoleNav } from '@/components/admin/console-nav'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { requireAdmin } from '@/lib/server/admin/auth'
import { signOut } from '../actions'

/** The console frame: who is signed in, the section menu and the page. Pages check the session too. */
export default async function ConsoleLayout({ children }: LayoutProps<'/code/administrator/console'>) {
  const me = await requireAdmin()
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 pb-16 tab:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-line bg-card px-5 py-3">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">Academy console</span>
          <span className="mx-2 text-ink-subtle">·</span>
          Signed in as <span className="font-medium text-ink">{me.email}</span>
        </p>
        <form action={signOut}>
          <Button type="submit" size="sm" variant="secondary">
            <Icon as={LogOut} size={16} />
            Sign out
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-6 tab:flex-row tab:gap-8">
        <aside className="tab:sticky tab:top-28 tab:w-[220px] tab:shrink-0 tab:self-start">
          <ConsoleNav />
        </aside>
        <div className="min-w-0 grow">{children}</div>
      </div>
    </div>
  )
}
