# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Run ESLint across all source files
```

Pre-commit hooks run automatically on `git commit`: ESLint auto-fix on JS/TS/TSX files, Prettier format on JSON/CSS/MD files. Commit messages must follow Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `perf:`, `test:`, `docs:`).

## Architecture

### Routing & Page Structure

Next.js App Router. Each route in `app/` is a thin server component that imports the real page from `features/`:

```
app/page.tsx              → features/home/HomePage.tsx
app/about-us/page.tsx     → features/about-us/AboutPage.tsx
app/courses/page.tsx      → features/courses/CoursePage.tsx
app/courses/[slug]/page.tsx → app/courses/[slug]/CourseClientContent.tsx  (client)
app/contact-us/page.tsx   → features/contact-us/section/ContactUs.tsx
```

The dynamic course slug page (`app/courses/[slug]/page.tsx`) is an async server component that resolves params, calls `getCourseBySlug()`, and passes the result into `CourseClientContent` (a `'use client'` component).

### Data Layer

All course data lives in `data/courses.ts` as a static typed array. The `Course` type is defined there. Helper functions `getCourseBySlug(slug)` and `getRelatedCourses(slug, count)` are co-located in the same file. `features/courses/content.ts` is a separate file with animation variants and supplemental UI data for the courses listing page — these are two distinct concerns, not duplicate data sources.

### Framer Motion Setup

`LazyMotion` with `domAnimation` features is loaded once in `app/layout.tsx`. All animated components must use `m.*` (from `framer-motion`) instead of `motion.*` to stay within the lazy bundle. Reusable animation variants are in `lib/animations.ts` (`fadeUp`, `fadeLeft`, `fadeRight`, `stagger`, `cardVariants`). Each variant follows `hidden` / `visible` state names.

### Fonts

Three Sequel Sans font instances are registered with `next/font/local` in `app/fonts.tsx`: `sequelDisplay` (Display optical size), `sequelBody` (Body), `sequelHead` (Head). Each exposes a CSS variable (`--font-sequel-display`, `--font-sequel-body`, `--font-sequel-head`). The `.variable` class (not `.className`) is applied to `<html>` in `layout.tsx` so all CSS vars are available globally. Tailwind maps these via `@theme` in `globals.css`.

### Styling

Tailwind v4 with `@theme inline` in `globals.css`. Design tokens:
- **Primary red:** `#e53e3e` (mapped to `--primary`, use `bg-primary` / `text-primary`)
- **Secondary dark:** `#121212` (mapped to `--secondary`)
- Radius scale: `--radius: 0.625rem` with `sm` through `4xl` calc variants

The `cn()` utility (`lib/utils.ts`) combines `clsx` + `tailwind-merge`. Always use `cn()` for conditional class composition.

### SEO

Use `buildMetadata(title, description)` from `lib/seo/metadata.ts` for page-level exports. It populates `title`, `openGraph`, and `twitter` fields. Site-level config (name, URL, socials) lives in `config/site.ts`.

### Components

- `components/ui/` — shadcn/ui base components (Base UI headless layer, not Radix)
- `components/layout/` — `Navbar`, `Footer`, `PageLoader`, `PageTransition`, `ScrollToTop`
- `features/<page>/` — all page-specific sections; self-contained, not shared across features
- Navigation link definitions are in `config/nav.ts`

### Forms (Currently UI-only)

`ContactFormSection`, the newsletter input in `Footer`, and the "Book a Demo" CTA in `Navbar` have no backend wiring yet. Form state is local `useState` only.
