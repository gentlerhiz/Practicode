'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, FileText, Briefcase, Code, Users } from 'lucide-react'
import Link from 'next/link'

const resources = [
  {
    icon: BookOpen,
    title: 'Free Tech Tutorials',
    description: 'Step-by-step video courses and written guides',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'Downloadable PDFs',
    description: 'Cheat sheets, templates, and learning materials',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Briefcase,
    title: 'Career Support Guides',
    description: 'Resume tips, interview prep, and job search strategies',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Code,
    title: 'Coding Challenge Library',
    description: 'Practice problems and project ideas to build your skills',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Community Events & Meetups',
    description: 'Connect with peers and industry professionals',
    color: 'from-indigo-500 to-purple-500'
  }
]

export default function ResourcesHub() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Valuable Resources
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Access our comprehensive collection of free learning materials, career resources, and community support.
          </h2>

          {/* CTA */}
          <Link href="/resources">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-lg">
              <span>Access Resources</span>
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
