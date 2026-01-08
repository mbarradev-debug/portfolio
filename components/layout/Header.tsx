"use client";

import { useState, useEffect, useRef } from "react";
import { DownloadIcon } from "@/components/icons";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const sections = [
  { id: "hero", label: null },
  { id: "sobre-mi", label: "Perfil" },
  { id: "contacto", label: "Contacto" },
];

const SCROLL_THRESHOLD = 100; // Pixels before hiding starts
const SCROLL_DELTA = 10; // Minimum scroll distance to trigger hide/show

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollToSection, scrollToTop } = useScrollToSection();

  // Section observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "-80px 0px -50% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Scroll hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Always show at top of page
      if (currentScrollY < SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
      // Scrolling down past threshold - hide
      else if (scrollDelta > SCROLL_DELTA) {
        setIsVisible(false);
      }
      // Scrolling up - show
      else if (scrollDelta < -SCROLL_DELTA) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isContactActive = activeSection === "contacto";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-3 transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        transitionTimingFunction: isVisible
          ? "cubic-bezier(0.2, 0, 0, 1)"
          : "cubic-bezier(0.4, 0, 1, 1)",
      }}
    >
      <nav
        className="flex w-full max-w-md items-center justify-between rounded-full border border-white/5 bg-text-primary/90 px-3 py-1.5 shadow-md shadow-black/10 backdrop-blur-md sm:px-4 sm:py-2"
        role="navigation"
        aria-label="Menú principal"
      >
        <a
          href="#"
          onClick={scrollToTop}
          className="nav-logo flex items-center text-[13px] font-semibold leading-none text-bg-primary sm:text-sm"
          aria-label="Inicio"
        >
          MB
        </a>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/cv/cv.pdf"
            download
            className="nav-cv-link group flex items-center gap-1 text-[11px] font-medium leading-none text-bg-secondary/90 transition-colors hover:text-bg-primary sm:text-xs"
            aria-label="Descargar CV"
          >
            <DownloadIcon className="nav-cv-icon h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>CV</span>
          </a>

          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, "contacto")}
            className={`nav-contact-btn relative flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-xs ${
              isContactActive
                ? "bg-accent text-bg-primary"
                : "bg-bg-primary text-text-primary hover:bg-accent hover:text-bg-primary"
            }`}
            aria-label="Ir a contacto"
            aria-current={isContactActive ? "true" : undefined}
          >
            Contacto
            <span
              className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-text-primary shadow-sm ring-1 ring-bg-primary/20 transition-all duration-200 ${
                isContactActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
