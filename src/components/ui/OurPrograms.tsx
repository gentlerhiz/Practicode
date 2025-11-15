'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, Zap, UserCheck, Baby, Briefcase, GraduationCap } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { id: 'cohort', label: 'Cohort Programs', icon: GraduationCap },
  { id: 'women', label: 'Women in Tech Initiative', icon: Users },
  { id: 'bootcamps', label: 'Tech Bootcamps', icon: Zap },
  { id: 'coaching', label: 'One-on-One Coaching', icon: UserCheck },
  { id: 'kids', label: 'Kids & Teens Code Academy', icon: Baby },
  { id: 'corporate', label: 'Corporate Training', icon: Briefcase }
]

const cohortTracks = [
  {
    title: 'Front End Web Development',
    description: 'Master HTML, CSS, JavaScript, React and modern frontend frameworks to build beautiful user interfaces',
    level: 'Beginner',
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80'
  },
  {
    title: 'Back End Web Development',
    description: 'Learn server-side programming, databases, APIs and build scalable backend systems',
    level: 'Beginner',
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
  },
  {
    title: 'Data Analysis',
    description: 'Learn to analyze data, create visualizations, and derive insights using Python and Excel',
    level: 'Beginner',
    duration: '3 months',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
  {
    title: 'UI/UX Design',
    description: 'Design beautiful and intuitive user experiences with Figma and modern design principles',
    level: 'Beginner',
    duration: '3 months',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
  },
  {
    title: 'Python for Machine Learning',
    description: 'Build intelligent systems with Python, scikit-learn, TensorFlow and deep learning',
    level: 'Intermediate',
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80'
  },
  {
    title: 'Graphics Design',
    description: 'Create stunning visual content with Adobe Creative Suite, Canva and design fundamentals',
    level: 'Beginner',
    duration: '3 months',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80'
  }
]

const bootcampsList = [
  'Data Analysis with Excel & Power BI',
  'Web Design with HTML/CSS',
  'Git & GitHub',
  'Canva & Business Graphics',
  'Microsoft Office productivity'
]

export default function OurPrograms() {
  const [activeCategory, setActiveCategory] = useState('cohort')

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Our Programs</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Choose Your{' '}
            <span className="relative inline-block">
              Learning Path
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A]/30 -z-10 origin-left"
              />
            </span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#FFCA1A] text-gray-900 shadow-lg scale-105'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.5} />
                <span>{category.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cohort Programs */}
            {activeCategory === 'cohort' && (
              <div>
                <div className="text-center mb-12 max-w-3xl mx-auto">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">🎓 Cohort Programs</h3>
                  <p className="text-lg text-gray-600">
                    Become job-ready in 3–6 months through structured learning, projects & internship support.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {cohortTracks.map((track, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FFCA1A] transition-all duration-300 hover:shadow-xl"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <img 
                          src={track.image} 
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{track.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">{track.description}</p>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-[#FFCA1A]/20 text-[#FFCA1A] text-xs font-bold rounded-full">
                            {track.level}
                          </span>
                          <span className="text-xs text-gray-500">{track.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/courses">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105">
                      <span>Join the Cohort</span>
                      <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Women in Tech Initiative */}
            {activeCategory === 'women' && (
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
                  <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
                      Empowering Female Innovators
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Women in Tech Initiative
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Breaking barriers and building futures through comprehensive support for women entering the tech industry.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="group">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Scholarships</h4>
                      <p className="text-sm text-gray-600">Full and partial scholarships to make tech education accessible for aspiring women professionals.</p>
                    </div>
                    <div className="group">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Mentorship</h4>
                      <p className="text-sm text-gray-600">One-on-one guidance from experienced female tech leaders and industry professionals.</p>
                    </div>
                    <div className="group">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Career Support</h4>
                      <p className="text-sm text-gray-600">Job placement assistance, resume reviews, and networking opportunities with top companies.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/mentorship">
                      <button className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-200 hover:shadow-xl">
                        <span>Apply for Scholarship</span>
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                    </Link>
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300">
                        <span>Become a Partner</span>
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Bootcamps */}
            {activeCategory === 'bootcamps' && (
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
                  <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full mb-4">
                      Fast-Track Your Skills
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Tech Bootcamps
                    </h3>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Intensive weekend and short-term courses designed to get you job-ready skills in weeks, not months.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-12">
                    {bootcampsList.map((bootcamp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                              {bootcamp}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                2-4 weeks
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Certificate
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-8 border border-cyan-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">Weekend Classes Available</h4>
                        <p className="text-sm text-gray-600">Perfect for working professionals and students</p>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="font-semibold">Flexible Schedule</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link href="/courses">
                      <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-200 hover:shadow-xl">
                        <span>Explore All Bootcamps</span>
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* One-on-One Coaching */}
            {activeCategory === 'coaching' && (
              <div>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-yellow-100 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">🧑‍🏫 One-on-One Coaching</h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Flexible & personalized learning tailored to your goals.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">🎯</div>
                      <h4 className="font-bold text-gray-900 mb-2">Personalized Learning</h4>
                      <p className="text-sm text-gray-600">Custom curriculum based on your goals</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">⏰</div>
                      <h4 className="font-bold text-gray-900 mb-2">Flexible Schedule</h4>
                      <p className="text-sm text-gray-600">Learn at your own pace and time</p>
                    </div>
                  </div>

                  <Link href="/mentorship">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-gray-900 font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105">
                      <span>Book a Mentor</span>
                      <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Kids & Teens Code Academy */}
            {activeCategory === 'kids' && (
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">🧒 Kids & Teens Code Academy</h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Coding, robotics & digital literacy for ages 8–16.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">💻</div>
                      <h4 className="font-bold text-gray-900 mb-2">Coding</h4>
                      <p className="text-sm text-gray-600">Learn programming fundamentals</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">🤖</div>
                      <h4 className="font-bold text-gray-900 mb-2">Robotics</h4>
                      <p className="text-sm text-gray-600">Build and program robots</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">📱</div>
                      <h4 className="font-bold text-gray-900 mb-2">Digital Literacy</h4>
                      <p className="text-sm text-gray-600">Essential tech skills for the future</p>
                    </div>
                  </div>

                  <Link href="/courses">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                      <span>Enroll Your Child</span>
                      <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Corporate Training */}
            {activeCategory === 'corporate' && (
              <div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-indigo-100 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    🏢 Corporate Training & IT Consultancy
                  </h3>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Upskill your workforce with modern digital capabilities.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">👥</div>
                      <h4 className="font-bold text-gray-900 mb-2">Team Training</h4>
                      <p className="text-sm text-gray-600">Customized programs for your organization</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <div className="text-3xl mb-3">🔧</div>
                      <h4 className="font-bold text-gray-900 mb-2">IT Consultancy</h4>
                      <p className="text-sm text-gray-600">Expert guidance for digital transformation</p>
                    </div>
                  </div>

                  <Link href="/contact">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                      <span>Request Proposal</span>
                      <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
