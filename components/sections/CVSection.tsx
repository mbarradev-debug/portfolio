import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function CVSection() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            CV
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-400 sm:text-lg">
            Este currículum resume mi formación académica, experiencia
            profesional y perfil técnico para procesos de selección y
            evaluaciones formales.
          </p>

          <div className="mt-8">
            <a
              href="/cv/cv.pdf"
              download
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Descargar CV (PDF)
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
