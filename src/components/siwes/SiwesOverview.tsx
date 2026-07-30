'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Code2,
  Users,
  Trophy,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────
// Part A — Intro banner: bold headline + two-sentence pitch
// ─────────────────────────────────────────────────────────────

export function SiwesIntro() {
  return (
    <section className="bg-white py-14 md:py-20 border-b border-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-[1fr_auto] gap-10 items-end"
          >
            {/* Headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4"
              >
                About the Program
              </motion.p>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight">
                Gain Practical Tech Skills{' '}
                <br className="hidden md:block" />
                During Your{' '}
                <span className="relative inline-block">
                  Industrial Training
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A]/30 -z-10 rounded-sm" />
                </span>
              </h2>
            </div>

            {/* CTA pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCA1A] text-gray-900 font-bold text-sm rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Register for SIWES
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Divider + body copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-6"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              Turn your 3-month SIWES into a valuable learning experience by working on real-world projects and acquiring industry-relevant skills at{' '}
              <strong className="text-gray-900">Practicode Academy</strong>.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you&apos;re studying Computer Science, Information Technology, Software Engineering, Computer Engineering, or any related discipline, our SIWES program is designed to bridge the gap between classroom knowledge and practical industry experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Part B — Four-pillar cards + stat strip
// ─────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: BookOpen,
    label: 'Practical-first learning',
    desc: 'Every session is built around doing, not just listening.',
    bg: 'bg-amber-50',
    iconColor: 'text-[#FFCA1A]',
    ring: 'ring-amber-100',
  },
  {
    icon: Code2,
    label: 'Real-world projects',
    desc: 'Build full solutions you can add to your portfolio.',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    ring: 'ring-blue-100',
  },
  {
    icon: Users,
    label: 'Team collaboration',
    desc: 'Work alongside peers on shared engineering challenges.',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    ring: 'ring-emerald-100',
  },
  {
    icon: Trophy,
    label: 'Capstone completion',
    desc: 'Graduate with a complete project and a signed certificate.',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    ring: 'ring-purple-100',
  },
]

const stats = [
  { value: '3', unit: 'Months', sub: 'Full program' },
  { value: '50%', unit: 'Tuition off', sub: 'Exclusive discount' },
  { value: '100%', unit: 'Hands-on', sub: 'Practical training' },
  { value: '1', unit: 'Capstone', sub: 'Portfolio project' },
]

export function SiwesPillars() {
  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Pillar cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className={`rounded-2xl bg-white border border-gray-100 ring-1 ${p.ring} p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${p.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{p.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-2xl bg-[#000000] px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/10"
        >
          {stats.map((s) => (
            <div key={s.sub} className="flex flex-col items-center text-center px-4">
              <span className="text-3xl font-black text-[#FFCA1A] leading-none">{s.value}</span>
              <span className="text-white font-semibold text-sm mt-1">{s.unit}</span>
              <span className="text-gray-500 text-xs mt-0.5">{s.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Eligible disciplines strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center gap-2 mr-2">
            <GraduationCap className="w-5 h-5 text-[#FFCA1A]" />
            <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Open to:</span>
          </div>
          {[
            'Computer Science',
            'Information Technology',
            'Software Engineering',
            'Computer Engineering',
            'Cybersecurity',
            'Data Science',
            '& more',
          ].map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
            >
              {d !== '& more' && (
                <Briefcase className="w-3 h-3 text-[#FFCA1A]" />
              )}
              {d}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Default export combines both for convenience (single import in page)
export default function SiwesOverview() {
  return (
    <>
      <SiwesIntro />
      <SiwesPillars />
    </>
  )
}




