# Miguel Barra — Portfolio

Personal portfolio of Miguel Barra, full stack developer in Santiago de Chile. The site is in Spanish (primary) and English.
The design comes from the static prototype in `references/portfolio-miguel-barra/` and takes inspiration from [craftz.dog](https://github.com/craftzdog/craftzdog-homepage).

## Stack

- **Next.js 16** (App Router) + **TypeScript** (strict)
- **Chakra UI v3**: tokens from the prototype, with `_light` / `_dark` values (`lib/theme.ts`)
- **next-themes**: follows the system color scheme and remembers the user's choice in `localStorage` (`theme`)
- **@react-three/fiber + drei**: renders the voxel hero scene (retro monitor + typing cat) (`components/voxel/`)
- **motion** (Framer Motion): section and page-entry animations
- **next/font/local**: M PLUS Rounded 1c, self-hosted Latin subset for weights 700 and 800 (`app/fonts/`, SIL OFL 1.1)
- **Vercel Analytics + Speed Insights**
- **Vitest**: unit tests for content, helpers and config (`*.test.ts`, Node environment)

## Content source of truth: the CV

The CV PDFs in `public/` are the only source of truth for the profile:

- `public/miguel-barra-cv-es.pdf` (Spanish, primary) and `public/miguel-barra-cv-en.pdf` (English). Paths in `CV_FILES`, `content/shared.ts`. Each language's site downloads its own CV.
- `/cv-miguel-barra-es.pdf` is the former URL; `next.config.ts` redirects it (308) to the Spanish CV. Don't put a file back at that path.
- Every claim on the site (experience, dates, technologies, figures, projects, metadata, JSON-LD) must appear in the CV. Don't add or embellish anything that isn't there; ask the owner instead.

Where the profile lives:

| Section | Where |
|---|---|
| Title, description (metadata, OG, JSON-LD) | `site` in `content/es.ts` / `content/en.ts`; JSON-LD in `lib/structured-data.ts` |
| Name, degree, tagline, availability, photo alt | `hero` |
| "Qué hago" paragraph and stats | `intro` |
| Featured projects | `projects` (+ thumbnails in `components/home/project-thumbnails.tsx`, mapped by slug in `projects.tsx`) |
| Client work | `clientCases` |
| Timeline | `timeline` |
| Stack | `STACK_CURRENT` / `STACK_ALSO` in `content/shared.ts` |
| Contact (email, GitHub, LinkedIn) | `content/shared.ts` + `contact` |
| Pulso case study | `pulsoCase` |

### Updating the CV

1. Replace the PDFs in `public/` keeping the same file names (or update `CV_FILES` and the tests if the names change).
2. Read both PDFs and compare them with the sections above, in both dictionaries.
3. Run the checks below.

## Project structure

```
proxy.ts             redirects unprefixed URLs to /es or /en (cookie > Accept-Language > Spanish)
app/
  [lang]/            routes per language: /es, /en, /{lang}/projects/pulso, OG images, 404
  sitemap.ts, robots.ts, icon.svg, fonts/
content/
  types.ts           Content type every language must satisfy
  es.ts, en.ts       ALL site copy per language, UI strings included — edit text here
  shared.ts          data that isn't translated (URLs, email, stack names, files)
  content.test.ts    es/en parity, locale-prefixed links, files referenced from public/
components/
  layout/            navbar (with mobile menu), language switcher, theme toggle, footer, skip link
  home/              home page sections
  pulso/             Pulso case study sections
  ui/                shared building blocks (Section, headings, links, badges, screenshots)
  voxel/             3D scene: retro CRT monitor with an animated screen and a cat typing in front of it (InstancedMesh + orthographic isometric camera)
lib/
  i18n.ts            locales, default locale, cookie name, path and Accept-Language helpers
  metadata.ts        shared Open Graph fields and hreflang alternates
  structured-data.ts JSON-LD (Person, Pulso case study)
  og-image.tsx       shared 1200×630 Open Graph card
  theme.ts           Chakra system and color tokens
  voxel-monitor.ts   monitor model, palette and screen states (prompt, cursor, smiley)
  voxel-cat.ts       cat + keyboard model, palette and typing paws, in front of the monitor
public/              CVs, profile photo, Pulso screenshots
references/          original HTML prototype (reference only; excluded from build, TS and ESLint)
next.config.ts       security headers (CSP) and the old CV URL redirect
```

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run typecheck   # next typegen + tsc, no build needed
npm test            # Vitest (npm run test:watch while developing)
npm run build
```

Run lint, typecheck, test and build before every commit. Never silence a check to make it pass (no disabled lint rules, `any`, `@ts-ignore`, or deleted tests).

## Images

- Profile photo: `public/avatar.png` (square; path in `AVATAR`, `content/shared.ts`; alt text in `hero.avatarAlt`). `next/image` serves a resized copy inside the 100 px circle.
- Pulso screenshots: `public/pulso-*.png` (sizes in `content/shared.ts`, alt text per language in `pulsoCase.screenshots`).

## Languages

- Routes are prefixed: `/es/...` and `/en/...`. `proxy.ts` redirects any unprefixed URL (307) using the `NEXT_LOCALE` cookie first, then `Accept-Language` (English when it's the highest-weighted supported language), otherwise Spanish.
- The ES | EN switcher keeps the current page and stores `NEXT_LOCALE` for a year.
- Each page has hreflang alternates (es, en, x-default → es); `sitemap.xml` lists both versions of every route.
- Every new string goes into **both** `content/es.ts` and `content/en.ts`; the `Content` type makes the build fail if one is missing.

## Deviations from the prototype

- **Light-mode contrast (WCAG AA).** Three light-mode tokens were darkened: link `#3d7aed → #2b5fc4`, button `#319795 → #2C7A7B`, ghost `#2C7A7B → #285E61`. Dark mode is unchanged.
- **"Siguiente: Pulso UF y Dólar"** links to `/#proyectos` because the extension has no case page yet.
- **Navbar** is the same on every page. "Proyectos" is highlighted inside `/projects/*`.
- **Responsive layout** (the prototype is desktop-only). Below 768 px the navbar collapses into a hamburger menu, and below 480 px grids stack into one column.
- **Hero scene.** The prototype's voxel Andes (`andes-voxel.svg`) was replaced by a voxel retro CRT monitor. Its screen loops between a `>_` prompt with a blinking cursor and a smiley, and stays on the smiley with reduced motion. In front of it, an orange tabby cat seen from behind types on a retro keyboard, its paws tapping in turns (they rest with reduced motion). The beige casing and the cat's fur, cream and nose are new colors. The rest reuses the prototype palette (`#16171a`, `#88ccca` also used for the cat's eyes, `#9AE6B4`, `#3a3c42`).

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New… → Project** and import the repository. The framework preset (Next.js), build command (`npm run build`) and output are detected automatically.
3. Optional: in **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to the canonical domain (`https://www.miguelbarra.cl`; the apex `miguelbarra.cl` redirects to it). If it is not set, metadata, the sitemap and robots use Vercel's production URL (`VERCEL_PROJECT_PRODUCTION_URL`).
4. Deploy. Every push to `main` then deploys to production, and every other branch gets a preview URL.
5. If you add a custom domain later, add it under **Settings → Domains** and update `NEXT_PUBLIC_SITE_URL`.
