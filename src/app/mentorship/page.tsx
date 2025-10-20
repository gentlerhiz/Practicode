'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, Briefcase, Award, MessageCircle, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { testimonials } from '@/data'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function MentorshipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background-dark dark:bg-primary-black py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-1 mb-4 text-white">
              Career <span className="text-primary-amber">Mentorship</span>
            </h1>
            <p className="text-xl text-gray-300">
              Get personalized guidance from industry professionals to accelerate your tech career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mentorship Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Why Choose Our <span className="text-primary-red">Mentorship</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'One-on-One Guidance',
                desc: 'Personal mentorship sessions tailored to your career goals and challenges.',
              },
              {
                icon: TrendingUp,
                title: 'Career Growth',
                desc: 'Strategic advice on career transitions, skill development, and advancement.',
              },
              {
                icon: Briefcase,
                title: 'Portfolio Review',
                desc: 'Expert feedback on your projects and portfolio to stand out to employers.',
              },
              {
                icon: MessageCircle,
                title: 'Interview Prep',
                desc: 'Mock interviews and preparation for technical and behavioral questions.',
              },
              {
                icon: Calendar,
                title: 'Flexible Schedule',
                desc: 'Book sessions at times that work best for you with our flexible system.',
              },
              {
                icon: Award,
                title: 'Industry Insights',
                desc: 'Learn from professionals currently working in leading tech companies.',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <CardContent className="pt-6">
                      <div className="inline-flex p-3 rounded-xl bg-primary-red/10 text-primary-red mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="mb-2 text-lg">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mentorship Process */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              How It <span className="text-primary-red">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Apply', desc: 'Fill out mentorship application' },
              { step: 2, title: 'Match', desc: 'Get paired with suitable mentor' },
              { step: 3, title: 'Schedule', desc: 'Book your first session' },
              { step: 4, title: 'Grow', desc: 'Start your career journey' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-red to-primary-amber rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Mentee <span className="text-primary-red">Success Stories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-primary-amber">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-red via-primary-orange to-primary-amber">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">Ready to Accelerate Your Career?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Get matched with an experienced mentor who can guide you to success.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary-red hover:bg-gray-100">
                Apply for Mentorship
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
