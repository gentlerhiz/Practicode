'use client'

import { motion } from 'framer-motion'
import { BookMarked, CalendarClock, PenTool, AlertTriangle, CheckCircle2 } from 'lucide-react'

const logbookRules = [
  {
    icon: PenTool,
    title: 'Record daily or weekly activities',
    desc: 'Log your activities accurately to reflect the work done during each session.',
    accent: 'text-blue-400 bg-blue-500/10',
  },
  {
    icon: CalendarClock,
    title: 'Submit every week for review',
    desc: 'Your logbook must be submitted weekly for review and signing by the Academy.',
    accent: 'text-emerald-400 bg-emerald-500/10',
  },
  {
    icon: CheckCircle2,
    title: 'Academy endorses entries',
    desc: 'The Academy reviews your entries before endorsing them with the appropriate signature.',
    accent: 'text-[#FFCA1A] bg-[#FFCA1A]/10',
  },
  {
    icon: AlertTriangle,
    title: 'Avoid late submissions',
    desc: 'Students who fail to submit logbooks regularly may face delays in signing and administrative penalties.',
    accent: 'text-rose-400 bg-rose-500/10',
  },
]

export default function SiwesLogbook() {
  return (
    <section className="py-14 md:py-20 bg-[#000000]">
      {/* Full navbar-width container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4">
              Logbook Policy
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              SIWES Logbook Policy
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              All SIWES students are required to maintain and update their official SIWES logbook throughout the duration of the program.
            </p>
            <div className="rounded-2xl bg-[#FFCA1A]/10 border border-[#FFCA1A]/20 p-5">
              <div className="flex gap-3 items-start">
                <BookMarked className="w-5 h-5 text-[#FFCA1A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Keeping your logbook up to date is an important part of your SIWES requirements. Treat it with the same seriousness as your classes and assignments.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — rules grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {logbookRules.map((rule, i) => {
              const Icon = rule.icon
              return (
                <motion.div
                  key={rule.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${rule.accent} mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold mb-1.5 text-sm leading-snug">{rule.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{rule.desc}</p>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}



