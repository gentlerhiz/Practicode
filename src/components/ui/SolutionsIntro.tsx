'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Globe, Code2, Palette, Zap, Smartphone, Package } from 'lucide-react'

const services = [
  {
    icon: Globe,
    label: 'Website Development',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Smartphone,
    label: 'Mobile Apps',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Code2,
    label: 'Custom Software',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Palette,
    label: 'Branding & Design',
    color: 'from-pink-500 to-pink-600'
  }
]

export default function SolutionsIntro() {
  return (
    <section className="py-20 bg-[#000000] text-white relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-[#000000]"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4"
            >
              Practicode Solutions
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Need a website, software or branding for your{' '}
              <span className="relative inline-block">
                business?
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A] -z-10"></span>
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light"
            >
              Hire our trained developers and expert team.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/solutions">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-xl group">
                  <span>Get a Digital Solution Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Service Icons Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-5">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {service.label}
                    </h3>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
