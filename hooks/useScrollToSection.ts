"use client";

import { useCallback } from "react";

export function useScrollToSection() {
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth" });

      // Trigger pulse animation
      element.classList.remove("animate-pulse-glow");
      void element.offsetWidth;
      element.classList.add("animate-pulse-glow");
    },
    []
  );

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { scrollToSection, scrollToTop };
}
