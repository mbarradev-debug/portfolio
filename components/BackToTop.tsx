"use client";

import type { ReactNode } from "react";

export function BackToTop({ children }: { children: ReactNode }) {
  const onClick = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      className="back-to-top"
      id="toTop"
      type="button"
      aria-label="Volver arriba"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
