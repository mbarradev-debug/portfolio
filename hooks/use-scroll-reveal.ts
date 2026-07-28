"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Ported from /legacy-reference/js/app.js's IntersectionObserver logic.
 * Returns true once the observed element has scrolled into view, and stops
 * observing after that (matches the legacy `io.unobserve` call) — the
 * reveal never re-triggers on scroll back up.
 *
 * `prefers-reduced-motion` is intentionally out of scope here: it's a
 * presentational concern for whatever CSS the consumer applies with the
 * returned boolean, not something the observer itself needs to know about.
 *
 * @example
 * ```tsx
 * "use client";
 * function RevealSection() {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const isVisible = useScrollReveal(ref);
 *   return (
 *     <div
 *       ref={ref}
 *       className={`transition-[opacity,transform] duration-[800ms] ${
 *         isVisible ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
 *       }`}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollReveal<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.15,
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}
