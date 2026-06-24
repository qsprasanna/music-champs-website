import CTABanner from './sections/CTABanner';
import HowItWorksSection from './sections/HowItWorksSection';
// import EventsSection from './sections/EventsSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from './sections/HeroSection';
import ImpactSection from './sections/ImpactSection';
import AboutSection from './sections/AboutSection';
import CoursesSection from './sections/CoursesSection';
import WhyChooseSection from './sections/WhyChooseSection';
import TestimonialsSection from './sections/TestimonialsSection';
import BlogSectionServer from './sections/BlogSectionServer';
import TestimonialVideos from '../contact-us/section/TestimonialVideos';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <TestimonialVideos />
        <AboutSection />
        <CoursesSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <BlogSectionServer />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
