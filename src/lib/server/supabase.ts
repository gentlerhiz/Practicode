import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { serverEnv } from './env'

export const UPLOADS_BUCKET = 'academy-uploads'

export type EnrolmentRow = {
  id: string
  created_at: string
  email: string
  full_name: string
  whatsapp: string
  course: 'fe' | 'da' | 'ux'
  siwes: boolean
  matric_number: string | null
  level: string | null
  letter_path: string | null
  method: 'paystack' | 'transfer'
  amount_kobo: number
  status: 'awaiting_payment' | 'paid' | 'transfer_submitted' | 'confirmed' | 'cancelled'
  paystack_reference: string | null
  transfer_id: string | null
  receipt_path: string | null
  paid_at: string | null
  paid_amount_kobo: number | null
  paid_channel: string | null
}

/** Supabase with the secret key: bypasses row-level security, so only server code uses it. */
export function admin() {
  const url = serverEnv.supabaseUrl
  const key = serverEnv.supabaseSecret
  if (!url || !key) throw new Error('Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY).')
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

/** A link to a private upload that works for seven days (for the academy's notification email). */
export async function signedUpload(path: string | null): Promise<string | null> {
  if (!path) return null
  const { data } = await admin().storage.from(UPLOADS_BUCKET).createSignedUrl(path, 60 * 60 * 24 * 7)
  return data?.signedUrl ?? null
}
