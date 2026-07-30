'use client'

import { motion } from 'framer-motion'
import { Truck, Home, Briefcase, MapPin, ArrowRight } from 'lucide-react'

const deliveryOptions = [
  { icon: Home, label: 'Home Delivery', desc: 'We bring it to your doorstep.' },
  { icon: Briefcase, label: 'Office Delivery', desc: 'Delivered to your workplace.' },
  { icon: MapPin, label: 'Pickup at Practicode', desc: 'Collect in person, inspect on the spot.' },
]

export default function StoreDelivery() {
  return (
    <section className="py-14 md:py-20 bg-[#000000]">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — delivery info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-4">
              Delivery &amp; Pickup
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              We Deliver Anywhere in Nigeria
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Delivery charges depend on your location and will be communicated before your order is processed. Choose the option that works best for you.
            </p>

            <div className="space-y-4">
              {deliveryOptions.map((opt, i) => {
                const Icon = opt.icon
                return (
                  <motion.div
                    key={opt.label}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/8 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFCA1A]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#FFCA1A]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{opt.label}</p>
                      <p className="text-gray-500 text-xs">{opt.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — visit store */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFCA1A]/10 flex items-center justify-center mb-6">
              <Truck className="w-7 h-7 text-[#FFCA1A]" />
            </div>
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-wider mb-3">
              Prefer to shop in person?
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">Visit Our Store</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Walk in, inspect the product yourself, and take it home. Our team will be happy to help you choose the right product.
            </p>
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FFCA1A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold text-sm">Practicode Academy</p>
                  <p className="text-gray-400 text-sm mt-0.5">7B, Oba Olagbegi Avenue,<br />Old Bodija, Ibadan, Oyo State.</p>
                </div>
              </div>
            </div>
            <a
              href="https://wa.me/message/UH5NCJFO6OAFI1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCA1A] text-gray-900 font-bold text-sm rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105"
            >
              Chat Before You Visit
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
