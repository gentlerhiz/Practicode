'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Palette, BarChart, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { solutions } from '@/data'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function SolutionsPage() {
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
              Digital <span className="text-primary-amber">Solutions</span>
            </h1>
            <p className="text-xl text-gray-300">
              Transform your business with our comprehensive digital services and custom software solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <CardHeader>
                    <span className="text-primary-red text-sm font-semibold mb-2 inline-block">
                      {solution.category}
                    </span>
                    <CardTitle>{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {solution.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Our <span className="text-primary-red">Services</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: 'Web Development', desc: 'Custom websites and web applications' },
              { icon: Smartphone, title: 'Mobile Apps', desc: 'iOS and Android development' },
              { icon: Palette, title: 'UI/UX Design', desc: 'User-centered design solutions' },
              { icon: BarChart, title: 'Data Analytics', desc: 'Business intelligence and insights' },
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className="inline-flex p-4 rounded-2xl bg-primary-red/10 text-primary-red mb-4">
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="mb-2 text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-primary-red via-primary-orange to-primary-amber text-white border-0">
            <CardContent className="text-center py-12">
              <h2 className="heading-3 mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help you achieve your digital goals with our expert solutions.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-red hover:bg-gray-100">
                  Start Your Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
