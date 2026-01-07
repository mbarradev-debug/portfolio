"use client";

import { useState } from "react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const approachItems = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: "Arquitectura desde el día uno",
    description: "Defino estructura antes de escribir código.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    title: "Stack por durabilidad",
    description: "Elijo tecnologías por longevidad, no por moda.",
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    title: "Código en producción",
    description: "Entrego software sirviendo usuarios reales.",
  },
];

const targetAudience = [
  "Startups",
  "Equipos pequeños",
  "Proyectos con propósito",
];

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Section variant="secondary" spacing="relaxed" separator="visible">
      <Container>
        <AnimateOnScroll className="max-w-3xl mx-auto lg:mx-0">
          {/* Header */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Perfil
          </p>
          <h2
            id="sobre-mi"
            className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl lg:text-4xl"
          >
            Sobre mí
          </h2>

          {/* Quote destacado */}
          <blockquote className="mt-8 border-l-4 border-accent pl-4 sm:pl-6">
            <p className="text-lg font-medium italic text-text-primary sm:text-xl">
              "La arquitectura correcta hoy evita el rewrite de mañana."
            </p>
          </blockquote>

          {/* Subheader - Mi enfoque */}
          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Mi enfoque
          </p>

          {/* Cards de enfoque */}
          <div className="mt-4 space-y-3">
            {approachItems.map((item, index) => (
              <div
                key={index}
                className="approach-card group rounded-lg border border-border-subtle bg-surface p-4 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subheader - Ideal para */}
          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-text-secondary">
            Ideal para
          </p>

          {/* Chips de targeting */}
          <div className="mt-4 flex flex-wrap gap-2">
            {targetAudience.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Contenido expandible */}
          <div className="mt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              aria-expanded={isExpanded}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {isExpanded ? "Ver menos" : "Leer historia completa"}
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Contenido expandido */}
            <div
              className={`mt-6 space-y-4 overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? "max-h-[800px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-lg border border-border-subtle bg-bg-primary p-6">
                <div className="space-y-4 text-base leading-relaxed text-text-secondary">
                  <p>
                    Soy{" "}
                    <strong className="font-semibold text-text-primary">
                      Ingeniero en Computación e Informática
                    </strong>
                    , con formación universitaria y una orientación clara a
                    resolver problemas reales mediante tecnología bien
                    diseñada.
                  </p>

                  <p>
                    Abordo cada proyecto como un{" "}
                    <strong className="font-semibold text-text-primary">
                      problema de ingeniería
                    </strong>
                    . Antes de escribir código, analizo el contexto, defino el
                    stack tecnológico adecuado y selecciono patrones de diseño
                    acordes a las necesidades específicas del proyecto.
                  </p>

                  <p>
                    Me interesan especialmente los proyectos con{" "}
                    <strong className="font-semibold text-text-primary">
                      impacto tangible a corto plazo
                    </strong>
                    , donde el software esté al servicio de las personas y
                    genere valor real en su día a día.
                  </p>

                  <p>
                    Creo en el{" "}
                    <strong className="font-semibold text-text-primary">
                      desarrollo de software responsable
                    </strong>
                    , pensado para crecer de forma sostenible, evitando la
                    improvisación técnica y las decisiones apresuradas que
                    comprometen el futuro del producto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
