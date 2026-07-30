'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const activities = [
  'Practical classroom sessions',
  'Hands-on coding and technical exercises',
  'Weekly assignments',
  'Mini practical tasks',
  'Real-world projects',
  'Team collaboration',
  'Capstone Project (completed before end of program)',
]

export default function SiwesWhyChoose() {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Why Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
          >
            Why Choose{' '}
            <span className="relative inline-block">
              Practicode Academy?
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A]/30 -z-10 rounded-sm" />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            At Practicode Academy, we believe students learn best by building. Our SIWES program focuses on practical learning rather than theory alone. Every student is expected to actively participate in:
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {activities.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <CheckCircle2 className="w-5 h-5 text-[#FFCA1A] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-gray-800 font-medium text-sm leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto rounded-3xl bg-[#000000] p-8 text-center"
        >
          <p className="text-white text-lg leading-relaxed">
            By the end of the program, you&apos;ll have practical experience that can{' '}
            <span className="text-[#FFCA1A] font-semibold">strengthen your CV</span> and prepare you for future employment opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  )
}



