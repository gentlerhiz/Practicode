'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { MapPin } from 'lucide-react'

export default function SiwesCTA() {
  return (
    <section className="section-padding bg-[#121212] text-white">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-[#FFCA1A] text-xs font-semibold uppercase tracking-[0.24em] mb-3">
              Ready to begin?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start your SIWES journey with Practicode Academy.
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-2xl mb-8">
              Register today to access discounted training, practical sessions, and industrial experience designed to help you learn and shine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Register Now
                </Button>
              </Link>
              <a href="tel:+2349030578667" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/20">
                Call 09030578667
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Program benefits</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3 items-start"><span className="mt-1 text-[#FFCA1A]">•</span>Build a practical IT portfolio.</li>
                <li className="flex gap-3 items-start"><span className="mt-1 text-[#FFCA1A]">•</span>Gain confidence in real-world tools and workflows.</li>
                <li className="flex gap-3 items-start"><span className="mt-1 text-[#FFCA1A]">•</span>Prepare for future employment opportunities.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#FFCA1A]/10 text-[#FFCA1A]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Location</h3>
                  <p className="text-gray-300 leading-relaxed">Practicode Academy, 7B Oba Olagbegi Avenue, Old Bodija, Ibadan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
