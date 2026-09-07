"use client";

import { useEffect } from "react";

/**
 * Revelado al hacer scroll (portado de references/index.html):
 * - El hero se revela al cargar, nunca ligado al scroll.
 * - El resto entra vía IntersectionObserver con stagger entre hermanos.
 * - Con prefers-reduced-motion o sin IntersectionObserver, todo visible ya.
 * Renderiza null; opera sobre los `.reveal` del DOM.
 */
export function RevealController() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const heroReveals = [
      ...document.querySelectorAll<HTMLElement>(".hero .reveal"),
    ];
    const showHero = () => heroReveals.forEach((el) => el.classList.add("in"));
    const raf = requestAnimationFrame(() => requestAnimationFrame(showHero));
    const heroFallback = window.setTimeout(showHero, 600);

    const revealEls = [
      ...document.querySelectorAll<HTMLElement>(".reveal"),
    ].filter((el) => !el.closest(".hero"));

    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(heroFallback);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Escalona la entrada entre hermanos .reveal del mismo contenedor.
          if (!el.style.transitionDelay && el.parentElement) {
            const sibs = [...el.parentElement.children].filter((c) =>
              c.classList.contains("reveal"),
            );
            const idx = sibs.indexOf(el);
            if (idx > 0) {
              el.style.transitionDelay = `${Math.min(idx * 0.07, 0.28)}s`;
            }
          }
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    revealEls.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(heroFallback);
      io.disconnect();
    };
  }, []);

  return null;
}
