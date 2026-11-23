<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

## The CV is the only source of truth

- The profile copy comes from `public/miguel-barra-cv-es.pdf` (primary) and `public/miguel-barra-cv-en.pdf`. Read them before changing anything about experience, dates, roles, technologies, figures, projects or metadata.
- Never invent or embellish experience, responsibilities, figures or achievements. If the site says something the CV doesn't, flag it and ask; don't delete or rewrite it on your own.
- If the Spanish and English CVs disagree, don't pick one silently: report the difference to the owner.
- README.md ("Content source of truth") maps every profile section to its file.

## Ask before

- Architecture or folder structure changes, visible design changes, removing sections or content, new dependencies, or major dependency updates.
- Any decision about how the professional profile is presented.
- Keep the visual identity (palette, typography, layout, animations); touch styles only to fix a concrete problem and say which.

## Commands

All verified with Node 26 / npm 11:

```bash
npm ci              # install from the lockfile
npm run dev         # http://localhost:3000 (rewrites the Next.js block at the top of this file)
npm run lint        # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck   # next typegen && tsc --noEmit; works without a previous build
npm test            # Vitest, *.test.ts next to the code they cover
npm run build       # production build; fails if a language is missing a string
```

`lint`, `typecheck`, `test` and `build` must pass before every commit. Never disable lint rules, use `any` or `@ts-ignore`, or delete tests to make them pass.

## Conventions

- Content: `content/es.ts`, `content/en.ts` and `content/shared.ts` (untranslated data). Components never hold copy.
- Never link to GitHub repositories from the site: they are private. Link a project only to its production version or its case study.
- Errors: `app/[lang]/error.tsx` is a Client Component; its copy comes from the dictionary through `ErrorCopyProvider` (set in `app/[lang]/layout.tsx`). Client-only features that can fail (the WebGL hero) get their own boundary with `catchError` from `next/error`, so a failure never takes the whole page down.
- Responsive: no horizontal scroll from 320px up (WCAG 1.4.10). Chakra's `sm` breakpoint is 480px.
- Motion: every animation respects `prefers-reduced-motion` (global rule in `lib/theme.ts`, `MotionConfig reducedMotion="user"`, `usePrefersReducedMotion` for the 3D scene). Timings come from `lib/motion.ts`.

## Every text exists in both languages

The site is bilingual: Spanish (primary) and English.

- Never write user-facing text directly in a component. That covers visible copy, button labels, `alt`, `aria-label`, `title`, metadata and OG images.
- Add every new string to **both** `content/es.ts` and `content/en.ts`, and extend `content/types.ts` when you add a new field. `npm run build` fails if a language is missing a string.
- Translate naturally, not literally, and keep the same narrative and structure in both languages. Proper and product names stay untranslated (Pulso, Pulso UF y Dólar, Tasklane, linear-issue-to-pr, DOM Digital, ITS Solutions, E-Hive, iSalud, Forcast, Valuesite, Ewreka, Universidad Andrés Bello).
- Server Components read text with `await getContent()` from `@/content`. Client Components receive it as props. Route handlers (OG images, sitemap) use `contentFor(locale)` from `@/content/dictionaries`.
- Internal links in the dictionaries include the locale prefix; build them with `route(locale, path)` from `@/lib/i18n`.
