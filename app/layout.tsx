// app/layout.tsx
import type { Metadata } from 'next';
import { sequelDisplay, sequelBody, sequelHead } from './fonts';
import './globals.css';
import { buildMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/lib/seo/schemas'; // ← new
import JsonLd from '@/components/seo/JsonLd'; // ← new
import PageLoader from '@/components/layout/PageLoader';
import PageTransition from '@/components/layout/PageTransition';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { domAnimation, LazyMotion } from 'framer-motion';
import { LeadModalProvider } from '@/components/leads/LeadModalContext';
import LeadModal from '@/components/leads/LeadModal';
import WelcomeModal from '@/components/leads/WelcomeModal';
import { GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';

export const metadata: Metadata = buildMetadata({
  title: 'Online Music Classes for Kids & Teens',
  description:
    'MusicChamps offers interactive online music classes for kids and teens with expert instructors for guitar, piano, vocals, drums, violin, flute, and more.',
  keywords:
    'online music classes, kids music academy online, online music classes for kids, music classes online',
  canonical: '/',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sequelDisplay.variable} ${sequelBody.variable} ${sequelHead.variable}`}
    >
      {/* GTM — production only */}
      {process.env.NODE_ENV === 'production' && (
        <GoogleTagManager gtmId="GTM-TTQ6VBCQ" />
      )}
      <Head>
        {/*
        Organization schema lives here so it appears on EVERY page.
        Next.js renders <script> tags placed inside <html> but outside <body>
        into the <head> automatically.
        */}
        <JsonLd schema={organizationSchema()} />
      </Head>

      <body className="flex w-full flex-col items-center justify-center antialiased">
        <PageLoader duration={2200} />
        <LazyMotion features={domAnimation} strict>
          <LeadModalProvider>
            <PageTransition>{children}</PageTransition>
            <LeadModal />
            <WelcomeModal />
          </LeadModalProvider>
        </LazyMotion>
        <ScrollToTop />
      </body>
    </html>
  );
}
