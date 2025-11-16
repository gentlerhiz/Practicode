'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Palette, BarChart, CheckCircle, ArrowRight, Zap, Award, Users, TrendingUp, Phone } from 'lucide-react'
import { solutions } from '@/data'
import Link from 'next/link'
import Image from 'next/image'
import FAQIntro from '@/components/ui/FAQIntro'
import Newsletter from '@/components/ui/Newsletter'

export default function SolutionsPage() {
  return (
    <>
      {/* Hero Section - Compact */}
      <section className="relative bg-[#000000] overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFCA1A]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFCA1A]/3 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="py-16 lg:py-20 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Overline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-4"
              >
                Business Solutions
              </motion.p>
              
              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
              >
                Digital Solutions
                <br />
                <span className="relative inline-block mt-2">
                  That Drive
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFCA1A] -z-10 rounded-sm"></span>
                </span>
                {' '}Growth
              </motion.h1>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed"
              >
                Transform your business with <span className="text-white font-semibold">scalable, cross-platform technology solutions</span> that solve real-world problems. From custom software development to data analytics, we deliver <span className="text-white font-semibold">production-ready, enterprise-grade solutions</span> that drive measurable results.
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FFCA1A]/20 group">
                    <span>Start Your Project</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Enhanced */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-10 border-y border-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Award, value: '100+', label: 'Successful Projects', subtext: 'Delivered on time', color: 'border-blue-300 text-blue-600' },
              { icon: Users, value: '50+', label: 'Happy Clients', subtext: 'Across industries', color: 'border-green-300 text-green-600' },
              { icon: TrendingUp, value: '95%', label: 'Client Retention', subtext: 'Long-term partnerships', color: 'border-purple-300 text-purple-600' },
              { icon: Zap, value: '24/7', label: 'Expert Support', subtext: 'Always available', color: 'border-orange-300 text-orange-600' },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`inline-flex p-3 rounded-2xl border-2 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className="text-3xl lg:text-4xl font-black text-[#000000] mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-[#000000] mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.subtext}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Solutions Grid - Two Column Alternating Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-3"
            >
              What We Offer
            </motion.p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-4">
              Our Solutions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              From AI-powered automation to scalable cloud solutions, we deliver cutting-edge technology that drives real results
            </p>
          </motion.div>

          {/* Solutions - Alternating Two Column Layout */}
          <div className="space-y-16">
            {solutions.map((solution, index) => {
              const borderColors = [
                'border-blue-300',
                'border-green-300', 
                'border-yellow-300',
                'border-purple-300',
                'border-pink-300',
                'border-cyan-300',
                'border-orange-300',
                'border-indigo-300'
              ]
              const borderColor = borderColors[index % borderColors.length]
              
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`grid md:grid-cols-2 gap-0 items-center border-3 ${borderColor} rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300`}>
                    {/* Image Column */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''} group h-full`}>
                      <div className="relative h-72 md:h-full min-h-[400px] overflow-hidden">
                        <Image 
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-[#000000]/0 group-hover:bg-[#000000]/10 transition-all duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Content Column */}
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''} p-8 lg:p-10`}>
                      <div className="space-y-5">
                      {/* Value Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit ${
                        solution.id === '1' ? 'bg-blue-100 text-blue-700' : 
                        solution.id === '2' ? 'bg-green-100 text-green-700' : 
                        solution.id === '3' ? 'bg-yellow-100 text-yellow-700' : 
                        solution.id === '4' ? 'bg-purple-100 text-purple-700' :
                        solution.id === '5' ? 'bg-pink-100 text-pink-700' :
                        solution.id === '6' ? 'bg-cyan-100 text-cyan-700' :
                        solution.id === '7' ? 'bg-orange-100 text-orange-700' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                        <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-sm font-bold">
                          {solution.id === '1' ? 'Scalable & Secure' : 
                           solution.id === '2' ? 'Cross-Platform Ready' : 
                           solution.id === '3' ? 'Problem-Solving Design' : 
                           solution.id === '4' ? 'Real-World Insights' :
                           solution.id === '5' ? 'AI-Powered' :
                           solution.id === '6' ? 'Revenue Ready' :
                           solution.id === '7' ? 'Smart Connected' :
                           'Cloud-Based'}
                        </span>
                      </div>

                      <h3 className="text-3xl lg:text-4xl font-bold text-[#000000] leading-tight">
                        {solution.title}
                      </h3>
                      
                      <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                        {solution.description}
                      </p>
                      
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-bold text-[#000000] mb-3 uppercase tracking-wide">
                          Key Features
                        </h4>
                        <ul className="space-y-2.5">
                          {solution.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#FFCA1A] flex items-center justify-center mt-0.5 flex-shrink-0">
                                <CheckCircle className="w-3 h-3 text-[#000000]" strokeWidth={3} />
                              </div>
                              <span className="text-sm text-gray-700 leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {solution.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-[#FFCA1A] hover:text-[#000000] transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {solution.technologies.length > 3 && (
                            <span className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold">
                              +{solution.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="pt-2">
                        <Link href="/contact">
                          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold text-base rounded-xl hover:bg-yellow-400 hover:text-[#000000] transition-all duration-300 group">
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                          </button>
                        </Link>
                      </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean White Background */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.2em] mb-3"
            >
              The Practicode Advantage
            </motion.p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
              Why Partner With <span className="text-[#FFCA1A]">Us</span>?
            </h2>
            <p className="text-gray-600 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              We combine technical excellence with business strategy to deliver solutions that don&apos;t just work—they transform your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Code, 
                title: 'Scalable Architecture', 
                desc: 'Build solutions that grow with your business using cutting-edge, scalable technology stacks',
                keywords: ['Scalable', 'Future-Ready', 'Enterprise-Grade'],
                borderColor: 'border-blue-300',
                hoverBorder: 'hover:border-blue-400',
                hoverShadow: 'hover:shadow-blue-200/50',
                iconColor: 'border-blue-300 text-blue-600'
              },
              { 
                icon: Smartphone, 
                title: 'Cross-Platform Solutions', 
                desc: 'Reach your audience everywhere with seamless cross-platform mobile and web applications',
                keywords: ['Cross-Platform', 'Multi-Device', 'Universal'],
                borderColor: 'border-green-300',
                hoverBorder: 'hover:border-green-400',
                hoverShadow: 'hover:shadow-green-200/50',
                iconColor: 'border-green-300 text-green-600'
              },
              { 
                icon: Palette, 
                title: 'User-Centered Design', 
                desc: 'Create intuitive experiences that solve real-world problems and delight your users',
                keywords: ['Problem-Solving', 'User-Focused', 'Intuitive'],
                borderColor: 'border-yellow-300',
                hoverBorder: 'hover:border-yellow-400',
                hoverShadow: 'hover:shadow-yellow-200/50',
                iconColor: 'border-yellow-300 text-yellow-600'
              },
              { 
                icon: BarChart, 
                title: 'Data-Driven Insights', 
                desc: 'Transform raw data into actionable intelligence with advanced analytics and reporting',
                keywords: ['Real-World Data', 'Business Intelligence', 'Performance'],
                borderColor: 'border-purple-300',
                hoverBorder: 'hover:border-purple-400',
                hoverShadow: 'hover:shadow-purple-200/50',
                iconColor: 'border-purple-300 text-purple-600'
              },
              { 
                icon: Zap, 
                title: 'Rapid Development', 
                desc: 'Get to market faster with our agile development process and proven methodologies',
                keywords: ['Fast Delivery', 'Agile', 'Time-to-Market'],
                borderColor: 'border-pink-300',
                hoverBorder: 'hover:border-pink-400',
                hoverShadow: 'hover:shadow-pink-200/50',
                iconColor: 'border-pink-300 text-pink-600'
              },
              { 
                icon: Award, 
                title: 'Quality Assurance', 
                desc: 'Enterprise-grade testing and quality control ensure reliable, production-ready solutions',
                keywords: ['Reliable', 'Tested', 'Production-Ready'],
                borderColor: 'border-cyan-300',
                hoverBorder: 'hover:border-cyan-400',
                hoverShadow: 'hover:shadow-cyan-200/50',
                iconColor: 'border-cyan-300 text-cyan-600'
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`bg-white border-2 ${feature.borderColor} ${feature.hoverBorder} rounded-2xl p-6 hover:shadow-sm ${feature.hoverShadow} transition-all duration-300 h-full`}>
                    <div className={`inline-flex p-3 rounded-xl border-2 ${feature.iconColor} mb-4 transition-all duration-300`}>
                      <Icon className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-bold text-[#000000] mb-2 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {feature.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-[#000000] rounded-md text-xs font-semibold group-hover:bg-[#FFCA1A]/20"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-12 bg-[#000000]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Ready to Build
              <br />
              <span className="relative inline-block mt-2">
                Scalable Solutions
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#FFCA1A] -z-10 rounded-sm"></span>
              </span>
              ?
            </h2>
            <p className="text-base lg:text-lg text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
              Partner with us to develop <span className="text-white font-semibold">production-ready, cross-platform solutions</span> that solve real-world problems and deliver measurable business value. Our expert team specializes in <span className="text-white font-semibold">scalable architecture</span> and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FFCA1A]/20 group">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
              </Link>
              <a href="tel:+2349030578667">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#000000] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  <Phone className="w-5 h-5" strokeWidth={3} />
                  <span>Quick Call</span>
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQIntro />

      {/* Newsletter Section */}
      <Newsletter />
    </>
  )
}
