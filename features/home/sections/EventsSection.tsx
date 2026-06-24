'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Share2, Clock } from 'lucide-react';

const featuredEvent = {
  category: 'Masterclass',
  level: 'Advanced Level',
  title: 'Pro Mixing Masterclass',
  date: 'November 12, 2025 • 10:00 PM',
  location: 'Online (Live Interactive Stream)',
  description:
    'Learn the secrets of radio-ready mixes from Platinum-certified engineers. This 4-hour session covers dynamic processing, spatial depth, and final mastering chains.',
  imageSrc: '/assets/event-featured.jpg', // 👈 microphone + mixing desk photo
  imageAlt: 'Pro Mixing Masterclass',
};

const upcomingEvents = [
  {
    id: 1,
    category: 'Workshop',
    badge: 'New',
    badgeColor: 'bg-red-500',
    title: 'Live Jazz Workshop',
    date: 'Oct 15, 2023',
    time: '10:00 AM – 1:00 PM',
    location: 'Online Class',
    imageSrc: '/assets/event-jazz.jpg', // 👈 saxophonist photo
    imageAlt: 'Live Jazz Workshop',
  },
  {
    id: 2,
    category: 'Culture',
    badge: 'Popular',
    badgeColor: 'bg-red-500',
    title: 'Summer Music Festival',
    date: 'Aug 24–26, 2024',
    time: 'All Day Event',
    location: 'Nashville, TN',
    imageSrc: '/assets/event-festival.jpg', // 👈 outdoor concert photo
    imageAlt: 'Summer Music Festival',
  },
  {
    id: 3,
    category: 'Workshop',
    badge: null,
    badgeColor: null,
    title: 'Vocal Control Intensive',
    date: 'Dec 05, 2023',
    time: '11:00 PM – 3:00 PM',
    location: 'Online (Zoom)',
    imageSrc: '/assets/event-vocal.jpg', // 👈 singer with guitar photo
    imageAlt: 'Vocal Control Intensive',
  },
];

export default function EventsSection() {
  return (
    <section className="w-full bg-white px-10 py-16 lg:px-20">
      {/* Eyebrow */}
      <p className="mb-3 flex items-center gap-1 text-xs font-black tracking-widest text-red-500 uppercase">
        ♦ Events
      </p>

      {/* Heading */}
      <h2 className="mb-8 text-4xl font-black tracking-tight text-neutral-900 lg:text-5xl">
        Music <span className="text-red-500">Events &amp; Workshops</span>
      </h2>

      {/* ── Highlighted Experience ── */}
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block h-0.5 w-6 bg-red-500" />
        <span className="text-sm font-semibold text-neutral-700">
          Highlighted Experience
        </span>
      </div>

      <div className="mb-14 flex flex-col gap-0 overflow-hidden rounded-2xl border border-neutral-100 shadow-sm lg:flex-row">
        {/* Featured Image */}
        <div className="relative aspect-video min-h-[220px] w-full shrink-0 lg:aspect-auto lg:w-[45%]">
          <Image
            src={featuredEvent.imageSrc}
            alt={featuredEvent.imageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Featured Content */}
        <div className="flex flex-1 flex-col justify-center gap-4 bg-red-50 px-8 py-8">
          {/* Tags */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
              {featuredEvent.category}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-xs font-bold tracking-wider text-red-500 uppercase">
              {featuredEvent.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl leading-tight font-black text-neutral-900 lg:text-3xl">
            {featuredEvent.title}
          </h3>

          {/* Meta */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-red-500" />
              <span>{featuredEvent.date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500" />
              <span>{featuredEvent.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-sm text-sm leading-relaxed text-neutral-600">
            {featuredEvent.description}
          </p>

          {/* CTA */}
          <Button variant="default">Register Now →</Button>
        </div>
      </div>

      {/* ── Upcoming Schedule ── */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-6 bg-red-500" />
          <span className="text-sm font-semibold text-neutral-700">
            Upcoming Schedule
          </span>
        </div>
        <a
          href="/calendar"
          className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
        >
          View Full Calendar →
        </a>
      </div>
      <p className="mb-8 ml-8 text-xs text-neutral-400">
        Don&apos;t miss out on these upcoming opportunities.
      </p>

      {/* Upcoming Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative h-44 w-full bg-neutral-200">
              <Image
                src={event.imageSrc}
                alt={event.imageAlt}
                fill
                className="object-cover"
              />
              {/* Category + Badge overlay */}
              <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase backdrop-blur-sm">
                  {event.category}
                </span>
                {event.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase ${event.badgeColor}`}
                  >
                    {event.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col gap-2.5 px-5 py-4">
              <h3 className="text-base leading-tight font-black text-neutral-900">
                {event.title}
              </h3>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Calendar className="h-3 w-3 shrink-0 text-red-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="h-3 w-3 shrink-0 text-red-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <MapPin className="h-3 w-3 shrink-0 text-red-500" />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-1 flex items-center gap-3">
                <Button className="h-auto flex-1 rounded-md bg-red-500 py-2 text-xs font-bold text-white transition-colors hover:bg-red-600">
                  Register Now
                </Button>
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 transition-colors hover:bg-neutral-50">
                  <Share2 className="h-3.5 w-3.5 text-neutral-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
