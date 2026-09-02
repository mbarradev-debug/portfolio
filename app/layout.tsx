import type { ReactNode } from "react";

/**
 * Passthrough root layout. The real `<html>` / `<body>` and all providers live
 * in `app/[locale]/layout.tsx` — every route is under a locale segment (see
 * `i18n/routing.ts`, `localePrefix: "always"`).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
