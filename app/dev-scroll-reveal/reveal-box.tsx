"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function RevealBox({
  label,
  threshold,
}: {
  label: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(ref, threshold);

  return (
    <div
      ref={ref}
      className={`bg-brand-teal-500 flex h-40 items-center justify-center rounded-lg text-white transition-[opacity,transform] duration-[800ms] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
      }`}
    >
      {label} — {isVisible ? "in-view" : "waiting"}
    </div>
  );
}
