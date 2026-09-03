"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Client leaf: fades + lifts its children into view on scroll, with an
 * automatic stagger between sibling `Reveal`s. Excludes the hero (that uses
 * `HeroReveal`). Reduced motion or no `IntersectionObserver` → shown at once.
 * No JS → the CSS keeps everything visible.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (window.matchMedia(REDUCED_MOTION).matches || typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        // Stagger between sibling reveals of the same container.
        const siblings = [...(el.parentElement?.children ?? [])].filter((c) =>
          c.hasAttribute("data-reveal")
        );
        const index = siblings.indexOf(el);
        if (index > 0) el.style.transitionDelay = `${Math.min(index * 0.07, 0.28)}s`;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={[styles.reveal, shown && styles.in, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
