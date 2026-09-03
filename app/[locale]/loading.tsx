"use client";

import { useTranslations } from "next-intl";

/**
 * Route-level loading fallback. Renders inside the layout (header/footer stay),
 * so it only needs to fill the `<main>` area.
 */
export default function Loading() {
  const t = useTranslations("Loading");

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-1 items-center justify-center px-6 py-24"
    >
      <span className="text-text-muted animate-pulse font-mono text-xs tracking-wider uppercase">
        {t("label")}
      </span>
    </div>
  );
}
