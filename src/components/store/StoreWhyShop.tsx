'use client'

import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Tag,
  Truck,
  Store,
  GraduationCap,
  Lock,
  Award,
  HeadphonesIcon,
} from 'lucide-react'

const reasons = [
  { icon: BadgeCheck, title: 'Carefully Inspected Products', desc: 'Every item is checked before dispatch so you always receive quality.' },
  { icon: Tag, title: 'Affordable Prices', desc: 'Competitive pricing on all products with student-friendly options.' },
  { icon: Truck, title: 'Nationwide Delivery', desc: 'We deliver to any address across Nigeria through trusted logistics.' },
  { icon: Store, title: 'Physical Store Available', desc: 'Walk in, inspect, and purchase in person at our Ibadan office.' },
  { icon: GraduationCap, title: 'Student-Friendly Pricing', desc: 'Special consideration for students, especially SIWES and cohort learners.' },
  { icon: Lock, title: 'Secure Ordering Process', desc: 'Simple, transparent payment process with verified confirmation.' },
  { icon: Award, title: 'Quality Assurance', desc: 'Only products that pass our internal quality checks make it to the shelf.' },
  { icon: HeadphonesIcon, title: 'Excellent Customer Support', desc: 'Reach us via WhatsApp or phone for fast, friendly assistance.' },
]

export default function StoreWhyShop() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2"
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            >
              Why Shop With Practicode Store?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base max-w-sm md:text-right leading-relaxed"
          >
            Eight reasons thousands of students and professionals trust us.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFCA1A]/10 flex items-center justify-center mb-4 group-hover:bg-[#FFCA1A]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#FFCA1A]" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{r.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
