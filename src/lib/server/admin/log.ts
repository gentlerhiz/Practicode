import 'server-only'
import { admin } from '../supabase'

/**
 * Records one console action in academy_admin_log. Details stay small and never hold secrets or codes.
 * A failed log write is reported but doesn't undo the change it describes.
 */
export async function logAction(
  email: string,
  action: string,
  table: string | null,
  id: string | null,
  detail: Record<string, unknown> | null,
): Promise<void> {
  const { error } = await admin().from('academy_admin_log').insert({ email, action, target_table: table, target_id: id, detail })
  if (error) console.error('academy_admin_log', error.message)
}

/** Which fields changed between two versions of a row, for the log. Long text is summarised. */
export function changes(before: Record<string, unknown>, after: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(after)) {
    if (before[k] === v) continue
    out[k] = typeof v === 'string' && v.length > 120 ? `${v.length} characters` : v
  }
  return out
}
