'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail, MapPin, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import FAQIntro from '@/components/ui/FAQIntro'
import Newsletter from '@/components/ui/Newsletter'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Validate individual field
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        return undefined
      default:
        return undefined
    }
  }

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}
    
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.message = validateField('message', formData.message)
    
    setErrors(newErrors)
    
    // Return true if no errors
    return !Object.values(newErrors).some(error => error !== undefined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    
    if (error) {
      setErrors({
        ...errors,
        [name]: error
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus(null)

    // Validate form before submitting
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 py-6 px-6 md:px-12 lg:px-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[#000000] hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Contact Us</span>
        </Link>
        <div className="text-xs text-gray-500 mt-1 ml-7">
          Home / Contact Us
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#FFCA1A] rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#000000]" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-600 text-sm">
                We&apos;d love to hear from you. Use the form below to reach out for anything you&apos;d like to talk about.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-[#FFCA1A] focus:border-transparent'
                  }`}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-500 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your.email@example.com"
                  className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-[#FFCA1A] focus:border-transparent'
                  }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-500 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell us what's on your mind…"
                  rows={4}
                  className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none text-sm ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-[#FFCA1A] focus:border-transparent'
                  }`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-500 text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  ✓ Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  ✗ Failed to send message. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#FFCA1A] hover:bg-[#ffc107] text-[#000000] font-bold rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-sm"
              >
                Send Message
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-[#FFCA1A] text-[#000000] text-xs font-semibold rounded-full mb-3">
                REACH OUT
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-3">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-600 text-sm">
                Feel free to reach out for any enquiry or conversation. Our team is always open to hearing from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {/* Call Us */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-[#FFCA1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000000] mb-1 text-sm">Call Us</h3>
                    <p className="text-gray-600 text-sm">+234 707 277 8657</p>
                    <p className="text-gray-600 text-sm">+234 903 057 8667</p>
                  </div>
                </div>
              </motion.div>

              {/* Visit Us */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-[#FFCA1A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000000] mb-1 text-sm">Visit Us</h3>
                    <p className="text-gray-600 text-sm">7B Oba Olagbegi, Old Bodija, Ibadan, Nigeria</p>
                  </div>
                </div>
              </motion.div>

              {/* Email Us */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-[#FFCA1A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#000000] mb-1 text-sm">Email Us</h3>
                    <p className="text-gray-600 text-sm">practicodeacademy@gmail.com</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Google Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-[#FFCA1A] text-[#000000] text-sm font-semibold rounded-full mb-4">
              LOCATE US
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
              Get to Us Directly
            </h2>
            <p className="text-gray-600">
              Using the Google Map Below
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[500px] max-w-6xl mx-auto"
          >
            <iframe
              title="Practicode Academy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.5!2d3.9!3d7.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjQnMDAuMCJOIDPCsDU0JzAwLjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQIntro />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}
