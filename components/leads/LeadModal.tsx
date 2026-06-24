'use client';

// components/leads/LeadModal.tsx
// Triggered by any CTA via useLeadModal().openLead()
// Renders differently based on action: register / demo / trial / event

import { useEffect, useState, useTransition, useRef } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { m, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLeadModal } from './LeadModalContext';
import { usePathname } from 'next/navigation';
import type { LeadPayload } from '@/lib/leads/types';

// ─── Copy map per action ──────────────────────────────────────────────────────
const ACTION_COPY = {
  demo: {
    title: 'Book a Free Demo',
    subtitle:
      "Tell us a bit about yourself and we'll schedule a free demo session.",
    cta: 'Book My Demo',
  },
  trial: {
    title: 'Book Your Trial Class',
    subtitle: 'Try a class for free. No commitments — just music.',
    cta: 'Book Trial Class',
  },
  register: {
    title: 'Register Your Interest',
    subtitle: "We'll reach out to confirm your enrollment and schedule.",
    cta: 'Register Now',
  },
  event: {
    title: 'Enquire for This Event',
    subtitle:
      "Secure your spot. We'll send confirmation details to your email.",
    cta: 'Confirm Registration',
  },
  welcome: {
    title: 'Start Your Journey',
    subtitle: "Tell us what you're interested in.",
    cta: 'Get Started',
  },
} as const;

const INSTRUMENTS = [
  'Guitar',
  'Keyboard & Piano',
  'Vocals',
  'Ukulele',
  'Violin',
  'Drums',
  'Flute',
  "I'm not sure yet",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function LeadModal() {
  const { config, isOpen, closeLead } = useLeadModal();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const copy = config ? ACTION_COPY[config.action] : ACTION_COPY.demo;
  const showCourse =
    config?.action === 'register' || config?.action === 'event';

  // Pre-select course as interest when opened from a course page
  useEffect(() => {
    if (config?.courseTitle) setInterest(config.courseTitle);
    else if (config?.eventTitle) setInterest(config.eventTitle);
    else setInterest('');
  }, [config]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setDone(false);
        setError('');
      }, 300);
    } else {
      // Focus first field after open animation
      setTimeout(() => nameRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interest) {
      setError('Please select an instrument or area of interest.');
      return;
    }
    setError('');
    setLoading(true);

    const payload: LeadPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      interest,
      action: config?.action ?? 'demo',
      courseSlug: config?.courseSlug,
      source: pathname,
      message: message.trim() || undefined,
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Server error');
      startTransition(() => {
        setDone(true);
        setLoading(false);
      });
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(o) => !o && closeLead()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          style={{ animation: isOpen ? 'fadeIn 0.2s ease' : undefined }}
        />

        {/* Popup */}
        <Dialog.Popup
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby="lead-modal-title"
        >
          <AnimatePresence mode="wait">
            {isOpen && (
              <m.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-red-100"
              >
                {/* Header */}
                <div className="bg-red-500 px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title
                        id="lead-modal-title"
                        className="text-xl font-black text-white"
                      >
                        {copy.title}
                      </Dialog.Title>
                      {showCourse && config?.courseTitle && (
                        <p className="mt-1 text-sm font-medium text-red-100">
                          {config.courseTitle}
                        </p>
                      )}
                      {showCourse && config?.eventTitle && (
                        <p className="mt-1 text-sm font-medium text-red-100">
                          {config.eventTitle}
                        </p>
                      )}
                    </div>
                    <Dialog.Close
                      onClick={closeLead}
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-400/40 text-white transition hover:bg-red-400/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>
                  <Dialog.Description className="mt-1.5 text-sm text-red-100">
                    {copy.subtitle}
                  </Dialog.Description>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <AnimatePresence mode="wait">
                    {done ? (
                      /* ── Success state ── */
                      <m.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-3 py-6 text-center"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                          <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-black text-neutral-900">
                          You&apos;re all set!
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
                          We&apos;ve received your request and sent a
                          confirmation to{' '}
                          <strong className="text-neutral-700">{email}</strong>.
                          Our team will reach out within 24 hours.
                        </p>
                        <button
                          onClick={closeLead}
                          className="mt-2 rounded-xl bg-red-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
                        >
                          Close
                        </button>
                      </m.div>
                    ) : (
                      /* ── Form ── */
                      <m.form
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                        noValidate
                      >
                        {/* Name */}
                        <div className="relative">
                          <User
                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden="true"
                          />
                          <input
                            ref={nameRef}
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            minLength={2}
                            className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 py-2.5 pr-4 pl-9 text-sm font-medium text-neutral-800 transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
                          />
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <Mail
                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden="true"
                          />
                          <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 py-2.5 pr-4 pl-9 text-sm font-medium text-neutral-800 transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                          <Phone
                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden="true"
                          />
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 py-2.5 pr-4 pl-9 text-sm font-medium text-neutral-800 transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
                          />
                        </div>

                        {/* Instrument pills — hide if pre-selected from course */}
                        {!showCourse && (
                          <div>
                            <p className="mb-2 text-xs font-bold text-neutral-500">
                              Which instrument interests you?
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {INSTRUMENTS.map((inst) => (
                                <button
                                  key={inst}
                                  type="button"
                                  onClick={() => setInterest(inst)}
                                  className={cn(
                                    'rounded-full border px-3 py-1 text-xs font-bold transition',
                                    interest === inst
                                      ? 'border-red-500 bg-red-500 text-white'
                                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-red-300'
                                  )}
                                >
                                  {inst}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Optional message */}
                        <textarea
                          placeholder="Anything you'd like us to know? (optional)"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={2}
                          className="w-full resize-none rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-800 transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
                        />

                        {/* Error */}
                        {error && (
                          <p className="text-xs font-medium text-red-500">
                            {error}
                          </p>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={loading || !name || !email || !phone}
                          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          {copy.cta}
                        </button>

                        <p className="text-center text-xs text-neutral-400">
                          We respect your privacy. No spam, ever.
                        </p>
                      </m.form>
                    )}
                  </AnimatePresence>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
