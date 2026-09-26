<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

## Every text exists in both languages

The site is bilingual: Spanish (primary) and English.

- Never write user-facing text directly in a component. That covers visible copy, button labels, `alt`, `aria-label`, `title`, metadata and OG images.
- Add every new string to **both** `content/es.ts` and `content/en.ts`, and extend `content/types.ts` when you add a new field. `npm run build` fails if a language is missing a string.
- Translate naturally, not literally, and keep the same narrative and structure in both languages. Proper and product names stay untranslated (Pulso, Pulso UF y Dólar, DOM Digital, E-Hive, iSalud, Forcast, Valuesite, Ewreka, Universidad Andrés Bello).
- Server Components read text with `await getContent()` from `@/content`. Client Components receive it as props. Route handlers (OG images, sitemap) use `contentFor(locale)` from `@/content/dictionaries`.
- Internal links in the dictionaries include the locale prefix; build them with `route(locale, path)` from `@/lib/i18n`.
