'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight, Search, TrendingUp, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import ResourcesHub from '@/components/ui/ResourcesHub'
import Newsletter from '@/components/ui/Newsletter'
import { blogPosts } from '@/data/blogData'

const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'tech-tips', label: 'Tech Tips' },
  { id: 'career', label: 'Career Guide' },
  { id: 'tutorials', label: 'Tutorials' },
  { id: 'insights', label: 'Insights' },
  { id: 'success-stories', label: 'Success Stories' }
]
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean & Minimal */}
      <section className="relative bg-[#000000]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="py-16 lg:py-20 max-w-4xl mx-auto text-center">
            {/* Overline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-4"
            >
              Blog
            </motion.p>
            
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
            >
              Insights & Learning
            </motion.h1>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
            >
              Articles, tutorials, and tips to accelerate your tech journey.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-gray-700 focus:bg-white focus:border-[#FFCA1A] focus:outline-none text-white focus:text-[#000000] placeholder-gray-500 focus:placeholder-gray-400 transition-all duration-300"
              />
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

      {/* Featured Posts Section */}
      {activeCategory === 'all' && searchQuery === '' && (
        <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <TrendingUp className="w-6 h-6 text-[#FFCA1A]" strokeWidth={2.5} />
              <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
                Featured Articles
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#FFCA1A] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Featured Badge */}
                        <div className="absolute top-4 left-4 px-4 py-2 bg-[#FFCA1A] text-[#000000] text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" strokeWidth={3} />
                          Featured
                        </div>
                        {/* Arrow Icon on Hover */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                          <ArrowUpRight className="w-5 h-5 text-[#000000]" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category */}
                        <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mb-3">
                          {post.categoryLabel}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#000000] mb-3 group-hover:text-[#FFCA1A] transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" strokeWidth={2} />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" strokeWidth={2} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">
              {activeCategory === 'all' ? 'All Articles' : `${categories.find(c => c.id === activeCategory)?.label}`}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => {
                const borderColors = ['border-blue-300', 'border-green-300', 'border-yellow-300', 'border-purple-300', 'border-pink-300', 'border-cyan-300']
                const borderColor = borderColors[index % borderColors.length]
                
                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className={`bg-white rounded-2xl overflow-hidden border-2 ${borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}>
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Arrow Icon on Hover */}
                          <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            <ArrowUpRight className="w-5 h-5 text-[#000000]" strokeWidth={2.5} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                          {/* Category */}
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mb-2 w-fit">
                            {post.categoryLabel}
                          </span>

                          {/* Title */}
                          <h3 className="text-base font-bold text-[#000000] mb-2 group-hover:text-[#FFCA1A] transition-colors leading-tight line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2 flex-1">
                            {post.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Resources Hub */}
      <ResourcesHub />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
