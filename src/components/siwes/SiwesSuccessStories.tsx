'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, ExternalLink, Play, Quote } from 'lucide-react'

const students = [
  {
    name: 'David Adeyemi',
    degree: 'B.Sc. Computer Science',
    school: 'University of Ibadan',
    quote:
      'The practical classes, weekly assignments, and project-based learning helped me gain confidence in web development. By the end of the program, I had a portfolio project I could proudly showcase during interviews.',
    project: 'Student Result Management System',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'ASP.NET Core', 'SQL Server'],
    github: 'https://github.com/davidadeyemi/student-result-system',
    live: 'https://studentresult.practicode.tech',
    demo: 'https://youtube.com/watch?v=xxxxxxxxxxx',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    accentBg: 'bg-blue-600',
  },
  {
    name: 'Zainab Adio',
    degree: 'B.Sc. Information Technology',
    school: 'University of Ilorin',
    quote:
      'I wanted a SIWES placement where I could actually learn. Every class was practical, and the instructors were always willing to help. I now understand how real software projects are built from start to finish.',
    project: 'Hospital Appointment Booking System',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'MySQL'],
    github: 'https://github.com/zainabadio/hospital-booking',
    live: 'https://hospital.practicode.tech',
    demo: 'https://youtube.com/watch?v=xxxxxxxxxxx',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    accentBg: 'bg-rose-600',
  },
  {
    name: 'Michael Ogunleye',
    degree: 'B.Sc. Software Engineering',
    school: 'Lead City University',
    quote:
      'The Capstone Project challenged me to think like a software engineer. I learned version control with GitHub and gained practical experience I couldn\'t get from classroom lectures alone.',
    project: 'Inventory Management System',
    stack: ['React', 'Tailwind CSS', 'ASP.NET Core Web API', 'PostgreSQL'],
    github: 'https://github.com/michaelogunleye/inventory-system',
    live: 'https://inventory.practicode.tech',
    demo: 'https://youtube.com/watch?v=xxxxxxxxxxx',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    accentBg: 'bg-violet-600',
  },
  {
    name: 'Esther Adebayo',
    degree: 'B.Sc. Computer Engineering',
    school: 'LAUTECH',
    quote:
      'The instructors made learning enjoyable by focusing on practical exercises. The weekly assignments kept me engaged, and completing my project gave me the confidence to pursue software development professionally.',
    project: 'E-Commerce Website',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Firebase'],
    github: 'https://github.com/estheradebayo/ecommerce-project',
    live: 'https://shop.practicode.tech',
    demo: 'https://youtube.com/watch?v=xxxxxxxxxxx',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    accentBg: 'bg-emerald-600',
  },
  {
    name: 'Samuel Akinola',
    degree: 'B.Sc. Information Systems',
    school: 'University of Lagos',
    quote:
      'Practicode Academy gave me a structured learning experience. The instructors reviewed my code and encouraged me to improve. The experience prepared me for future internships and software engineering roles.',
    project: 'Hotel Reservation System',
    stack: ['HTML', 'CSS', 'JavaScript', 'ASP.NET Core MVC', 'SQL Server'],
    github: 'https://github.com/samuelakinola/hotel-reservation',
    live: 'https://hotel.practicode.tech',
    demo: 'https://youtube.com/watch?v=xxxxxxxxxxx',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    accentBg: 'bg-amber-600',
  },
]

export default function SiwesSuccessStories() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      {/* Full-width header — aligned to navbar width */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2"
            >
              Alumni Projects
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Student Success Stories
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base max-w-sm leading-relaxed md:text-right"
          >
            Every student builds a real Capstone Project. Here&apos;s what past students shipped.
          </motion.p>
        </div>

        {/* Card grid — 1 col mobile, 2 col md, 3 col lg */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {students.map((student, i) => (
            <motion.article
              key={student.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Card top — accent bar + student identity */}
              <div className="px-6 pt-6 pb-5">
                <div className="flex items-center gap-4 mb-5">
                  {/* Photo */}
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                    <Image
                      src={student.photo}
                      alt={student.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{student.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{student.degree}</p>
                    <p className="text-gray-400 text-xs truncate">{student.school}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-5 h-5 text-[#FFCA1A] mb-2 opacity-80" />
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {student.quote}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-gray-100" />

              {/* Project info */}
              <div className="px-6 py-5 flex-1 flex flex-col gap-4">
                <div>
                  <p className="text-[#FFCA1A] text-[10px] font-bold uppercase tracking-widest mb-1">
                    Capstone Project
                  </p>
                  <h4 className="font-bold text-gray-900 text-base leading-snug">{student.project}</h4>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {student.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="px-6 pb-6 flex items-center gap-2 mt-auto">
                <a
                  href={student.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={student.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-[#FFCA1A] text-gray-900 text-xs font-bold hover:bg-[#FFD700] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Project
                </a>
                <a
                  href={student.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Demo video"
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <Play className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Become our next — full width callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-3xl bg-[#000000] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #FFCA1A 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative z-10">
            <p className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2">Your turn</p>
            <h3 className="text-xl md:text-2xl font-bold text-white">Become Our Next Success Story</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-lg leading-relaxed">
              Your three-month SIWES can be the beginning of your professional career. The next student featured here could be you.
            </p>
          </div>
          <a
            href="/contact"
            className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#FFCA1A] text-gray-900 font-bold text-sm rounded-full hover:bg-[#FFD700] transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            Register for SIWES
          </a>
        </motion.div>
      </div>
    </section>
  )
}



