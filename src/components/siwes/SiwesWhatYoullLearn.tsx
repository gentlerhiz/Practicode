'use client'

import { motion } from 'framer-motion'
import {
  FileCode2,
  Palette,
  Smartphone,
  Atom,
  ServerCog,
  Database,
  GitBranch,
  LayoutTemplate,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react'

const topics = [
  { icon: FileCode2, label: 'HTML & CSS', color: 'text-orange-500 bg-orange-50' },
  { icon: FileCode2, label: 'JavaScript', color: 'text-yellow-500 bg-yellow-50' },
  { icon: Smartphone, label: 'Responsive Web Design', color: 'text-blue-500 bg-blue-50' },
  { icon: Atom, label: 'React', color: 'text-cyan-500 bg-cyan-50' },
  { icon: ServerCog, label: 'Backend Development', color: 'text-violet-500 bg-violet-50' },
  { icon: Database, label: 'Databases', color: 'text-emerald-500 bg-emerald-50' },
  { icon: GitBranch, label: 'Version Control (Git & GitHub)', color: 'text-gray-600 bg-gray-100' },
  { icon: LayoutTemplate, label: 'UI/UX Fundamentals', color: 'text-pink-500 bg-pink-50' },
  { icon: ShieldCheck, label: 'Software Dev Best Practices', color: 'text-teal-500 bg-teal-50' },
  { icon: FolderGit2, label: 'Real-world Project Development', color: 'text-amber-600 bg-amber-50' },
]

export default function SiwesWhatYoullLearn() {
  return (
    <section className="py-14 md:py-20 bg-[#000000]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Curriculum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5"
          >
            What You&apos;ll Learn
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Depending on your field and assigned learning path, you may gain practical experience in areas such as:
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {topics.map((topic, i) => {
            const Icon = topic.icon
            return (
              <motion.div
                key={topic.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center text-center gap-3 hover:bg-white/10 hover:border-[#FFCA1A]/30 transition-all duration-300 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${topic.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-white text-sm font-medium leading-snug">{topic.label}</span>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Learning paths may vary depending on your department and current skill level.
        </motion.p>
      </div>
    </section>
  )
}



