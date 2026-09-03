"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

/**
 * Route error boundary. Catches errors thrown by pages under `[locale]` (not by
 * the layout itself — that's `global-error`). `retry()` re-renders the segment.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    // Replace with a real error reporter when one is added.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-text-muted font-mono text-xs tracking-wider uppercase">{t("eyebrow")}</p>
      <h1 className="text-text text-3xl leading-tight font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="text-text-soft text-md max-w-prose">{t("body")}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="bg-accent text-text-on-accent ease-standard hover:bg-accent-strong rounded-pill px-6 py-2 font-mono text-xs tracking-wider uppercase transition-colors"
      >
        {t("retry")}
      </button>
    </div>
  );
}
