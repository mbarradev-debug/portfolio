<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Operating Rules & Technical Governance

This repository contains the developer portfolio of Miguel Barra, built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js, Vitest, and Playwright.

All AI coding agents (Gemini/Antigravity, Claude Code, OpenAI Codex, Cursor) MUST adhere to the instructions, constraints, and execution boundaries defined in this document.

---

## 1. Operating Boundaries

### Always

- Run `npm run test`, `npm run lint`, and `npm run format:check` after modifying code before declaring a task complete.
- Follow WCAG AA contrast standards (minimum 4.5:1 for normal text) established in `docs/lighthouse-audit.md`.
- Use custom CSS variables defined in `app/globals.css` for brand colors and surface themes.
- Separate interactive client components (`'use client'`) from server-rendered containers.
- Write unit tests for new UI components in `components/<component-name>.test.tsx` using Vitest and React Testing Library.

### Ask First

- Adding new npm packages or external dependencies.
- Modifying Three.js WebGL canvas rendering logic or asset loading strategy.
- Changing global color tokens or global theme structure in `app/globals.css`.
- Modifying E2E test configuration in `playwright.config.ts` or Vitest config in `vitest.config.ts`.

### Never

- Never remove, disable, or skip existing unit (`npm run test`) or E2E (`npm run test:e2e`) tests.
- Never use inline hardcoded color hex values when custom theme CSS variables exist (`var(--bg)`, `var(--fg)`, `var(--brand-teal-600)`, etc.).
- Never import Three.js scene components directly on the server without dynamic client-side loading (`next/dynamic` with `{ ssr: false }`).
- Never suppress TypeScript or ESLint errors with `@ts-ignore` or `eslint-disable` without documented justification.

---

## 2. Canonical Development Commands

| Task                     | Command                | Description                                                 |
| :----------------------- | :--------------------- | :---------------------------------------------------------- |
| **Development**          | `npm run dev`          | Start Next.js development server on `http://localhost:3000` |
| **Build**                | `npm run build`        | Compile production build                                    |
| **Start Production**     | `npm run start`        | Serve production build locally                              |
| **Unit Testing**         | `npm run test`         | Run Vitest unit tests suite                                 |
| **Unit Testing (Watch)** | `npm run test:watch`   | Run Vitest in interactive watch mode                        |
| **E2E Testing**          | `npm run test:e2e`     | Run Playwright end-to-end browser tests                     |
| **Linting**              | `npm run lint`         | Run ESLint static code analysis                             |
| **Formatting**           | `npm run format`       | Apply Prettier code formatting                              |
| **Check Formatting**     | `npm run format:check` | Verify Prettier code formatting without mutating files      |

---

## 3. Architecture & File Navigation

```
portfolio/
├── app/                  # Next.js 16 App Router pages, layout, and dev preview routes
│   ├── dev-*/            # Isolated component test bench pages
│   ├── globals.css       # Design tokens, CSS variables, and global utility styles
│   ├── layout.tsx        # Root layout with font optimization & theme provider
│   ├── page.tsx          # Main portfolio landing page
│   └── theme-provider.tsx# Theme context (light/dark mode persistence)
├── components/           # Reusable UI & 3D canvas components
│   ├── mascot-scene.tsx  # Dynamic loader wrapper for 3D canvas
│   ├── mascot-scene-canvas.tsx # Three.js WebGL interactive scene
│   └── *.test.tsx        # Unit tests alongside component source files
├── docs/                 # Product & technical documentation
│   ├── ARCHITECTURE.md   # System & component architecture documentation
│   ├── DEVELOPMENT.md    # Developer guide & component creation workflow
│   └── lighthouse-audit.md # Lighthouse performance & WCAG AA audit report
├── e2e/                  # Playwright end-to-end browser specs
├── hooks/                # Custom React hooks (e.g. useScrollReveal)
├── public/               # Static assets & favicon
└── .agents/              # Modular agent rules & configuration directory
```

---

## 4. Agent Compatibility Surface

- **Canonical Policy Document**: `AGENTS.md` (this file).
- **Claude Code Compatibility**: `CLAUDE.md` references `AGENTS.md`.
- **Cursor Compatibility**: `.cursor/` is symlinked to `.agents/` containing modular rules in `.agents/rules/`.

---

## 5. Verification Checklist

Before declaring any change complete:

1. `npm run test` passes with 0 failures.
2. `npm run lint` passes with 0 warnings/errors.
3. `npm run format:check` passes clean.
4. `npm run build` succeeds without TypeScript or Next.js build errors.
