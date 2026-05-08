# TCHOHLO K. Honore — Portfolio

Personal portfolio for **TCHOHLO K. Honore**, junior full-stack developer.  
Built with React 19, Vite 6, TypeScript, and Tailwind CSS v4.

---

## Stack

| Layer      | Tech                                |
| ---------- | ----------------------------------- |
| Framework  | React 19 + TypeScript               |
| Build      | Vite 6                              |
| Styling    | Tailwind CSS v4                     |
| Animations | Framer Motion, GSAP + ScrollTrigger |
| Routing    | React Router DOM v7                 |
| Email      | Resend API (serverless)             |
| Deployment | Vercel                              |

---

## Pages

| Route     | Description                                         |
| --------- | --------------------------------------------------- |
| `/`       | Home — editorial hero, tech marquee, featured works |
| `/works`  | Works — project case studies                        |
| `/skills` | Skills — tech stack & skill groups                  |
| `/about`  | About — bio & contact form                          |
| `/cv`     | CV — downloadable résumé                            |
| `*`       | 404 — countdown redirect to home                    |

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5000
npm run build      # production build → dist/
```

---

## Environment Variables

| Variable         | Where           | Purpose                 |
| ---------------- | --------------- | ----------------------- |
| `RESEND_API_KEY` | Resend Platform | Powers the contact form |

---

## Deployment

The project is configured for **Vercel**:

- `vercel.json` handles SPA routing (no 404 on refresh) and routes `/api/*` to serverless functions
- `api/contact.ts` — Resend serverless function for the contact form
- `public/manifest.json` — PWA manifest

To deploy: push to GitHub and connect the repo in the Vercel dashboard. Add `RESEND_API_KEY` in Vercel → Settings → Environment Variables.

---

## Assets

| File                | Purpose       |
| ------------------- | ------------- |
| `public/atlas.webp` | Hero portrait |
| `public/brand.ico`  | Site favicon  |
| `public/cv.pdf`     | CV download   |

---

## Features

- Bilingual — English / French
- Dark / Light mode
- Responsive — mobile first
- Grain texture overlay on hero
- Infinite tech marquee (devicon logos)
- Contact form → email via Resend
- Auto scroll-to-top on navigation
- 404 page with 5-second countdown redirect
