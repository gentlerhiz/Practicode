import { toCsv } from '@/lib/admin/csv'
import { EnrolmentFilter, MessageFilter, RegistrationFilter, WaitlistFilter } from '@/lib/admin/schemas'
import { requireAdmin } from '@/lib/server/admin/auth'
import { listCohorts, listCourses, listEnrolments, listMessages, listRegistrations, listWaitlist, pickCohort } from '@/lib/server/admin/data'
import { logExport } from '@/lib/server/admin/write'

/** CSV of the current filter for registrations, enrolments, messages or the waitlist. */
export async function GET(request: Request, ctx: RouteContext<'/code/administrator/console/export/[kind]'>) {
  const me = await requireAdmin()
  const { kind } = await ctx.params
  const query = Object.fromEntries(new URL(request.url).searchParams)
  const stamp = new Date().toISOString().slice(0, 10)

  let csv: string
  let rowsOut: number
  let filter: Record<string, unknown>

  if (kind === 'registrations' || kind === 'enrolments') {
    const [cohorts, courses] = await Promise.all([listCohorts(), listCourses()])
    const cohortName = (id: string | null) => cohorts.find((c) => c.id === id)?.name ?? ''
    const courseName = (id: string) => courses.find((c) => c.id === id)?.title ?? id
    if (kind === 'registrations') {
      const f = RegistrationFilter.parse(query)
      const { id } = pickCohort(f.cohort, cohorts)
      const { rows } = await listRegistrations(f, id, 'all')
      const cols = ['created_at', 'cohort', 'full_name', 'email', 'whatsapp', 'course', 'attendance', 'city', 'state', 'siwes', 'heard_from', 'consent', 'status', 'notes', 'id']
      csv = toCsv(cols, rows.map((r) => ({ ...r, cohort: cohortName(r.cohort_id), course: courseName(r.course) })))
      rowsOut = rows.length
      filter = { ...f, cohort: id ?? 'all' }
    } else {
      const f = EnrolmentFilter.parse(query)
      const { id } = pickCohort(f.cohort, cohorts)
      const { rows } = await listEnrolments(f, id, 'all')
      const cols = [
        'created_at',
        'cohort',
        'full_name',
        'email',
        'whatsapp',
        'course',
        'siwes',
        'matric_number',
        'level',
        'method',
        'amount_naira',
        'status',
        'paystack_reference',
        'transfer_id',
        'paid_at',
        'paid_amount_naira',
        'paid_channel',
        'has_receipt',
        'has_letter',
        'notes',
        'id',
      ]
      csv = toCsv(
        cols,
        rows.map((e) => ({
          ...e,
          cohort: cohortName(e.cohort_id),
          course: courseName(e.course),
          amount_naira: e.amount_kobo / 100,
          paid_amount_naira: e.paid_amount_kobo == null ? null : e.paid_amount_kobo / 100,
          has_receipt: Boolean(e.receipt_path),
          has_letter: Boolean(e.letter_path),
        })),
      )
      rowsOut = rows.length
      filter = { ...f, cohort: id ?? 'all' }
    }
  } else if (kind === 'messages') {
    const f = MessageFilter.parse(query)
    const { rows } = await listMessages(f, 'all')
    csv = toCsv(['created_at', 'topic', 'name', 'email', 'whatsapp', 'message', 'id'], rows)
    rowsOut = rows.length
    filter = f
  } else if (kind === 'waitlist') {
    const f = WaitlistFilter.parse(query)
    const { rows } = await listWaitlist(f, 'all')
    csv = toCsv(['created_at', 'course', 'name', 'email', 'whatsapp', 'id'], rows)
    rowsOut = rows.length
    filter = f
  } else {
    return new Response('Not found', { status: 404 })
  }

  await logExport(me, `academy_${kind}`, rowsOut, filter)
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="practicode-${kind}-${stamp}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
