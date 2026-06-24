import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { getCourseBySlug, getRelatedCourses } from '@/data/courses';
import CTABanner from '@/features/home/sections/CTABanner';
import Footer from '@/components/layout/Footer';
import CourseClientContent from './CourseClientContent';

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <>
      <Navbar />
      <main>
        <CourseClientContent course={course} slug={slug} />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

// import { notFound } from 'next/navigation';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import { getCourseBySlug, getRelatedCourses, courseDetails } from '@/features/courses/content';
// import CourseDetailPage from '@/features/courses/CourseDetailPage';
// import CTABanner from '@/features/home/sections/CTABanner';

// export default async function CourseSlugPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   const course = getCourseBySlug(slug);
//   const detail = courseDetails[slug];

//   // 404 if slug doesn't match any course OR has no detail content
//   if (!course || !detail) notFound();

//   const related = getRelatedCourses(slug, 3);

//   return (
//     <CourseDetailPage
//       course={course}
//       detail={detail}
//       relatedCourses={related}
//     />
//   );
// }
