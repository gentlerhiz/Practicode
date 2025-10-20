'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/internship', label: 'Internship' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-lg">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/blacklogo.png"
              alt="Practicode Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-xl md:text-2xl font-semibold font-display">
              Practi<span className="text-primary-red">code</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-red',
                  pathname === link.href
                    ? 'text-primary-red'
                    : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Student Login */}
            <Link
              href="/login"
              className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-primary-red transition-colors"
            >
              Student Login
            </Link>

            {/* Get Started Button */}
            <Link
              href="/courses"
              className="hidden md:inline-flex px-5 py-2.5 bg-primary-red hover:bg-yellow-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-primary-red px-4 py-2 rounded-lg',
                    pathname === link.href
                      ? 'text-primary-red bg-yellow-50'
                      : 'text-gray-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-primary-red px-4 py-2"
              >
                Student Login
              </Link>
              <Link
                href="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 px-5 py-2.5 bg-primary-red hover:bg-yellow-600 text-white text-center font-semibold rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
