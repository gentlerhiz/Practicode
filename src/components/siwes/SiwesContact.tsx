'use client'

import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function SiwesContact() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Contact &amp; Commitment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Have questions? Reach out to our Academic Coordinator or contact us directly.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* Academic Coordinator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#000000] p-8 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCA1A]/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFCA1A] to-[#FFD700] flex items-center justify-center text-gray-900 font-black text-xl mx-auto mb-4">
                IA
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Academic Coordinator</p>
              <h3 className="text-white font-bold text-xl mb-1">Idris Akande R</h3>
              <p className="text-gray-400 text-sm mb-5">For academic enquiries, guidance, and program-related questions</p>
              <a
                href="tel:+2349030578667"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FFCA1A] text-gray-900 font-bold text-sm hover:bg-[#FFD700] transition-colors"
              >
                <Phone className="w-4 h-4" />
                09030578667
              </a>
            </div>
          </motion.div>

          {/* Official Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FFCA1A]/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-[#FFCA1A]" />
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Official Phone Number</p>
            <h3 className="text-gray-900 font-bold text-xl mb-4">Practicode Academy</h3>
            <a
              href="tel:+2347072778657"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 text-gray-900 font-bold text-sm hover:border-[#FFCA1A] hover:text-[#FFCA1A] transition-colors"
            >
              07072778657
            </a>
            <div className="mt-3">
              <a
                href="https://wa.me/message/UH5NCJFO6OAFI1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Visit Our Office</p>
            <h3 className="text-gray-900 font-bold text-xl mb-3">Practicode Academy</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              7B, Oba Olagbegi Avenue,<br />
              Old Bodija, Ibadan,<br />
              Nigeria
            </p>
          </motion.div>
        </div>

        {/* Commitment section */}
        
        
      </div>
    </section>
  )
}



