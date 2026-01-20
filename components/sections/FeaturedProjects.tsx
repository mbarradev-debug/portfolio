import { Container, AnimatedSection } from "@/components/ui";

interface Project {
  title: string;
  problem: string;
  solution: string;
  stack: string[];
}

// TODO: Replace with actual project data from reference/content/portfolio.md
// when the content is defined. Current placeholders indicate expected structure.
const projects: Project[] = [
  {
    title: "[Título del Proyecto]",
    problem: "[Contexto o problema a resolver]",
    solution: "[Solución técnica y enfoque implementado]",
    stack: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
  },
  {
    title: "[Título del Proyecto]",
    problem: "[Contexto o problema a resolver]",
    solution: "[Solución técnica y enfoque implementado]",
    stack: ["[Tech 1]", "[Tech 2]", "[Tech 3]"],
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
            <article
              key={index}
              className="group rounded-xl bg-bg-base border border-border p-6 md:p-8 transition-colors duration-200 ease-out hover:border-primary/50 hover:bg-surface-hover"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-primary transition-colors duration-200 ease-out group-hover:text-primary">
                  {project.title}
                </h3>
                <svg
                  className="w-5 h-5 text-text-secondary transition-colors duration-200 ease-out group-hover:text-primary"
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

              <div className="space-y-6">
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

                <div className="pt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 transition-colors duration-200 ease-out hover:bg-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
