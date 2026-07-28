# Lighthouse audit — PMB-030

Audited with Lighthouse 13.4.1 against a production build (`next build && next start`)
on `http://localhost:3200/`, `--only-categories=performance,accessibility,best-practices,seo`.
Raw reports are regenerated locally via the same command (not committed — see
`.gitignore`) and are not a fixed CI gate, so scores will vary run to run.

## Scores

| Category       | Before | After |
| -------------- | -----: | ----: |
| Performance    |     45 |    89 |
| Accessibility  |     96 |    96 |
| Best Practices |    100 |   100 |
| SEO            |    100 |   100 |

Accessibility and SEO were already ≥90 before any change; both remain ≥90 after.

## Fixed

### 1. CTA button contrast (`color-contrast`)

White text on `--brand-teal-500` (`#319795`) was 3.51:1 against WCAG AA's 4.5:1
minimum for normal text. Added `--brand-teal-700` (`#215c5d`) and moved the
`Button` solid variant from `teal-500 → teal-600` (5.03:1) with `hover:teal-700`.
`teal-500` itself is untouched everywhere else (icons, focus rings) — see
`app/globals.css` and `components/button.tsx`.

### 2. "Pulso" inline link (`color-contrast` + `link-in-text-block`)

The light-theme `--link` (`#3d7aed`) was 3.3:1 against `--bg`. Darkened to
`#155ce2` (same hue, 4.69:1) — see `app/globals.css`. That darkening dropped
the link's contrast against the surrounding paragraph text (`#1a202c`) to
2.84:1, below the 3:1 `link-in-text-block` (WCAG 1.4.1, use of color) needs
when color is the only differentiator. Fixed by making the underline
permanent instead of hover-only, so the link no longer relies on color alone
— see `app/page.tsx`. Dark theme's `--link` (`#ff63c3`) already passed at
6.05:1 and was left unchanged.

### 3. Font preload bug (performance: LCP 14.4s → 3.7s)

`M_PLUS_Rounded_1c` was configured with `subsets: ["latin"]`, but this
Next.js build preloaded all 120 unicode-range chunks of the font regardless
of `subsets` (~1.7MB, mostly CJK ranges irrelevant to this Spanish-language
site) — visible as 120 `<link rel="preload" as="font">` tags in the response
HTML. Set `preload: false` in `app/layout.tsx`; `display: "swap"` was
already in place, so disabling preload just lets the browser's native
unicode-range matching fetch only the 1-2 chunks actually needed. Total page
weight dropped from ~2.1MB to ~450KB.

This wasn't anticipated by the ticket (which expected Three.js to dominate)
but was the single largest fix available, so it's treated as critical rather
than documented-only.

## Documented, not fixed

### Footer copyright text contrast (`color-contrast`)

`© 2026 Miguel Barra. Todos los derechos reservados.` renders at `opacity-40`,
giving ~2.37:1 against `--bg` (light) — below WCAG AA's 4.5:1. This matches
`/legacy-reference`'s deliberate design choice (`.footer { opacity: .4 }`) to
visually de-emphasize legal boilerplate. Left as-is: raising it to 4.5:1
would require a near-opaque footer, which contradicts the intended visual
hierarchy for the least important text on the page. Lowest-impact of the
findings — informational copyright text, not interactive content.

### Remaining performance headroom (LCP still 3.7s / score 0.57)

After the font fix, the largest remaining weight is the JS bundle
(`unused-javascript`, `legacy-javascript-insight`, `network-dependency-tree-insight`
all flagged) — dominated by the Three.js mascot scene. It's already lazy-loaded
via `next/dynamic(..., { ssr: false })` (PMB-012), which keeps it out of the
initial SSR payload and off the main thread during hydration; the remaining
cost is the unavoidable weight of shipping a WebGL library at all. Not pursued
further here: replacing or removing the Three.js scene is a product decision
outside this audit's scope, not a Lighthouse-config fix.
