'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';

// ─── Data ─────────────────────────────────────────────────────────────────────
// Place logo images at:
//   /public/images/partners/apnrt-logo.png
//   /public/images/partners/aleap-wehub-logo.png

const partners = [
  {
    id: 'apnrt',
    logo: '/images/apnrt-logo.png',
    logoAlt: 'APNRT Society — Andhra Pradesh Non-Resident Telugu Society',
    name: 'APNRT Society',
    fullName: 'Andhra Pradesh Non-Resident Telugu Society',
    badge: 'MoU Partner',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
    description:
      'MusicChamps has signed an official Memorandum of Understanding with APNRT Society, a fully-owned entity of the Government of Andhra Pradesh. This collaboration bridges music education with cultural preservation for Telugu communities and NRI families worldwide.',
    href: 'https://apnrts.ap.gov.in/',
  },
  {
    id: 'aleap-wehub',
    logo: '/images/wehub_logo.webp',
    logoAlt:
      'ALEAP WE Hub — Association of Lady Entrepreneurs of Andhra Pradesh',
    name: 'ALEAP WE Hub',
    fullName:
      'Association of Lady Entrepreneurs of Andhra Pradesh — Women Entrepreneurship Hub',
    badge: 'Incubation Partner',
    badgeColor: 'bg-purple-50 text-purple-600 border-purple-100',
    description:
      "MusicChamps is proudly incubated and mentored through ALEAP WE Hub, Andhra Pradesh's flagship Women Entrepreneurship Hub. This partnership has been instrumental in scaling our vision and connecting us with the AP Government ecosystem.",
    href: 'https://www.aleap.org/aic.php',
  },
];

const defaultViewport = { once: true, amount: 0.15 } as const;

// ─────────────────────────────────────────────────────────────────────────────

export default function PartnersSection() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="w-full bg-white px-5 py-16 sm:px-10 lg:px-20"
    >
      {/* Eyebrow */}
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={defaultViewport}
        className="mb-3 text-xs font-black tracking-widest text-red-500 uppercase"
        aria-hidden="true"
      >
        ♦ Partners &amp; Recognition
      </m.p>

      {/* Heading */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <h2
          id="partners-heading"
          className="text-4xl font-black tracking-tight text-neutral-900 lg:text-5xl"
        >
          Backed by <span className="text-red-500">Institutions</span>
          <br className="hidden sm:block" /> That Believe in Our Mission
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 lg:text-lg">
          Our partnerships with government bodies and entrepreneurship networks
          strengthen our commitment to accessible, quality music education for
          every learner — at home and across the world.
        </p>
      </m.div>

      {/* Partner cards */}
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {partners.map((partner) => (
          <m.article
            key={partner.id}
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group flex flex-col overflow-hidden rounded-3xl border-2 border-neutral-100 bg-white shadow-sm transition-shadow hover:border-red-200 hover:shadow-lg hover:shadow-red-50"
          >
            {/* Logo band */}
            <div className="flex items-center justify-center border-b border-neutral-100 bg-neutral-50/60 px-10 py-8">
              <div className="relative h-16 w-48 sm:h-20 sm:w-64">
                <Image
                  src={partner.logo}
                  alt={partner.logoAlt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 192px, 256px"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 px-6 py-6">
              {/* Badge */}
              <span
                className={`self-start rounded-full border px-3 py-0.5 text-xs font-bold tracking-wide ${partner.badgeColor}`}
              >
                {partner.badge}
              </span>

              {/* Name */}
              <div>
                <h3 className="text-lg font-black text-neutral-900">
                  {partner.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-neutral-400">
                  {partner.fullName}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-500 lg:text-base">
                {partner.description}
              </p>

              {/* Link */}
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto self-start text-xs font-bold text-red-500 underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`Visit ${partner.name} website (opens in new tab)`}
              >
                Visit {partner.name} →
              </a>
            </div>
          </m.article>
        ))}
      </m.div>

      {/* Divider strip — subtle brand accent */}
      <m.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-red-500 via-red-300 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
