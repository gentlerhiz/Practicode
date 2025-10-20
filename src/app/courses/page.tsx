'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, Users, Award } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { courses } from '@/data'
import type { Course } from '@/types'

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory
    return matchesSearch && matchesCategory
  })

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
              Explore Our <span className="text-primary-amber">Courses</span>
            </h1>
            <p className="text-xl text-gray-300">
              Choose from our comprehensive programs designed to launch your tech career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'development', 'data', 'design', 'marketing'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterCategory === category
                      ? 'bg-primary-red text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary-amber/20 text-primary-amber text-xs font-semibold rounded-full">
                        {course.level}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Beginner-friendly</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4" />
                        <span>Certificate included</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary-red">
                        ₦{course.price.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedCourse(course)}
                      variant="secondary"
                      size="sm"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Course Details Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title}
        size="lg"
      >
        {selectedCourse && (
          <div className="space-y-6">
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className="w-full h-64 object-cover rounded-lg"
            />

            <div>
              <h3 className="text-lg font-semibold mb-2">Course Overview</h3>
              <p className="text-gray-600 dark:text-gray-400">{selectedCourse.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">What You&apos;ll Learn</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {selectedCourse.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-red mt-1">✓</span>
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Projects You&apos;ll Build</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.projects.map((project, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Course Syllabus</h3>
              <div className="space-y-3">
                {selectedCourse.syllabus.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-red rounded-lg flex items-center justify-center text-white font-bold">
                      W{item.week}
                    </div>
                    <div>
                      <div className="font-semibold">{item.topic}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/contact" className="flex-1">
                <Button className="w-full">Enroll Now</Button>
              </Link>
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
