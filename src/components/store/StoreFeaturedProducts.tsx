'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  X, CheckCircle2, ShoppingBag, MessageCircle,
  Star, ChevronRight, Tag, Zap,
} from 'lucide-react'
import { storeProducts, type Product } from '@/data/storeProducts'

// ─── Product Drawer ────────────────────────────────────────────────────────
function ProductDrawer({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const whatsappMsg = encodeURIComponent(
    `Hi! I'd like to order the ${product.name} (${product.price}). Please confirm availability.`
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative ml-auto w-full max-w-lg h-full bg-white overflow-y-auto shadow-2xl flex flex-col"
        >
          {/* Product image */}
          <div className="relative w-full h-56 bg-gray-100 flex-shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="512px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-5">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                {product.category}
              </span>
              <p className="text-white font-bold text-xl leading-tight mt-0.5">{product.name}</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Price</p>
                <p className="text-3xl font-black text-gray-900">{product.price}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-[#FFCA1A] text-[#FFCA1A]" />
                ))}
              </div>
            </div>

            {/* Short desc */}
            <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-[#FFCA1A] pl-3">
              {product.shortDesc}
            </p>

            {/* Specs */}
            {product.specs && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Specifications</p>
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFCA1A] flex-shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Condition */}
            {product.condition && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Condition</p>
                <div className="space-y-2">
                  {product.condition.map(c => (
                    <div key={c} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-sm text-gray-700">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Features</p>
                <div className="space-y-2">
                  {product.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFCA1A] flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-sm text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Available Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <span key={s} className="px-3 py-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-[#FFCA1A] hover:bg-yellow-50 transition-colors cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Colours */}
            {product.colors && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Available Colours</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <span key={c} className="px-3 py-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quote */}
            {product.quote && (
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-gray-600 text-sm italic">{product.quote}</p>
              </div>
            )}

            {/* Ideal for */}
            {product.idealFor && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Ideal For</p>
                <div className="flex flex-wrap gap-2">
                  {product.idealFor.map(u => (
                    <span key={u} className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky CTA footer */}
          <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100 flex gap-3">
            <a
              href={`https://wa.me/2349030578667?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#FFCA1A] text-gray-900 font-bold rounded-xl hover:bg-[#FFD700] transition-colors text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </a>
            <a
              href="https://wa.me/message/UH5NCJFO6OAFI1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Ask Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Product Card ──────────────────────────────────────────────────────────
function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Category pill — top right only, no badge */}
        <span className="absolute top-3 right-3 text-[10px] font-medium bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{product.name}</h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{product.shortDesc}</p>
        </div>

        {/* Specs preview */}
        {product.specs && (
          <div className="flex flex-wrap gap-1">
            {product.specs.slice(0, 3).map(s => (
              <span key={s} className="text-[10px] font-medium bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-md">
                {s}
              </span>
            ))}
            {product.specs.length > 3 && (
              <span className="text-[10px] font-medium bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded-md">
                +{product.specs.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <p className="text-xl font-black text-gray-900">{product.price}</p>
        <button className="flex items-center gap-1 text-xs font-bold text-[#FFCA1A] group-hover:gap-2 transition-all duration-200">
          View details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────────
export default function StoreFeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section id="products" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#FFCA1A] text-xs font-bold uppercase tracking-[0.22em] mb-2"
            >
              Featured Products
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Shop Our Collection
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <Tag className="w-4 h-4 text-[#FFCA1A]" />
            <span>Click any product to view full details &amp; order</span>
          </motion.div>
        </div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-xl bg-[#000000] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#FFCA1A] flex-shrink-0" />
            <p className="text-white text-sm">
              More products available in store.{' '}
              <span className="text-gray-400">Contact us for unlisted items or custom orders.</span>
            </p>
          </div>
          <a
            href="https://wa.me/message/UH5NCJFO6OAFI1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-xs font-bold text-[#FFCA1A] hover:underline whitespace-nowrap"
          >
            Ask about more →
          </a>
        </motion.div>

        {/* Grid — sourced from storeProducts data file */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {storeProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {/* Drawer */}
      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  )
}
