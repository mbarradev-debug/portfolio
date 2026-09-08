"use client";

import { useEffect } from "react";

/**
 * Revelado al hacer scroll. El contenido ya se pinta visible (ver `.reveal` en
 * globals.css); un script inline lo "arma" (oculta los bloques fuera del hero)
 * antes del primer paint. Este controlador solo se encarga de revelarlos al
 * entrar en viewport, con stagger entre hermanos.
 *
 * Sin IntersectionObserver o con prefers-reduced-motion: desarma y deja todo
 * visible. El hero nunca se arma, así que su <h1> (candidato a LCP) es visible
 * sin esperar a este componente.
 */
export function RevealController() {
  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealEls = [
      ...document.querySelectorAll<HTMLElement>(".reveal"),
    ].filter((el) => !el.closest(".hero"));

    if (reduce || !("IntersectionObserver" in window)) {
      html.classList.remove("reveal-armed");
      return;
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

    return () => io.disconnect();
  }, []);

  return null;
}
