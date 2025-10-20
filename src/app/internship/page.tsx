'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Award, Users, CheckCircle, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { internshipPrograms } from '@/data'
import Link from 'next/link'

export default function InternshipPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-black via-gray-900 to-primary-black text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-1 mb-4">
              Hybrid <span className="text-primary-amber">Internship</span> Programs
            </h1>
            <p className="text-xl text-gray-300">
              Gain real-world experience with our structured internship programs combining remote flexibility and hands-on office experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Internship Programs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {internshipPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary-red/20 text-primary-red text-xs font-semibold rounded-full uppercase">
                        {program.type}
                      </span>
                    </div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Clock className="w-5 h-5 text-primary-amber" />
                      <span>{program.duration}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-5 h-5 text-primary-amber" />
                      <span>{program.schedule}</span>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary-red" />
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {program.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary-red" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {program.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary-amber mt-0.5">•</span>
                            <span className="text-gray-600 dark:text-gray-400">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Application <span className="text-primary-red">Process</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Follow these simple steps to apply for our internship program
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Complete a Course', desc: 'Finish at least one Practicode course' },
              { step: 2, title: 'Submit Application', desc: 'Fill out the internship application form' },
              { step: 3, title: 'Interview', desc: 'Participate in a short assessment interview' },
              { step: 4, title: 'Start Internship', desc: 'Begin your journey with us!' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-red to-primary-amber rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-amber" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-primary-red via-primary-orange to-primary-amber text-white border-0">
            <CardContent className="text-center py-12">
              <h2 className="heading-3 mb-4">Ready to Gain Real-World Experience?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Join our internship program and work on real projects while building your professional network.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary-red hover:bg-gray-100"
                >
                  Get Started Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
