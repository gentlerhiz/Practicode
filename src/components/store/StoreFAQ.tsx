'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Are your UK Used laptops original?',
    answer: 'Yes. Our UK Used laptops are genuine business-grade devices sourced from reputable suppliers and thoroughly inspected before sale.',
  },
  {
    question: 'Do you deliver outside Ibadan?',
    answer: 'Yes. We deliver nationwide across Nigeria through trusted logistics partners. Delivery charges vary by location and will be confirmed before processing.',
  },
  {
    question: 'Can I inspect a product before buying?',
    answer: 'Absolutely. Customers are welcome to visit our office at 7B Oba Olagbegi Avenue, Old Bodija, Ibadan to inspect available products before making a purchase.',
  },
  {
    question: 'Are prices negotiable?',
    answer: 'Some products may have promotional offers or discounts. Contact us via WhatsApp or phone to inquire about current deals and pricing.',
  },
  {
    question: 'Can I reserve a laptop?',
    answer: 'Yes. You can reserve selected products, subject to availability and agreed payment terms. Contact us to arrange a reservation.',
  },
  {
    question: 'Do you sell to students?',
    answer: 'Absolutely. Many of our products are carefully selected to meet the needs of students, especially those studying technology-related courses or undergoing SIWES.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[number]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#FFCA1A]/40 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-sm">{faq.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-[#FFCA1A]' : 'text-gray-400'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed pt-4 text-sm">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function StoreFAQ() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          {/* Left — sticky label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Questions, Answered
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Everything you need to know before placing an order.
            </p>
            <a
              href="https://wa.me/message/UH5NCJFO6OAFI1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#000000] text-white font-semibold text-sm rounded-full hover:bg-gray-800 transition-colors"
            >
              Still have questions? Ask us
            </a>
          </motion.div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
