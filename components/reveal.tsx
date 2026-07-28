"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds, matching legacy's `--delay` custom property. */
  delay?: number;
  as?: "div" | "section";
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.reveal, .reveal.in-view)
// and its prefers-reduced-motion override. `motion-reduce:` mirrors
// legacy's own strategy: useScrollReveal's IntersectionObserver keeps
// running unconditionally, but the CSS override alone makes the toggled
// opacity/transform classes irrelevant when reduced motion is on — no
// need to special-case the hook itself.
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollReveal(ref);

  const style: CSSProperties = delay ? { transitionDelay: `${delay}s` } : {};

  const classes = [
    "[transition:opacity_0.8s_ease,transform_0.8s_ease]",
    "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
    isVisible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = as;

  return (
    <Tag ref={ref} style={style} className={classes}>
      {children}
    </Tag>
  );
}
