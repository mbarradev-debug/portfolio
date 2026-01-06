"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function HeroSection() {
  const { scrollToSection } = useScrollToSection();

  return (
    <Section className="relative min-h-svh-safe flex items-center overflow-hidden" spacing="compact" id="hero" separator="visible">
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
        <div className="relative flex flex-col-reverse items-center gap-8 sm:gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Text content */}
          <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl">
            <p className="mb-4 text-base font-medium tracking-wide text-accent animate-in fade-in slide-in-from-left-4 duration-500">
              Ingeniero de Software
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-5xl xl:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
              Miguel Barra
            </h1>

            <div className="mt-6 space-y-1.5 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <p className="text-lg font-medium text-text-secondary sm:text-xl lg:text-lg xl:text-xl">
                Ingeniero en Computación e Informática
              </p>
              <p className="text-sm text-text-secondary/70">
                Licenciado en Ingeniería — Universidad Andrés Bello
              </p>
            </div>

            <div className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg lg:text-base xl:text-lg animate-in fade-in duration-500 delay-500">
              <p>
                Diseño y desarrollo soluciones web desde un enfoque ingenieril,
                priorizando el análisis, la planificación y la ejecución
                consciente para construir sistemas escalables y mantenibles.
              </p>
              <p>
                Soluciones pensadas para crecer, mantenerse en el tiempo y generar
                impacto real en las personas.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
              <a
                href="#sobre-mi"
                onClick={(e) => scrollToSection(e, "sobre-mi")}
                className="btn-primary inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary"
                aria-label="Ver perfil completo"
              >
                Ver perfil
              </a>
              <a
                href="#contacto"
                onClick={(e) => scrollToSection(e, "contacto")}
                className="btn-secondary inline-flex items-center justify-center rounded-md border border-border-subtle bg-surface px-6 py-3 text-sm font-medium text-text-primary"
                aria-label="Ir a sección de contacto"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Image with green circle background */}
          <div className="relative flex shrink-0 items-center justify-center">
            {/* Green circle background */}
            <div
              className="absolute h-48 w-48 rounded-full bg-accent/20 sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80 animate-in fade-in zoom-in-90 duration-700 delay-100"
              aria-hidden="true"
            />
            {/* Developer image */}
            <div className="relative z-10 animate-in fade-in zoom-in-95 duration-700 delay-300">
              <Image
                src="/images/miguelb-logo.png"
                alt="Miguel Barra - Ingeniero de Software"
                width={480}
                height={480}
                sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 448px"
                className="h-56 w-56 object-contain sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[28rem] xl:w-[28rem]"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
