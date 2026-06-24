'use client';

// components/leads/WelcomeModal.tsx
// Shows once per browser session for first-time visitors.
// Step 1: Which instrument? (pill grid)
// Step 2: Name + phone/email form

import { useEffect, useState, useTransition } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { m, AnimatePresence } from 'framer-motion';
import {
  X,
  Loader2,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Music2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'mc_visited';
const DELAY_MS = 4000; // show after 4s on first visit

const INSTRUMENTS = [
  { label: 'Guitar', emoji: '🎸' },
  { label: 'Keyboard & Piano', emoji: '🎹' },
  { label: 'Vocals', emoji: '🎤' },
  { label: 'Ukulele', emoji: '🪗' },
  { label: 'Violin', emoji: '🎻' },
  { label: 'Drums', emoji: '🥁' },
  { label: 'Flute', emoji: '🪈' },
  { label: 'Not sure yet', emoji: '🎵' },
];

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [interest, setInterest] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  // Show once per browser — localStorage guard
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const t = setTimeout(() => {
      // Don't show on /contact-us, /terms*, /privacy* pages
      const blocked = ['/contact-us', '/terms', '/privacy'].some((p) =>
        pathname.startsWith(p)
      );
      if (!blocked) setOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(t);
  }, [pathname]);

  const dismiss = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          interest,
          action: 'welcome',
          source: pathname,
        }),
      });
      if (!res.ok) throw new Error();
      startTransition(() => {
        setDone(true);
        setLoading(false);
      });
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) dismiss();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />

        <Dialog.Popup className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <AnimatePresence>
            {open && (
              <m.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl shadow-red-100"
              >
                {/* Decorative top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-red-400 to-red-300" />

                {/* Header */}
                <div className="relative px-6 pt-5 pb-4">
                  <button
                    onClick={dismiss}
                    className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mb-1 flex items-center gap-2">
                    <Music2
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-black tracking-widest text-red-500 uppercase">
                      MusicChamps
                    </span>
                  </div>

                  <Dialog.Title className="text-xl font-black text-neutral-900">
                    {done
                      ? "You're all set! 🎉"
                      : step === 1
                        ? 'What would you like to learn?'
                        : `Great choice! Let's get you started`}
                  </Dialog.Title>
                  {!done && (
                    <Dialog.Description className="mt-1 text-sm text-neutral-500">
                      {step === 1
                        ? "Pick an instrument and we'll show you how to get started."
                        : `We\'ll reach out to schedule your free trial for ${interest}.`}
                    </Dialog.Description>
                  )}
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                  <AnimatePresence mode="wait">
                    {/* ── Success ── */}
                    {done && (
                      <m.div
                        key="done"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-3 py-4 text-center"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                          <CheckCircle2 className="h-7 w-7 text-green-500" />
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-600">
                          We&apos;ve sent a confirmation to{' '}
                          <strong className="text-neutral-800">{email}</strong>.
                          Our team will be in touch within 24 hours!
                        </p>
                        <button
                          onClick={dismiss}
                          className="mt-1 rounded-xl bg-red-500 px-6 py-2 text-sm font-bold text-white transition hover:bg-red-600"
                        >
                          Start Exploring
                        </button>
                      </m.div>
                    )}

                    {/* ── Step 1: Instrument picker ── */}
                    {!done && step === 1 && (
                      <m.div
                        key="step1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {INSTRUMENTS.map((inst) => (
                            <button
                              key={inst.label}
                              type="button"
                              onClick={() => {
                                setInterest(inst.label);
                                setStep(2);
                              }}
                              className={cn(
                                'flex items-center gap-2.5 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold transition',
                                interest === inst.label
                                  ? 'border-red-500 bg-red-50 text-red-600'
                                  : 'border-neutral-100 bg-neutral-50 text-neutral-700 hover:border-red-200 hover:bg-red-50'
                              )}
                            >
                              <span className="text-base" aria-hidden="true">
                                {inst.emoji}
                              </span>
                              <span className="text-xs">{inst.label}</span>
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={dismiss}
                          className="mt-4 w-full text-center text-xs text-neutral-400 hover:text-neutral-600"
                        >
                          Not now, maybe later
                        </button>
                      </m.div>
                    )}

                    {/* ── Step 2: Contact form ── */}
                    {!done && step === 2 && (
                      <m.form
                        key="step2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                        noValidate
                      >
                        {/* Selected instrument badge */}
                        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2">
                          <span className="text-xs font-bold text-red-500">
                            Selected:
                          </span>
                          <span className="text-xs font-black text-red-600">
                            {interest}
                          </span>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="ml-auto text-xs font-medium text-neutral-400 hover:text-red-500"
                          >
                            Change
                          </button>
                        </div>

                        {/* Name */}
                        <div className="relative">
                          <User
                            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden="true"
                          />
                          <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus
                            className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 py-2.5 pr-4 pl-9 text-sm font-medium transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
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
                            className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 py-2.5 pr-4 pl-9 text-sm font-medium transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
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
                            className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 py-2.5 pr-4 pl-9 text-sm font-medium transition outline-none placeholder:text-neutral-400 focus:border-red-300 focus:bg-white"
                          />
                        </div>

                        {error && (
                          <p className="text-xs font-medium text-red-500">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={loading || !name || !email || !phone}
                          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-md shadow-red-200 transition hover:bg-red-600 disabled:opacity-60"
                        >
                          {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          )}
                          Book My Free Trial →
                        </button>

                        <p className="text-center text-xs text-neutral-400">
                          No spam. We&apos;ll only contact you about your trial.
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
