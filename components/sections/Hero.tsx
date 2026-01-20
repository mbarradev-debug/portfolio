import { Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-16 md:py-20 bg-bg-dark">
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-primary text-sm tracking-widest uppercase">
            Full Stack Software Engineer
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white max-w-4xl">
            Construyo sistemas escalables y mantenibles con criterio de ingeniería.
          </h1>
        </div>

        <p className="text-xl text-text-dim max-w-2xl font-light leading-relaxed">
          Experiencia real en producción desarrollando plataformas web, móviles y SaaS, priorizando mantenibilidad, escalabilidad y decisiones técnicas claras.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-dark"
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border-dim bg-transparent px-8 text-sm font-semibold text-white transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-bg-dark"
          >
            Contacto
          </a>
        </div>
      </Container>
    </section>
  );
}
