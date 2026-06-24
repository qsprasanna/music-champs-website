import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AboutHero from './sections/Hero';
import WhoWeAre from './sections/WhoWeAre';
import OurJourney from './sections/OurJourney';
import WhatWeBelieve from './sections/WhatWeBelieve';
import HowWeTeach from './sections/HowWeTeach';
import LookingAhead from './sections/LookingAhead';
import TestimonialsSection from '../home/sections/TestimonialsSection';
import CTABanner from '../home/sections/CTABanner';
import PartnersSection from './sections/Partnerssection';
import EventsGallery from './sections/EventsGallery';

export function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <WhoWeAre />
        <OurJourney />
        <PartnersSection />
        <EventsGallery />
        <WhatWeBelieve />
        <HowWeTeach />
        <LookingAhead />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
