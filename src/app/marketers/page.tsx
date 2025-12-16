'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Users, 
  BookOpen, 
  Briefcase, 
  Lightbulb,
  Target,
  DollarSign,
  FileText,
  ExternalLink,
  Download,
  MessageCircle,
  CheckCircle,
  Rocket,
  Globe,
  Calendar,
  GraduationCap
} from 'lucide-react'

export default function MarketersPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Scalable Earnings",
      description: "Earn 20-30% commission per student enrolled. No cap on your earnings potential."
    },
    {
      icon: Briefcase,
      title: "Work Experience",
      description: "Build your marketing portfolio with real campaigns and measurable results."
    },
    {
      icon: Lightbulb,
      title: "Free Resources",
      description: "Access all our marketing materials, course previews, and training content."
    },
    {
      icon: Target,
      title: "Bonus Rewards",
      description: "Special bonuses and incentives for top performers (5+ enrollments)."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a network of marketers with shared tips, strategies, and wins."
    },
    {
      icon: GraduationCap,
      title: "Skill Development",
      description: "Learn digital marketing, sales, and communication skills on the job."
    }
  ]

  const expectations = [
    "Share course information and marketing materials on your social media platforms",
    "Engage with interested prospects and answer basic questions about the academy",
    "Guide students through the registration process using your unique referral link",
    "Collect payment confirmations and submit them to admin for verification",
    "Maintain professional communication and represent Practicode values",
    "Provide feedback on marketing campaigns and student concerns"
  ]

  const faqs = [
    {
      question: "How do I get paid?",
      answer: "Commission is calculated once a student's payment is verified. Payouts are made monthly via bank transfer. You'll receive a detailed commission report before each payout."
    },
    {
      question: "What if a student pays in installments?",
      answer: "Your commission is calculated on the total amount paid. For installment payments, you receive your commission after the full payment is completed and verified."
    },
    {
      question: "Can I market multiple courses?",
      answer: "Yes! You can promote all our courses: Responsive Web Design, Javascript for Web Development, Data Analysis, UI/UX Design, Python Programming for Machine Learning, and Graphics Design. Each successful enrollment earns you commission."
    },
    {
      question: "How do I track my referrals?",
      answer: "When students use your personalized registration link, their referrals are automatically tracked. You can also ask students to mention your name/code when registering."
    },
    {
      question: "What materials do you provide?",
      answer: "We provide course flyers, social media captions, sample scripts, promotional videos, course outlines, and personalized registration links. All materials are ready to use."
    },
    {
      question: "Do I need marketing experience?",
      answer: "No! We provide all the training and materials you need. If you're passionate, willing to learn, and have a network, you can succeed."
    },
    {
      question: "How long does onboarding take?",
      answer: "Onboarding is instant. Once you join the WhatsApp group and receive your personalized link, you can start promoting immediately."
    },
    {
      question: "Can I work from anywhere?",
      answer: "Absolutely! This is 100% remote. You can market from anywhere in Nigeria or beyond, as long as you have internet access."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 w-full h-full opacity-[0.03]">
          <Image
            src="/images/Home/heroImg.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCA1A]/20 rounded-full text-gray-900 text-sm font-semibold"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Earn While You Grow</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Become a <span className="relative inline-block">Practicode<span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A] -z-10 rounded-sm"></span></span> Marketer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Join our Marketing Associates Program and earn <span className="font-bold text-gray-900">20-30% commission</span> for every student you enroll. No experience needed—just passion and commitment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="https://wa.me/2347072778657?text=Hi%2C%20I%27d%20like%20to%20join%20the%20Practicode%20Marketers%20Program" className="group">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-gray-900 bg-[#FFCA1A] rounded-full transition-all duration-300 group-hover:scale-105 hover:bg-[#FFD700] shadow-xl">
                  <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span>Join via WhatsApp</span>
                </button>
              </Link>

              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfhlXhMQXcCunolUQAQiAzdhGV8-gLIXadslJ5HZ71NRcZU9Q/viewform" className="group" target="_blank">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-full transition-all duration-300 group-hover:border-gray-300 hover:bg-gray-50 group-hover:scale-105">
                  <FileText className="w-5 h-5" strokeWidth={2.5} />
                  <span>View Registration Form</span>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Practicode Academy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About Practicode Academy
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are a <span className="font-semibold text-gray-900">technology training and career development academy</span> focused on practical, project-based learning. Our mission is to train students to become <span className="font-semibold text-gray-900">job-ready tech professionals</span> through hands-on experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 text-center">
                <Rocket className="w-12 h-12 text-emerald-600 mx-auto mb-3" strokeWidth={2} />
                <h3 className="font-bold text-gray-900 mb-2">Hands-On Projects</h3>
                <p className="text-sm text-gray-600">Real-world problem solving, not just theory</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-6 text-center">
                <Briefcase className="w-12 h-12 text-yellow-600 mx-auto mb-3" strokeWidth={2} />
                <h3 className="font-bold text-gray-900 mb-2">Industry-Relevant</h3>
                <p className="text-sm text-gray-600">Curriculum aligned with job market demands</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 text-center">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" strokeWidth={2} />
                <h3 className="font-bold text-gray-900 mb-2">Physical + Virtual</h3>
                <p className="text-sm text-gray-600">Learn onsite in Ibadan or online from anywhere</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link href="/about" className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all duration-300">
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Courses You will Promote
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer two categories: <span className="font-bold text-gray-900">Cohort Courses</span> (your primary focus) and <span className="font-bold text-gray-900">Micro Courses</span> (secondary).
              </p>
            </motion.div>

            {/* Cohort Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Cohort Courses (Primary Focus)</h3>
                    <p className="text-sm text-gray-600">3-month intensive programs</p>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Course Fee</p>
                      <p className="text-3xl font-bold text-gray-900">₦80,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Your Commission (20-30%)</p>
                      <p className="text-3xl font-bold text-emerald-600">₦16,000 - ₦24,000</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">📌 Responsive Web Design</h4>
                    <p className="text-sm text-gray-600">HTML5, CSS3, Flexbox, Grid & Mobile-First Design</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">⚡ Javascript for Web Development</h4>
                    <p className="text-sm text-gray-600">ES6+, DOM Manipulation, React & Async Programming</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">📊 Data Analysis</h4>
                    <p className="text-sm text-gray-600">Excel, SQL, Python, Power BI & Data Visualization</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">🎨 UI/UX Design</h4>
                    <p className="text-sm text-gray-600">Figma, Wireframing, Prototyping & User Research</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">🤖 Python Programming for ML</h4>
                    <p className="text-sm text-gray-600">Python, NumPy, Pandas & Machine Learning</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 mb-2">🖼️ Graphics Design</h4>
                    <p className="text-sm text-gray-600">Photoshop, Illustrator, InDesign & Brand Identity</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Micro Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-yellow-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Micro Courses (Secondary)</h3>
                    <p className="text-sm text-gray-600">Short, focused skill-building courses</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700">
                    <span className="font-bold">Micro courses</span> are shorter, topic-specific courses (e.g., Excel for Beginners, Intro to Python). They are secondary priorities but still earn you commission. Pricing varies per course.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <Link href="/courses" className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all duration-300">
                <span>View All Course Details</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Join Our Program?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Earn money, build your resume, and gain valuable marketing experience—all while helping people change their lives through tech education.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-[#FFCA1A]/20 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expectations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What We Expect From You
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your role is crucial to making our next cohort a success. Here is what we need from you:
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {expectations.map((expectation, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100">
                  <div className="w-6 h-6 bg-[#FFCA1A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-gray-900" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-700">{expectation}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Marketing Materials & Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide everything you need to succeed. No guesswork, no extra costs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfhlXhMQXcCunolUQAQiAzdhGV8-gLIXadslJ5HZ71NRcZU9Q/viewform" target="_blank" className="block group">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Student Registration Form</h3>
                    <p className="text-gray-700 mb-4">Official form for enrolling students. Payment mode and referral tracking included.</p>
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      <span>Open Form</span>
                      <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="https://drive.google.com/drive/folders/1vdr3n8jv5nQEyoz1KmEL3fIjyK_x_5-u" target="_blank" className="block group">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Download className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Marketing Materials Folder</h3>
                    <p className="text-gray-700 mb-4">Flyers, captions, videos, course outlines, sample scripts, and more—all ready to use.</p>
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                      <span>Access Drive</span>
                      <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What is Included in the Materials</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>Course flyers (portrait & square formats for all platforms)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>WhatsApp & social media captions (short, long, and story formats)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>Promotional videos & reels (15-30 second teasers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>Course outlines & curriculum summaries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>Sample sales scripts & conversation guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>Your personalized referral link for tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about the Marketers Program
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Reach out to us via the contact form or message any admin on the WhatsApp community.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="group">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-full transition-all duration-300 group-hover:border-gray-300 hover:bg-gray-50">
                    <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                    <span>Contact Form</span>
                  </button>
                </Link>
                <Link href="https://wa.me/2347072778657" target="_blank" className="group">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-gray-900 bg-[#FFCA1A] rounded-full transition-all duration-300 group-hover:bg-[#FFD700]">
                    <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                    <span>WhatsApp Admin</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to Start Earning?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join our WhatsApp group now and get instant access to all marketing materials, your personalized link, and start earning commissions today.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="https://wa.me/2347072778657?text=Hi%2C%20I%27d%20like%20to%20join%20the%20Practicode%20Marketers%20Program" className="group">
                  <button className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-bold text-gray-900 bg-[#FFCA1A] rounded-full transition-all duration-300 group-hover:scale-105 hover:bg-[#FFD700] shadow-xl">
                    <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                    <span>Join via WhatsApp</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                  </button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 text-gray-300 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span>No signup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span>Instant onboarding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                  <span>Full support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
