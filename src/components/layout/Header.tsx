'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavLink = {
  href?: string
  label: string
  dropdown?: Array<{
    href?: string
    label: string
    subDropdown?: Array<{
      href: string
      label: string
      external?: boolean
    }>
  }>
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/solutions', label: 'Solutions' },
  {
    label: 'Resources',
    dropdown: [
      { href: '/resources', label: 'Resources' },
      { href: '/blog', label: 'Blogs' },
      { href: '/faq', label: 'FAQs' },
      {
        label: 'Social Media',
        subDropdown: [
          { href: 'https://wa.me/message/UH5NCJFO6OAFI1', label: 'WhatsApp', external: true },
          { href: 'https://www.instagram.com/practicode_academy?igsh=bHd4MWc5c3M5aXhm&utm_source=qr', label: 'Instagram', external: true },
          { href: 'https://www.linkedin.com', label: 'LinkedIn', external: true },
        ]
      }
    ]
  },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({})
  const [mobileSubDropdowns, setMobileSubDropdowns] = useState<{ [key: string]: boolean }>({})
  const pathname = usePathname()

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const toggleMobileSubDropdown = (label: string) => {
    setMobileSubDropdowns(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 md:space-x-1 group">
            {/* Please replace this SVG with your actual logo design */}
            
            <div className="w-5 h-5 md:w-[30px] md:h-[30px] relative">
              <Image
                src="/images/yellowlogo.png"
                alt="Practicode Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg md:text-2xl font-normal tracking-wide text-[#000000]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              PractiCode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => {
                  setActiveDropdown(null)
                  setActiveSubDropdown(null)
                }}
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 group block"
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
                ) : (
                  <button
                    className="relative px-4 py-2 group flex items-center gap-1"
                  >
                    <span
                      className={cn(
                        'text-[15px] font-medium transition-colors duration-200',
                        activeDropdown === link.label
                          ? 'text-[#FFCA1A]'
                          : 'text-gray-700 group-hover:text-gray-900'
                      )}
                    >
                      {link.label}
                    </span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      activeDropdown === link.label ? "rotate-180 text-[#FFCA1A]" : "text-gray-700 group-hover:text-gray-900"
                    )} />
                  </button>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-lg border-t-0 border-l border-r border-b border-gray-200 py-2 z-50">
                    {link.dropdown.map((item) => (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={() => item.subDropdown && setActiveSubDropdown(item.label)}
                        onMouseLeave={() => !item.subDropdown && setActiveSubDropdown(null)}
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="block px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-[#FFCA1A] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            className="w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-[#FFCA1A] transition-colors"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}

                        {/* Sub-Dropdown Menu */}
                        {item.subDropdown && activeSubDropdown === item.label && (
                          <div className="absolute left-full top-0 w-48 bg-white shadow-lg border border-gray-200 py-2 z-50">
                            {item.subDropdown.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                target={subItem.external ? "_blank" : undefined}
                                rel={subItem.external ? "noopener noreferrer" : undefined}
                                className="block px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-[#FFCA1A] transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                  <div key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          'text-[15px] font-medium transition-all duration-200 px-4 py-3 rounded-lg block',
                          pathname === link.href
                            ? 'text-gray-900 bg-gray-100'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleMobileDropdown(link.label)}
                          className="w-full flex items-center justify-between text-[15px] font-medium transition-all duration-200 px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            mobileDropdowns[link.label] && "rotate-180"
                          )} />
                        </button>

                        {/* Mobile Dropdown */}
                        {link.dropdown && mobileDropdowns[link.label] && (
                          <div className="ml-4 mt-1 space-y-1">
                            {link.dropdown.map((item) => (
                              <div key={item.label}>
                                {item.href ? (
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-[14px] font-medium text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <div>
                                    <button
                                      onClick={() => toggleMobileSubDropdown(item.label)}
                                      className="w-full flex items-center justify-between text-[14px] font-medium text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                      <span>{item.label}</span>
                                      <ChevronDown className={cn(
                                        "w-3.5 h-3.5 transition-transform duration-200",
                                        mobileSubDropdowns[item.label] && "rotate-180"
                                      )} />
                                    </button>

                                    {/* Mobile Sub-Dropdown */}
                                    {item.subDropdown && mobileSubDropdowns[item.label] && (
                                      <div className="ml-4 mt-1 space-y-1">
                                        {item.subDropdown.map((subItem) => (
                                          <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            target={subItem.external ? "_blank" : undefined}
                                            rel={subItem.external ? "noopener noreferrer" : undefined}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-[13px] font-medium text-gray-500 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                          >
                                            {subItem.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
