'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Search, Plus, Minus } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'programs', label: 'Programs' },
  { id: 'admission', label: 'Admission' },
  { id: 'payment', label: 'Payment' }
]

const allFaqs = [
  {
    id: '1',
    category: 'general',
    question: 'What is Practicode Academy?',
    answer: 'Practicode Academy is a leading tech training institution focused on providing hands-on, project-based learning. We prepare students for real-world tech careers through cohort programs, bootcamps, mentorship, and corporate training.'
  },
  {
    id: '2',
    category: 'programs',
    question: 'What programs do you offer?',
    answer: 'We offer comprehensive programs in Web Development (Frontend & Backend), Data Analysis, UI/UX Design, Python for Machine Learning, and Graphics Design. We also provide weekend bootcamps, one-on-one coaching, programs for kids & teens, and corporate training solutions.'
  },
  {
    id: '3',
    category: 'general',
    question: 'Who are the instructors at Practicode Academy?',
    answer: 'Our instructors are experienced tech professionals and industry experts with years of hands-on experience. They are passionate about teaching and dedicated to helping students succeed in their tech careers.'
  },
  {
    id: '4',
    category: 'admission',
    question: 'Am I eligible for admission?',
    answer: 'Our programs are open to everyone! Whether you\'re a complete beginner, career changer, or looking to upskill, we have programs designed for different skill levels. No prior coding experience is required for beginner courses.'
  },
  {
    id: '5',
    category: 'programs',
    question: 'How long are the programs?',
    answer: 'Program duration varies: Cohort programs are 3-6 months, bootcamps are 2-4 weeks, and one-on-one coaching is flexible based on your schedule. Each program is designed to provide comprehensive training while fitting different lifestyles.'
  },
  {
    id: '6',
    category: 'payment',
    question: 'What payment options are available?',
    answer: 'We offer flexible payment plans including full payment, installments, and early-bird discounts. We also have scholarship opportunities for the Women in Tech Initiative. Contact our admissions team for specific pricing and payment arrangements.'
  },
  {
    id: '7',
    category: 'programs',
    question: 'Do you offer online or in-person classes?',
    answer: 'Yes! We offer both physical and virtual learning options. You can choose the format that works best for you. Our online classes are live and interactive, and our physical classes are held at our modern facilities.'
  },
  {
    id: '8',
    category: 'admission',
    question: 'When does the next cohort start?',
    answer: 'We have multiple cohort start dates throughout the year. New cohorts typically begin every quarter. Check our courses page or contact us for the next available start date for your preferred program.'
  },
  {
    id: '9',
    category: 'general',
    question: 'Will I get a certificate?',
    answer: 'Yes! Upon successful completion of your program, you\'ll receive an ISO-standard certificate from Practicode Academy. This certificate is recognized by employers and demonstrates your proficiency in the skills you\'ve learned.'
  },
  {
    id: '10',
    category: 'programs',
    question: 'Do you provide career support?',
    answer: 'Absolutely! We offer comprehensive career support including resume reviews, interview preparation, portfolio development, job placement assistance, and networking opportunities with hiring companies. Our goal is to help you land your dream tech job.'
  },
  {
    id: '11',
    category: 'admission',
    question: 'What do I need to get started?',
    answer: 'For most programs, all you need is a computer with internet access and the willingness to learn. We\'ll provide all the software tools and resources you need. Specific requirements vary by program and will be communicated during the admission process.'
  },
  {
    id: '12',
    category: 'payment',
    question: 'Do you offer scholarships?',
    answer: 'Yes! We offer scholarships through our Women in Tech Initiative to help make tech education accessible. We also occasionally have scholarship opportunities for other programs. Contact us or check our website for current scholarship availability.'
  }
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory
    return matchesSearch && matchesCategory
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Find answers to common questions about our programs, admission, and more.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filterCategory === category.id
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

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-base">{faq.question}</span>
                    {openId === faq.id ? (
                      <Minus
                        className="w-5 h-5 text-gray-900 flex-shrink-0 transition-all duration-300"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5 text-gray-400 flex-shrink-0 transition-all duration-300"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 text-gray-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#FFCA1A] to-[#FFD700]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
              Our admissions team is here to help. Get in touch and we&apos;ll answer all your questions.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
