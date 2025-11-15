'use client'

import { motion } from 'framer-motion'
import { BookOpen, FileText, Briefcase, Code, Users, Download, Video, Calendar, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'career', label: 'Career' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'events', label: 'Events' }
]

const tutorials = [
  {
    title: 'JavaScript Fundamentals',
    description: 'Complete guide to modern JavaScript ES6+',
    category: 'tutorials',
    type: 'Video Course',
    duration: '4 hours',
    level: 'Beginner',
    icon: Video
  },
  {
    title: 'React.js Crash Course',
    description: 'Build your first React application from scratch',
    category: 'tutorials',
    type: 'Video Course',
    duration: '3 hours',
    level: 'Intermediate',
    icon: Video
  },
  {
    title: 'Python for Data Analysis',
    description: 'Learn data manipulation with Pandas and NumPy',
    category: 'tutorials',
    type: 'Written Guide',
    duration: '2 hours',
    level: 'Beginner',
    icon: BookOpen
  },
  {
    title: 'Git & GitHub Essentials',
    description: 'Master version control for team collaboration',
    category: 'tutorials',
    type: 'Video Course',
    duration: '1.5 hours',
    level: 'Beginner',
    icon: Video
  }
]

const downloads = [
  {
    title: 'HTML & CSS Cheat Sheet',
    description: 'Quick reference guide for web development',
    category: 'downloads',
    type: 'PDF',
    size: '2.5 MB',
    downloads: '1,234',
    icon: FileText
  },
  {
    title: 'JavaScript Interview Questions',
    description: '100+ common interview questions with answers',
    category: 'downloads',
    type: 'PDF',
    size: '1.8 MB',
    downloads: '2,456',
    icon: FileText
  },
  {
    title: 'Resume Template for Developers',
    description: 'Professional ATS-friendly resume template',
    category: 'downloads',
    type: 'DOCX',
    size: '0.5 MB',
    downloads: '3,789',
    icon: FileText
  },
  {
    title: 'SQL Commands Reference',
    description: 'Complete guide to SQL queries and commands',
    category: 'downloads',
    type: 'PDF',
    size: '1.2 MB',
    downloads: '1,567',
    icon: FileText
  }
]

const careerGuides = [
  {
    title: 'How to Land Your First Tech Job',
    description: 'Step-by-step guide to breaking into tech',
    category: 'career',
    type: 'Career Guide',
    readTime: '15 min',
    icon: Briefcase
  },
  {
    title: 'Building a Developer Portfolio',
    description: 'Showcase your skills with an impressive portfolio',
    category: 'career',
    type: 'Career Guide',
    readTime: '10 min',
    icon: Briefcase
  },
  {
    title: 'Negotiating Your Tech Salary',
    description: 'Tips for getting the compensation you deserve',
    category: 'career',
    type: 'Career Guide',
    readTime: '12 min',
    icon: Briefcase
  },
  {
    title: 'LinkedIn Optimization for Developers',
    description: 'Make recruiters find you on LinkedIn',
    category: 'career',
    type: 'Career Guide',
    readTime: '8 min',
    icon: Briefcase
  }
]

const challenges = [
  {
    title: '30 Days of JavaScript',
    description: 'Daily coding challenges to master JavaScript',
    category: 'challenges',
    type: 'Challenge Series',
    problems: '30',
    difficulty: 'Beginner',
    icon: Code
  },
  {
    title: 'Algorithm Practice Problems',
    description: 'Prepare for technical interviews',
    category: 'challenges',
    type: 'Problem Set',
    problems: '50',
    difficulty: 'Mixed',
    icon: Code
  },
  {
    title: 'Build 10 Mini Projects',
    description: 'Hands-on projects to build your portfolio',
    category: 'challenges',
    type: 'Project Challenge',
    problems: '10',
    difficulty: 'Intermediate',
    icon: Code
  }
]

const events = [
  {
    title: 'Tech Career Fair 2025',
    description: 'Meet hiring companies and land your dream job',
    category: 'events',
    type: 'Career Event',
    date: 'Jan 20, 2025',
    location: 'Lagos, Nigeria',
    icon: Calendar
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Free weekend intensive workshop',
    category: 'events',
    type: 'Workshop',
    date: 'Jan 15, 2025',
    location: 'Online',
    icon: Calendar
  },
  {
    title: 'Monthly Community Meetup',
    description: 'Network with fellow developers',
    category: 'events',
    type: 'Meetup',
    date: 'Every Last Saturday',
    location: 'Various',
    icon: Calendar
  }
]

const allResources = [...tutorials, ...downloads, ...careerGuides, ...challenges, ...events]

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = allResources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Resources Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Everything you need to learn, grow, and succeed in your tech career — all in one place.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No resources found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2">
                          {resource.type}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                          {resource.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        {'duration' in resource && resource.duration && <span>{resource.duration}</span>}
                        {'readTime' in resource && resource.readTime && <span>{resource.readTime}</span>}
                        {'size' in resource && resource.size && <span>{resource.size}</span>}
                        {'problems' in resource && resource.problems && <span>{resource.problems} problems</span>}
                        {'date' in resource && resource.date && <span>{resource.date}</span>}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        {resource.category === 'downloads' ? 'Download' : 
                         resource.category === 'events' ? 'Register' : 
                         'Access Now'}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Success Stories CTA */}
      <section className="py-20 bg-gradient-to-br from-[#FFCA1A] to-[#FFD700]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are transforming their careers with our structured programs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg">
                  Explore Courses
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 border-2 border-gray-900">
                  Talk to an Advisor
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
