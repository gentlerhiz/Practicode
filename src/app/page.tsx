'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Database, Palette, TrendingUp, Users, Award, Briefcase } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import TrustedPartners from '@/components/ui/TrustedPartners'
import Intro from '@/components/ui/Intro'
import WhyDifferent from '@/components/ui/WhyDifferent'
import OurPrograms from '@/components/ui/OurPrograms'
import ResourcesHub from '@/components/ui/ResourcesHub'
import Testimonials from '@/components/ui/Testimonials'
import FAQIntro from '@/components/ui/FAQIntro'
import MicroIntro from '@/components/ui/MicroIntro'
import SolutionsIntro from '@/components/ui/SolutionsIntro'
import Newsletter from '@/components/ui/Newsletter'
import BlogSection from '@/components/ui/BlogSection'
import EventsSection from '@/components/ui/EventsSection'
import FinalCTA from '@/components/ui/FinalCTA'
import { testimonials, courses } from '@/data'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 overflow-hidden min-h-[80vh] lg:min-h-screen mb-8">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 w-full h-full opacity-[0.03]">
          <Image
            src="/images/Home/heroImg.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center py-20 lg:py-0 lg:min-h-screen">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 max-w-2xl"
            >
              {/* Main Heading - Ultra Clean & Powerful */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-6"
              >
                <div className="-space-y-2 lg:-space-y-3">
                  <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7rem] font-bold text-gray-900 leading-[0.88] tracking-[-0.03em]">
                    Learn.
                  </h1>
                  <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7rem] font-bold text-gray-900 leading-[0.88] tracking-[-0.03em]">
                    Build.
                  </h1>
                  <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7rem] font-bold leading-[0.88] tracking-[-0.03em] relative">
                    <span className="relative inline-block">
                      Launch
                      <span className="absolute -bottom-1 left-0 w-full h-4 bg-[#FFCA1A] -z-10 rounded-sm"></span>
                    </span>
                    <span className="text-gray-900">.</span>
                  </h1>
                </div>

                {/* Animated Visual Icon - Shows on mobile, hidden on lg */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:hidden relative"
                >
                  {/* Animated Circles - Abstract Visual */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Outer rotating ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-[#FFCA1A]/30 rounded-full border-t-[#FFCA1A] border-r-transparent"
                    />
                    
                    {/* Middle pulsing circle */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-20 h-20 bg-gradient-to-br from-[#FFCA1A]/20 to-emerald-400/20 rounded-full backdrop-blur-sm"
                    />
                    
                    {/* Inner animated icon */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#FFCA1A] to-[#FFD700] rounded-2xl shadow-xl flex items-center justify-center"
                    >
                      <Code className="w-8 h-8 text-gray-900" strokeWidth={2.5} />
                    </motion.div>
                    
                    {/* Floating particles */}
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                      className="absolute top-2 right-4 w-3 h-3 bg-emerald-400 rounded-full"
                    />
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="absolute bottom-4 left-2 w-2 h-2 bg-[#FFCA1A] rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Description - Refined */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl font-light"
              >
                Master in-demand tech skills through hands-on training, build real-world projects, and launch your dream career with expert mentorship.
              </motion.p>
              
              {/* CTA Buttons - Refined */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-4 mb-6"
              >
                <Link href="/courses" className="group">
                  <button className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold text-gray-900 bg-[#FFCA1A] rounded-full transition-all duration-300 group-hover:scale-[1.02] hover:bg-[#FFD700]">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                  </button>
                </Link>
                <Link href="/contact" className="group">
                  <button className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-full transition-all duration-300 group-hover:border-gray-300 hover:bg-gray-50 group-hover:scale-[1.02]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Book a Call</span>
                  </button>
                </Link>
              </motion.div>

              {/* Stats - Elegant & Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="hidden flex items-center gap-6 sm:gap-8 pt-4"
              >
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">500<span className="text-[#FFCA1A]">+</span></div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.1em] font-medium mt-1">Students Trained</div>
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FFCA1A] to-transparent"></div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">98<span className="text-[#FFCA1A]">%</span></div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.1em] font-medium mt-1">Success Rate</div>
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FFCA1A] to-transparent"></div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">50<span className="text-[#FFCA1A]">+</span></div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.1em] font-medium mt-1">Expert Mentors</div>
                  <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FFCA1A] to-transparent"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Image with Enhanced Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:flex justify-center items-center"
            >
              {/* Ambient Glow Effects */}
              <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-[#FFCA1A]/10 via-yellow-100/5 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-blue-500/5 via-purple-100/5 to-transparent rounded-full blur-3xl"></div>
              
              {/* Main Image Container - Ultra Sophisticated */}
              <div className="relative z-10 w-full max-w-sm">
                <div className="relative aspect-[5/6] rounded-[2.5rem] overflow-hidden border border-white/50 bg-gradient-to-br from-gray-50 to-white">
                  <Image
                    src="/images/Home/student-hero.png"
                    alt="Student learning with technology"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Image Overlay for sophistication */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 via-transparent to-transparent"></div>
                </div>
                
                {/* Premium Floating Badge - Job-Driven Projects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-6 -left-36 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl shadow-gray-900/10 p-5 border border-gray-100/80 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Briefcase className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="pr-1">
                      <p className="text-sm font-bold text-gray-900 tracking-tight leading-tight">Job-Driven</p>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Projects</p>
                    </div>
                  </div>
                </motion.div>

                {/* Premium Floating Badge - ISO-Standard Curriculum */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-40 -left-24 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl shadow-gray-900/10 p-5 border border-gray-100/80 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="pr-1">
                      <p className="text-sm font-bold text-gray-900 tracking-tight leading-tight">ISO-Standard</p>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Curriculum</p>
                    </div>
                  </div>
                </motion.div>

                {/* Premium Floating Badge - Online + Physical Classes */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl shadow-gray-900/10 p-5 border border-gray-100/80 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFCA1A] via-[#FFD700] to-[#FFC700] rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
                    </div>
                    <div className="pr-1">
                      <p className="text-sm font-bold text-gray-900 tracking-tight leading-tight">Online + Physical</p>
                      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Classes</p>
                    </div>
                  </div>
                </motion.div>

                {/* Elegant Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 border-l-[3px] border-b-[3px] border-[#FFCA1A]/20 rounded-bl-[4rem]"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 border-r-[3px] border-t-[3px] border-[#FFCA1A]/20 rounded-tr-[3rem]"></div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Intro Section */}
      <Intro />

      {/* Partners Section */}
      <TrustedPartners />

      {/* Our Programs Section */}
      <OurPrograms />

      {/* Micro Courses Section */}
      <MicroIntro />

      {/* Resources Hub Section */}
      <ResourcesHub />

      {/* What Makes Us Different Section */}
      <WhyDifferent />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Intro Section */}
      <FAQIntro />

      {/* Solutions Intro Section */}
      <SolutionsIntro />

      

      {/* Blog Section */}
      <BlogSection />

      {/* Events & Community Section */}
      <EventsSection />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Final CTA Section */}
      {/* <FinalCTA /> */}
    </>
  )
}
