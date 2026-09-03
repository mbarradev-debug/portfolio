"use client";

import { type ReactNode, useEffect, useState } from "react";

import styles from "./HeroReveal.module.css";

/**
 * Client leaf for the hero: its content appears **on load**, not on scroll —
 * a short opacity fade driven by `requestAnimationFrame` with a `setTimeout`
 * safety net. No JS → visible; reduced motion → no fade.
 */
export function HeroReveal({ children, className }: { children: ReactNode; className?: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setShown(true));
    });
    const timer = setTimeout(() => setShown(true), 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={[styles.reveal, shown && styles.in, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
