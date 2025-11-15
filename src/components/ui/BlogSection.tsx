'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, ArrowUpRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: '10 Essential JavaScript Tips for Beginners',
    excerpt: 'Master these fundamental JavaScript concepts to accelerate your web development journey.',
    category: 'Tech Tips',
    date: 'Nov 10, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 2,
    title: 'How to Build a Winning Tech Portfolio',
    excerpt: 'Stand out to employers with a portfolio that showcases your best work and skills.',
    category: 'Career Guide',
    date: 'Nov 8, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Top AI Tools Transforming Business in 2025',
    excerpt: 'Discover the latest AI tools that are revolutionizing how businesses operate and scale.',
    category: 'Product Insights',
    date: 'Nov 5, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    color: 'from-purple-500 to-pink-500'
  }
]

export default function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Blog
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Latest tech tips, career guides<br />& product insights.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#000000] text-white font-bold rounded-full hover:bg-gray-900 transition-all duration-300 hover:scale-105 group">
                <span>Visit Blog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${post.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                      {post.category}
                    </div>
                    {/* Arrow Icon on Hover */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#FFCA1A] transition-colors leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
