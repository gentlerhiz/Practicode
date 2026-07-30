'use client'

import { motion } from 'framer-motion'
import {
  MonitorPlay,
  Lightbulb,
  ClipboardList,
  Users,
  RotateCcw,
  Code2,
  FolderKanban,
  GraduationCap,
} from 'lucide-react'

const methods = [
  { icon: MonitorPlay, title: 'Instructor-led classes', desc: 'Expert-led sessions with step-by-step guidance on every concept.' },
  { icon: Lightbulb, title: 'Live demonstrations', desc: 'See concepts applied in real-time before you practice them yourself.' },
  { icon: ClipboardList, title: 'Guided practical sessions', desc: 'Hands-on exercises supervised by instructors every step of the way.' },
  { icon: ClipboardList, title: 'Individual assignments', desc: 'Personalised tasks that reinforce your unique learning progress.' },
  { icon: Users, title: 'Group exercises', desc: 'Collaborate with peers on shared challenges to build teamwork skills.' },
  { icon: RotateCcw, title: 'Weekly practice tasks', desc: 'Regular exercises keep knowledge fresh and skills sharp.' },
  { icon: Code2, title: 'Code reviews', desc: 'Your code gets reviewed and improved by experienced instructors.' },
  { icon: FolderKanban, title: 'Project-based learning', desc: 'Build complete projects that show employers what you can do.' },
  { icon: GraduationCap, title: 'Final Capstone Project', desc: 'Wrap up your SIWES by delivering a complete, polished project.' },
]

export default function SiwesTeachingMethod() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Teaching Method
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
          >
            How We Teach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            We focus heavily on practical learning. Students are encouraged to ask questions and participate actively throughout the program.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {methods.map((method, i) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFCA1A]/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#FFCA1A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{method.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



