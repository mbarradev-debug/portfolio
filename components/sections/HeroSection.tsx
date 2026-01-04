import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function HeroSection() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <h1 className="font-inter text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Miguel Barra
          </h1>

          <div className="mt-6 space-y-1">
            <p className="text-lg text-gray-300 sm:text-xl">
              Ingeniero en Computación e Informática
            </p>
            <p className="text-base text-gray-400">
              Licenciado en Ingeniería — Universidad Andrés Bello
            </p>
          </div>

          <div className="mt-10 space-y-4 text-base leading-relaxed text-gray-400 sm:text-lg">
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
              href="#perfil"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Ver perfil
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              Contactar
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
