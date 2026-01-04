import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  NodejsIcon,
  PostgreSQLIcon,
  PrismaIcon,
  DockerIcon,
  GitIcon,
  ApiIcon,
} from "@/components/icons";

const competencias = [
  {
    titulo: "Arquitectura de aplicaciones",
    descripcion:
      "Diseño arquitecturas alineadas al contexto del proyecto, cuidando la separación de responsabilidades y la evolución futura del sistema.",
  },
  {
    titulo: "Desarrollo Frontend",
    descripcion:
      "Construyo interfaces claras y mantenibles, basadas en una correcta componentización, priorizando rendimiento y experiencia de usuario.",
  },
  {
    titulo: "Desarrollo Backend",
    descripcion:
      "Implemento lógica de negocio desacoplada mediante APIs bien definidas, con foco en robustez, validación y control de errores.",
  },
  {
    titulo: "Datos y persistencia",
    descripcion:
      "Diseño modelos relacionales consistentes, considerando integridad, claridad del dominio y crecimiento a largo plazo.",
  },
];

const tecnologias = [
  { nombre: "React", icon: ReactIcon },
  { nombre: "Next.js", icon: NextjsIcon },
  { nombre: "TypeScript", icon: TypeScriptIcon },
  { nombre: "Node.js", icon: NodejsIcon },
  { nombre: "APIs REST", icon: ApiIcon },
  { nombre: "PostgreSQL", icon: PostgreSQLIcon },
  { nombre: "Prisma", icon: PrismaIcon },
  { nombre: "Docker", icon: DockerIcon },
  { nombre: "Git", icon: GitIcon },
];

export default function StackSection() {
  return (
    <Section variant="primary">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Tecnología
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Stack & Engineering Approach
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Selecciono el stack tecnológico y los patrones de diseño según las
            necesidades específicas de cada proyecto, priorizando la
            escalabilidad, la mantenibilidad y la claridad arquitectónica desde
            el inicio.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-lg font-medium text-text-primary">
            Áreas de competencia
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {competencias.map((item) => (
              <div
                key={item.titulo}
                className="rounded-lg border border-border-subtle bg-surface p-6 transition-colors duration-200 hover:border-text-secondary/30"
              >
                <h4 className="font-medium text-text-primary">{item.titulo}</h4>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-lg font-medium text-text-primary">
            Stack principal
          </h3>
          <div className="mt-6 rounded-xl border border-border-subtle bg-surface p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {tecnologias.map((tech) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={tech.nombre}
                    className="group flex cursor-default items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-bg-secondary"
                  >
                    <IconComponent className="h-5 w-5 text-text-secondary transition-colors duration-200 group-hover:text-accent" />
                    <span className="text-sm font-medium text-text-primary">
                      {tech.nombre}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
