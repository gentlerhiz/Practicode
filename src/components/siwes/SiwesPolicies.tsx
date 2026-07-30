'use client'

import { motion } from 'framer-motion'
import { CalendarCheck2, Clock4, ClipboardCheck, Bell } from 'lucide-react'

const attendancePoints = [
  'Attend classes regularly.',
  'Arrive on time.',
  'Participate actively.',
  'Complete assignments before deadlines.',
  'Submit projects as required.',
]

const scheduleItems = [
  'Class days',
  'Class times',
  'Orientation',
  'Venue (if applicable)',
  'Other announcements',
]

export default function SiwesPolicies() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-3"
          >
            Policies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Attendance & Class Schedule
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Attendance card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-[#000000] p-8 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFCA1A]/10 flex items-center justify-center">
                <CalendarCheck2 className="w-6 h-6 text-[#FFCA1A]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Attendance Policy</h3>
                <p className="text-gray-400 text-sm">Attendance is very important.</p>
              </div>
            </div>
            <ul className="space-y-3">
              {attendancePoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FFCA1A]/20 flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-3 h-3 text-[#FFCA1A]" />
                  </div>
                  <span className="text-gray-300 text-sm">{point}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-gray-500 text-sm border-t border-white/10 pt-4">
              Consistent attendance and participation are necessary for successful completion of the program.
            </p>
          </motion.div>

          {/* Schedule card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Clock4 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Class Schedule</h3>
                <p className="text-gray-500 text-sm">Shared before resumption</p>
              </div>
            </div>
            <div className="rounded-2xl bg-yellow-50 border border-[#FFCA1A]/30 p-4 mb-5">
              <div className="flex gap-2 items-start">
                <Bell className="w-5 h-5 text-[#FFCA1A] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">
                  The official class timetable will be shared with students <strong>before resumption</strong>. Students are advised to keep communication channels open.
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 font-medium">Important updates will include:</p>
            <ul className="space-y-2">
              {scheduleItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA1A] flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



