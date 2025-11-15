'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EventsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCA1A]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Events & Community
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Grow skills. Build connections. Stay inspired.
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light">
              Join our community events and grow your network.
            </p>

            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-10 py-5 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-xl group">
                <span>Attend an Event</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
