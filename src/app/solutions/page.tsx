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
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
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
              Practical Business Solutions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              From small business automation to enterprise-grade systems, we deliver <span className="font-semibold text-[#000000]">affordable, production-ready solutions</span> that solve real-world problems
            </p>
          </motion.div>

          {/* Category: Practical Business Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-[#FFCA1A] rounded-full"></div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#000000]">
                Practical Business Solutions
              </h3>
              <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-4xl mb-10">
              Affordable, easy-to-use solutions designed specifically for small businesses, schools, clinics, and retail shops in Nigeria
            </p>
          </motion.div>

          {/* Solutions - Alternating Two Column Layout */}
          <div className="space-y-12">
            {solutions.slice(0, 7).map((solution, index) => {
              const accentColors = [
                { border: 'border-blue-400', badge: 'bg-blue-50 text-blue-700 border-blue-200', accent: 'bg-blue-500', hover: 'hover:border-blue-500' },
                { border: 'border-emerald-400', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: 'bg-emerald-500', hover: 'hover:border-emerald-500' },
                { border: 'border-amber-400', badge: 'bg-amber-50 text-amber-700 border-amber-200', accent: 'bg-amber-500', hover: 'hover:border-amber-500' },
                { border: 'border-purple-400', badge: 'bg-purple-50 text-purple-700 border-purple-200', accent: 'bg-purple-500', hover: 'hover:border-purple-500' },
                { border: 'border-pink-400', badge: 'bg-pink-50 text-pink-700 border-pink-200', accent: 'bg-pink-500', hover: 'hover:border-pink-500' },
                { border: 'border-cyan-400', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200', accent: 'bg-cyan-500', hover: 'hover:border-cyan-500' },
                { border: 'border-orange-400', badge: 'bg-orange-50 text-orange-700 border-orange-200', accent: 'bg-orange-500', hover: 'hover:border-orange-500' },
              ]
              const colors = accentColors[index % accentColors.length]
              
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`group grid md:grid-cols-2 gap-0 items-center border-2 ${colors.border} ${colors.hover} rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500`}>
                    {/* Image Column */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative h-full`}>
                      <div className="relative h-72 md:h-full min-h-[420px] overflow-hidden">
                        <Image 
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                        {/* Category Badge on Image */}
                        <div className="absolute top-6 left-6">
                          <div className={`px-4 py-2 ${colors.badge} backdrop-blur-sm border rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                            {solution.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Column */}
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''} p-8 lg:p-12`}>
                      <div className="space-y-6">
                      {/* Small Accent Line */}
                      <div className={`h-1 w-16 ${colors.accent} rounded-full`}></div>

                      <h3 className="text-3xl lg:text-4xl font-bold text-[#000000] leading-tight">
                        {solution.title}
                      </h3>
                      
                      <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                        {solution.description}
                      </p>
                      
                      {/* Features */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#FFCA1A]" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {solution.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 group/item">
                              <div className="w-5 h-5 rounded-full bg-[#FFCA1A] flex items-center justify-center mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                <CheckCircle className="w-3 h-3 text-[#000000]" strokeWidth={3} />
                              </div>
                              <span className="text-sm text-gray-700 leading-relaxed font-medium">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {solution.technologies.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-[#FFCA1A] hover:text-[#000000] transition-all duration-300 border border-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {solution.technologies.length > 4 && (
                            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold">
                              +{solution.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="pt-3">
                        <Link href="/contact">
                          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold text-base rounded-xl hover:bg-[#FFD700] hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn shadow-lg">
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
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

          {/* Divider Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-20 py-16 bg-gradient-to-r from-[#FFCA1A]/5 via-[#FFCA1A]/10 to-[#FFCA1A]/5 rounded-3xl"
          >
            <div className="text-center max-w-3xl mx-auto px-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFCA1A] rounded-full mb-6">
                <Zap className="w-5 h-5 text-[#000000]" strokeWidth={3} />
                <span className="text-sm font-bold text-[#000000] uppercase tracking-wider">Enterprise Solutions</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
                Advanced Technology Solutions
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                For larger organizations and businesses ready to scale, we offer enterprise-grade solutions with cutting-edge technology and unlimited scalability
              </p>
            </div>
          </motion.div>

          {/* Category: Enterprise Tech Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#000000]">
                Enterprise Technology Solutions
              </h3>
              <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-4xl mb-10">
              Scalable, enterprise-grade solutions for businesses ready to leverage AI, cloud infrastructure, and modern software architecture
            </p>
          </motion.div>

          {/* Enterprise Solutions Grid */}
          <div className="space-y-12">
            {solutions.slice(7).map((solution, index) => {
              const actualIndex = index + 7
              const accentColors = [
                { border: 'border-indigo-400', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', accent: 'bg-indigo-500', hover: 'hover:border-indigo-500' },
                { border: 'border-violet-400', badge: 'bg-violet-50 text-violet-700 border-violet-200', accent: 'bg-violet-500', hover: 'hover:border-violet-500' },
                { border: 'border-fuchsia-400', badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', accent: 'bg-fuchsia-500', hover: 'hover:border-fuchsia-500' },
                { border: 'border-rose-400', badge: 'bg-rose-50 text-rose-700 border-rose-200', accent: 'bg-rose-500', hover: 'hover:border-rose-500' },
                { border: 'border-teal-400', badge: 'bg-teal-50 text-teal-700 border-teal-200', accent: 'bg-teal-500', hover: 'hover:border-teal-500' },
                { border: 'border-sky-400', badge: 'bg-sky-50 text-sky-700 border-sky-200', accent: 'bg-sky-500', hover: 'hover:border-sky-500' },
                { border: 'border-lime-400', badge: 'bg-lime-50 text-lime-700 border-lime-200', accent: 'bg-lime-500', hover: 'hover:border-lime-500' },
                { border: 'border-red-400', badge: 'bg-red-50 text-red-700 border-red-200', accent: 'bg-red-500', hover: 'hover:border-red-500' },
              ]
              const colors = accentColors[index % accentColors.length]
              
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`group grid md:grid-cols-2 gap-0 items-center border-2 ${colors.border} ${colors.hover} rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500`}>
                    {/* Image Column */}
                    <div className={`${actualIndex % 2 === 1 ? 'md:order-2' : ''} relative h-full`}>
                      <div className="relative h-72 md:h-full min-h-[420px] overflow-hidden">
                        <Image 
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                        {/* Category Badge on Image */}
                        <div className="absolute top-6 left-6">
                          <div className={`px-4 py-2 ${colors.badge} backdrop-blur-sm border rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                            {solution.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Column */}
                    <div className={`${actualIndex % 2 === 1 ? 'md:order-1' : ''} p-8 lg:p-12`}>
                      <div className="space-y-6">
                      {/* Small Accent Line */}
                      <div className={`h-1 w-16 ${colors.accent} rounded-full`}></div>

                      <h3 className="text-3xl lg:text-4xl font-bold text-[#000000] leading-tight">
                        {solution.title}
                      </h3>
                      
                      <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                        {solution.description}
                      </p>
                      
                      {/* Features */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#FFCA1A]" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {solution.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 group/item">
                              <div className="w-5 h-5 rounded-full bg-[#FFCA1A] flex items-center justify-center mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                <CheckCircle className="w-3 h-3 text-[#000000]" strokeWidth={3} />
                              </div>
                              <span className="text-sm text-gray-700 leading-relaxed font-medium">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <div className="flex flex-wrap gap-2">
                          {solution.technologies.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-[#FFCA1A] hover:text-[#000000] transition-all duration-300 border border-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {solution.technologies.length > 4 && (
                            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold">
                              +{solution.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="pt-3">
                        <Link href="/contact">
                          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFCA1A] text-[#000000] font-bold text-base rounded-xl hover:bg-[#FFD700] hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn shadow-lg">
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
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
