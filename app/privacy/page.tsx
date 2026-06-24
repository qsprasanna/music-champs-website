import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Mail, MapPin, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Terms & Conditions | MusicChamps',
  description:
    'Read the Terms & Conditions governing your use of the MusicChamps platform, online music lessons, and related services.',
  alternates: { canonical: 'https://musicchamps.com/terms-and-conditions' },
  openGraph: {
    title: 'Terms & Conditions | MusicChamps',
    description:
      'Terms governing access to and use of the MusicChamps music education platform.',
    url: 'https://musicchamps.com/terms-and-conditions',
  },
};

// ─── Content data ─────────────────────────────────────────────────────────────

const TOC = [
  { id: 'eligibility', label: '1. Eligibility' },
  { id: 'account-registration', label: '2. Account Registration' },
  { id: 'educational-services', label: '3. Educational Services' },
  { id: 'trial-classes', label: '4. Trial Classes and Enrollments' },
  { id: 'user-conduct', label: '5. User Conduct' },
  { id: 'online-safety', label: '6. Online Safety and Child Protection' },
  { id: 'content-standards', label: '7. Content and Teaching Standards' },
  { id: 'payments', label: '8. Payments and Billing' },
  { id: 'refunds', label: '9. Refunds and Cancellations' },
  { id: 'intellectual-property', label: '10. Intellectual Property Rights' },
  { id: 'user-content', label: '11. User Content' },
  { id: 'technology', label: '12. Technology Requirements' },
  { id: 'privacy', label: '13. Privacy' },
  { id: 'international', label: '14. International Users' },
  { id: 'disclaimer', label: '15. Disclaimer of Warranties' },
  { id: 'liability', label: '16. Limitation of Liability' },
  { id: 'indemnification', label: '17. Indemnification' },
  { id: 'third-party', label: '18. Third-Party Services' },
  { id: 'suspension', label: '19. Suspension and Termination' },
  { id: 'governing-law', label: '20. Governing Law and Dispute Resolution' },
  { id: 'changes', label: '21. Changes to Terms' },
  { id: 'contact', label: '22. Contact Information' },
  { id: 'electronic-consent', label: '23. Electronic Consent' },
];

// ─── Small reusable primitives ─────────────────────────────────────────────────

