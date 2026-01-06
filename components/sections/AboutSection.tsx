import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function AboutSection() {
  return (
    <Section variant="secondary" spacing="relaxed" separator="visible">
      <Container>
        <AnimateOnScroll className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Perfil
          </p>
          <h2
            id="sobre-mi"
            className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Sobre mí
          </h2>

          <div className="mt-10 relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full"
              aria-hidden="true"
            />

            <div className="pl-8 space-y-6 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>
                Soy{" "}
                <strong className="font-semibold text-text-primary">
                  Ingeniero en Computación e Informática
                </strong>
                , con formación en ingeniería y una orientación clara a resolver
                problemas reales mediante tecnología bien diseñada.
              </p>

              <p>
                Abordo cada proyecto como un{" "}
                <strong className="font-semibold text-text-primary">
                  problema de ingeniería
                </strong>
                . Antes de escribir código, analizo el contexto, defino el stack
                tecnológico adecuado y selecciono patrones de diseño acordes a
                las necesidades específicas del proyecto. Creo firmemente que
                estas{" "}
                <strong className="font-semibold text-text-primary">
                  decisiones tempranas
                </strong>{" "}
                son clave para lograr soluciones escalables y mantenibles en el
                tiempo.
              </p>

              <blockquote className="my-8 border-l-4 border-accent pl-6 py-2 -ml-8">
                <p className="text-lg font-medium italic text-text-primary sm:text-xl">
                  "Las decisiones tempranas son clave para lograr soluciones
                  escalables y mantenibles."
                </p>
              </blockquote>

              <p>
                Me interesan especialmente los proyectos con{" "}
                <strong className="font-semibold text-text-primary">
                  impacto tangible a corto plazo
                </strong>
                , donde el software esté al servicio de las personas y genere
                valor real en su día a día, ya sea en startups, equipos pequeños
                o proyectos freelance con propósito claro.
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
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
