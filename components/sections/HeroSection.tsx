"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function HeroSection() {
  const { scrollToSection } = useScrollToSection();

  return (
    <Section
      className="relative min-h-svh-safe flex items-center overflow-hidden"
      spacing="compact"
      id="hero"
      separator="visible"
    >
      {/* Diagonal background split */}
      <div
        className="pointer-events-none absolute inset-0 bg-bg-secondary"
        style={{
          clipPath: "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-bg-secondary)_0%,_transparent_50%)]" />

      <Container>
        <div className="relative flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left">
          {/* Image - Mobile: arriba y más pequeña */}
          <div className="relative flex shrink-0 items-center justify-center mb-6 lg:mb-0 lg:order-2">
            {/* Green circle background - GPU accelerated */}
            <div
              className="absolute h-32 w-32 rounded-full bg-accent/20 sm:h-48 sm:w-48 lg:h-72 lg:w-72 xl:h-80 xl:w-80 hero-animate hero-fade-zoom hero-delay-0"
              aria-hidden="true"
            />
            {/* Developer image - aspect-ratio prevents CLS */}
            <div className="relative z-10 hero-animate hero-fade-zoom hero-delay-1">
              <Image
                src="/images/miguelb-logo.png"
                alt="Miguel Barra - Ingeniero de Software"
                width={480}
                height={480}
                sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, (max-width: 1024px) 288px, (max-width: 1280px) 384px, 448px"
                className="aspect-square h-28 w-28 object-contain sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-96 xl:w-96"
                priority
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Text content - Mobile: abajo, centrado */}
          <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl lg:order-1">
            {/* Badge de seniority - shimmer effect on load */}
            <div className="hero-animate hero-fade hero-delay-0">
              <span className="badge-shimmer inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent sm:px-4 sm:py-2">
                Senior Fullstack Engineer
              </span>
            </div>

            {/* Headline - Propuesta de valor */}
            <h1 className="mt-5 text-[1.75rem] font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl xl:text-6xl hero-animate hero-fade-up hero-delay-1">
              Del problema al producto.
            </h1>

            {/* Subheadline */}
            <p className="mt-3 text-base font-medium leading-snug text-text-primary/90 sm:text-xl lg:text-xl xl:text-2xl hero-animate hero-fade-up hero-delay-2">
              Arquitectura que escala. Código que perdura.
            </p>

            {/* Credencial rápida */}
            <p className="mt-2 text-sm text-text-secondary sm:text-base hero-animate hero-fade hero-delay-3">
              +5 años llevando ideas de startups a producción.
            </p>

            {/* CTAs - Full width en mobile, optimized touch targets */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start hero-animate hero-fade-up hero-delay-4">
              <a
                href="#stack"
                onClick={(e) => scrollToSection(e, "stack")}
                className="btn-primary btn-primary-pulse inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-base font-medium text-bg-primary sm:h-11 sm:px-6 sm:text-sm"
                aria-label="Ver mi stack tecnológico"
              >
                <svg
                  className="btn-icon mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Ver proyectos
              </a>
              <a
                href="/cv/cv-miguel-barra.pdf"
                download
                className="btn-secondary inline-flex h-12 items-center justify-center rounded-lg border border-border-subtle bg-surface px-6 text-base font-medium text-text-primary sm:h-11 sm:px-6 sm:text-sm"
                aria-label="Descargar currículum en PDF"
              >
                <svg
                  className="btn-icon mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Descargar CV
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator - visible on all screens, touch-friendly */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 hero-animate hero-fade hero-delay-5 sm:bottom-8 lg:bottom-12">
          <button
            onClick={(e) => scrollToSection(e, "sobre-mi")}
            className="scroll-breathe flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-full p-2 text-text-secondary transition-colors hover:text-accent active:scale-95"
            aria-label="Desplazarse a la siguiente sección"
          >
            <span className="text-[10px] uppercase tracking-widest sm:text-xs">Scroll</span>
            <svg
              className="h-4 w-4 animate-bounce sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </Container>
    </Section>
  );
}
