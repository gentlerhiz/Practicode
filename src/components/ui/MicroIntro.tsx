'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Palette, Code, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react'

const microCourses = [
  {
    title: 'Cybersecurity Basics',
    icon: Shield,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Graphic Design for Social Media',
    icon: Palette,
    color: 'from-pink-500 to-pink-600'
  },
  {
    title: 'JavaScript Crash Course',
    icon: Code,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Starting A Freelancing Career',
    icon: Briefcase,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    title: 'AI Tools for Work & Business',
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600'
  }
]

export default function MicroIntro() {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Icon Design */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFCA1A]/20 via-purple-100/20 to-blue-100/20 rounded-3xl blur-3xl"></div>
              
              {/* Main icon container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center large icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-56 h-56 bg-gradient-to-br from-[#FFCA1A] to-[#FFD700] rounded-3xl shadow-2xl flex items-center justify-center relative z-10"
                >
                  <Sparkles className="w-28 h-28 text-gray-900" strokeWidth={1.5} />
                </motion.div>
                
                {/* Floating course icons */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0
                  }}
                  className="absolute top-8 right-12 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Code className="w-10 h-10 text-yellow-500" strokeWidth={2} />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-12 left-8 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Palette className="w-10 h-10 text-pink-500" strokeWidth={2} />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -18, 0],
                    rotate: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-40 left-4 w-16 h-16 bg-white rounded-xl shadow-xl flex items-center justify-center"
                >
                  <Shield className="w-8 h-8 text-blue-500" strokeWidth={2} />
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="absolute bottom-32 right-8 w-16 h-16 bg-white rounded-xl shadow-xl flex items-center justify-center"
                >
                  <Briefcase className="w-8 h-8 text-emerald-500" strokeWidth={2} />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3"
            >
              Micro Courses
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Learn skills you can use{' '}
              <span className="relative inline-block">
                TODAY
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A] -z-10 rounded-sm"></span>
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Affordable & accessible short courses for anyone:
            </motion.p>

            {/* Course List */}
            <div className="space-y-3 mb-10">
              {microCourses.map((course, index) => {
                const Icon = course.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <CheckCircle2 className="w-5 h-5 text-[#FFCA1A] flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-base font-semibold text-gray-900 group-hover:text-[#FFCA1A] transition-colors">
                        {course.title}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/courses#micro">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-lg group">
                  <span>Explore Micro Courses</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
