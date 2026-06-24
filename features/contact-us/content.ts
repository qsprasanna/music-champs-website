import { Mail, Phone, MapPin } from 'lucide-react';

export const contactInfo = [
  {
    icon: Mail,
    label: 'Email Address',
    value: 'contact@musicchamps.com',
    href: 'mailto:contact@musicchamps.com',
  },
  {
    icon: Phone,
    label: 'Phone Number',
    value: '+91 9063 536 670',
    href: 'tel:+919063536670',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, Telangana, India',
    href: 'https://maps.app.goo.gl/XnkLz2abdYuQd2bY9',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Do I need prior experience to join Music Champs?',
    answer:
      "Not at all! Our classes are designed for all skill levels. Whether you're a complete beginner holding an instrument for the first time or an advanced learner looking to polish your skills, our expert instructors will tailor the lessons to your needs.",
    defaultOpen: true,
  },
  {
    id: 2,
    question: 'Do I need to own an instrument before starting?',
    answer:
      "No, you don't need to own an instrument to get started. We can guide you on what to rent or borrow while you're just beginning. Once you decide to commit, we'll help you choose the right instrument for your level and budget.",
    defaultOpen: false,
  },
  {
    id: 3,
    question: 'Are the classes suitable for children?',
    answer:
      'Absolutely! We offer age-appropriate classes for children from as young as 5 years old. Our instructors are experienced in teaching young learners and make sessions fun, engaging, and productive.',
    defaultOpen: false,
  },
  {
    id: 4,
    question: 'How do the live online classes work?',
    answer:
      "Our live online classes run through a video conferencing platform. You'll be connected one-on-one or in a small group with your instructor in real time. All you need is a device with a camera and a stable internet connection.",
    defaultOpen: false,
  },
];
