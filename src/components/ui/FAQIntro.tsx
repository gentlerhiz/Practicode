'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'What is Practicode Academy?',
    answer: 'Practicode Academy is a leading tech training institution that offers hands-on, project-based learning programs to help you build real-world skills and launch your tech career.'
  },
  {
    id: 2,
    question: 'What programs do you offer?',
    answer: 'We offer cohort-based programs in Web Development (Frontend & Backend), Data Analysis, UI/UX Design, Python for Machine Learning, and Graphics Design. We also have bootcamps, mentorship programs, and corporate training.'
  },
  {
    id: 3,
    question: 'Who are the instructors at Practicode Academy?',
    answer: 'Our instructors are experienced tech professionals and industry experts with years of hands-on experience. They are passionate about teaching and dedicated to your success.'
  },
  {
    id: 4,
    question: 'Am I eligible for admission?',
    answer: 'Our programs are open to everyone! Whether you\'re a complete beginner or looking to upskill, we have programs designed for different skill levels. No prior coding experience is required for beginner courses.'
  }
]

export default function FAQIntro() {
  const [openId, setOpenId] = useState<number | null>(null)
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Icon Design */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Background gradient circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFCA1A] via-[#FFD700] to-[#FFC700] rounded-full opacity-10"></div>
              
              {/* Decorative rings */}
              <div className="absolute inset-8 border-4 border-[#FFCA1A]/20 rounded-full"></div>
              <div className="absolute inset-16 border-2 border-[#FFCA1A]/30 rounded-full"></div>
              
              {/* Center icon circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-48 h-48 bg-gradient-to-br from-[#FFCA1A] to-[#FFD700] rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12"
                >
                  <div className="transform -rotate-12">
                    <svg 
                      className="w-24 h-24 text-gray-900" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating question marks */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }}
                className="absolute top-12 right-16 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-[#FFCA1A]">?</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-20 left-12 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center"
              >
                <span className="text-xl font-bold text-[#FFCA1A]">?</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-32 left-8 w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center"
              >
                <span className="text-lg font-bold text-[#FFCA1A]">?</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3 mb-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-base font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    {openId === faq.id ? (
                      <Minus
                        className="w-5 h-5 text-gray-900 flex-shrink-0 transition-all duration-300"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5 text-gray-400 flex-shrink-0 transition-all duration-300"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <Link href="/faq">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-lg">
                <span>See All</span>
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
