"use client";

import { useEffect } from "react";

/**
 * Revelado al hacer scroll. El contenido ya se pinta visible (ver `.reveal` en
 * globals.css); un script inline al final del <body> "arma" los bloques fuera
 * del hero antes del primer paint y marca `.in` los que ya están en viewport
 * (esos no esperan a este controlador). Aquí solo se revelan los que quedan al
 * entrar en viewport, con stagger entre hermanos.
 *
 * Sin IntersectionObserver o con prefers-reduced-motion: desarma y deja todo
 * visible. El hero nunca se arma, así que su <h1> (candidato a LCP) es visible
 * sin esperar a este componente.
 *
 * El conjunto de `.reveal` es fijo: se renderiza una vez en SSR y React reutiliza
 * los mismos nodos en los re-renders (el `className` es constante, React no lo
 * reescribe, así que `.in` y `--stagger-i` externos sobreviven); ningún código
 * inserta `.reveal` dinámicamente. Si eso cambiara, haría falta un
 * MutationObserver para re-observar los nuevos.
 */
export function RevealController() {
  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce || !("IntersectionObserver" in window)) {
      html.classList.remove("reveal-armed");
      return;
    }

    // Solo los que aún no están revelados (el script inline ya marcó los que
    // estaban en viewport al cargar) y fuera del hero.
    const pending = [
      ...document.querySelectorAll<HTMLElement>(".reveal:not(.in)"),
    ].filter((el) => !el.closest(".hero"));

    if (pending.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Escalona la entrada entre hermanos .reveal del mismo contenedor.
          // El retardo lo calcula el CSS: `--stagger-step * --stagger-i`.
          if (!el.style.getPropertyValue("--stagger-i") && el.parentElement) {
            const sibs = [...el.parentElement.children].filter((c) =>
              c.classList.contains("reveal"),
            );
            const idx = sibs.indexOf(el);
            if (idx > 0) {
              el.style.setProperty("--stagger-i", String(Math.min(idx, 4)));
            }
          }
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    pending.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
