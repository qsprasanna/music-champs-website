import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ContactHero from './ContactHero';
import ContactFormSection from './ContactFormSection';
import FAQSection from './FAQSection';
import CTABanner from '@/features/home/sections/CTABanner';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactFormSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
