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
            {/* Green circle background */}
            <div
              className="absolute h-32 w-32 rounded-full bg-accent/20 sm:h-48 sm:w-48 lg:h-72 lg:w-72 xl:h-80 xl:w-80 animate-in fade-in zoom-in-90 duration-700 delay-100"
              aria-hidden="true"
            />
            {/* Developer image */}
            <div className="relative z-10 animate-in fade-in zoom-in-95 duration-700 delay-300">
              <Image
                src="/images/miguelb-logo.png"
                alt="Miguel Barra - Ingeniero de Software"
                width={480}
                height={480}
                sizes="(max-width: 640px) 120px, (max-width: 768px) 192px, (max-width: 1024px) 288px, (max-width: 1280px) 384px, 448px"
                className="h-28 w-28 object-contain sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-96 xl:w-96"
                priority
              />
            </div>
          </div>

          {/* Text content - Mobile: abajo, centrado */}
          <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl lg:order-1">
            {/* Badge de seniority */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Senior Fullstack Engineer
              </span>
            </div>

            {/* Nombre */}
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-5xl xl:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              Miguel Barra
            </h1>

            {/* Propuesta de valor - Una línea impactante */}
            <p className="mt-4 text-xl font-medium text-text-primary sm:text-2xl lg:text-xl xl:text-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              Construyo software que escala y perdura.
            </p>

            {/* Credencial rápida */}
            <p className="mt-2 text-sm text-text-secondary sm:text-base animate-in fade-in duration-500 delay-450">
              +5 años transformando ideas en productos digitales reales.
            </p>

            {/* CTAs - Full width en mobile */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-500 delay-[600ms]">
              <a
                href="#stack"
                onClick={(e) => scrollToSection(e, "stack")}
                className="btn-primary inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-base font-medium text-bg-primary sm:h-11 sm:px-6 sm:text-sm"
                aria-label="Ver mi stack tecnológico"
              >
                <svg
                  className="mr-2 h-4 w-4"
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
                Ver mi trabajo
              </a>
              <a
                href="/cv/cv-miguel-barra.pdf"
                download
                className="btn-secondary inline-flex h-12 items-center justify-center rounded-lg border border-border-subtle bg-surface px-6 text-base font-medium text-text-primary sm:h-11 sm:px-6 sm:text-sm"
                aria-label="Descargar currículum en PDF"
              >
                <svg
                  className="mr-2 h-4 w-4"
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-700 delay-[800ms] lg:bottom-12">
          <button
            onClick={(e) => scrollToSection(e, "sobre-mi")}
            className="flex flex-col items-center gap-2 text-text-secondary/50 transition-colors hover:text-accent"
            aria-label="Desplazarse a la siguiente sección"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              className="h-5 w-5 animate-bounce"
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
