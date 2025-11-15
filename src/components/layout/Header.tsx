'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/faq', label: 'FAQs' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            {/* Please replace this SVG with your actual logo design */}
            <svg 
              className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* This is a placeholder - describe your logo design or provide the SVG code */}
              <circle cx="50" cy="50" r="45" fill="#212121"/>
              <path d="M30 35L50 50L30 65" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45 35L65 50L45 65" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg md:text-2xl font-bold font-display tracking-tight text-gray-900">
              Practicode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 group"
              >
                <span
                  className={cn(
                    'text-[15px] font-medium transition-colors duration-200',
                    pathname === link.href
                      ? 'text-[#FFCA1A]'
                      : 'text-gray-700 group-hover:text-gray-900'
                  )}
                >
                  {link.label}
                </span>
                {/* Animated underline */}
                <span
                  className={cn(
                    'absolute left-4 right-4 bottom-0 h-0.5 bg-[#FFCA1A] transition-all duration-300 ease-out origin-left',
                    pathname === link.href
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Explore Programs Button */}
            <Link
              href="/courses"
              className="inline-flex px-4 md:px-8 py-2 md:py-3 text-xs md:text-sm font-medium bg-[#FFCA1A] text-[#212121] rounded-full transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            >
              Explore Programs
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          />
        )}

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            'fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-end p-4 border-b border-gray-100">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'text-[15px] font-medium transition-all duration-200 px-4 py-3 rounded-lg',
                      pathname === link.href
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="p-4 border-t border-gray-100">
              <Link
                href="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center px-8 py-3 text-base font-bold bg-[#FFCA1A] text-[#212121] rounded-full transition-colors hover:opacity-90"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
