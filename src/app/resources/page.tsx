'use client'

import { motion } from 'framer-motion'
import { BookOpen, FileText, Briefcase, Code, Users, Download, Video, Calendar, Search, ArrowRight, CheckCircle } from 'lucide-react'
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
    icon: FileText,
    file: '/downloads/html-css-cheatsheet.pdf'
  },
  {
    title: 'JavaScript Interview Questions',
    description: '100+ common interview questions with answers',
    category: 'downloads',
    type: 'PDF',
    size: '1.8 MB',
    downloads: '2,456',
    icon: FileText,
    file: '/downloads/javascript-interview-questions.pdf'
  },
  {
    title: 'Resume Template for Developers',
    description: 'Professional ATS-friendly resume template',
    category: 'downloads',
    type: 'DOCX',
    size: '0.5 MB',
    downloads: '3,789',
    icon: FileText,
    file: '/downloads/developer-resume-template.docx'
  },
  {
    title: 'SQL Commands Reference',
    description: 'Complete guide to SQL queries and commands',
    category: 'downloads',
    type: 'PDF',
    size: '1.2 MB',
    downloads: '1,567',
    icon: FileText,
    file: '/downloads/sql-commands-reference.pdf'
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

  const handleDownload = (file: string, title: string) => {
    const link = document.createElement('a')
    link.href = file
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean Black */}
      <section className="relative bg-[#000000] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="py-20 lg:py-28 max-w-5xl mx-auto">
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
                Learn & Grow
              </motion.p>
              
              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
              >
                Your Complete
                <br />
                <span className="relative inline-block mt-2">
                  Learning Resource Hub
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFCA1A] -z-10 rounded-sm"></span>
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                Everything you need to learn, grow, and succeed in your tech career — tutorials, downloads, career guides, and more.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative max-w-2xl mx-auto"
              >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-700 bg-white/10 backdrop-blur-sm focus:bg-white focus:border-[#FFCA1A] focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 bg-white border-b-2 border-gray-100 z-40 shadow-sm">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#000000] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No resources found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => {
                const Icon = resource.icon
                const borderColors = ['border-blue-300', 'border-green-300', 'border-yellow-300', 'border-purple-300', 'border-pink-300', 'border-cyan-300']
                const iconColors = ['text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600', 'text-pink-600', 'text-cyan-600']
                const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50', 'bg-pink-50', 'bg-cyan-50']
                const borderColor = borderColors[index % borderColors.length]
                const iconColor = iconColors[index % iconColors.length]
                const bgColor = bgColors[index % bgColors.length]
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`group bg-white border-2 ${borderColor} rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    {/* Card Header */}
                    <div className={`${bgColor} p-6`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                          <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={2.5} />
                        </div>
                        <span className="inline-block px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded-full shadow-sm">
                          {resource.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#000000] mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {resource.title}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{resource.description}</p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-gray-500">
                        {'duration' in resource && resource.duration && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            {resource.duration}
                          </span>
                        )}
                        {'readTime' in resource && resource.readTime && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            {resource.readTime}
                          </span>
                        )}
                        {'size' in resource && resource.size && (
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {resource.size}
                          </span>
                        )}
                        {'problems' in resource && resource.problems && (
                          <span className="flex items-center gap-1">
                            <Code className="w-4 h-4" />
                            {resource.problems} problems
                          </span>
                        )}
                        {'date' in resource && resource.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {resource.date}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      {'file' in resource && resource.file ? (
                        <button
                          onClick={() => handleDownload(resource.file, resource.title)}
                          className="w-full py-3.5 bg-[#FFCA1A] text-[#000000] text-sm font-bold rounded-xl hover:bg-[#000000] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          <Download className="w-5 h-5 group-hover/btn:animate-bounce" strokeWidth={2.5} />
                          <span>Download</span>
                        </button>
                      ) : (
                        <button className="w-full py-3.5 bg-[#000000] text-white text-sm font-bold rounded-xl hover:bg-[#FFCA1A] hover:text-[#000000] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                          <span>
                            {resource.category === 'events' ? 'Register' : 'Access Now'}
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#000000]">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFCA1A]/20 border-2 border-[#FFCA1A] rounded-full mb-6"
            >
              <BookOpen className="w-5 h-5 text-[#FFCA1A]" strokeWidth={2.5} />
              <span className="text-[#FFCA1A] text-sm font-bold">Start Learning Today</span>
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are building successful careers with our comprehensive programs and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold text-base rounded-xl hover:bg-white transition-all duration-300 shadow-lg"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-base rounded-xl hover:bg-white hover:text-[#000000] transition-all duration-300"
                >
                  <span>Talk to an Advisor</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
