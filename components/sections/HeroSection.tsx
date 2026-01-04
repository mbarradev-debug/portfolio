import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <Section className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-bg-secondary)_0%,_transparent_50%)]" />

      <Container>
        <div className="relative max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-wide text-accent">
            Ingeniero de Software
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
            Miguel Barra
          </h1>

          <div className="mt-6 space-y-1">
            <p className="text-xl text-text-primary sm:text-2xl">
              Ingeniero en Computación e Informática
            </p>
            <p className="text-base text-text-secondary">
              Licenciado en Ingeniería — Universidad Andrés Bello
            </p>
          </div>

          <div className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg">
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

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#sobre-mi"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
            >
              Ver perfil
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-md border border-border-subtle bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-text-secondary/50 hover:bg-bg-secondary active:scale-[0.98]"
            >
              Contactar
            </a>
          </div>
        </div>
      </Container>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
    </Section>
  );
}
