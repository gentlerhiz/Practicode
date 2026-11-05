import { ActionForm, CheckField, TextField } from '@/components/admin/forms'
import { Badge, PageHead, Panel } from '@/components/admin/ui'
import { koboToNairaInput, naira } from '@/lib/admin/format'
import { requireAdmin } from '@/lib/server/admin/auth'
import { getSettings, listCourses } from '@/lib/server/admin/data'
import { saveCourse, saveSettings } from '../../actions'

export const metadata = { title: 'Courses and prices' }

export default async function CoursesPage() {
  await requireAdmin()
  const [courses, settings] = await Promise.all([listCourses(), getSettings()])

  return (
    <>
      <PageHead
        title="Courses and prices"
        note="Fees are in naira. Public pages pick up changes within about a minute."
      />
      <div className="grid grid-cols-1 gap-4 wide:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-4">
          {courses.map((c) => (
            <Panel
              key={c.id}
              title={c.title}
              aside={
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ink-muted tabular-nums">{naira(c.fee_kobo)}</span>
                  <Badge tone={c.live ? 'green' : 'neutral'}>{c.live ? 'Live' : 'Not live'}</Badge>
                  <span className="font-mono text-xs text-ink-subtle">{c.id}</span>
                </div>
              }
            >
              <ActionForm action={saveCourse} submit="Save course" variant="secondary">
                <input type="hidden" name="id" value={c.id} />
                <div className="grid grid-cols-1 gap-4 ph:grid-cols-2 tab:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_100px_auto]">
                  <TextField name="title" label="Title" defaultValue={c.title} maxLength={80} required />
                  <TextField name="fee" label="Fee (naira)" inputMode="decimal" defaultValue={koboToNairaInput(c.fee_kobo)} hint="Blank for no price yet." />
                  <TextField name="sort" label="Order" type="number" min={0} max={1000} defaultValue={c.sort} />
                  <CheckField name="live" label="Live" defaultChecked={c.live} />
                </div>
              </ActionForm>
            </Panel>
          ))}
        </div>
        <Panel title="SIWES pricing" className="self-start">
          <ActionForm action={saveSettings} submit="Save SIWES pricing">
            <TextField
              name="siwes_discount_percent"
              label="SIWES discount (percent)"
              type="number"
              min={0}
              max={100}
              defaultValue={settings?.siwes_discount_percent ?? 20}
            />
            <TextField
              name="siwes_admin_fee"
              label="SIWES administrative fee (naira)"
              inputMode="decimal"
              defaultValue={koboToNairaInput(settings?.siwes_admin_fee_kobo ?? 0)}
              hint="Paid on resumption. 0 for none."
            />
          </ActionForm>
        </Panel>
      </div>
    </>
  )
}
