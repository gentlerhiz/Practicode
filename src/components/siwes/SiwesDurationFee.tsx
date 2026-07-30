'use client'

import { motion } from 'framer-motion'
import { Clock, Tag, Receipt, BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function SiwesDurationFee() {
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
            Duration &amp; Fees
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Simple, transparent pricing for SIWES students
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Duration card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 mb-5">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Program Duration</h3>
            <div className="text-5xl font-black text-gray-900 mb-1">3</div>
            <div className="text-[#FFCA1A] font-bold text-xl mb-3">Months</div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Students are expected to attend classes throughout the full duration of the industrial training.
            </p>
          </motion.div>

          {/* Tuition card — featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-[#000000] p-8 shadow-xl text-center relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFCA1A]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFCA1A]/10 text-[#FFCA1A] mb-5">
                <Tag className="w-7 h-7" />
              </div>
              <span className="inline-block bg-[#FFCA1A] text-gray-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                50% Discount
              </span>
              <h3 className="text-xl font-bold text-white mb-2">Tuition Fee</h3>
              <div className="text-gray-500 line-through text-lg mb-1">₦80,000</div>
              <div className="text-[#FFCA1A] text-4xl font-black mb-1">₦40,000</div>
              <p className="text-gray-400 text-sm leading-relaxed mt-3">
                Exclusive 50% discount for SIWES students undergoing industrial training.
              </p>
            </div>
          </motion.div>

          {/* Admin fee card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-[#FFCA1A] mb-5">
              <Receipt className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Administrative Fee</h3>
            <div className="text-4xl font-black text-gray-900 mb-1">₦10,000</div>
            <p className="text-[#FFCA1A] font-semibold text-sm mb-4">Payable upon resumption</p>
            <ul className="space-y-2">
              {[
                'Student documentation',
                'Administrative processing',
                'Student records',
                'Certificate processing',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                  <BadgeCheck className="w-4 h-4 text-[#FFCA1A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Total callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-5xl mx-auto mt-8 rounded-2xl bg-yellow-50 border border-[#FFCA1A]/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"        >
          <div>
            <p className="text-gray-900 font-bold text-lg">Total Cost to You</p>
            <p className="text-gray-600 text-sm">₦40,000 tuition + ₦10,000 admin fee</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-gray-900">₦50,000</span>
            <span className="text-gray-500 text-sm">total</span>
          </div>
          <Link href="/contact">
            <Button size="lg" variant="secondary">Register Now</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}



