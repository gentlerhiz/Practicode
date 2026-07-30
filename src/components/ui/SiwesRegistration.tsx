'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const requirements = [
  'Laptop (strongly recommended)',
  'Charger and basic stationery',
  'Reliable internet access',
  'Commitment to attend every session',
  'Willingness to learn and build',
]

const eligibleStudents = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Computer Engineering',
  'Cybersecurity',
  'Information Systems',
  'Data Science',
  'Other related tech disciplines',
]

const registrationSteps = [
  {
    step: 1,
    title: 'Request the registration form',
    description: 'Send a WhatsApp message or call 09030578667 to request the SIWES registration form.',
  },
  {
    step: 2,
    title: 'Complete your registration',
    description: 'Fill out the form carefully and pay the discounted SIWES fee of ₦40,000.',
  },
  {
    step: 3,
    title: 'Confirm and onboard',
    description: 'Submit your details and payment, then receive confirmation and onboarding information.',
  },
]

export default function SiwesRegistration() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid gap-12 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <p className="text-[#FFCA1A] text-xs font-semibold uppercase tracking-[0.24em] mb-3">
              Registration & Eligibility
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Register fast, start strong, and stay on track.
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mb-10">
              Our SIWES application path is designed for busy students: request the form, submit details, pay the discounted fee, and receive your onboarding information.
            </p>

            <div className="grid gap-4">
              {registrationSteps.map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.step * 0.05 }}
                  className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A] font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="hover:shadow-xl">
              <CardHeader>
                <CardTitle>Program Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {requirements.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#FFCA1A]">•</span>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl">
              <CardHeader>
                <CardTitle>Who Can Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eligibleStudents.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#FFCA1A]">•</span>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Class Location</h3>
                  <p className="text-gray-600">7B Oba Olagbegi Avenue, Old Bodija, Ibadan</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Need help?</h3>
                  <Link href="tel:+2349030578667" className="text-[#FFCA1A] font-semibold">
                    Call 09030578667
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
