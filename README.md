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
components/
  layout/            navbar (with mobile menu), language switcher, theme toggle, footer, skip link
  home/              home page sections
  pulso/             Pulso case study sections
  ui/                shared building blocks (Section, headings, links, badges, screenshots)
  voxel/             3D scene: retro CRT monitor with an animated screen and a cat typing in front of it (InstancedMesh + orthographic isometric camera)
lib/
  i18n.ts            locales, default locale, cookie name, path and Accept-Language helpers
  theme.ts           Chakra system and color tokens
  voxel-monitor.ts   monitor model, palette and screen states (prompt, cursor, smiley)
  voxel-cat.ts       cat + keyboard model, palette and typing paws, in front of the monitor
references/          original HTML prototype (reference only; excluded from build, TS and ESLint)
```

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Placeholders to replace

The Pulso screenshots live in `public/pulso-*.png` (sizes in `content/shared.ts`, alt text per language in `pulsoCase.screenshots`).

| What | Where | How to replace |
|---|---|---|
| Profile photo (shows "MB") | `Avatar` in `components/home/identity.tsx` | Add the image to `public/` and render it with `next/image` inside the 100 px circle. Update `hero.avatarAlt` in `content/es.ts` and `content/en.ts`. |
| English CV | `public/cv-miguel-barra-en.pdf` | Add the PDF, then set `CV_FILES.en` in `content/shared.ts` to `/cv-miguel-barra-en.pdf` and change the English button label ("Download CV (Spanish, PDF)") in `content/en.ts`. Until then the English site downloads the Spanish CV. |

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
