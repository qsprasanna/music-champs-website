'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../content';
export default function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(faq.defaultOpen);

  return (
    <m.div
      layout
      className={`overflow-hidden rounded-2xl border-2 transition-colors duration-200 ${
        open ? 'border-red-300 bg-red-50' : 'border-neutral-100 bg-white'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span
          className={`text-sm leading-snug font-bold ${
            open ? 'text-neutral-900' : 'text-neutral-700'
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
            open ? 'bg-red-500 text-white' : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-500">
              {faq.answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
