import Image from 'next/image';
// import { cardVariants } from '../content';
import { m } from 'framer-motion';
import { cardVariants } from '@/lib/animations';

export default function CommunityCard() {
  return (
    <m.div
      variants={cardVariants}
      className="flex flex-col justify-between rounded-2xl border-2 border-red-200 bg-red-100 p-7 shadow-sm"
    >
      <h3 className="text-2xl leading-tight font-black text-red-500 lg:text-3xl">
        Join the top community helping students succeed.
      </h3>
      <div className="mt-6 flex items-center gap-3">
        {/* Stacked avatars */}
        <div className="flex -space-x-3">
          {[
            '/assets/avatar-david.jpg',
            '/assets/avatar-mia.jpg',
            '/assets/avatar-david.jpg',
          ].map((src, i) => (
            <div
              key={i}
              className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-red-300"
            >
              <Image
                src={src}
                alt="student"
                fill
                className="object-cover"
                onError={() => {}}
              />
            </div>
          ))}
        </div>
        <span className="text-sm font-black text-red-500">
          +15k Active Students
        </span>
      </div>
    </m.div>
  );
}
