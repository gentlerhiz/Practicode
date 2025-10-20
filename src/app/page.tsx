'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Database, Palette, TrendingUp, Users, Award, Briefcase } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { testimonials, courses } from '@/data'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-black via-gray-900 to-primary-black text-white section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block px-4 py-2 bg-primary-red/20 border border-primary-red rounded-full mb-6">
                <span className="text-primary-amber font-semibold">🚀 Empowering Tech Futures</span>
              </div>
              
              <h1 className="heading-1 mb-6">
                Master Tech Skills with{' '}
                <span className="text-gradient">Practicode</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform your career with world-class training in Web Development, Data Analytics, UI/UX Design, and Digital Marketing. Learn from industry experts in Ibadan, Nigeria.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button size="lg" className="group">
                    Explore Courses
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-4xl font-bold text-primary-amber mb-2">500+</div>
                  <div className="text-gray-400 text-sm">Students Trained</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary-amber mb-2">95%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary-amber mb-2">50+</div>
                  <div className="text-gray-400 text-sm">Partner Companies</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 mb-4"
            >
              Our <span className="text-primary-red">Programs</span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive tech programs designed for beginners and professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: 'Web Development', desc: 'Full Stack JavaScript', color: 'text-primary-red' },
              { icon: Database, title: 'Data Analytics', desc: 'Python & Visualization', color: 'text-primary-orange' },
              { icon: Palette, title: 'UI/UX Design', desc: 'Figma & User Research', color: 'text-primary-amber' },
              { icon: TrendingUp, title: 'Digital Marketing', desc: 'SEO & Social Media', color: 'text-primary-red' },
            ].map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4 ${program.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="mb-2">{program.title}</CardTitle>
                      <CardDescription>{program.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="secondary" size="lg">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">
                Why Choose <span className="text-primary-red">Practicode?</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience' },
                  { icon: Briefcase, title: 'Hands-On Projects', desc: 'Build real-world projects for your portfolio' },
                  { icon: Award, title: 'Certificates', desc: 'Earn verified certificates upon completion' },
                  { icon: Users, title: 'Job Support', desc: 'Career guidance and job placement assistance' },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary-black text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-2 mb-4"
            >
              Success <span className="text-primary-amber">Stories</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from our students who transformed their careers with Practicode.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border border-gray-800 h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-primary-amber">★</span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">{testimonial.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-red via-primary-orange to-primary-amber">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">Ready to Start Your Tech Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have transformed their careers with Practicode Academy.
            </p>
            <Link href="/courses">
              <Button
                size="lg"
                className="bg-white text-primary-red hover:bg-gray-100"
              >
                Enroll Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
