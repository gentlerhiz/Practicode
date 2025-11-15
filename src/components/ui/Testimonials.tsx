'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'John Ade',
    role: 'Web Development Graduate',
    text: 'Practicode helped me transition from business admin to a successful career in tech!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=b6e3f4'
  },
  {
    name: 'Blessing O.',
    role: 'UI/UX Designer',
    text: 'The mentorship and real projects changed everything.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing&backgroundColor=ffd5dc'
  },
  {
    name: 'Chioma Nwankwo',
    role: 'Data Analyst',
    text: 'I landed my dream job just 2 months after completing the program. The career support was incredible!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma&backgroundColor=c0aede'
  },
  {
    name: 'David Ibrahim',
    role: 'Full Stack Developer',
    text: 'Best investment I made in my career. The hands-on approach made all the difference.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=d1d4f9'
  },
  {
    name: 'Grace Okonkwo',
    role: 'Frontend Developer',
    text: 'The instructors are patient and the curriculum is industry-relevant. Highly recommend!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace&backgroundColor=ffdfbf'
  },
  {
    name: 'Emeka Johnson',
    role: 'Backend Developer',
    text: 'From zero coding knowledge to building full applications. The journey was amazing!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka&backgroundColor=d5f4e6'
  },
  {
    name: 'Fatima Mohammed',
    role: 'Product Designer',
    text: 'The community support and networking opportunities opened so many doors for me.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima&backgroundColor=fec6a1'
  },
  {
    name: 'Samuel Adeyemi',
    role: 'Software Engineer',
    text: 'Practicode gave me the confidence and skills to pursue my tech career. Forever grateful!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel&backgroundColor=b6e3f4'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsPerView >= testimonials.length ? 0 : prev + 1
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [itemsPerView])

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1
    )
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : prev - 1
    )
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Student Success Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Hear From Our Graduates
            </h2>
          </motion.div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-gray-900 flex items-center justify-center transition-all duration-200 shadow-lg"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-gray-900 flex items-center justify-center transition-all duration-200 shadow-lg"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            </button>

            {/* Testimonials Slider */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {visibleTestimonials.map((testimonial, index) => (
                    <div
                      key={currentIndex + index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
                    >
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FFCA1A] text-[#FFCA1A]" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>

                      {/* Avatar and Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => {
                const startIndex = index * itemsPerView
                const isActive = currentIndex >= startIndex && currentIndex < startIndex + itemsPerView
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(startIndex)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 bg-[#FFCA1A]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial set ${index + 1}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
