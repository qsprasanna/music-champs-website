'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, BookKey, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '@/config/nav';
import { useLeadModal } from '../leads/LeadModalContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openLead } = useLeadModal();

  const handleBookDemo = () => {
    openLead('demo');
    setMobileOpen(false);
  };

  return (
    <m.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-white px-10 pt-8 pb-2 lg:px-20"
    >
      <nav className="flex items-center justify-between rounded-3xl border-2 border-red-300 bg-gradient-to-r from-white via-white to-red-50 px-8 py-4 shadow-sm">
        <Link href="/" className="shrink-0">
          <Image
            src="/music-champs-logo.png"
            alt="Music Champs Logo"
            width={110}
            height={45}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="rounded-lg px-4 py-2 text-base font-medium text-neutral-700 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          {/* ✅ Fix: asChild + Link so it navigates to /contact-us */}
          <Button variant="nav-outline" size="sm">
            <Link href="/contact-us" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Us
            </Link>
          </Button>

          {/* ✅ opens lead modal */}
          <Button
            variant="nav-solid"
            size="sm"
            onClick={() => openLead('demo')}
          >
            <BookKey className="h-4 w-4" />
            Book a Demo
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="p-2 text-neutral-700 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-2 mt-2 flex flex-col gap-2 rounded-2xl border border-red-100 bg-white p-4 shadow-lg md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-all hover:bg-red-50 hover:text-red-500"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 flex flex-wrap gap-2 border-t border-red-50 pt-2">
            {/* ✅ Fix: asChild + Link, closes menu on tap */}
            <Button variant="nav-outline">
              <Link
                href="/contact-us"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <Phone className="h-4 w-4" /> Contact Us
              </Link>
            </Button>

            {/* ✅ Fix: onClick wired, closes menu before opening modal */}
            <Button variant="nav-solid" onClick={handleBookDemo}>
              <BookKey className="h-4 w-4" /> Book a Demo
            </Button>
          </div>
        </m.div>
      )}
    </m.header>
  );
}
