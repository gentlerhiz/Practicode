import type { Enrolment } from './types'

type Money = Pick<Enrolment, 'status' | 'method' | 'amount_kobo' | 'paid_amount_kobo'>

/**
 * Money received for one enrolment, in kobo:
 * - paid or confirmed with a recorded paid amount (Paystack, or marked paid here): that amount;
 * - a confirmed bank transfer with no recorded paid amount: the amount the student was asked to pay;
 * - anything else (awaiting payment, transfer not yet checked, cancelled): nothing.
 */
export function receivedKobo(e: Money): number {
  if (e.status !== 'paid' && e.status !== 'confirmed') return 0
  if (e.paid_amount_kobo != null) return e.paid_amount_kobo
  return e.status === 'confirmed' && e.method === 'transfer' ? e.amount_kobo : 0
}

export const totalReceivedKobo = (rows: Money[]) => rows.reduce((sum, e) => sum + receivedKobo(e), 0)

/** Counts of a field's values, in the order given, with any unexpected values after them. */
export function countBy<T>(rows: T[], key: (r: T) => string, order: readonly string[] = []): [string, number][] {
  const counts = new Map<string, number>(order.map((k) => [k, 0]))
  for (const r of rows) counts.set(key(r), (counts.get(key(r)) ?? 0) + 1)
  return [...counts.entries()]
}
