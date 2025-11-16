'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, Clock, Users, Award, Calendar, CheckCircle2, 
  Download, Star, Play, BookOpen, Target, TrendingUp, Shield
} from 'lucide-react'
import { coursesData } from '@/data/coursesData'

// Get course data from shared source
const getCourseData = (slug: string) => {
  return coursesData[slug as keyof typeof coursesData] || null
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseData(params.slug)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/courses">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-full">
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Back Button */}
          <Link href="/courses">
            <button className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Courses</span>
            </button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Course Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-block px-3 py-1 bg-[#FFCA1A] rounded-full text-xs font-bold text-gray-900 mb-4">
                {course.category}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-5 h-5 text-[#FFCA1A] fill-[#FFCA1A]" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-gray-500">({course.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsEnrolled}+ students</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Award className="w-5 h-5" />
                  <span>{course.level}</span>
                </div>
              </div>

              {/* Instructors */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-600">Instructors:</span>
                <div className="flex -space-x-2">
                  {course.instructors.map((instructor: any, index: number) => (
                    <div key={index} className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {instructor.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm">
                  <Calendar className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-700">Starts {course.nextCohort}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100 rounded-lg text-sm">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span className="text-emerald-700">{course.enrollmentStatus}</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
                {/* Image Preview */}
                <div className="relative h-56 rounded-xl overflow-hidden mb-6 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ₦{course.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600">One-time payment or installment options available</p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                  <Link href="/contact">
                    <button className="w-full px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105">
                      Enroll Now
                    </button>
                  </Link>
                  <a href="tel:+2349030578667">
                    <button className="w-full px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all duration-300">
                      Talk to Coordinator
                    </button>
                  </a>
                </div>

                {/* What's Included */}
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 mb-3">This course includes:</p>
                  {course.features.slice(0, 6).map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{course.overview}</p>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-[#FFCA1A] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((item: any, index: number) => (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.module}</h3>
                        <p className="text-sm text-gray-600">Weeks {item.weeks}</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#FFCA1A]/20 rounded-full">
                        <BookOpen className="w-4 h-4 text-gray-900" />
                        <span className="text-sm font-semibold text-gray-900">{item.topics.length} topics</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {item.topics.map((topic: string, topicIndex: number) => (
                        <li key={topicIndex} className="flex items-center gap-2 text-gray-700">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prerequisites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Prerequisites</h2>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <ul className="space-y-3">
                  {course.prerequisites.map((prereq: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Career Paths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Career Opportunities</h2>
              <p className="text-lg text-gray-700 mb-6">
                After completing this course, you&apos;ll be qualified for the following roles:
              </p>
              <div className="flex flex-wrap gap-3">
                {course.careerPaths.map((path: string, index: number) => (
                  <div key={index} className="px-6 py-3 bg-[#000000] text-white rounded-full font-semibold">
                    {path}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {course.faqs.map((faq: any, index: number) => (
                  <details key={index} className="group border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                    <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                      {faq.question}
                      <span className="text-[#FFCA1A] text-2xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#000000] rounded-2xl p-12 text-center text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of students who have transformed their careers with this course.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105">
                    Enroll Now - ₦{course.price.toLocaleString()}
                  </button>
                </Link>
                <a href="tel:+2349030578667">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300">
                    Have Questions? Call Us
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
