// 'use client';

// import { useState, useTransition } from 'react';
// import { m, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Send } from 'lucide-react';

// export default function ContactFormSection() {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [sent, setSent] = useState(false);
//   const [, startTransition] = useTransition();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSent(true);
//     setForm({ name: '', email: '', message: '' });
//     setTimeout(() => {
//       startTransition(() => setSent(false)); // ✅ low-priority render
//     }, 4000);
//   };

//   return (
//     <section className="w-full px-10 py-6 lg:px-20">
//       <div className="flex flex-col items-stretch gap-8 lg:flex-row">
//         {/* Map */}
//         <m.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="min-h-[380px] w-full shrink-0 overflow-hidden rounded-3xl border-2 border-red-200 shadow-md lg:w-[48%]"
//         >
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.25176871577!2d78.40804555!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1776453847166!5m2!1sen!2sin"
//             className="h-full min-h-[380px] w-full"
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Music Champs Location"
//           />
//         </m.div>

//         {/* Form */}
//         <m.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="flex flex-1 flex-col gap-5"
//         >
//           {/* Name */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-sm font-black text-neutral-800">Name</label>
//             <input
//               type="text"
//               placeholder="Enter your first name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//               className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 focus:border-red-400"
//             />
//           </div>

//           {/* Email */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-sm font-black text-neutral-800">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your Email Address"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               className="w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 focus:border-red-400"
//             />
//           </div>

//           {/* Message */}
//           <div className="flex flex-1 flex-col gap-1.5">
//             <label className="text-sm font-black text-neutral-800">
//               Message
//             </label>
//             <textarea
//               placeholder="Tell us about your musical goals, which instrument you want to learn, or any questions you have..."
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//               required
//               rows={6}
//               className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 focus:border-red-400"
//             />
//           </div>

//           {/* Submit */}
//           <m.div whileTap={{ scale: 0.97 }}>
//             <Button type="submit" variant="default">
//               <Send className="h-4 w-4" />
//               Send Message
//             </Button>
//           </m.div>

//           <AnimatePresence>
//             {sent && (
//               <m.p
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 className="text-center text-sm font-bold text-green-600"
//               >
//                 ✓ Message sent! We&apos;ll get back to you soon.
//               </m.p>
//             )}
//           </AnimatePresence>
//         </m.form>
//       </div>
//     </section>
//   );
// }

'use client';

// features/contact-us/sections/ContactFormSection.tsx

import { useState, useTransition } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Send,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';

const defaultViewport = { once: true, amount: 0.1 } as const;

export default function ContactFormSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, startTransition] = useTransition();

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          interest: 'General Inquiry',
          action: 'demo',
          source: '/contact-us',
          message: form.message.trim(),
        }),
      });

      if (!res.ok) throw new Error('Server error');

      // ✅ startTransition — defers setState outside the async callback
      startTransition(() => {
        setSent(true);
        setLoading(false);
        setForm({ name: '', email: '', phone: '', message: '' });
      });

      setTimeout(() => {
        startTransition(() => setSent(false));
      }, 6000);
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again or call us directly.');
    }
  };

  const inputBase =
    'w-full rounded-xl border-2 border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-neutral-700 outline-none transition-colors placeholder:text-neutral-400 focus:border-red-400';

  return (
    <section className="w-full px-5 py-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-stretch gap-8 lg:flex-row">
        {/* Map */}
        <m.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[380px] w-full shrink-0 overflow-hidden rounded-3xl border-2 border-red-200 shadow-md lg:w-[48%]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.25176871577!2d78.40804555!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1776453847166!5m2!1sen!2sin"
            className="h-full min-h-[380px] w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MusicChamps — G-305 Aparna Cyberzon, Lingampalli, Hyderabad"
          />
        </m.div>

        {/* Form */}
        <m.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              /* ── Success state ── */
              <m.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-green-100 bg-green-50/60 px-6 py-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-black text-neutral-900">
                  Message Sent!
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
                  Thanks for reaching out. We&apos;ve received your message and
                  will get back to you within 24 hours.
                </p>
              </m.div>
            ) : (
              /* ── Form ── */
              <m.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col gap-4"
                noValidate
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-black text-neutral-800"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                      aria-hidden="true"
                    />
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={set('name')}
                      required
                      minLength={2}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Email + Phone — side by side on sm+ */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-black text-neutral-800"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={set('email')}
                        required
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-sm font-black text-neutral-800"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 9999999999"
                        value={form.phone}
                        onChange={set('phone')}
                        required
                        className={inputBase}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-1 flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-black text-neutral-800"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex-1">
                    <MessageSquare
                      className="absolute top-3.5 left-3 h-4 w-4 text-neutral-400"
                      aria-hidden="true"
                    />
                    <textarea
                      id="contact-message"
                      placeholder="Tell us about your musical goals, which instrument you want to learn, or any questions you have..."
                      value={form.message}
                      onChange={set('message')}
                      required
                      rows={6}
                      className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-white py-3 pr-4 pl-10 text-sm text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 focus:border-red-400"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-medium text-red-500">{error}</p>
                )}

                <m.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      !form.name ||
                      !form.email ||
                      !form.phone ||
                      !form.message
                    }
                    className="flex h-auto w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-black shadow-lg shadow-red-200 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </m.div>

                <p className="text-center text-xs text-neutral-400">
                  We usually reply within 24 hours. No spam, ever.
                </p>
              </m.form>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}
