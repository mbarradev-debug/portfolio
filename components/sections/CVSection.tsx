import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function CVSection() {
  return (
    <Section variant="secondary">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Documentación
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            CV
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Este currículum resume mi formación académica, experiencia
            profesional y perfil técnico para procesos de selección y
            evaluaciones formales.
          </p>

          <div className="mt-8">
            <a
              href="/cv/cv.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Descargar CV (PDF)
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
