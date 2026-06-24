import { m } from 'framer-motion';
// import { cardVariants, containerVariants, events, fadeUp } from '../content';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cardVariants, fadeUp } from '@/lib/animations';
import { containerVariants, events } from '../content';
import Link from 'next/link';
import { useLeadModal } from '@/components/leads/LeadModalContext';

export function EventsSection() {
  const { openLead } = useLeadModal();
  return (
    <section className="w-full px-10 py-16 lg:px-20">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-3 text-xs font-black tracking-widest text-red-500 uppercase"
      >
        ♦ Events
      </m.p>

      <m.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-3xl font-black tracking-tight text-neutral-900 lg:text-4xl"
      >
        Music <span className="text-red-500">Events &amp; Workshops</span>
      </m.h2>

      {/* Highlighted Experience */}
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block h-0.5 w-6 bg-red-500" />
        <span className="text-sm font-semibold text-neutral-700">
          Highlighted Experience
        </span>
      </div>

      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 flex flex-col overflow-hidden rounded-2xl border border-neutral-100 shadow-sm lg:flex-row"
      >
        <div className="relative min-h-[220px] w-full shrink-0 lg:w-[45%]">
          <Image
            src="/assets/event-featured.jpg"
            alt="Pro Mixing Masterclass"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-4 bg-red-50 px-8 py-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
              Masterclass
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs font-bold tracking-wider text-red-500 uppercase">
              Advanced Level
            </span>
          </div>
          <h3 className="text-2xl font-black text-neutral-900 lg:text-3xl">
            Pro Mixing Masterclass
          </h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Calendar className="h-3.5 w-3.5 text-red-500" />
              November 12, 2025 • 10:00 PM
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <MapPin className="h-3.5 w-3.5 text-red-500" />
              Online (Live Interactive Stream)
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-600">
            Learn the secrets of radio-ready mixes from Platinum-certified
            engineers. This 4-hour session covers dynamic processing, spatial
            depth, and final mastering chains.
          </p>
          {/* <Button variant="default">Register Now →</Button> */}
          <Button
            onClick={() =>
              openLead('event', undefined, undefined, 'Masterclass')
            }
          >
            Register Now →
          </Button>
        </div>
      </m.div>

      {/* Upcoming Schedule */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-6 bg-red-500" />
          <span className="text-sm font-semibold text-neutral-700">
            Upcoming Schedule
          </span>
        </div>
        <Link
          href="#"
          className="text-xs font-bold text-red-500 hover:underline"
        >
          View Full Calendar →
        </Link>
      </div>
      <p className="mb-8 ml-8 text-xs text-neutral-400">
        Don&apos;t miss out on these upcoming opportunities.
      </p>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {events.map((event) => (
          <m.div
            key={event.id}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-44 w-full bg-neutral-200">
              <Image
                src={event.imageSrc}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-black text-white uppercase">
                  {event.category}
                </span>
                {event.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black text-white uppercase ${event.badgeColor}`}
                  >
                    {event.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 px-5 py-4">
              <h3 className="text-base font-black text-neutral-900">
                {event.title}
              </h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Calendar className="h-3 w-3 text-red-500" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="h-3 w-3 text-red-500" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3 text-red-500" />
                  {event.location}
                </div>
              </div>
              <div className="mt-1 flex items-center gap-3">
                {/* <Button className="h-auto flex-1 rounded-lg bg-red-500 py-2 text-xs font-bold text-white transition-all hover:bg-red-600">
                  Register Now
                </Button> */}
                <Button
                  onClick={() =>
                    openLead('event', undefined, undefined, event.title)
                  }
                >
                  Register Now
                </Button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 transition-colors hover:bg-neutral-50">
                  <Share2 className="h-3.5 w-3.5 text-neutral-400" />
                </button>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
