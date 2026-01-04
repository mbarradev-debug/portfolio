import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";

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

const stack = [
  {
    categoria: "Frontend",
    tecnologias: ["React", "Next.js", "TypeScript"],
  },
  {
    categoria: "Backend",
    tecnologias: ["Node.js", "APIs REST"],
  },
  {
    categoria: "Base de datos",
    tecnologias: ["PostgreSQL", "Prisma"],
  },
  {
    categoria: "Infraestructura",
    tecnologias: ["Docker"],
  },
  {
    categoria: "Control y calidad",
    tecnologias: ["Git", "Testing básico (cuando aplica)"],
  },
];

export default function StackSection() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stack & Engineering Approach
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-400 sm:text-lg">
            Selecciono el stack tecnológico y los patrones de diseño según las
            necesidades específicas de cada proyecto, priorizando la
            escalabilidad, la mantenibilidad y la claridad arquitectónica desde
            el inicio.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-white">
            Áreas de competencia
          </h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {competencias.map((item) => (
              <div key={item.titulo}>
                <h4 className="font-medium text-gray-200">{item.titulo}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-white">Stack principal</h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((grupo) => (
              <div key={grupo.categoria}>
                <h4 className="font-medium text-gray-200">{grupo.categoria}</h4>
                <ul className="mt-2 space-y-1">
                  {grupo.tecnologias.map((tech) => (
                    <li key={tech} className="text-sm text-gray-400">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
