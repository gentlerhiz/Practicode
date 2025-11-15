'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Phone } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FFCA1A]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Animated Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-32 h-32 border-2 border-[#FFCA1A]/20 rounded-full"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-20 w-24 h-24 border-2 border-blue-500/20 rounded-2xl"
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Start Your Tech Journey with{' '}
              <span className="relative inline-block">
                Practicode
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-4 bg-[#FFCA1A] -z-10 rounded-sm"
                />
              </span>
              {' '}Today.
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              The future needs skilled minds — yours should be one of them.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            {/* Get Started Button */}
            <Link href="/contact">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-xl group">
                <span className="text-lg">✅</span>
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            </Link>

            {/* Book a Meeting Button */}
            <Link href="/contact">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl group">
                <Calendar className="w-5 h-5" strokeWidth={2.5} />
                <span>Book a Meeting</span>
              </button>
            </Link>
          </motion.div>

          {/* Contact Academic Coordinator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="tel:+2349030578667"
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#FFCA1A] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Talk to Coordinator</div>
                  <div className="text-base font-bold group-hover:text-[#FFCA1A] transition-colors">
                    09030578667
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Optional Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>ISO-Standard Curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FFCA1A] rounded-full"></div>
                <span>Job-Ready Training</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
