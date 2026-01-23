import { Container, AnimatedSection } from "@/components/ui";

interface Project {
  title: string;
  url: string;
  problem: string;
  solution: string;
  decisions: string;
  stack: string[];
  result: string;
}

const projects: Project[] = [
  {
    title: "Divisapp",
    url: "https://divisapp.vercel.app",
    problem:
      "Los indicadores económicos chilenos (UF, UTM, dólar, euro, etc.) están dispersos en múltiples fuentes, dificultando su consulta rápida y seguimiento.",
    solution:
      "Dashboard centralizado que consume APIs externas para mostrar indicadores en tiempo real, con conversor de divisas y sistema de alertas personalizables.",
    decisions:
      "Se priorizó simplicidad sobre features: arquitectura sin backend propio para reducir complejidad operacional, usando APIs públicas y almacenamiento local para preferencias.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    result:
      "MVP funcional desplegado en producción con módulos de dashboard, conversor, alertas y configuración operativos.",
  },
];

export function FeaturedProjects() {
  return (
    <section id="work" className="py-16 md:py-24 bg-bg-elevated">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-text-primary mb-8 md:mb-12">
            Proyectos Destacados
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl bg-bg-base border border-border p-6 md:p-8 transition-colors duration-200 ease-out hover:border-primary/50 hover:bg-surface-hover"
              >
                <article>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-text-primary transition-colors duration-200 ease-out group-hover:text-primary">
                      {project.title}
                    </h3>
                    <svg
                      className="w-5 h-5 text-text-secondary transition-transform transition-colors duration-200 ease-out group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                        El Problema
                      </span>
                      <p className="text-text-primary mt-1">{project.problem}</p>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                        La Solución
                      </span>
                      <p className="text-text-secondary mt-1 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                        Decisiones Técnicas
                      </span>
                      <p className="text-text-secondary mt-1 text-sm leading-relaxed">
                        {project.decisions}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                        Resultado
                      </span>
                      <p className="text-text-primary mt-1 text-sm">
                        {project.result}
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