function SectionHeading({ id, label }: { id: string; label: string }) {
  return (
    <h2
      id={id}
      className="mb-4 scroll-mt-32 text-xl font-black text-neutral-900 lg:text-2xl"
    >
      {label}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-5 mb-2 text-base font-bold text-neutral-800">
      {children}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm leading-relaxed text-neutral-600 lg:text-base">
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 flex flex-col gap-1.5 pl-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600 lg:text-base"
        >
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Capsule({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-red-100 bg-red-50/60 px-5 py-4 text-sm leading-relaxed font-medium text-red-700">
      {children}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      {/* Hero banner */}
      <section className="w-full border-b border-neutral-100 bg-white px-5 pt-10 pb-8 sm:px-10 lg:px-20">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400"
        >
          <Link href="/" className="transition-colors hover:text-red-500">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span className="font-semibold text-neutral-700">
            Terms &amp; Conditions
          </span>
        </nav>

        <p
          className="mb-3 text-xs font-black tracking-widest text-red-500 uppercase"
          aria-hidden="true"
        >
          ♦ Legal
        </p>
        <h1 className="mb-3 text-4xl font-black tracking-tight text-neutral-900 lg:text-5xl">
          Terms &amp; <span className="text-red-500">Conditions</span>
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
          <span>
            <strong className="text-neutral-600">Effective Date:</strong> 08 May
            2026
          </span>
          <span className="hidden sm:inline">·</span>
          <span>
            <strong className="text-neutral-600">Last Updated:</strong> 08 May
            2026
          </span>
        </div>
      </section>

      {/* Body */}
      <div className="w-full px-5 py-10 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* ── Sticky TOC - desktop only ─────────────────────────────────── */}
          <aside className="sticky top-12 hidden shrink-0 lg:block lg:w-64 xl:w-72">
            <div className="rounded-2xl border-2 border-neutral-100 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase">
                Contents
              </p>
              <nav aria-label="Table of contents">
                <ol className="flex flex-col gap-1">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-lg px-2 py-1.5 text-xs leading-snug font-medium text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────────────────── */}
          <main className="min-w-0 flex-1" id="main-content">
            {/* Intro */}
            <div className="mb-10 rounded-2xl border-2 border-red-100 bg-red-50/50 px-6 py-5">
              <p className="text-sm leading-relaxed text-neutral-700 lg:text-base">
                Welcome to{' '}
                <strong>Musicchamps Technologies Private Limited</strong>{' '}
                ("MusicChamps," "Company," "we," "our," or "us"). These Terms
                &amp; Conditions ("Terms") govern your access to and use of our
                websites, applications, learning platforms, digital services,
                and related offerings (collectively, the "Platform").
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 lg:text-base">
                By accessing, browsing, registering for, purchasing, or using
                the Platform, you agree to be legally bound by these Terms.{' '}
                <strong>
                  If you do not agree to these Terms, you must not use the
                  Platform.
                </strong>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 lg:text-base">
                If you are entering into these Terms on behalf of a child or
                minor, you represent that you are the parent or legal guardian
                of the child and consent to the child's use of the Platform.
              </p>
            </div>

            {/* Divider */}
            <div className="mb-10 h-px w-full bg-neutral-100" />

            {/* ── Section 1 ── */}
            <section className="mb-10" aria-labelledby="eligibility">
              <SectionHeading id="eligibility" label="1. Eligibility" />
              <Para>
                1.1 - The Platform is intended for users who are legally capable
                of entering into binding agreements under applicable law.
              </Para>
              <Para>
                1.2 - Musicchamps Technologies Private Limited offers music
                education services for children and adults. Users under the age
                of 18 may only use the Platform under the supervision and
                consent of a parent or legal guardian.
              </Para>
              <Para>1.3 - Parents or guardians are responsible for:</Para>
              <Bullets
                items={[
                  'Supervising minor users',
                  'Ensuring compliance with these Terms',
                  'Monitoring lesson participation',
                  'Maintaining appropriate online safety practices',
                ]}
              />
              <Para>
                1.4 - Users located in the United States acknowledge that
                Musicchamps Technologies Private Limited may collect and process
                limited personal information in compliance with applicable laws
                including the Children's Online Privacy Protection Act (COPPA),
                where applicable.
              </Para>
            </section>

            {/* ── Section 2 ── */}
            <section className="mb-10" aria-labelledby="account-registration">
              <SectionHeading
                id="account-registration"
                label="2. Account Registration"
              />
              <Para>
                2.1 - To access certain services, users may be required to
                create an account.
              </Para>
              <Para>2.2 - Users agree to:</Para>
              <Bullets
                items={[
                  'Provide accurate and complete information',
                  'Keep account credentials confidential',
                  'Promptly update information when necessary',
                  'Accept responsibility for all activities conducted through their account',
                ]}
              />
              <Para>2.3 - Users may not:</Para>
              <Bullets
                items={[
                  'Impersonate another person',
                  'Share accounts without authorization',
                  'Use false information',
                  'Create accounts for unlawful purposes',
                ]}
              />
              <Para>
                2.4 - Musicchamps Technologies Private Limited reserves the
                right to suspend or terminate accounts that violate these Terms.
              </Para>
            </section>

            {/* ── Section 3 ── */}
            <section className="mb-10" aria-labelledby="educational-services">
              <SectionHeading
                id="educational-services"
                label="3. Educational Services"
              />
              <Para>
                3.1 - Musicchamps Technologies Private Limited provides online
                music education services including but not limited to:
              </Para>
              <Bullets
                items={[
                  'Live classes',
                  'Recorded content',
                  'Practice exercises',
                  'Assessments',
                  'Student performance tracking',
                  'Workshops and educational resources',
                ]}
              />
              <Para>
                3.2 - Musicchamps Technologies Private Limited does not
                guarantee:
              </Para>
              <Bullets
                items={[
                  'Examination results',
                  'Competition outcomes',
                  'Professional music opportunities',
                  'Specific educational achievements',
                ]}
              />
              <Para>
                3.3 - Scheduling of classes may be subject to instructor
                availability, holidays, technical limitations, and operational
                requirements.
              </Para>
              <Para>
                3.4 - Musicchamps Technologies Private Limited reserves the
                right to assign or change instructors, modify curriculum, update
                lesson structures, and discontinue or replace offerings.
              </Para>
            </section>

            {/* ── Section 4 ── */}
            <section className="mb-10" aria-labelledby="trial-classes">
              <SectionHeading
                id="trial-classes"
                label="4. Trial Classes and Enrollments"
              />
              <Para>
                4.1 - Trial classes may be offered subject to availability.
              </Para>
              <Para>
                4.2 - Enrollment in paid programs may require advance payment.
              </Para>
              <Para>
                4.3 - Promotional offers, discounts, and trial access may be
                modified or withdrawn at any time.
              </Para>
              <Para>
                4.4 - Enrollment is considered complete only after successful
                payment processing.
              </Para>
            </section>

            {/* ── Section 5 ── */}
            <section className="mb-10" aria-labelledby="user-conduct">
              <SectionHeading id="user-conduct" label="5. User Conduct" />
              <Para>Users agree not to:</Para>
              <Bullets
                items={[
                  'Engage in abusive, discriminatory, threatening, or harassing conduct',
                  'Disrupt classes or platform operations',
                  'Record classes without permission',
                  'Upload unlawful or harmful content',
                  'Attempt unauthorized access to systems',
                  'Use the Platform for commercial solicitation',
                  'Infringe intellectual property rights',
                  'Misuse communication tools',
                ]}
              />
              <Capsule>
                Parents and guardians are responsible for ensuring minors comply
                with these requirements. Musicchamps Technologies Private
                Limited reserves the right to remove users or terminate services
                for inappropriate conduct.
              </Capsule>
            </section>

            {/* ── Section 6 ── */}
            <section className="mb-10" aria-labelledby="online-safety">
              <SectionHeading
                id="online-safety"
                label="6. Online Safety and Child Protection"
              />
              <Para>
                6.1 - Musicchamps Technologies Private Limited is committed to
                maintaining a safe online learning environment.
              </Para>
              <Para>
                6.2 - Lessons involving minors may be monitored or recorded for:
              </Para>
              <Bullets
                items={[
                  'Quality assurance',
                  'Teacher training',
                  'Dispute resolution',
                  'Safety compliance',
                ]}
              />
              <Para>
                6.3 - Parents or guardians consent to such monitoring and
                recording where permitted by law.
              </Para>
              <Para>
                6.4 - Musicchamps Technologies Private Limited prohibits:
              </Para>
              <Bullets
                items={[
                  'Inappropriate communication',
                  'Exploitation',
                  'Bullying',
                  'Sharing personal contact details during lessons',
                  'Any conduct violating child protection standards',
                ]}
              />
              <Para>
                6.5 - Users must immediately report safety concerns to
                Musicchamps Technologies Private Limited support.
              </Para>
            </section>

            {/* ── Section 6A ── */}
            <section className="mb-10" aria-labelledby="content-standards">
              <SectionHeading
                id="content-standards"
                label="7. Content and Teaching Standards"
              />
              <Para>
                7.1 - Musicchamps Technologies Private Limited is committed to
                providing a safe, respectful, inclusive, and professional online
                learning environment for all students, parents, instructors, and
                users.
              </Para>
              <Para>
                7.2 - All instructors, students, parents, and users are expected
                to maintain appropriate conduct during classes, communications,
                and interactions on the Platform.
              </Para>
              <Para>7.3 - The following conduct is prohibited:</Para>
              <Bullets
                items={[
                  'Abusive, threatening, discriminatory, or harassing behavior',
                  'Bullying or intimidation',
                  'Use of offensive, sexually explicit, hateful, violent, or inappropriate content',
                  'Sharing inappropriate materials during classes',
                  'Disruptive classroom behavior',
                  'Unauthorized solicitation or promotion',
                  'Inappropriate communication with minors',
                  'Attempts to bypass platform safety mechanisms',
                ]}
              />
              <Para>7.4 - Instructors are expected to:</Para>
              <Bullets
                items={[
                  'Maintain professional conduct',
                  'Provide instruction in a respectful and age-appropriate manner',
                  'Avoid inappropriate language or behavior',
                  'Comply with applicable child safety standards',
                  'Maintain confidentiality of student information',
                  'Avoid unauthorized off-platform communications with students or minors',
                ]}
              />
              <Para>
                7.5 - Musicchamps Technologies Private Limited reserves the
                right to monitor classes, review complaints, remove
                inappropriate content, replace instructors, and suspend or
                terminate access for violations.
              </Para>
              <Para>
                7.6 - Educational content and teaching methodologies may evolve
                over time to improve learning outcomes and platform quality.
              </Para>
              <Para>
                7.7 - Musicchamps Technologies Private Limited does not permit
                unlawful, infringing, defamatory, obscene, discriminatory, or
                otherwise inappropriate content on the Platform.
              </Para>
              <Para>
                7.8 - Parents and guardians are encouraged to supervise minor
                students during online sessions and promptly report concerns to
                Musicchamps Technologies Private Limited support.
              </Para>
            </section>

            {/* ── Section 7 ── */}
            <section className="mb-10" aria-labelledby="payments">
              <SectionHeading id="payments" label="8. Payments and Billing" />
              <Para>
                8.1 - Fees for classes, subscriptions, or programs shall be
                communicated prior to purchase.
              </Para>
              <Para>
                8.2 - Users authorize Musicchamps Technologies Private Limited
                and its payment service providers to process payments using the
                selected payment method.
              </Para>
              <Para>8.3 - Users are responsible for:</Para>
              <Bullets
                items={[
                  'Applicable taxes',
                  'Bank charges',
                  'Foreign exchange fees',
                  'Payment gateway charges wherever applicable',
                ]}
              />
              <Para>
                8.4 - Failure to complete payment may result in suspension of
                services.
              </Para>
              <Para>
                8.5 - Musicchamps Technologies Private Limited may use
                third-party payment processors. The Company does not store full
                payment card information unless explicitly stated.
              </Para>
              <Para>
                8.6 - Recurring subscriptions, if applicable, may automatically
                renew unless cancelled in accordance with the applicable
                cancellation policy.
              </Para>
            </section>

            {/* ── Section 8 ── */}
            <section className="mb-10" aria-labelledby="refunds">
              <SectionHeading
                id="refunds"
                label="9. Refunds and Cancellations"
              />
              <Para>
                9.1 - Refunds and cancellations shall be governed by the
                separate Refund &amp; Cancellation Policy.
              </Para>
              <Para>
                9.2 - Users are encouraged to review the applicable policy
                before purchasing services.
              </Para>
              <Para>
                9.3 - Musicchamps Technologies Private Limited reserves the
                right to deny refunds where abuse, misuse, or policy violations
                are identified.
              </Para>
            </section>

            {/* ── Section 9 ── */}
            <section className="mb-10" aria-labelledby="intellectual-property">
              <SectionHeading
                id="intellectual-property"
                label="10. Intellectual Property Rights"
              />
              <Para>
                10.1 - All Platform content including the following is owned by
                or licensed to Musicchamps Technologies Private Limited:
              </Para>
              <Bullets
                items={[
                  'Curriculum and lesson plans',
                  'Videos, graphics, and audio',
                  'Software and text',
                  'Trademarks and logos',
                  'Teaching materials and proprietary methodologies',
                ]}
              />
              <Para>
                10.2 - Users receive a limited, non-exclusive, non-transferable
                license solely for personal educational use.
              </Para>
              <Para>
                10.3 - Users may not reproduce, distribute, commercially
                exploit, reverse engineer, modify, publicly display, resell, or
                create derivative works from Platform content without written
                permission.
              </Para>
              <Para>
                10.4 - Unauthorized recording or distribution of lessons is
                prohibited.
              </Para>
            </section>

            {/* ── Section 10 ── */}
            <section className="mb-10" aria-labelledby="user-content">
              <SectionHeading id="user-content" label="11. User Content" />
              <Para>
                11.1 - Users may submit recordings, assignments, reviews,
                comments, or other materials ("User Content").
              </Para>
              <Para>
                11.2 - Users retain ownership of their User Content but grant
                Musicchamps Technologies Private Limited a worldwide,
                non-exclusive, royalty-free license to host, display, reproduce,
                use, distribute, and improve educational services, subject to
                applicable privacy laws.
              </Para>
              <Para>
                11.3 - Users represent that submitted content does not infringe
                third-party rights, is lawful, and is appropriate for
                educational use.
              </Para>
              <Para>
                11.4 - Musicchamps Technologies Private Limited may remove
                content that violates these Terms.
              </Para>
            </section>

            {/* ── Section 11 ── */}
            <section className="mb-10" aria-labelledby="technology">
              <SectionHeading
                id="technology"
                label="12. Technology Requirements"
              />
              <Para>12.1 - Users are responsible for maintaining:</Para>
              <Bullets
                items={[
                  'Stable internet access',
                  'Compatible devices',
                  'Updated software',
                  'Functioning audio/video equipment',
                ]}
              />
              <Para>
                12.2 - Musicchamps Technologies Private Limited is not
                responsible for service disruptions caused by internet failures,
                device incompatibility, third-party software issues, or force
                majeure events.
              </Para>
            </section>

            {/* ── Section 12 ── */}
            <section className="mb-10" aria-labelledby="privacy">
              <SectionHeading id="privacy" label="13. Privacy" />
              <Para>
                13.1 - Use of the Platform is subject to the Musicchamps
                Technologies Private Limited Privacy Policy.
              </Para>
              <Para>
                13.2 - Users acknowledge that personal information may be
                processed in India, the United States, or other jurisdictions
                where Musicchamps Technologies Private Limited or its service
                providers operate.
              </Para>
              <Para>
                13.3 - Musicchamps Technologies Private Limited implements
                reasonable safeguards to protect user information but cannot
                guarantee absolute security.
              </Para>
            </section>

            {/* ── Section 13 ── */}
            <section className="mb-10" aria-labelledby="international">
              <SectionHeading
                id="international"
                label="14. International Users"
              />
              <Para>
                14.1 - Users accessing the Platform from outside India
                acknowledge that cross-border data transfers may occur.
              </Para>
              <Para>
                14.2 - Users are responsible for complying with local laws
                applicable in their jurisdiction.
              </Para>
              <Para>
                14.3 - Musicchamps Technologies Private Limited makes no
                representation that the Platform is appropriate or lawful in
                every jurisdiction.
              </Para>
            </section>

            {/* ── Section 14 ── */}
            <section className="mb-10" aria-labelledby="disclaimer">
              <SectionHeading
                id="disclaimer"
                label="15. Disclaimer of Warranties"
              />
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm leading-relaxed font-medium tracking-wide text-neutral-700 uppercase lg:text-sm">
                THE PLATFORM AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS
                AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW,
                MUSICCHAMPS TECHNOLOGIES PRIVATE LIMITED DISCLAIMS ALL
                WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, NON-INFRINGEMENT, CONTINUOUS AVAILABILITY, AND
                ERROR-FREE OPERATION.
              </div>
              <Para>
                <span className="mt-3">
                  Musicchamps Technologies Private Limited does not guarantee
                  uninterrupted access or error-free services.
                </span>
              </Para>
            </section>

            {/* ── Section 15 ── */}
            <section className="mb-10" aria-labelledby="liability">
              <SectionHeading
                id="liability"
                label="16. Limitation of Liability"
              />
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm leading-relaxed font-medium tracking-wide text-neutral-700 uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MUSICCHAMPS TECHNOLOGIES
                PRIVATE LIMITED SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
                CONSEQUENTIAL, OR SPECIAL DAMAGES, INCLUDING LOST PROFITS, DATA
                LOSS, EMOTIONAL DISTRESS, OR EDUCATIONAL OUTCOMES.
              </div>
              <Para>
                <span className="mt-3">
                  Musicchamps Technologies Private Limited's total liability
                  arising from use of the Platform shall not exceed the amount
                  paid by the user during the preceding three (3) months.
                </span>
              </Para>
              <Para>
                Certain jurisdictions may not allow some liability limitations.
                In such cases, limitations shall apply to the maximum extent
                permitted by law.
              </Para>
            </section>

            {/* ── Section 16 ── */}
            <section className="mb-10" aria-labelledby="indemnification">
              <SectionHeading
                id="indemnification"
                label="17. Indemnification"
              />
              <Para>
                Users agree to indemnify and hold harmless Musicchamps
                Technologies Private Limited, its affiliates, directors,
                employees, contractors, instructors, and partners from claims
                arising out of:
              </Para>
              <Bullets
                items={[
                  'Violation of these Terms',
                  'Misuse of the Platform',
                  'Infringement of third-party rights',
                  'Unlawful conduct',
                ]}
              />
            </section>

            {/* ── Section 17 ── */}
            <section className="mb-10" aria-labelledby="third-party">
              <SectionHeading
                id="third-party"
                label="18. Third-Party Services"
              />
              <Para>
                18.1 - The Platform may integrate with third-party tools
                including:
              </Para>
              <Bullets
                items={[
                  'Payment processors',
                  'Video conferencing platforms',
                  'Analytics providers',
                  'Communication systems',
                ]}
              />
              <Para>
                18.2 - Musicchamps Technologies Private Limited is not
                responsible for third-party services, policies, or outages.
              </Para>
              <Para>
                18.3 - Use of third-party services may be governed by separate
                terms and policies.
              </Para>
            </section>

            {/* ── Section 18 ── */}
            <section className="mb-10" aria-labelledby="suspension">
              <SectionHeading
                id="suspension"
                label="19. Suspension and Termination"
              />
              <Para>
                19.1 - Musicchamps Technologies Private Limited may suspend or
                terminate access for:
              </Para>
              <Bullets
                items={[
                  'Policy violations',
                  'Abusive conduct',
                  'Fraudulent activity',
                  'Non-payment',
                  'Security concerns',
                ]}
              />
              <Para>
                19.2 - Users may discontinue use of the Platform at any time.
              </Para>
              <Para>
                19.3 - Certain provisions including intellectual property,
                liability limitations, dispute resolution, and indemnity shall
                survive termination.
              </Para>
            </section>

            {/* ── Section 19 ── */}
            <section className="mb-10" aria-labelledby="governing-law">
              <SectionHeading
                id="governing-law"
                label="20. Governing Law and Dispute Resolution"
              />
              <Para>
                20.1 - These Terms shall be governed by the laws of India unless
                otherwise required by applicable consumer protection laws.
              </Para>
              <Para>
                20.2 - Any disputes shall first be attempted to be resolved
                amicably.
              </Para>
              <Para>
                20.3 - If unresolved, disputes shall be subject to arbitration
                in Hyderabad, Telangana, India, in accordance with applicable
                arbitration laws.
              </Para>
              <Para>
                20.4 - Nothing in these Terms limits rights available under
                mandatory consumer protection laws applicable in the user's
                jurisdiction.
              </Para>
            </section>

            {/* ── Section 20 ── */}
            <section className="mb-10" aria-labelledby="changes">
              <SectionHeading id="changes" label="21. Changes to Terms" />
              <Para>
                21.1 - Musicchamps Technologies Private Limited may update these
                Terms periodically.
              </Para>
              <Para>
                21.2 - Updated Terms shall become effective upon posting.
              </Para>
              <Para>
                21.3 - Continued use of the Platform after updates constitutes
                acceptance of revised Terms.
              </Para>
            </section>

            {/* ── Section 21 ── */}
            <section className="mb-10" aria-labelledby="contact">
              <SectionHeading id="contact" label="22. Contact Information" />
              <Para>
                For questions, complaints, or legal notices, users may contact:
              </Para>
              <div className="mt-4 overflow-hidden rounded-2xl border-2 border-red-100 bg-white">
                <div className="border-b border-red-50 bg-red-500/5 px-6 py-3">
                  <p className="text-sm font-black text-red-500">
                    Musicchamps Technologies Private Limited
                  </p>
                </div>
                <div className="flex flex-col gap-3 px-6 py-5">
                  <div className="flex items-start gap-3 text-sm text-neutral-600">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                      aria-hidden="true"
                    />
                    <span>
                      G-305 Aparna Cyberzon, Kanchigachibowli Road, Lingampalli,
                      Serilingampally, K.V. Rangareddy – 500019, Telangana
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Mail
                      className="h-4 w-4 shrink-0 text-red-400"
                      aria-hidden="true"
                    />
                    <a
                      href="mailto:contact@musicchamps.com"
                      className="font-medium text-red-500 hover:underline"
                    >
                      contact@musicchamps.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Globe
                      className="h-4 w-4 shrink-0 text-red-400"
                      aria-hidden="true"
                    />
                    <a
                      href="https://musicchamps.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-red-500 hover:underline"
                    >
                      musicchamps.com
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Section 22 ── */}
            <section className="mb-10" aria-labelledby="electronic-consent">
              <SectionHeading
                id="electronic-consent"
                label="23. Electronic Consent"
              />
              <Capsule>
                By clicking "I Agree," "Sign Up," "Enroll," "Purchase," or by
                using the Platform, users acknowledge that they have read these
                Terms, understand these Terms, consent to electronic agreements,
                and agree to be legally bound by these Terms.
              </Capsule>
            </section>

            {/* Footer note */}
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-6 py-5 text-center text-xs text-neutral-400">
              These Terms &amp; Conditions were last updated on{' '}
              <strong className="text-neutral-600">08 May 2026</strong>. Please
              review them periodically for any changes.
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
