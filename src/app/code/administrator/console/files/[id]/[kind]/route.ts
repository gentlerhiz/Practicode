import { Uuid } from '@/lib/admin/schemas'
import { requireAdmin } from '@/lib/server/admin/auth'
import { uploadLink } from '@/lib/server/admin/write'

/**
 * Opens an enrolment's receipt or introduction letter. The link is made on demand and works for ten
 * minutes, so a copied link soon stops working.
 */
export async function GET(_request: Request, ctx: RouteContext<'/code/administrator/console/files/[id]/[kind]'>) {
  await requireAdmin()
  const { id, kind } = await ctx.params
  const parsed = Uuid.safeParse(id)
  if (!parsed.success || (kind !== 'receipt' && kind !== 'letter')) return new Response('Not found', { status: 404 })
  const url = await uploadLink(parsed.data, kind)
  if (!url) return new Response('That enrolment has no such upload.', { status: 404, headers: { 'Cache-Control': 'private, no-store' } })
  return new Response(null, { status: 303, headers: { Location: url, 'Cache-Control': 'private, no-store' } })
}
