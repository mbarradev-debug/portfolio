"use client";

import { useState, useEffect, useRef } from "react";
import { DownloadIcon } from "@/components/icons";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useI18n } from "@/i18n";
import LanguageSelector from "@/components/ui/LanguageSelector";

const sectionIds = ["hero", "sobre-mi", "contacto"];

const SCROLL_THRESHOLD = 100; // Pixels before hiding starts
const SCROLL_DELTA = 10; // Minimum scroll distance to trigger hide/show

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollToSection, scrollToTop } = useScrollToSection();
  const { t } = useI18n();

  // Section observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
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
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-3 pt-2 transition-transform duration-200 sm:px-4 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        transitionTimingFunction: isVisible
          ? "cubic-bezier(0.2, 0, 0, 1)"
          : "cubic-bezier(0.4, 0, 1, 1)",
      }}
    >
      <nav
        className="flex w-full max-w-md items-center justify-between rounded-full border border-white/5 bg-text-primary/90 px-2.5 py-1 shadow-md shadow-black/10 backdrop-blur-md sm:px-3 sm:py-1.5"
        role="navigation"
        aria-label={t.a11y.mainMenu}
      >
        <a
          href="#"
          onClick={scrollToTop}
          className="nav-logo flex items-center text-xs font-medium leading-none text-bg-primary/80 sm:text-[13px]"
          aria-label={t.a11y.home}
        >
          MB
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSelector />

          <a
            href="/cv/cv.pdf"
            download
            className="nav-cv-link group flex items-center gap-0.5 rounded-full border border-bg-primary/20 px-2 py-0.5 text-[10px] font-medium leading-none text-bg-secondary/80 transition-colors hover:border-bg-primary/40 hover:text-bg-primary sm:px-2.5 sm:text-[11px]"
            aria-label={t.a11y.downloadCV}
          >
            <DownloadIcon className="nav-cv-icon h-2.5 w-2.5 sm:h-3 sm:w-3" />
            <span>CV</span>
          </a>

          <a
            href="#contacto"
            onClick={(e) => scrollToSection(e, "contacto")}
            className={`nav-contact-btn relative flex items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold leading-none transition-colors sm:px-3 sm:py-1 sm:text-[11px] ${
              isContactActive
                ? "bg-accent text-bg-primary shadow-sm shadow-accent/30"
                : "bg-bg-primary text-text-primary shadow-sm hover:bg-accent hover:text-bg-primary hover:shadow-accent/30"
            }`}
            aria-label={t.a11y.goToContact}
            aria-current={isContactActive ? "true" : undefined}
          >
            {t.nav.contact}
            <span
              className={`absolute -bottom-1 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-text-primary transition-all duration-200 ${
                isContactActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
