'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Award, Clock, CheckCircle2, GraduationCap } from 'lucide-react'

const highlights = [
  'Real-world project assignments every week',
  'Capstone project before program ends',
  'Certificate of Completion issued',
  '50% tuition discount for SIWES students',
  'Logbook signing & academic support',
  'Open to all tech-related disciplines',
]

const stats = [
  { value: '3', label: 'Months' },
  { value: '₦40k', label: 'Tuition only' },
  { value: '100%', label: 'Hands-on' },
]

export default function HomeSiwesSection() {
  return (
    <section className="py-14 md:py-20 bg-[#000000] relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFCA1A 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFCA1A]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4"
            >
              SIWES / Industrial Training
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
            >
              Doing your SIWES?{' '}
              <span className="relative inline-block">
                Make it count.
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A]/30 -z-10 rounded-sm" />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-base leading-relaxed mb-8"
            >
              Don&apos;t spend your 3-month industrial training on routine office tasks. At Practicode Academy, you&apos;ll build real projects, master job-ready tools, and graduate with a portfolio — not just a logbook signature.
            </motion.p>

            

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/siwes"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Register Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — highlights + eligibility */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Highlight checklist */}
            
            

            {/* Eligible disciplines */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-[#FFCA1A]" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Open to students from</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Computer Science', 'Software Engineering', 'IT', 'Computer Engineering', 'Cybersecurity', 'Data Science', '& more'].map((d) => (
                  <span key={d} className="text-xs font-medium bg-white/8 border border-white/10 text-gray-300 px-3 py-1 rounded-full">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            
          </motion.div>

        </div>
      </div>
    </section>
  )
}
