import { m } from 'framer-motion';
import { courses } from '../content';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import { cardVariants } from '@/lib/animations';

export function CourseCard({ course }: { course: (typeof courses)[0] }) {
  if (course.featured) {
    return (
      <Link href={`/courses/${course.slug}`} className="block h-full">
        <m.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-red-500 bg-red-500 shadow-lg shadow-red-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
        >
          <div className="relative h-[180px] w-full">
            <Image
              src={course.imageSrc}
              alt={course.title}
              fill
              className="object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black tracking-wider text-white uppercase">
              {course.badge}
            </span>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <h3 className="text-xl font-black text-white">{course.title}</h3>
            <p className="text-xs leading-relaxed text-red-100">
              {course.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-red-200">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {course.sessions} Sessions
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {course.weeks} Weeks
              </span>
            </div>
            <Button className="border-transparent bg-white text-red-500 hover:bg-red-50">
              Learn More
            </Button>
          </div>
        </m.div>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      <m.div
        variants={cardVariants}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-red-200 bg-white shadow-sm transition-all duration-300 hover:border-red-400 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
      >
        <div className="relative h-[180px] w-full bg-neutral-100">
          <Image
            src={course.imageSrc}
            alt={course.title}
            fill
            className="object-cover"
          />
          <span
            className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider text-white uppercase ${course.badgeColor}`}
          >
            {course.badge}
          </span>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h3 className="text-lg font-black text-neutral-900">
            {course.title}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-500">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-red-400" />
              {course.sessions} Sessions
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-red-400" />
              {course.weeks} Weeks
            </span>
          </div>
          <Button variant="ghost-red">Learn more</Button>
        </div>
      </m.div>
    </Link>
  );
}
