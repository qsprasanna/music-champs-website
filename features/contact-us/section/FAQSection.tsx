'use client';

import { m } from 'framer-motion';
import { faqs } from '../content';
import FAQItem from './FAQItem';

export default function FAQSection() {
  return (
    <section className="w-full px-10 py-16 lg:px-20">
      {/* Eyebrow */}
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 text-xs font-black tracking-widest text-red-500 uppercase"
      >
        ♦ Music Champs Support
      </m.p>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Left — Heading + promo card */}
        <m.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex shrink-0 flex-col gap-6 lg:w-[36%]"
        >
          <h2 className="text-4xl leading-tight font-black tracking-tight text-neutral-900 lg:text-5xl">
            <span className="text-red-500">Frequently</span> asked
            <br />
            Questions
          </h2>

          {/* Promo card */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-red-500 p-7"
          >
            {/* Decorative music notes */}
            <div className="pointer-events-none absolute top-4 right-4 text-4xl leading-none text-red-400 opacity-40 select-none">
              ♪♫
            </div>
            <h3 className="mb-3 text-lg leading-snug font-black text-white">
              Still have questions?
            </h3>
            <p className="text-sm leading-relaxed text-red-100">
              Can't find the answer you're looking for? Reach out to our support
              team and we'll help you get started on your musical journey!
            </p>
          </m.div>
        </m.div>

        {/* Right — Accordion */}
        <m.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <m.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <FAQItem faq={faq} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
