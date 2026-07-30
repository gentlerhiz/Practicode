'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Award, Clock, GraduationCap } from 'lucide-react'

export default function SiwesHero() {
  return (
    <section className="relative bg-[#000000] overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-[#FFCA1A]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFCA1A 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="py-20 lg:py-28 max-w-4xl">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4"
          >
            SIWES / Industrial Training
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5"
          >
            Turn your industrial training into{' '}
            <span className="relative inline-block">
              practical tech experience
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A]/30 -z-10 origin-left rounded-sm"
              />
            </span>
            .
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10"
          >
            Practicode Academy helps SIWES students build real-world projects, master workplace tools, and complete training with confidence — through structured lessons, weekly assignments, and guided support.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              Register for SIWES
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
            >
              Talk to Admissions
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-6 pt-8 border-t border-white/10"
          >
            {[
              { icon: Clock, text: '3-Month Program' },
              { icon: Award, text: 'Certificate Included' },
              { icon: GraduationCap, text: '50% Tuition Discount' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#FFCA1A]" />
                <span className="text-gray-400 text-sm font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
