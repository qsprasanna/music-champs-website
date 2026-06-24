'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { navLinks, socialLinks } from '@/config/nav';

const support = [{ label: 'Contact Us', href: '/contact-us' }];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!email.trim()) return;

    setError('');
    setLoading(true);

    try {
      // ✅ Actually POST to the newsletter API
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Something went wrong');
      }

      setLoading(false);
      setEmail('');
      setSubmitted(true);

      // ✅ startTransition keeps this low-priority — no setTimeout violation
      setTimeout(() => {
        startTransition(() => setSubmitted(false));
      }, 4000);
    } catch (err) {
      setLoading(false);
      setError(
        err instanceof Error ? err.message : 'Failed. Please try again.'
      );
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* Floating Footer Card */}
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-5 mt-10 rounded-3xl border border-red-100 bg-red-50 px-5 py-10 shadow-md sm:mx-10 sm:px-10 lg:mx-20 lg:px-12"
      >
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Logo + Tagline + Socials */}
          <div className="flex flex-col gap-4">
            <Image
              src="/music-champs-logo.png"
              alt="Music Champs"
              width={130}
              height={48}
              className="object-contain"
            />
            <p className="max-w-[210px] text-xs leading-relaxed text-neutral-500">
              Join countless students at Music Champs, where passionate
              instructors ignite musical journeys.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-neutral-500 transition-colors hover:text-red-500"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2 — Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-neutral-900">Links</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium text-neutral-500 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-neutral-900">Support</h4>
            <ul className="flex flex-col gap-2">
              {support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs font-medium text-neutral-500 transition-colors hover:text-red-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-neutral-900">Newsletter</h4>
            <p className="text-xs leading-relaxed text-neutral-500">
              Get the latest news and tips from our instructors.
            </p>

            {/* ✅ onSubmit with e.preventDefault() — no full-page reload */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-center overflow-hidden rounded-xl border-2 border-red-200 bg-white transition-colors focus-within:border-red-400">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="flex-1 bg-transparent px-3 py-2.5 text-xs text-neutral-700 outline-none placeholder:text-neutral-400"
                  aria-label="Email address for newsletter"
                  disabled={loading || submitted}
                  required
                />
                <m.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  disabled={loading || submitted || !email.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-500 transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Subscribe to newsletter"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </m.button>
              </div>
            </form>

            {/* Success */}
            {submitted && (
              <m.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-green-600"
                role="status"
              >
                ✓ Subscribed! Check your inbox.
              </m.p>
            )}

            {/* Error */}
            {error && (
              <p className="text-xs font-medium text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mb-8 flex flex-col items-center justify-between gap-2 border-t border-red-100 pt-6 sm:flex-row">
          <p className="text-[11px] font-medium text-neutral-400">
            © 2026 Music Champs Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-[11px] font-medium text-neutral-400 transition-colors hover:text-red-500"
            >
              Privacy Policy
            </Link>
            {/* <Link
              href="/terms-and-conditions"
              className="text-[11px] font-medium text-neutral-400 transition-colors hover:text-red-500"
            >
              Terms of Service
            </Link> */}
          </div>
        </div>
        <div className="absolute right-4 bottom-2 left-0 mt-8 flex items-center justify-center gap-4 md:left-auto md:justify-end">
          <span className="text-[12px] font-medium text-neutral-400">
            Built by{' '}
            <Link
              href="https://queads.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-red-500 hover:text-red-600"
            >
              QueAds
            </Link>
          </span>
        </div>
      </m.div>

      {/* 3D MUSIC CHAMPS background text */}
      <div className="relative -mt-10 w-full">
        <Image
          src="/images/music-champs-letter.png"
          alt=""
          width={1400}
          height={240}
          className="w-full object-cover object-top"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
