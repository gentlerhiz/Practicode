'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Calendar, Users, Code, Award, Rocket, Sparkles, Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { useState } from 'react'
import FAQIntro from '@/components/ui/FAQIntro'
import Newsletter from '@/components/ui/Newsletter'

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const aboutImages = [
    '/images/About/1.jpeg',
    '/images/About/2.PNG',
    '/images/About/3.jpeg',
    '/images/About/4.PNG',
    '/images/About/5.jpeg',
    '/images/About/6.PNG',
    '/images/About/7.jpeg',
    '/images/About/8.jpeg',
    '/images/About/9.jpeg',
    '/images/About/10.PNG',
    '/images/About/11.PNG',
    '/images/About/12.PNG',
    '/images/About/13.PNG',
    '/images/About/14.PNG',
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length)
  }

  const teamMembers = [
    {
      id: '1',
      name: 'Idris Akande Rasaq',
      role: 'Founder & Academic Coordinator',
      image: '/images/team/idris.jpg',
      bio: 'Passionate about building the next generation of tech professionals across Africa.',
    },
    {
      id: '2',
      name: 'Paul Olaojo',
      role: 'Data Scientist Instructor',
      image: '/images/team/paul.jpg',
      bio: 'Transforming data into actionable insights and empowering students with analytics skills.',
    },
    {
      id: '3',
      name: 'Ahmad',
      role: 'Lead Instructor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      bio: 'Expert instructor dedicated to delivering world-class technical education.',
    },
  ]

  return (
    <>
      {/* Hero Section - Clean Black */}
      <section className="relative bg-[#000000] overflow-hidden">
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="py-16 lg:py-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Overline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-4"
              >
                Who We Are
              </motion.p>
              
              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
              >
                Building the Future of
                <br />
                <span className="relative inline-block mt-2">
                  Tech in Africa
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFCA1A] -z-10 rounded-sm"></span>
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Empowering the next generation of tech professionals with practical skills, real-world experience, and a community that champions your success.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section - Creative Layout */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Our Journey
            </p>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#000000] leading-tight">
              From Vision to <span className="text-[#FFCA1A]">Reality</span>
            </h2>
          </motion.div>

          {/* Creative Timeline Layout */}
          <div className="relative max-w-7xl mx-auto">
            {/* Vertical Line - Hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-green-300 to-yellow-300 -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-16 lg:space-y-24">
              {/* The Beginning - Left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="lg:text-right lg:pr-12">
                    <div className="inline-flex lg:float-right items-center gap-3 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="clear-both">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-3">The Beginning</h3>
                      <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                        Founded in 2020, Practicode Academy emerged from a simple vision: to bridge the gap between theoretical knowledge and practical tech skills in Nigeria and across Africa.
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block"></div>
                </div>
                {/* Center dot */}
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-lg"></div>
              </motion.div>

              {/* The Problem - Right */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="hidden lg:block"></div>
                  <div className="lg:pl-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                        <Eye className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-3">The Problem</h3>
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                      We noticed that many aspiring tech professionals had the passion and dedication to learn, but lacked access to quality, hands-on training that prepares them for real-world challenges.
                    </p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-lg"></div>
              </motion.div>

              {/* Today & Beyond - Left with Image Slider */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="lg:text-right lg:pr-12 mb-8 lg:mb-0">
                    <div className="inline-flex lg:float-right items-center gap-3 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                        <Rocket className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="clear-both">
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-3">Today & Beyond</h3>
                      <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                        We&apos;ve trained over 500 students and helped them launch successful careers in web development, data analytics, UI/UX design, and digital marketing. Our graduates work at leading tech companies across Nigeria and beyond.
                      </p>
                    </div>
                  </div>
                  
                  {/* Image Slider */}
                  <div className="lg:pl-12">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 border-4 border-yellow-300">
                      <Image
                        src={aboutImages[currentImageIndex]}
                        alt="About Practicode"
                        fill
                        className="object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-[#000000]" strokeWidth={3} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-[#000000]" strokeWidth={3} />
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {aboutImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex ? 'bg-[#FFCA1A] w-8' : 'bg-white/60 hover:bg-white'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-yellow-500 border-4 border-white shadow-lg"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Colorful Icons */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000000]">
              Mission, Vision & Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To provide accessible, practical tech education that transforms lives and builds careers in the digital economy.',
                iconColor: 'border-blue-300 text-blue-600',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To be Africa&apos;s leading tech education platform, producing world-class developers and designers.',
                iconColor: 'border-green-300 text-green-600',
              },
              {
                icon: Heart,
                title: 'Our Values',
                desc: 'Excellence, Innovation, Integrity, Community, and Practical Learning drive everything we do.',
                iconColor: 'border-pink-300 text-pink-600',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="bg-white rounded-2xl p-8 text-center h-full hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
                    <div className={`inline-flex p-4 rounded-xl border-2 ${item.iconColor} mb-5`}>
                      <Icon className="w-8 h-8" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-[#000000] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements - Colorful Stats */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Our Impact
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
              Making a <span className="text-[#FFCA1A]">Difference</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and student success
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Users, number: '500+', label: 'Students Trained', iconColor: 'border-blue-300 text-blue-600' },
              { icon: Code, number: '50+', label: 'Projects Completed', iconColor: 'border-green-300 text-green-600' },
              { icon: Award, number: '95%', label: 'Success Rate', iconColor: 'border-purple-300 text-purple-600' },
              { icon: Calendar, number: '4+', label: 'Years Experience', iconColor: 'border-orange-300 text-orange-600' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className={`inline-flex p-4 rounded-2xl border-2 ${stat.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <div className="text-4xl lg:text-5xl font-black text-[#000000] mb-2">{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Happy & Colorful */}
      <section id="team" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              The Dream Team
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
              Meet Our <span className="text-[#FFCA1A]">Amazing</span> Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate educators and industry professionals dedicated to your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => {
              const borderColors = ['border-blue-300', 'border-green-300', 'border-yellow-300']
              const hoverColors = ['hover:border-blue-400', 'hover:border-green-400', 'hover:border-yellow-400']
              const borderColor = borderColors[index % borderColors.length]
              const hoverColor = hoverColors[index % hoverColors.length]
              
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`bg-white rounded-2xl p-6 text-center h-full border-2 ${borderColor} ${hoverColor} hover:shadow-xl transition-all duration-300`}>
                    <div className="relative inline-block mb-4">
                      <div className="w-28 h-28 rounded-full mx-auto overflow-hidden relative">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#FFCA1A] flex items-center justify-center border-4 border-white">
                        <Sparkles className="w-5 h-5 text-[#000000]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-[#000000] mb-1">{member.name}</h3>
                    <p className="text-[#FFCA1A] text-sm font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA - Clean Black Background */}
      <section className="py-16 lg:py-20 bg-[#000000]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCA1A]/20 border border-[#FFCA1A] rounded-full mb-6"
            >
              <Rocket className="w-5 h-5 text-[#FFCA1A]" />
              <span className="text-[#FFCA1A] text-sm font-bold">Connect With Us</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Join Our Thriving Community
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with fellow learners, get instant support, and stay updated with the latest opportunities. Be part of Africa&apos;s fastest-growing tech community.
            </p>
            
            {/* Community Action Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.a
                href="https://wa.me/message/UH5NCJFO6OAFI1"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 hover:bg-white/20 border-2 border-green-400 rounded-2xl p-6 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Have Questions?</h3>
                <p className="text-gray-400 text-sm mb-3">Get instant answers about courses and enrollment</p>
                <span className="text-green-400 font-semibold text-sm">Chat on WhatsApp →</span>
              </motion.a>

              <motion.a
                href="https://chat.whatsapp.com/Jcj9pLgCnX706upLqlG2yC"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 hover:bg-white/20 border-2 border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Join the Community</h3>
                <p className="text-gray-400 text-sm mb-3">Connect with students, alumni, and instructors</p>
                <span className="text-blue-400 font-semibold text-sm">Join WhatsApp Group →</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/practicode_academy?igsh=bHd4MWc5c3M5aXhm&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 hover:bg-white/20 border-2 border-pink-400 rounded-2xl p-6 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Follow Our Journey</h3>
                <p className="text-gray-400 text-sm mb-3">Stay updated with success stories and tips</p>
                <span className="text-pink-400 font-semibold text-sm">Follow on Instagram →</span>
              </motion.a>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/courses">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold text-base rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg group">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-base rounded-xl hover:bg-white hover:text-[#000000] transition-all duration-300">
                  <span>Contact Us</span>
                </button>
              </Link>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQIntro />

      {/* Newsletter Section */}
      <Newsletter />
    </>
  )
}
