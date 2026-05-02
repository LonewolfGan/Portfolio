# ATLAS LONEWOLF Portfolio

## Project Overview
A personal portfolio website for "Atlas Lonewolf", a Junior Full-Stack Developer. Built with React, TypeScript, Vite, and Tailwind CSS v4. Features multilingual support (EN/FR), dark/light theme toggle, animated 3D particle background (Three.js), and smooth page transitions (Framer Motion + GSAP).

## Architecture

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Animations**: Framer Motion (motion/react), GSAP + ScrollTrigger, Three.js particles
- **Routing**: React Router DOM v7
- **Icons**: Lucide React

## Pages
- `/` — Home: Hero, Services, Featured Works, Contact CTA
- `/works` — Works: Full project case studies
- `/skills` — Skills: Skill badges and tech stack
- `/about` — About: Bio, photo, contact info

## Key Components
- `BackgroundScene` — Three.js WebGL particle system (gracefully degrades if WebGL unavailable)
- `Navbar` — Sticky navigation with theme/language toggles
- `ThemeContext` — Light/dark mode
- `LanguageContext` — EN/FR translations

## Notes
- BackgroundScene (Three.js particles) is wrapped in an ErrorBoundary — degrades gracefully in environments without WebGL (e.g. Replit preview); works fully on Vercel
- Hero image uses an "out of box" layout: floating pill, GitHub stat card, and tech stack badge appear around the main card frame via Framer Motion with staggered delays

## Dev Setup
- Run: `npm run dev` → starts Vite dev server on port 5000 (0.0.0.0)
- Build: `npm run build` → outputs to `dist/`
- Deployment: Static site (`dist/` directory)

## Environment Variables
- `GEMINI_API_KEY` — Optional, for Gemini AI API calls (injected at runtime)
- `APP_URL` — Optional, the hosted URL of this app
