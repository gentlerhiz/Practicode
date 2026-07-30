'use client'

import { motion } from 'framer-motion'
import { Laptop, Plug, Pen, Brain, Target, Wifi, GraduationCap } from 'lucide-react'

const requirements = [
  { icon: Laptop, text: 'A laptop (strongly recommended)' },
  { icon: Plug, text: 'Charger' },
  { icon: Pen, text: 'Writing materials' },
  { icon: Brain, text: 'A willingness to learn' },
  { icon: Target, text: 'Commitment and consistency' },
  { icon: Wifi, text: 'Internet access for online resources where necessary' },
]

const disciplines = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Computer Engineering',
  'Cybersecurity',
  'Information Systems',
  'Data Science',
  'Other related technology disciplines',
]

export default function SiwesRequirementsEligibility() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Requirements &amp; Eligibility
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            What You Need & Who Can Apply
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-[#000000] px-8 py-5">
                <h3 className="text-white font-bold text-xl">Requirements</h3>
                <p className="text-gray-400 text-sm mt-1">Students should have:</p>
              </div>
              <div className="p-8 space-y-4">
                {requirements.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FFCA1A]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#FFCA1A]" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden h-full">
              <div className="bg-[#FFCA1A] px-8 py-5">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-7 h-7 text-gray-900" />
                  <div>
                    <h3 className="text-gray-900 font-bold text-xl">Who Can Apply?</h3>
                    <p className="text-gray-700 text-sm">Suitable for students from:</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-3">
                  {disciplines.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FFCA1A] flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Students from other disciplines with an interest in technology may also be considered.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



