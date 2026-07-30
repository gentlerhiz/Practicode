'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const checkItems = [
  'Overall Physical Condition',
  'Keyboard',
  'Display Quality',
  'Battery Performance',
  'Charging Port',
  'Speakers',
  'Camera',
  'Wi-Fi Connectivity',
  'USB Ports',
  'SSD Health',
  'RAM',
  'Operating System Installation',
]

export default function StoreQualityCheck() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4">
              Quality Assurance
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Why Buy UK Used Laptops From Practicode?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Our UK Used laptops are carefully selected to ensure quality and reliability. Every laptop undergoes thorough inspection before it is offered for sale.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We only stock <strong className="text-gray-900">clean, fully functional laptops</strong> suitable for academic and professional use. No compromises on quality.
            </p>
            <div className="rounded-2xl bg-[#000000] p-6">
              <div className="flex gap-3">
                <ShieldCheck className="w-6 h-6 text-[#FFCA1A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Every device passes a 12-point quality check. If it doesn&apos;t meet our standards, it doesn&apos;t go on sale — simple.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — checklist grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-5">
              12-Point Inspection Checklist
            </p>
            <div className="grid grid-cols-2 gap-3">
              {checkItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-gray-800 text-xs font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
