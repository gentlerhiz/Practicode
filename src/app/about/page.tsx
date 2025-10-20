'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Calendar, Users, Code, Award } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { teamMembers } from '@/data'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark dark:bg-primary-black py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-1 mb-4 text-white">
              About <span className="text-primary-amber">Practicode</span>
            </h1>
            <p className="text-xl text-gray-300">
              Empowering the next generation of tech professionals with practical skills and real-world experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">
                Our <span className="text-primary-red">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Founded in 2020, Practicode Academy emerged from a simple vision: to bridge the gap between theoretical knowledge and practical tech skills in Nigeria and across Africa.
                </p>
                <p>
                  We noticed that many aspiring tech professionals had the passion and dedication to learn, but lacked access to quality, hands-on training that prepares them for real-world challenges.
                </p>
                <p>
                  Today, we&apos;ve trained over 500 students and helped them launch successful careers in web development, data analytics, UI/UX design, and digital marketing. Our graduates work at leading tech companies and startups across Nigeria and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To provide accessible, practical tech education that transforms lives and builds careers in the digital economy.',
                color: 'text-primary-red',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To be Africa\'s leading tech education platform, producing world-class developers and designers.',
                color: 'text-primary-orange',
              },
              {
                icon: Heart,
                title: 'Our Values',
                desc: 'Excellence, Innovation, Integrity, Community, and Practical Learning drive everything we do.',
                color: 'text-primary-amber',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className={`inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4 ${item.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="mb-3">{item.title}</CardTitle>
                      <CardDescription>{item.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Our <span className="text-primary-red">Achievements</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, number: '500+', label: 'Students Trained', color: 'text-primary-red' },
              { icon: Code, number: '50+', label: 'Projects Completed', color: 'text-primary-orange' },
              { icon: Award, number: '95%', label: 'Success Rate', color: 'text-primary-amber' },
              { icon: Calendar, number: '4+', label: 'Years Experience', color: 'text-primary-red' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-3 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Meet Our <span className="text-primary-red">Team</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate educators and industry professionals dedicated to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center">
                  <CardContent className="pt-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary-red text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex gap-3 justify-center">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-red hover:text-white transition-colors"
                        >
                          in
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-red hover:text-white transition-colors"
                        >
                          𝕏
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-red hover:text-white transition-colors"
                        >
                          GH
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Card className="bg-primary-red text-white border-0">
            <CardContent className="text-center py-8">
              <h2 className="heading-3 mb-3">Join Our Growing Community</h2>
              <p className="text-base mb-6 max-w-2xl mx-auto">
                Be part of the Practicode family and start your journey to tech excellence today.
              </p>
              <Link href="/courses">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Explore Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
