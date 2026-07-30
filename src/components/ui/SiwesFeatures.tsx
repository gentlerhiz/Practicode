'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckCircle, Code, Users, Award, ShieldCheck } from 'lucide-react'

const features = [
  {
    title: 'Project-based learning',
    description: 'Build practical work samples that reflect SIWES workplace expectations.',
    icon: Code,
  },
  {
    title: 'Guided mentor support',
    description: 'Receive structured coaching and technical feedback throughout the program.',
    icon: Users,
  },
  {
    title: 'Clear assessment milestones',
    description: 'Weekly tasks, progress checks, and a final capstone keep your learning focused.',
    icon: Award,
  },
  {
    title: 'Workplace readiness',
    description: 'Finish with a polished portfolio, certificate, and stronger practical confidence.',
    icon: ShieldCheck,
  },
]

const outcomes = [
  'HTML/CSS fundamentals and layout systems',
  'JavaScript for interactive interfaces',
  'Responsive design for web and mobile',
  'React component architecture',
  'Backend basics and data handling',
  'Version control with Git',
  'Weekly lab assignments and reviews',
  'Capstone project delivery',
]

export default function SiwesFeatures() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="text-[#FFCA1A] text-xs font-semibold uppercase tracking-[0.24em] mb-3">
            The SIWES highlights
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            A professional learning structure for high-impact SIWES outcomes.
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg">
            Practical tasks, mentor-led direction, and measurable progress combine into a balanced program that prepares you for the workplace.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex items-center gap-4 bg-slate-50 p-6 border-b border-gray-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A]">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">What you will master</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 text-gray-700 leading-relaxed">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <span className="mt-1 text-[#FFCA1A]">•</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-slate-50 p-6 border-b border-gray-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A] mr-4">
                  <Users className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">How training is delivered</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#FFCA1A]">•</span>
                    <span>Instructor-led sessions and practical lab time.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#FFCA1A]">•</span>
                    <span>Practical tasks that build into your SIWES project.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#FFCA1A]">•</span>
                    <span>Peer review, collaboration, and progress check-ins.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#FFCA1A]">•</span>
                    <span>A final capstone delivered before your placement ends.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
