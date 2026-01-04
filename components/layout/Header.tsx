"use client";

import { useState, useEffect } from "react";
import { DownloadIcon } from "@/components/icons";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const sections = [
  { id: "hero", label: null },
  { id: "sobre-mi", label: "Perfil" },
  { id: "contacto", label: "Contacto" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollToSection, scrollToTop } = useScrollToSection();

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

  const isContactActive = activeSection === "contacto";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className="flex h-12 w-full max-w-md items-center justify-between rounded-full border border-text-primary/10 bg-text-primary/95 px-6 shadow-lg shadow-black/10 backdrop-blur-sm"
        role="navigation"
        aria-label="Menú principal"
      >
        <a
          href="#"
          onClick={scrollToTop}
          className="text-base font-semibold text-bg-primary transition-colors duration-200 hover:text-accent"
          aria-label="Inicio"
        >
          MB
        </a>

        <div className="flex items-center gap-6">
          <a
            href="/cv/cv.pdf"
            download
            className="group flex items-center gap-1.5 text-sm text-bg-secondary transition-colors duration-200 hover:text-bg-primary"
            aria-label="Descargar CV"
          >
            <DownloadIcon className="h-3.5 w-3.5 transition-all duration-200 group-hover:translate-y-0.5 group-hover:text-accent" />
            <span>CV</span>
          </a>

          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, "contacto")}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${
              isContactActive
                ? "bg-accent text-bg-primary"
                : "bg-bg-primary text-text-primary hover:bg-accent hover:text-bg-primary"
            }`}
            aria-label="Ir a contacto"
            aria-current={isContactActive ? "true" : undefined}
          >
            Contacto
            <span
              className={`absolute -bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-bg-primary shadow-sm transition-all duration-200 ${
                isContactActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
