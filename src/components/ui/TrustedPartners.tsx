'use client'

import { motion } from 'framer-motion'

const partners = [
  { name: 'TECH', subtitle: 'Company' },
  { name: 'INNOV', subtitle: 'Partner' },
  { name: 'EDUX', subtitle: 'School' },
  { name: 'CODE', subtitle: 'Community' },
  { name: 'FUTURE', subtitle: 'Institute' },
  { name: 'NEXUS', subtitle: 'Partner' },
  { name: 'DIGITAL', subtitle: 'Academy' },
  { name: 'SMART', subtitle: 'Solutions' }
]

export default function TrustedPartners() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Trusted Partners</p>
          <div className="relative inline-block">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider pb-3">
              <span className="relative inline-block">
                Trusted
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gray-900 origin-left"
                />
              </span>
              {' '}by organizations who believe in the future of tech talent
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#FFCA1A] via-[#FFD700] to-[#FFCA1A] rounded-full origin-center"
            />
          </div>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center gap-16"
          >
            {/* First set of logos */}
            {partners.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-40 h-20 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-800">{logo.name}</div>
                  <div className="text-xs text-gray-500">{logo.subtitle}</div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-40 h-20 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-800">{logo.name}</div>
                  <div className="text-xs text-gray-500">{logo.subtitle}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
