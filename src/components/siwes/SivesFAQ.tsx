'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How long is the program?',
    answer: 'The SIWES program runs for 3 months.',
  },
  {
    question: 'How much is the tuition fee?',
    answer: 'The normal tuition fee is ₦80,000, but SIWES students enjoy a 50% discount, paying only ₦40,000.',
  },
  {
    question: 'Is there any additional payment?',
    answer: 'Yes. Every SIWES student pays a ₦10,000 Administrative Fee, which may be paid upon resumption.',
  },
  {
    question: 'Is the training practical?',
    answer: 'Yes. The program is highly practical and focuses on hands-on learning rather than theory alone.',
  },
  {
    question: 'Will there be assignments?',
    answer: 'Yes. Students will complete multiple practical assignments and exercises throughout the program.',
  },
  {
    question: 'Will there be a project?',
    answer: 'Yes. Every student is expected to complete a Capstone Project before the end of the program.',
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Yes. Students who successfully complete the program and satisfy the graduation requirements will receive a Certificate of Completion.',
  },
  {
    question: 'When will I receive my class schedule?',
    answer: 'Your class schedule will be communicated before the resumption date.',
  },
  {
    question: 'Is attendance compulsory?',
    answer: 'Yes. Students are expected to attend classes consistently and be punctual.',
  },
  {
    question: 'Can beginners apply?',
    answer: 'Yes. Beginners are welcome, provided they are willing to learn and actively participate.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[number]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#FFCA1A]/50 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-base">{faq.question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
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

export default function SivesFAQ() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Frequently Asked Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
          >
            Common Questions, Answered
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Everything you need to know about the SIWES program.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}



