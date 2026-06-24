// lib/seo/metadata.ts
import type { Metadata } from 'next';
import { site } from '@/config/site';

type BuildMetadataOptions = {
  title: string;
  description: string;
  keywords: string;
  canonical?: string; // e.g. '/courses/guitar-lessons'  (defaults to '/')
  ogImage?: string; // defaults to '/og-image.png'
  noIndex?: boolean; // for /terms, /privacy etc
};

export function buildMetadata({
  title,
  description,
  keywords,
  canonical = '/',
  ogImage = '/og-image.png',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const fullTitle = title === site.name ? site.name : `${title} | ${site.name}`;

  return {
    // ── Core ─────────────────────────────────────────────────────────────────
    title: fullTitle,
    description,
    keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    metadataBase: new URL(site.url),

    // ── Canonical ─────────────────────────────────────────────────────────────
    alternates: { canonical },

    // ── Open Graph ────────────────────────────────────────────────────────────
    openGraph: {
      title: fullTitle,
      description,
      siteName: site.name,
      url: `${site.url}${canonical}`,
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    // ── Twitter ───────────────────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // ── App info ──────────────────────────────────────────────────────────────
    creator: site.name,
    publisher: site.name,
    applicationName: site.name,
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    // ── GEO + AEO ─────────────────────────────────────────────────────────────
    // These can't be expressed in the typed Metadata fields — use `other`.
    // Next.js renders each key-value as <meta name="key" content="value" />.
    other: {
      // AEO (Answer Engine Optimization)
      author: site.name,
      language: 'English',
      'revisit-after': '7 days',
      rating: 'general',
      distribution: 'global',

      // GEO (Hyderabad, Telangana, India)
      'geo.region': 'IN-TG',
      'geo.placename': 'Hyderabad',
      'geo.position': '17.3850;78.4867',
      ICBM: '17.3850,78.4867',
    },
  };
}
