'use client';

import Image from 'next/image';
import { m, Variants } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    id: 1,
    imageSrc: '/images/expert-instructors-v2.png',
    imageAlt: 'Expert Music Instructors',
    titleRed: 'Expert',
    titleBlack: 'Instructors',
    description: 'Learn from passionate, world-class music professionals dedicated to your growth.',
  },
  {
    id: 2,
    imageSrc: '/images/personal-learning-v2.png',
    imageAlt: 'Personalized Learning',
    titleRed: 'Personal',
    titleBlack: 'Guidance',
    description: 'Receive individual attention and a customized learning path tailored for you.',
  },
  {
    id: 3,
    imageSrc: '/images/live-classes-dark.png',
    imageAlt: 'Live Online Classes',
    titleRed: 'Live',
    titleBlack: 'Online',
    description: 'Attend highly engaging, high-fidelity live classes from the comfort of home.',
  },
  {
    id: 4,
    imageSrc: '/images/flexible-schedules-dark.png',
    imageAlt: 'Flexible Schedules',
    titleRed: 'Flexible',
    titleBlack: 'Schedules',
    description: 'Choose class timings that seamlessly fit into your busy daily routine.',
  },
  {
    id: 5,
    imageSrc: '/images/interactive-fun-dark.png',
    imageAlt: 'Interactive & Engaging',
    titleRed: 'Interactive',
    titleBlack: '& Fun',
    description: 'Dynamic live interaction and gamified activities make learning a joy.',
  },
  {
    id: 6,
    imageSrc: '/images/global-community-dark.png',
    imageAlt: 'Global Community',
    titleRed: 'Global',
    titleBlack: 'Community',
    description: 'Connect and collaborate with a worldwide network of passionate musicians.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
};

function ClassyFeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <m.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative flex flex-col justify-end overflow-hidden rounded-[32px] bg-[#121829]/40 border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:border-red-500/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)] transition-all duration-500 cursor-pointer aspect-[4/5] sm:aspect-[3/4] md:aspect-square lg:aspect-[4/5]"
    >
      {/* Premium Full-bleed Classy dark background Image */}
      <div className="absolute inset-0 z-0 bg-[#0B0F19]">
        <Image
          src={feature.imageSrc}
          alt={feature.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
          priority
        />
        {/* Soft, dark, glossy fade gradient at the bottom for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-transparent transition-opacity duration-500 group-hover:opacity-95"></div>
      </div>

      {/* Elegant Red top border on hover */}
      <div className="absolute top-0 inset-x-0 h-[3.5px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></div>

      {/* Content Area layered on top of the image */}
      <div className="relative z-20 p-8 sm:p-10 flex flex-col justify-end h-1/2 pointer-events-none">
        <h3 className="text-2xl leading-none font-extrabold tracking-tight text-white mb-3">
          <span className="text-red-500">{feature.titleRed}</span> {feature.titleBlack}
        </h3>
        <p className="text-sm font-medium text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-200">
          {feature.description}
        </p>
      </div>
    </m.div>
  );
}

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-[#0B0F19] px-6 py-24 sm:px-10 lg:px-20 relative overflow-hidden">
      {/* Premium modern radial background glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-500/5 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <m.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase"
            >
              ♦ The Music Champs Advantage
            </m.p>
            <m.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="text-4xl leading-tight font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Why Choose Our <br className="hidden sm:block" />
              <span className="text-red-500">Music School</span>
            </m.h2>
          </div>
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Link
              className="group relative inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              href="/about-us"
            >
              Our Success Stories
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </m.div>
        </div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <ClassyFeatureCard key={feature.id} feature={feature} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
