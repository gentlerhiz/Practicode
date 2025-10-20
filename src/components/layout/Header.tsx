'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
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
  const { theme, toggleTheme, mounted } = useTheme()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-primary-black/80 backdrop-blur-lg">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* Light mode - black logo, Dark mode - yellow logo */}
            <Image
              src="/images/blacklogo.png"
              alt="Practicode Logo"
              width={28}
              height={28}
              className="dark:hidden object-contain"
            />
            <Image
              src="/images/yellowlogo.png"
              alt="Practicode Logo"
              width={28}
              height={28}
              className="hidden dark:block object-contain"
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
                    : 'text-gray-700 dark:text-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            )}

            {/* CTA Button */}
            <Link
              href="/courses"
              className="hidden md:inline-flex btn-primary text-sm"
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                      ? 'text-primary-red bg-yellow-50 dark:bg-yellow-950'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/courses"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mx-4"
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
