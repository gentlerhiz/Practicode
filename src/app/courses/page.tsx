'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, Users, Star, Search
} from 'lucide-react'
import { coursesData } from '@/data/coursesData'
import Link from 'next/link'

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Convert coursesData object to array
  const allCourses = Object.values(coursesData)

  // Filter courses
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 inline-block">
                Our Courses
                <div className="h-1.5 bg-[#FFCA1A] mt-2 rounded-full"></div>
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                Build the skills employers are hiring for <br className="hidden lg:block" />
                and gain hands-on experience that sets you apart.
              </p>
            </div>

            {/* Right Column - Search & Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap">
                {['All', 'Cohort Programs', 'Micro Courses'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-3 rounded-full font-medium transition-all whitespace-nowrap text-sm ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Cohort Courses */}
          {(selectedCategory === 'All' || selectedCategory === 'Cohort Programs') && (
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-[#FFCA1A] to-transparent w-20"></div>
                <h2 className="text-3xl font-bold text-gray-900 mx-6">Cohort Programs</h2>
                <div className="h-px bg-gradient-to-r from-[#FFCA1A] via-[#FFCA1A] to-transparent w-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses
                  .filter(course => course.category === 'Cohort Programs')
                  .map((course, index) => (
                    <Link key={course.id} href={`/courses/${course.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                      >
                        {/* Course Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                            ₦{(course.price / 1000).toFixed(0)}k
                          </div>
                          {course.enrollmentStatus && (
                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                              course.enrollmentStatus === 'Open' 
                                ? 'bg-green-500/90 text-white'
                                : 'bg-yellow-500/90 text-white'
                            }`}>
                              {course.enrollmentStatus}
                            </div>
                          )}
                        </div>

                        {/* Course Info */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FFCA1A] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {course.description}
                          </p>

                          {/* Course Meta */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{course.studentsEnrolled}</span>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(course.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {course.rating}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({course.totalReviews || 0})
                            </span>
                          </div>

                          {/* Level Badge */}
                          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                            {course.level}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Micro Courses */}
          {(selectedCategory === 'All' || selectedCategory === 'Micro Courses') && (
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-[#FFCA1A] to-transparent w-20"></div>
                <h2 className="text-3xl font-bold text-gray-900 mx-6">Micro Courses</h2>
                <div className="h-px bg-gradient-to-r from-[#FFCA1A] via-[#FFCA1A] to-transparent w-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses
                  .filter(course => course.category === 'Micro Courses')
                  .map((course, index) => (
              <Link key={course.id} href={`/courses/${course.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                    ₦{(course.price / 1000).toFixed(0)}k
                  </div>
                  {course.enrollmentStatus && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      course.enrollmentStatus === 'Open' 
                        ? 'bg-green-500/90 text-white'
                        : 'bg-yellow-500/90 text-white'
                    }`}>
                      {course.enrollmentStatus}
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FFCA1A] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.studentsEnrolled}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {course.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({course.totalReviews || 0})
                    </span>
                  </div>

                  {/* Level Badge */}
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                    {course.level}
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  </section>
    </div>
  )
}
