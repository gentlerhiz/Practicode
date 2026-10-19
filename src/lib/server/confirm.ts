import 'server-only'
import { chargeCovers } from '@/lib/enrolment'
import { sendEnrolmentEmails } from './email'
import { verifyPayment } from './paystack'
import { admin, type EnrolmentRow } from './supabase'

export type Confirmation = { state: 'paid' | 'pending' | 'failed' | 'unknown'; row?: EnrolmentRow }

/**
 * Checks a returning Paystack payment and marks the enrolment paid. Safe to run again (a refresh, a
 * second tab): only the update that changes the status sends the emails.
 */
export async function confirmPayment(reference: string | undefined): Promise<Confirmation> {
  if (!reference || !/^PCA-[A-Z2-9]{5}-[A-Z2-9]{5}$/.test(reference)) return { state: 'unknown' }
  const db = admin()
  const { data: row } = await db.from('academy_enrolments').select('*').eq('paystack_reference', reference).maybeSingle<EnrolmentRow>()
  if (!row) return { state: 'unknown' }
  if (row.status === 'paid' || row.status === 'confirmed') return { state: 'paid', row }

  let tx
  try {
    tx = await verifyPayment(reference)
  } catch (error) {
    console.error('Paystack verify failed', error)
    return { state: 'pending', row }
  }
  if (!chargeCovers(tx, row)) return { state: tx.status === 'abandoned' || tx.status === 'ongoing' || tx.status === 'pending' ? 'pending' : 'failed', row }

  const { data: updated } = await db
    .from('academy_enrolments')
    .update({ status: 'paid', paid_at: tx.paid_at ?? new Date().toISOString(), paid_amount_kobo: tx.amount, paid_channel: tx.channel ?? null })
    .eq('id', row.id)
    .eq('status', 'awaiting_payment')
    .select()
    .maybeSingle<EnrolmentRow>()
  if (updated) await sendEnrolmentEmails(updated, 'paid')
  return { state: 'paid', row: updated ?? { ...row, status: 'paid' } }
}
