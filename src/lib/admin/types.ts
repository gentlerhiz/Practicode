/** Row shapes for the administrator console, as they come from the academy tables. */

export const COURSE_IDS = ['fe', 'da', 'ux', 'cs', 'dm', 'ai'] as const
export type CourseId = (typeof COURSE_IDS)[number]
export const ENROL_COURSE_IDS = ['fe', 'da', 'ux', 'cs', 'dm'] as const

export const REGISTRATION_STATUSES = ['new', 'contacted', 'in_group', 'enrolled', 'withdrawn'] as const
export const ATTENDANCE = ['in_person', 'online'] as const
export const ENROLMENT_STATUSES = ['awaiting_payment', 'paid', 'transfer_submitted', 'confirmed', 'cancelled'] as const
export const METHODS = ['paystack', 'transfer'] as const
export const MESSAGE_TOPICS = ['programmes', 'siwes', 'partner', 'other'] as const

export type Cohort = {
  id: string
  created_at: string
  name: string
  starts_on: string | null
  registration_open: boolean
  enrolment_open: boolean
  is_current: boolean
}

export type Course = { id: CourseId; title: string; fee_kobo: number | null; live: boolean; sort: number }

export type Settings = { id: number; siwes_discount_percent: number; siwes_admin_fee_kobo: number }

export type Registration = {
  id: string
  created_at: string
  cohort_id: string
  full_name: string
  email: string
  whatsapp: string
  course: string
  attendance: (typeof ATTENDANCE)[number]
  city: string
  state: string
  siwes: boolean
  heard_from: string | null
  consent: boolean
  status: (typeof REGISTRATION_STATUSES)[number]
  notes: string | null
}

export type Enrolment = {
  id: string
  created_at: string
  cohort_id: string | null
  email: string
  full_name: string
  whatsapp: string
  course: string
  siwes: boolean
  matric_number: string | null
  level: string | null
  letter_path: string | null
  method: (typeof METHODS)[number]
  amount_kobo: number
  status: (typeof ENROLMENT_STATUSES)[number]
  paystack_reference: string | null
  transfer_id: string | null
  receipt_path: string | null
  paid_at: string | null
  paid_amount_kobo: number | null
  paid_channel: string | null
  notes: string | null
}

export type Message = {
  id: string
  created_at: string
  topic: (typeof MESSAGE_TOPICS)[number]
  name: string
  email: string
  whatsapp: string | null
  message: string
}

export type WaitlistEntry = { id: string; created_at: string; course: string; name: string; email: string; whatsapp: string | null }

export type AdminRow = { email: string; created_at: string }
export type SessionRow = { token_hash: string; email: string; created_at: string; expires_at: string }
export type LogRow = {
  id: number
  created_at: string
  email: string
  action: string
  target_table: string | null
  target_id: string | null
  detail: Record<string, unknown> | null
}

/** What every form action returns to its form. */
export type ActionState = { ok?: boolean; message?: string; errors?: Record<string, string> }
