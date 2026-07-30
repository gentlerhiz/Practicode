'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Tag } from 'lucide-react'
import { homepageFeaturedProducts } from '@/data/storeProducts'

const trustItems = [
  { icon: ShieldCheck, text: 'Quality Inspected' },
  { icon: Truck, text: 'Nationwide Delivery' },
  { icon: Tag, text: 'Student Prices' },
]

export default function HomeStoreSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2"
            >
              Practicode Store
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Tech Products for Every{' '}
              <span className="relative inline-block">
                Developer
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFCA1A]/30 -z-10 rounded-sm" />
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#000000] text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              Visit the Store
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Product preview grid — sourced from storeProducts data file */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {homepageFeaturedProducts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href="/store"
                className="group block bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image — no badge */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Category pill only */}
                  <span className="absolute top-3 right-3 text-[10px] font-medium bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{item.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.shortDesc}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-xl font-black text-gray-900">{item.price}</p>
                    <p className="text-[10px] text-[#FFCA1A] font-semibold mt-0.5 flex items-center gap-1 justify-end group-hover:gap-2 transition-all">
                      View
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  )
}
