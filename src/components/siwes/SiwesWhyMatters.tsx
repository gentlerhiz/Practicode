'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// ─── Split into two focused sections ───────────────────────────────────────

const outcomes = [
  'Apply classroom knowledge to real projects.',
  'Develop practical, job-ready technical skills.',
  'Build a professional portfolio of projects.',
  'Improve your problem-solving and critical thinking abilities.',
  'Work with modern tools and technologies used in the industry.',
  'Learn software development best practices and professional workflows.',
  'Gain confidence by building solutions from start to finish.',
  'Strengthen your CV before graduation.',
  'Prepare for internships, graduate programs, and entry-level technology roles.',
]

// Part A — the problem statement / context
export function SiwesWhyMattersContext() {
  return (
    <section className="py-14 md:py-20 bg-white border-b border-gray-100">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4"
          >
            Why SIWES Matters
          </motion.p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-5">
                Your Industrial Training Should Be the Foundation of Your Career
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Students Industrial Work Experience Scheme (SIWES) is one of the most important stages of your academic journey. It provides students with the opportunity to apply classroom knowledge in a real working environment while gaining practical skills that employers value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-5 text-gray-600 leading-relaxed"
            >
              <p>
                Many students complete SIWES without acquiring meaningful technical experience — assigned routine office tasks with limited exposure to their field of study.
              </p>
              <p>
                At Practicode Academy, we believe your industrial training should be an opportunity to{' '}
                <strong className="text-gray-900">learn, build, and grow</strong>. Our program bridges the gap between academic learning and industry practice through hands-on training, practical exercises, assignments, and real-world projects.
              </p>
              <p>
                Our goal is not simply to help you complete your industrial training requirement — we aim to equip you with practical knowledge, professional discipline, and the confidence to succeed in today&apos;s technology industry.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Part B — concrete outcomes list on dark bg
export function SiwesWhyOutcomes() {
  return (
    <section className="py-14 md:py-20 bg-[#000000]">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
            {/* Sticky label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:sticky md:top-28"
            >
              <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3">
                What You Gain
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-[220px]">
                During your 3-month training, you will:
              </h3>
            </motion.div>

            {/* Outcomes grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {outcomes.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-4 hover:bg-white/8 hover:border-[#FFCA1A]/20 transition-colors duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FFCA1A] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Default export for backward compat — page.tsx already imports SiwesWhyMatters
// but we'll update page.tsx to use the two named exports instead
export default function SiwesWhyMatters() {
  return (
    <>
      <SiwesWhyMattersContext />
      <SiwesWhyOutcomes />
    </>
  )
}



