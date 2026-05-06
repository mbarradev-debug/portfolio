# miguelbarra.dev

Personal portfolio built with Next.js 16, Tailwind CSS v4, and TypeScript.

---

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier (write)
npm run format:check  # Prettier (check only)
```

Node 20+ required.

---

## Project structure

```
.
├── app/                  # Next.js App Router — routes, layouts, pages
├── components/           # Reusable UI components
├── data/                 # Static CV/portfolio constants (no fetching logic)
│   └── portfolio.ts      # Single source of truth for all portfolio content
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
│   └── utils.ts          # cn() helper (clsx + tailwind-merge)
├── public/               # Static assets
└── types/                # TypeScript type definitions
    └── portfolio.ts      # Types for portfolio data structures
```

---

## Conventions

### Files and folders
- **kebab-case** for all files and folders: `hero-section.tsx`, `use-scroll.ts`
- **PascalCase** for React component names (matches the export, not the file)
- One component per file

### Exports
- Each directory exposes a barrel `index.ts` re-exporting its public API
- Import from the barrel, not from individual files: `import { cn } from '@/lib'`

### TypeScript
- Strict mode enabled — no `any`, no implicit returns
- Static data files use `as const satisfies <Type>` for full type-safety with literal inference
- All types live in `types/`, imported via `@/types`

### Styling
- Tailwind utility classes for all styling
- `cn()` from `@/lib` for conditional class merging
- No inline styles, no CSS Modules unless Tailwind is insufficient

### Components
- Server Components by default; add `'use client'` only when required
- Props interfaces defined inline above the component, named `<ComponentName>Props`
