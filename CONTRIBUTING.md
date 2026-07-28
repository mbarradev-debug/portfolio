# Contributing to Miguel Barra's Portfolio

Thank you for contributing to this project! This repository hosts the personal developer portfolio of Miguel Barra, engineered with Next.js 16 (App Router), React 19, Three.js, Tailwind CSS v4, Vitest, and Playwright.

This document outlines the workflow, development environment setup, coding guidelines, and pull request checklist for both human contributors and automated coding agents.

---

## 1. Quickstart & Environment Setup

### Prerequisites

- **Node.js**: `^20.0.0` or `>= 18.18.0` (matching Next.js 16 requirements)
- **npm**: `>= 9.0.0`

### Step-by-Step Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mbarradev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 2. Command Reference

All primary development tasks are managed via `npm` scripts:

```bash
# Start local dev server with hot reload
npm run dev

# Run unit and component integration tests via Vitest
npm run test

# Run unit tests in interactive watch mode
npm run test:watch

# Run end-to-end browser tests via Playwright
npm run test:e2e

# Run static code analysis with ESLint
npm run lint

# Check code formatting with Prettier
npm run format:check

# Format all code files with Prettier
npm run format

# Compile production build
npm run build

# Preview production build locally
npm run start
```

---

## 3. Development Workflow & Architecture

### Codebase Organization

```
portfolio/
├── app/                  # Next.js 16 App Router (pages, layout, globals.css, dev previews)
├── components/           # Reusable UI components & 3D WebGL canvas
├── docs/                 # Product, architecture, and Lighthouse audit docs
├── e2e/                  # Playwright end-to-end specs
├── hooks/                # Custom React hooks
└── public/               # Favicons, metadata images, and static assets
```

### Component Dev Bench (`/app/dev-*`)

Isolated dev routes exist under `app/dev-*` (e.g. `/dev-button`, `/dev-mascot-scene`, `/dev-projects-grid`, `/dev-colors`) to test components in isolation without launching the full main page flow.

### Design System & Theme Principles

1. **Color Tokens**: All surface and brand colors are declared as CSS custom properties in `app/globals.css`.
2. **WCAG AA Compliance**: Ensure normal text maintains at least 4.5:1 contrast against backgrounds. Refer to [`docs/lighthouse-audit.md`](./docs/lighthouse-audit.md) for background on contrast fixes and performance budgets.
3. **Dark / Light Mode**: Managed via `ThemeProvider` (`app/theme-provider.tsx`). Use custom CSS variable utility classes rather than hardcoded light/dark hex colors.

---

## 4. Testing Standards

### Unit & Component Tests (`Vitest`)

- Co-locate unit tests alongside components (`components/<component-name>.test.tsx`).
- Use `@testing-library/react` and `@testing-library/user-event` for user interaction assertions.
- Test component states (active, hovered, disabled, dark/light theme).

Example:

```bash
npm run test
```

### End-to-End Tests (`Playwright`)

- Place browser specs under `e2e/*.spec.ts`.
- Ensure tests verify navigation, theme toggle persistence, drawer menu accessibility, and scroll interaction.

Example:

```bash
npm run test:e2e
```

---

## 5. Pull Request Guidelines & Checklist

Before creating a Pull Request, complete the following verification steps:

- [ ] `npm run test` passes with zero failing tests.
- [ ] `npm run lint` completes with zero ESLint warnings or errors.
- [ ] `npm run format:check` reports no unformatted files.
- [ ] `npm run build` compiles without TypeScript or build errors.
- [ ] All new components or features include corresponding unit or E2E tests.
- [ ] WCAG AA accessibility standards are maintained.

---

## 6. AI & Agent Governance

If you are using AI agents (Gemini/Antigravity, Claude Code, Cursor, Copilot, Codex), ensure all agent instructions follow [`AGENTS.md`](./AGENTS.md). Canonical rules, execution boundaries (`Always`, `Ask first`, `Never`), and platform compatibility paths are governed by `AGENTS.md`.
