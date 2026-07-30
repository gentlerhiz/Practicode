'use client'

import { motion } from 'framer-motion'
import { MessageCircle, FileText, CheckCircle2, MapPin, CreditCard, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const steps = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Apply for the SIWES Program',
    desc: 'Request the official SIWES registration form by sending a WhatsApp message or calling 09030578667. You may also visit our office to register in person.',
    badge: 'WhatsApp or Call',
    badgeColor: 'bg-green-50 text-green-700',
  },
  {
    step: 2,
    icon: FileText,
    title: 'Complete Your Registration',
    desc: 'Fill out the registration form carefully with accurate information and pay the discounted SIWES tuition fee of ₦40,000.',
    badge: 'Fee: ₦40,000',
    badgeColor: 'bg-amber-50 text-amber-700',
  },
  {
    step: 3,
    icon: CheckCircle2,
    title: 'Confirmation & Onboarding',
    desc: 'Once your form is submitted and payment confirmed, you\'ll be enrolled, receive an acceptance letter, be added to communication platforms, and get your class schedule.',
    badge: 'Instant Confirmation',
    badgeColor: 'bg-blue-50 text-blue-700',
  },
  {
    step: 4,
    icon: MapPin,
    title: 'Resume for Training',
    desc: 'Report physically to Practicode Academy on your scheduled resumption date to begin your industrial training. Arrive on time and come prepared for practical learning.',
    badge: 'In-Person',
    badgeColor: 'bg-purple-50 text-purple-700',
  },
  {
    step: 5,
    icon: CreditCard,
    title: 'Pay the Administrative Fee',
    desc: 'All SIWES students are required to pay the ₦10,000 Administrative Fee. This may be paid upon resumption if not paid earlier.',
    badge: 'Fee: ₦10,000',
    badgeColor: 'bg-rose-50 text-rose-700',
  },
  {
    step: 6,
    icon: BookOpen,
    title: 'Begin Your Learning Journey',
    desc: 'Attend classes consistently, complete all practical exercises and assignments, participate actively, and work towards completing your Capstone Project.',
    badge: 'Start Learning',
    badgeColor: 'bg-emerald-50 text-emerald-700',
  },
]

export default function SiwesRegistrationSteps() {
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
            Registration
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
          >
            Registration Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Six simple steps to get your SIWES placement at Practicode Academy.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:bg-white hover:shadow-md hover:border-[#FFCA1A]/30 transition-all duration-300"
                >
                  {/* Step number */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#000000] flex items-center justify-center text-[#FFCA1A] font-black text-lg group-hover:bg-[#FFCA1A] group-hover:text-gray-900 transition-colors duration-300">
                      {step.step}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-6 bg-gray-200 mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${step.badgeColor}`}>
                        <Icon className="w-3 h-3" />
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="https://wa.me/message/UH5NCJFO6OAFI1" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Register via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            <a href="tel:+2349030578667">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:border-[#FFCA1A] hover:text-[#212121] hover:bg-[#FFCA1A]">
                Call 09030578667
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



