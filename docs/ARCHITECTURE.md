# Architecture Documentation

This document describes the technical architecture, component design, state management, and performance strategy for Miguel Barra's Developer Portfolio.

---

## 1. High-Level Architecture

The application is built on **Next.js 16 (App Router)** and **React 19**, deployed as a hybrid server-rendered static site with client-side interactive islands.

```
+-----------------------------------------------------------------------+
|                           Root Layout                                 |
|                       (app/layout.tsx)                                |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  |                      ThemeProvider                              |  |
|  |                 (app/theme-provider.tsx)                        |  |
|  |                                                                 |  |
|  |  +-----------------------------------------------------------+  |  |
|  |  |                     Navbar                                |  |  |
|  |  |           (components/navbar.tsx)                         |  |  |
|  |  +-----------------------------------------------------------+  |  |
|  |  |                Landing Page (app/page.tsx)                |  |  |
|  |  |                                                           |  |  |
|  |  |  +-----------------------+   +-------------------------+  |  |  |
|  |  |  |   Hero & Bio Section  |   | 3D Mascot Scene Wrapper |  |  |  |
|  |  |  |   (components/*)      |   | (mascot-scene.tsx)      |  |  |  |
|  |  |  +-----------------------+   +------------+------------+  |  |  |
|  |  |                                           |               |  |  |
|  |  |                                    next/dynamic           |  |  |
|  |  |                                           v               |  |  |
|  |  |                              +-------------------------+  |  |  |
|  |  |                              | Three.js WebGL Canvas   |  |  |  |
|  |  |                              | (mascot-scene-canvas)   |  |  |  |
|  |  |                              +-------------------------+  |  |  |
|  |  |                                                           |  |  |
|  |  |  +-----------------------+   +-------------------------+  |  |  |
|  |  |  |     Projects Grid     |   |   ArticleReveal Wrapper |  |  |  |
|  |  |  |  (project-card.tsx)   |   |   (useScrollReveal)      |  |  |  |
|  |  |  +-----------------------+   +-------------------------+  |  |  |
|  |  +-----------------------------------------------------------+  |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

## 2. Component Hierarchy & Client/Server Boundaries

### Server Components

- `app/layout.tsx`: Root HTML container, font declaration (`Geist`), and metadata tags (`opengraph-image`, `robots`, `sitemap`).
- `app/page.tsx`: Main landing page layout assembling hero, projects grid, bio sections, and footer.

### Client Components (`'use client'`)

- `app/theme-provider.tsx`: Manages active theme state (`light` / `dark`), handles system preference matching, and synchronizes theme class to document element.
- `components/theme-toggle.tsx`: Interactive dark/light mode toggle button with smooth icon transition.
- `components/navbar.tsx` & `components/mobile-nav.tsx`: Responsive navigation header with slide-out drawer menu for mobile viewports.
- `components/mascot-scene-canvas.tsx`: Three.js Canvas component managing WebGL 3D mesh rendering, camera lighting, mouse tracking, and animation loop.
- `components/article-reveal.tsx`: Scroll-reveal wrapper component applying entry animations when scrolled into viewport.

---

## 3. WebGL 3D Canvas Lazy Loading Strategy

To ensure high initial page performance (Lighthouse Performance score 89+), Three.js WebGL canvas rendering is deferred until hydration:

1. `components/mascot-scene.tsx` uses Next.js `dynamic()` import:
   ```tsx
   const MascotSceneCanvas = dynamic(
     () => import("./mascot-scene-canvas").then((mod) => mod.MascotSceneCanvas),
     { ssr: false },
   );
   ```
2. During SSR and initial payload download, a lightweight skeleton fallback (`GlassBox`) is rendered in place of the WebGL canvas.
3. Once the DOM hydrations finishes, Three.js is loaded dynamically without blocking First Contentful Paint (FCP) or Largest Contentful Paint (LCP).

---

## 4. Design System & Theme Architecture

The styling system is built on **Tailwind CSS v4** combined with native **CSS Custom Properties** in `app/globals.css`:

```css
:root {
  --bg: #ffffff;
  --fg: #1a202c;
  --card-bg: #f7fafc;
  --border: #e2e8f0;
  --brand-teal-500: #319795;
  --brand-teal-600: #2b7a78;
  --brand-teal-700: #215c5d;
  --link: #155ce2;
}

.dark {
  --bg: #0d1117;
  --fg: #f0f6fc;
  --card-bg: #161b22;
  --border: #30363d;
  --link: #ff63c3;
}
```

### Contrast & WCAG AA Compliance

All brand color choices have been audited for WCAG AA compliance (contrast ratio ≥ 4.5:1 for normal body text). Refer to [`docs/lighthouse-audit.md`](./lighthouse-audit.md) for detailed contrast measurements and fixes.

---

## 5. Animation Engine (`hooks/use-scroll-reveal.ts`)

Micro-animations use the native browser `IntersectionObserver` API rather than heavy external JavaScript animation libraries:

- `useScrollReveal` observes DOM targets and toggles `opacity` and `transform` CSS classes when elements enter the viewport.
- Reduces main-thread execution time and keeps JavaScript bundle minimal.
