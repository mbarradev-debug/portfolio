import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { DownloadIcon } from "@/components/icons";

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
              <DownloadIcon className="h-4 w-4" />
              Descargar CV (PDF)
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
