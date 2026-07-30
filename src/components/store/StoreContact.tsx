'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, MapPin, Lightbulb, ArrowRight } from 'lucide-react'

export default function StoreContact() {
  return (
    <section className="py-14 md:py-20 bg-[#000000]">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFCA1A]/10 flex items-center justify-center mb-6">
              <Lightbulb className="w-7 h-7 text-[#FFCA1A]" />
            </div>
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3">
              Need Help Choosing?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              Not Sure Which Product Is Right for You?
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-4">
              Our team can recommend products based on your budget and intended use — whether you&apos;re buying for software development, data analysis, graphic design, business, or everyday computing.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Contact us today for personalised recommendations and let us help you find the right technology solution.
            </p>
          </motion.div>

          {/* Right — contact options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/message/UH5NCJFO6OAFI1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 hover:bg-[#FFCA1A] hover:border-[#FFCA1A] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 group-hover:bg-green-500 flex items-center justify-center flex-shrink-0 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white group-hover:text-gray-900 font-bold text-base transition-colors">WhatsApp Us</p>
                <p className="text-gray-400 group-hover:text-gray-700 text-sm transition-colors">Fastest response — usually within minutes</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Phone */}
            <a
              href="tel:+2347072778657"
              className="group flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base">Call Us</p>
                <p className="text-gray-400 text-sm">07072778657 / 09030578667</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Visit */}
            <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
              <div className="w-12 h-12 rounded-xl bg-[#FFCA1A]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#FFCA1A]" />
              </div>
              <div>
                <p className="text-white font-bold text-base">Visit Our Store</p>
                <p className="text-gray-400 text-sm">7B Oba Olagbegi Ave, Old Bodija, Ibadan</p>
              </div>
            </div>

            {/* CTA button */}
            <a
              href="https://wa.me/message/UH5NCJFO6OAFI1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-2xl hover:bg-[#FFD700] transition-all duration-300 hover:scale-[1.02] mt-2"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Product Recommendation
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
