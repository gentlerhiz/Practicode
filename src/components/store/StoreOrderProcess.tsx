'use client'

import { motion } from 'framer-motion'
import { Search, MessageCircle, CreditCard, PackageCheck, Truck, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Browse Our Products',
    desc: 'Explore our collection of laptops, accessories, and merchandise. Review specifications, pricing, and available options before making your selection.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'Place Your Order',
    desc: 'Contact us via WhatsApp or phone with your product name, quantity, color/size preference, and delivery location.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: CreditCard,
    title: 'Make Payment',
    desc: 'Receive our official payment details. Complete payment and send your proof of payment for verification.',
    color: 'bg-[#FFCA1A]/10 text-amber-600',
  },
  {
    icon: PackageCheck,
    title: 'Order Confirmed',
    desc: 'Once payment is verified, your order is confirmed and prepared. You\'ll receive updates on dispatch or pickup time.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Truck,
    title: 'Receive Your Order',
    desc: 'Choose nationwide delivery to your address or visit our office for store pickup.',
    color: 'bg-rose-50 text-rose-600',
  },
]

export default function StoreOrderProcess() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2"
            >
              How to Order
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Simple 5-Step Order Process
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="https://wa.me/message/UH5NCJFO6OAFI1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCA1A] text-gray-900 font-bold text-sm rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            Order via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gray-200 z-0" style={{ left: '10%', right: '10%' }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#000000] text-[#FFCA1A] text-xs font-black">
                      {i + 1}
                    </span>
                  </div>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${step.color} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
