'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Award, Briefcase, Clock, ShieldCheck } from 'lucide-react'

const highlights = [
  {
    title: 'Strong SIWES Support',
    description: 'Structured practical sessions, guided projects, and weekly reviews keep your industrial training focused and effective.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear Costs',
    description: '₦40,000 discounted tuition plus ₦10,000 admin fee give you transparent pricing for the full program.',
    icon: Award,
  },
  {
    title: '3 Month Learning Plan',
    description: 'The program is built to fit your 3-month SIWES period with a practical path from basics to a final capstone.',
    icon: Clock,
  },
  {
    title: 'Work-Ready Outcomes',
    description: 'You leave with tangible projects, better technical habits, and a completion certificate employers value.',
    icon: Briefcase,
  },
]

export default function SiwesHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-[#FFCA1A] text-xs font-semibold uppercase tracking-[0.24em] mb-3">
            Program Highlights
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            What makes our SIWES program better.
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            A practical training experience with transparent pricing, focused support, and real project outcomes tailored for IT students.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
