import { Container } from "@/components/ui";
import { HeroBackgroundCanvas } from "./HeroBackgroundCanvas";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center py-16 md:py-20 bg-bg-base overflow-hidden">
      <HeroBackgroundCanvas />
      <Container className="relative z-10 flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">
            Full Stack Software Engineer
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary max-w-4xl">
            Construyo sistemas escalables y mantenibles con criterio de ingeniería.
          </h1>
        </div>

        <p className="text-xl text-text-secondary max-w-2xl font-light leading-relaxed">
          Experiencia real en producción desarrollando plataformas web, móviles y SaaS, priorizando mantenibilidad, escalabilidad y decisiones técnicas claras.
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href="#work"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-7 text-sm font-medium tracking-wide text-white transition-colors duration-200 ease-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-transparent px-7 text-sm font-medium tracking-wide text-text-primary transition-colors duration-200 ease-out hover:bg-surface-hover-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            Contacto
          </a>
        </div>
      </Container>
    </section>
  );
}
