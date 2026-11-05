import 'server-only'
import { unstable_cache } from 'next/cache'
import { ENROLLABLE, FALLBACK_PRICING, type Enrollable, type Pricing } from '@/lib/enrolment'
import { canStore } from './env'
import { admin } from './supabase'

export type Cohort = { id: string; name: string; registrationOpen: boolean; enrolmentOpen: boolean }
export type Catalogue = { pricing: Pricing; live: Enrollable[] }

const isEnrollable = (id: string): id is Enrollable => (ENROLLABLE as readonly string[]).includes(id)

/** Reads fees, live courses and SIWES terms from the database. Throws if the read fails. */
async function readCatalogue(): Promise<Catalogue> {
  const db = admin()
  const [courses, settings] = await Promise.all([
    db.from('academy_courses').select('id, fee_kobo, live').order('sort'),
    db.from('academy_settings').select('siwes_discount_percent, siwes_admin_fee_kobo').eq('id', 1).maybeSingle(),
  ])
  if (courses.error) throw new Error(`academy_courses: ${courses.error.message}`)
  if (settings.error) throw new Error(`academy_settings: ${settings.error.message}`)

  const feeKobo = { ...FALLBACK_PRICING.feeKobo }
  const live: Enrollable[] = []
  for (const c of courses.data ?? []) {
    if (!isEnrollable(c.id)) continue
    if (typeof c.fee_kobo === 'number' && c.fee_kobo > 0) feeKobo[c.id] = c.fee_kobo
    if (c.live) live.push(c.id)
  }
  return {
    pricing: {
      feeKobo,
      siwesPercent: settings.data?.siwes_discount_percent ?? FALLBACK_PRICING.siwesPercent,
      siwesAdminFeeKobo: settings.data?.siwes_admin_fee_kobo ?? FALLBACK_PRICING.siwesAdminFeeKobo,
    },
    live: live.length ? live : [...ENROLLABLE],
  }
}

const FALLBACK: Catalogue = { pricing: FALLBACK_PRICING, live: [...ENROLLABLE] }

/** Fresh read, for the enrolment action: the amount charged must come from the database as it is now. */
export async function getCatalogueFresh(): Promise<Catalogue> {
  if (!canStore()) return FALLBACK
  try {
    return await readCatalogue()
  } catch (error) {
    console.error('Catalogue read failed; using built-in fees', error)
    return FALLBACK
  }
}

const cachedCatalogue = unstable_cache(readCatalogue, ['academy-catalogue'], { revalidate: 60, tags: ['academy-catalogue'] })

/** For pages: cached for a minute, so a busy page doesn't hammer the database. */
export async function getCatalogue(): Promise<Catalogue> {
  if (!canStore()) return FALLBACK
  try {
    return await cachedCatalogue()
  } catch (error) {
    console.error('Catalogue read failed; using built-in fees', error)
    return FALLBACK
  }
}

/** The one current cohort, or null when there is none (or the database can't be read). */
async function readCohort(): Promise<Cohort | null> {
  const { data, error } = await admin()
    .from('academy_cohorts')
    .select('id, name, registration_open, enrolment_open')
    .eq('is_current', true)
    .maybeSingle()
  if (error) throw new Error(`academy_cohorts: ${error.message}`)
  return data ? { id: data.id, name: data.name, registrationOpen: data.registration_open, enrolmentOpen: data.enrolment_open } : null
}

export async function getCurrentCohortFresh(): Promise<Cohort | null> {
  if (!canStore()) return null
  try {
    return await readCohort()
  } catch (error) {
    console.error('Cohort read failed', error)
    return null
  }
}

const cachedCohort = unstable_cache(readCohort, ['academy-current-cohort'], { revalidate: 60, tags: ['academy-cohort'] })

export async function getCurrentCohort(): Promise<Cohort | null> {
  if (!canStore()) return null
  try {
    return await cachedCohort()
  } catch (error) {
    console.error('Cohort read failed', error)
    return null
  }
}
