import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

export default function AboutSection() {
  return (
    <Section variant="secondary">
      <Container>
        <div className="max-w-3xl">
          <p
            id="sobre-mi"
            className="mb-3 text-sm font-medium tracking-wide text-accent"
          >
            Perfil
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Sobre mí
          </h2>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            <p>
              Soy Ingeniero en Computación e Informática, con formación en
              ingeniería y una orientación clara a resolver problemas reales
              mediante tecnología bien diseñada.
            </p>

            <p>
              Abordo cada proyecto como un problema de ingeniería. Antes de
              escribir código, analizo el contexto, defino el stack tecnológico
              adecuado y selecciono patrones de diseño acordes a las necesidades
              específicas del proyecto. Creo firmemente que estas decisiones
              tempranas son clave para lograr soluciones escalables y
              mantenibles en el tiempo.
            </p>

            <p>
              Me interesan especialmente los proyectos con impacto tangible a
              corto plazo, donde el software esté al servicio de las personas y
              genere valor real en su día a día, ya sea en startups, equipos
              pequeños o proyectos freelance con propósito claro.
            </p>

            <p>
              Creo en el desarrollo de software responsable, pensado para crecer
              de forma sostenible, evitando la improvisación técnica y las
              decisiones apresuradas que comprometen el futuro del producto.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
