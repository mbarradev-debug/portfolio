import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { DownloadIcon } from "@/components/icons";

export default function CVSection() {
  return (
    <Section variant="secondary" spacing="compact" separator="subtle">
      <Container>
        <AnimateOnScroll className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Documentación
          </p>
          <h2
            id="cv"
            className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl"
          >
            Currículum Vitae
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
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary"
              aria-label="Descargar currículum en formato PDF"
            >
              <DownloadIcon className="h-4 w-4" />
              Descargar CV (PDF)
            </a>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
