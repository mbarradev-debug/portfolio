"use client";

import { useEffect } from "react";

/**
 * Revelado al hacer scroll. El contenido ya se pinta visible (ver `.reveal` en
 * globals.css); un script inline añade `reveal-armed` a `<html>` antes del primer
 * paint y solo entonces los bloques fuera del hero parten ocultos.
 *
 * Al montar (justo tras hidratar): se revela de inmediato todo `.reveal` que ya
 * esté en viewport —sin esperar al IntersectionObserver— y se observa el resto
 * para revelarlo al hacer scroll, con stagger entre hermanos. El `.in` se añade
 * aquí, después de hidratar, así que no hay desajuste de hidratación (el
 * `className` de los componentes es constante y React no lo reescribe).
 *
 * Sin IntersectionObserver o con prefers-reduced-motion: desarma y deja todo
 * visible. El hero nunca se arma, así que su <h1> (candidato a LCP) es visible
 * sin esperar a este componente.
 *
 * El conjunto de `.reveal` es fijo: se renderiza una vez en SSR y React reutiliza
 * los mismos nodos en los re-renders; ningún código inserta `.reveal`
 * dinámicamente. Si eso cambiara, haría falta un MutationObserver.
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

    const stagger = (el: HTMLElement) => {
      if (el.style.getPropertyValue("--stagger-i") || !el.parentElement) return;
      const sibs = [...el.parentElement.children].filter((c) =>
        c.classList.contains("reveal"),
      );
      const idx = sibs.indexOf(el);
      if (idx > 0)
        el.style.setProperty("--stagger-i", String(Math.min(idx, 4)));
    };

    const candidates = [
      ...document.querySelectorAll<HTMLElement>(".reveal:not(.in)"),
    ].filter((el) => !el.closest(".hero"));

    const vh = window.innerHeight;
    const pending: HTMLElement[] = [];
    candidates.forEach((el) => {
      // Ya en viewport al montar: se revela sin animación de entrada ni espera.
      if (el.getBoundingClientRect().top < vh) {
        el.classList.add("in");
      } else {
        pending.push(el);
      }
    });

    if (pending.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          stagger(el);
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
