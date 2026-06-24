'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * ─── Button Variant Map ──────────────────────────────────────────────────────
 *
 * default      → Red filled + glassy hover glow  (Begin Your Journey, Register Now)
 * outline      → Red border + black text         (Learn More, Know More About Us)
 * ghost-red    → Gray border + red text + tinted bg  (View more)
 * soft-red     → Red border + red text + light gradient bg  (Book Your Trial Class)
 * nav-outline  → Dashed border + red text        (Contact Us in Navbar)
 * nav-solid    → Solid red + white text           (Book a Demo in Navbar)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

const buttonVariants = cva(
  // ── Shared base ──────────────────────────────────────────────────────────
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-2',
    'rounded-xl border whitespace-nowrap font-bold',
    'transition-all duration-200 outline-none select-none cursor-pointer',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'px-7 py-3 h-fit text-base',
  ],
  {
    variants: {
      variant: {
        // ── 1. Default — red filled, glassy on hover ─────────────────────
        // Used: "Begin Your Journey" (HeroSection), "Register Now" (CourseDetail, EventsSection, CTABanner)
        default: [
          'bg-primary text-white border-transparent',
          'shadow-[0_2px_8px_rgba(229,62,62,0.35)]',
          // hover: glassy layered glow — matches screenshot 1 & 8
          'hover:shadow-[0_0_24px_8px_rgba(229,62,62,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]',
          'hover:brightness-110',
        ],

        // ── 2. Outline — red border + black text ─────────────────────────
        // Used: "Learn More" (AboutSection), "Know More About Us" (ImpactSection)
        outline: [
          'bg-white text-neutral-900 border-2 border-primary',
          'hover:bg-primary hover:text-white',
        ],

        // ── 3. Ghost Red — neutral border + red text + tinted bg ─────────
        // Used: "View more" (CoursesSection course cards)
        'ghost-red': [
          'bg-red-50 text-primary border-2 border-neutral-200',
          'hover:border-primary hover:bg-red-100',
        ],

        // ── 4. Soft Red — red border + red text + gradient bg ────────────
        // Used: "Book Your Trial Class" (HowItWorksSection)
        'soft-red': [
          'bg-gradient-to-r from-white to-red-100 text-primary border-2 border-primary',
          'font-black',
          'hover:from-red-50 hover:to-red-200',
          'hover:shadow-[0_0_20px_4px_rgba(229,62,62,0.2)]',
        ],

        // ── 5. Nav Outline — dashed border + red text ────────────────────
        // Used: "Contact Us" button in Navbar
        'nav-outline': [
          'bg-white text-primary border-2 border-dashed border-primary/60',
          'hover:border-primary hover:bg-red-50',
        ],

        // ── 6. Nav Solid — solid red, white text ─────────────────────────
        // Used: "Book a Demo" button in Navbar
        'nav-solid': [
          'bg-primary text-white border-transparent',
          'hover:bg-red-600',
          'shadow-[0_2px_12px_rgba(229,62,62,0.4)]',
          'hover:shadow-[0_4px_20px_rgba(229,62,62,0.55)]',
        ],

        // ── Legacy pass-through variants (kept for compatibility) ─────────
        secondary:
          'bg-neutral-900 text-white border-transparent hover:bg-neutral-800',
        ghost:
          'bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100',
        destructive:
          'bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20',
        link: 'text-primary underline-offset-4 hover:underline border-transparent bg-transparent px-0 py-0',
      },

      size: {
        default: 'px-7 py-3 text-base',
        sm: 'px-5 py-2 text-sm rounded-lg',
        lg: 'px-9 py-4 text-lg rounded-2xl',
        icon: 'p-2.5 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
