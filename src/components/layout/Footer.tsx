import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  programs: [
    { label: 'Web Development', href: '/courses#web-development' },
    { label: 'Data Analytics', href: '/courses#data-analytics' },
    { label: 'UI/UX Design', href: '/courses#ui-ux-design' },
    { label: 'Digital Marketing', href: '/courses#digital-marketing' },
  ],
  services: [
    { label: 'Internship', href: '/internship' },
    { label: 'Mentorship', href: '/mentorship' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Corporate Training', href: '/solutions#training' },
  ],
  resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/practicode', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/practicode', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/practicode', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/practicode', label: 'LinkedIn' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-red via-primary-orange to-primary-amber rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl md:text-2xl font-bold font-display">
                Practi<span className="text-primary-red">code</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering individuals and businesses with practical technology skills, mentorship, and digital solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-amber flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  7B Oba Olagbegi, Old Bodija, Ibadan, Nigeria
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-amber flex-shrink-0" />
                <a 
                  href="mailto:practicodeacademy@gmail.com" 
                  className="text-sm text-gray-400 hover:text-primary-amber transition-colors"
                >
                  practicodeacademy@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-amber flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <a href="tel:+2347072778657" className="hover:text-primary-amber transition-colors">
                    +234 707 277 8657
                  </a>
                  {' / '}
                  <a href="tel:+2349030578667" className="hover:text-primary-amber transition-colors">
                    +234 903 057 8667
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-amber transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {currentYear} Practicode Academy. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-red flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
