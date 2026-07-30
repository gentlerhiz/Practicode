'use client'

import { motion } from 'framer-motion'
import { PenLine, BookCheck, MessageSquare, Layers, Trophy, BadgeCheck } from 'lucide-react'

const assessments = [
  { icon: PenLine, label: 'Practical exercises' },
  { icon: BookCheck, label: 'Weekly assignments' },
  { icon: MessageSquare, label: 'Classroom participation' },
  { icon: Layers, label: 'Mini projects' },
  { icon: Trophy, label: 'Final Capstone Project' },
]

const certRequirements = [
  'Complete the full 3-month program',
  'Meet attendance requirements',
  'Submit all required assignments',
  'Successfully complete the Capstone Project',
]

export default function SiwesAssessmentCert() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Assessment &amp; Certification
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            How You&apos;ll Be Assessed &amp; Certified
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-gray-100 bg-gray-50 p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Assessment Methods</h3>
            <p className="text-gray-600 text-sm mb-7">
              These activities reinforce learning and ensure students gain practical experience throughout the program.
            </p>
            <div className="space-y-4">
              {assessments.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-4 bg-white rounded-xl px-5 py-3 border border-gray-100 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FFCA1A]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#FFCA1A]" />
                    </div>
                    <span className="text-gray-800 font-medium">{item.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Certificate */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl bg-[#000000] p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFCA1A]/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#FFCA1A] flex items-center justify-center mb-5">
                <Trophy className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Certificate of Completion</h3>
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Students who satisfy all graduation requirements will receive an official Certificate of Completion from Practicode Academy.
              </p>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-4">Requirements:</p>
              <ul className="space-y-3">
                {certRequirements.map((req, i) => (
                  <motion.li
                    key={req}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <BadgeCheck className="w-5 h-5 text-[#FFCA1A] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



