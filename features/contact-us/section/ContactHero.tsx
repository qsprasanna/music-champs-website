'use client';

import { m } from 'framer-motion';
import { contactInfo } from '../content';

export default function ContactHero() {
  return (
    <section className="w-full p-6 md:px-10 md:py-10 lg:px-20">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8 rounded-3xl border border-red-100 bg-red-50 p-6 md:px-10 md:py-10"
      >
        {/* Pill */}
        <span className="rounded-full border border-red-300 bg-white px-5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
          Contact us
        </span>

        {/* Heading */}
        <h1 className="max-w-2xl text-center text-3xl leading-tight font-black text-neutral-900 lg:text-4xl">
          <span className="text-red-500 italic">Get in touch,</span> let us help
          you start your musical journey
        </h1>

        {/* Info Cards Row */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:max-w-4xl">
          {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
            <m.a
              key={i}
              href={href}
              target={label === 'Location' ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-red-100 bg-white px-5 py-4 transition-all duration-200 hover:border-red-300 hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">
                  {label}
                </p>
                <p className="text-sm font-black text-neutral-900">{value}</p>
              </div>
            </m.a>
          ))}
        </div>
      </m.div>
    </section>
  );
}
