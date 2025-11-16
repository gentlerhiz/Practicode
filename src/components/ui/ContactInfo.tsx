'use client'

import { motion } from 'framer-motion'
import { Phone, MapPin, Mail } from 'lucide-react'

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      info: ['+234 707 277 8657', '+234 903 057 8667']
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: ['7B Oba Olagbegi,', 'Old Bodija, Ibadan, Nigeria']
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: ['practicodeacademy@gmail.com']
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#FFCA1A] text-[#000000] text-sm font-semibold rounded-full mb-4">
            REACH OUT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
            We&apos;re Here to Help
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re looking to sponsor, enroll, or make an enquiry about Practicode Academy, we&apos;re ready to assist you. Feel free to reach out via any of the following contact methods.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
                  <Icon className="w-7 h-7 text-[#000000]" />
                </div>
                <h3 className="text-lg font-bold text-[#000000] mb-3">
                  {method.title}
                </h3>
                <div className="space-y-1">
                  {method.info.map((line, idx) => (
                    <p key={idx} className="text-gray-700 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
