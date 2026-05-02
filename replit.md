# ATLAS LONEWOLF Portfolio

## Project Overview
A personal portfolio website for "Atlas Lonewolf", a Junior Full-Stack Developer. Built with React 19, TypeScript, Vite 6, and Tailwind CSS v4. Features bilingual support (EN/FR), dark/light theme toggle, smooth page transitions (Framer Motion + GSAP ScrollTrigger), and a contact form wired to Resend.

## Architecture

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animations**: Framer Motion (motion/react), GSAP + ScrollTrigger
- **Routing**: React Router DOM v7 (with ScrollToTop on navigation)
- **Icons**: Lucide React
- **Email**: Resend API via `api/contact.ts` serverless function

## Pages
- `/` — Home: Editorial hero, services, tech marquee, featured works, contact CTA
- `/works` — Works: Full project case studies
- `/skills` — Skills: Skill badges and tech stack
- `/about` — About: Bio, photo, contact form
- `/cv` — CV: Downloadable résumé

## Key Components
- `Navbar` — Sticky navigation with theme/language toggles
- `TechMarquee` — Infinite dual-track marquee with devicon logos
- `ThemeContext` — Light/dark mode (`.dark` class on `<html>`)
- `LanguageContext` — EN/FR translations
- `ErrorBoundary` — Wraps BackgroundScene gracefully
- `ScrollToTop` — Inline in App.tsx; resets scroll on route change

## Hero Design
- Portrait fills right 58% as absolute-positioned background (hidden on mobile `< sm`)
- Text column is full-width on mobile, capped at 52% on `sm+`
- SVG grain overlay (`opacity: 0.038`, `mix-blend-mode: overlay`) for editorial texture

## CSS Tokens (`src/index.css`)
- `--color-primary`: `oklch(46% 0.18 150)` light / `oklch(72% 0.20 150)` dark
- Dark mode via `.dark` class
- `--filter-on-dark-bg` / `--filter-on-light-bg` for logo inversion in marquee
- `.grain::after` — SVG feTurbulence noise overlay

## Deployment (Vercel)
- `vercel.json` — SPA rewrite (`/*` → `/index.html`) + API route (`/api/*`)
- `api/contact.ts` — Resend serverless function; requires `RESEND_API_KEY` in Vercel dashboard
- PWA: `public/manifest.json`, theme-color meta in `index.html`

## Dev Setup
- Run: `npm run dev` → Vite on port 5000 (host `0.0.0.0`, `allowedHosts: true`)
- Build: `npm run build` → outputs to `dist/`

## Assets to Replace
- Portrait: place own photo at `/public/atlas.png` and update `src` in Home.tsx hero
- CV PDF: place at `/public/atlas-cv.pdf`

## Environment Variables
- `RESEND_API_KEY` — Required for contact form (set in Replit secrets + Vercel dashboard)
