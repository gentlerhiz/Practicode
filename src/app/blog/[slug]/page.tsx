'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { blogPosts } from '@/data/blogData'
import Newsletter from '@/components/ui/Newsletter'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts from the same category
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#000000] py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/blog">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FFCA1A] transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                <span className="font-medium">Back to Blog</span>
              </motion.button>
            </Link>

            {/* Category Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-2 bg-[#FFCA1A] text-[#000000] text-xs font-bold rounded-full mb-6"
            >
              {post.categoryLabel}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#FFCA1A] flex items-center justify-center text-[#000000] font-bold text-sm">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={2} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={2} />
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative bg-gray-50 py-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              {/* Article Introduction */}
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Sample Content - You can expand this with actual content */}
              <h2 className="text-2xl font-bold text-[#000000] mt-10 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                In this comprehensive guide, we&apos;ll explore the key concepts and best practices that will help you master this topic. Whether you&apos;re just starting out or looking to level up your skills, this article will provide you with actionable insights and practical examples.
              </p>

              <h2 className="text-2xl font-bold text-[#000000] mt-10 mb-4">Key Takeaways</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>Understanding the fundamental concepts is crucial for long-term success</li>
                <li>Practice consistently with real-world projects to reinforce your learning</li>
                <li>Stay updated with the latest industry trends and best practices</li>
                <li>Join communities and network with other professionals in the field</li>
                <li>Never stop learning and always seek opportunities to improve</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#000000] mt-10 mb-4">Deep Dive</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Let&apos;s explore the core concepts in detail. Understanding these principles will give you a solid foundation and help you navigate more complex topics with confidence. The tech industry is constantly evolving, and staying ahead requires dedication and continuous learning.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                By applying these strategies and techniques, you&apos;ll be well-equipped to tackle real-world challenges and build impressive projects that showcase your skills to potential employers or clients.
              </p>

              <h2 className="text-2xl font-bold text-[#000000] mt-10 mb-4">Practical Application</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The best way to solidify your understanding is through hands-on practice. Start with small projects and gradually work your way up to more complex applications. Don&apos;t be afraid to make mistakes – they&apos;re an essential part of the learning process.
              </p>

              <h2 className="text-2xl font-bold text-[#000000] mt-10 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Mastering this skill takes time and dedication, but with consistent effort and the right approach, you&apos;ll see significant progress. Remember to celebrate your wins along the way and keep pushing forward, even when things get challenging.
              </p>

              <div className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
                <p className="text-gray-700 font-medium mb-2">
                  <strong>Ready to take your skills to the next level?</strong>
                </p>
                <p className="text-gray-600 mb-4">
                  Join our comprehensive courses and learn from industry experts with hands-on projects and personalized mentorship.
                </p>
                <Link href="/courses">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCA1A] text-[#000000] font-bold rounded-xl hover:bg-[#000000] hover:text-white transition-all duration-300">
                    Explore Courses
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t-2 border-gray-100"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-lg font-bold text-[#000000]">Share this article</h3>
                <div className="flex items-center gap-3">
                  <button 
                    aria-label="Share on Facebook"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5" strokeWidth={2} />
                  </button>
                  <button 
                    aria-label="Share on Twitter"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" strokeWidth={2} />
                  </button>
                  <button 
                    aria-label="Share on LinkedIn"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-8">
                Related Articles
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#FFCA1A] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mb-2 w-fit">
                            {relatedPost.categoryLabel}
                          </span>

                          <h3 className="text-base font-bold text-[#000000] mb-2 group-hover:text-[#FFCA1A] transition-colors leading-tight line-clamp-2">
                            {relatedPost.title}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                              <span>{relatedPost.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
