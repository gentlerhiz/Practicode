'use client'

import { motion } from 'framer-motion'
import {
  Laptop, Headphones, Mouse, HardDrive, Shirt,
  Monitor, Zap, Backpack, Frame, Smartphone,
  Coffee, StickerIcon,
} from 'lucide-react'

const categories = [
  { icon: Laptop, label: 'UK Used Laptops', count: '3+', color: 'bg-blue-50 text-blue-600' },
  { icon: Laptop, label: 'Brand New Laptops', count: 'Available', color: 'bg-violet-50 text-violet-600' },
  { icon: Monitor, label: 'Laptop Accessories', count: '5+', color: 'bg-amber-50 text-amber-600' },
  { icon: Mouse, label: 'Wireless Mouse', count: 'In Stock', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Headphones, label: 'Headphones & Earbuds', count: 'In Stock', color: 'bg-rose-50 text-rose-600' },
  { icon: HardDrive, label: 'External Drives & Flash', count: 'In Stock', color: 'bg-cyan-50 text-cyan-600' },
  { icon: Zap, label: 'Power Banks & Speakers', count: 'In Stock', color: 'bg-orange-50 text-orange-600' },
  { icon: Shirt, label: 'Custom T-Shirts & Hoodies', count: 'Made to order', color: 'bg-pink-50 text-pink-600' },
  { icon: Backpack, label: 'Backpacks & Tote Bags', count: 'Available', color: 'bg-teal-50 text-teal-600' },
  { icon: Frame, label: 'Tech Wall Frames', count: 'In Stock', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Coffee, label: 'Water Bottles & Merch', count: 'In Stock', color: 'bg-lime-50 text-lime-600' },
  { icon: Smartphone, label: 'Developer Workspace', count: 'Essentials', color: 'bg-gray-100 text-gray-700' },
]

export default function StoreCategories() {
  return (
    <section className="py-14 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2"
            >
              Browse by Category
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Product Categories
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-right max-w-xs"
          >
            From laptops to customised merch — everything a developer needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.a
                key={cat.label}
                href="#products"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl bg-white border border-gray-100 p-4 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-[#FFCA1A]/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 text-xs font-semibold leading-snug">{cat.label}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{cat.count}</p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
