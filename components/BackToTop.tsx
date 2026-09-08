"use client";

import type { ReactNode } from "react";

export function BackToTop({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
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
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
