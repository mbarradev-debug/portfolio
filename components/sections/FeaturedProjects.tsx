import { Container } from "@/components/ui";

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
    <section id="work" className="py-16 md:py-24 bg-bg-deep">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-8 md:mb-12">
          Proyectos Destacados
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="rounded-xl bg-bg-dark border border-border-dim p-6 md:p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {project.title}
              </h3>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                    El Problema
                  </span>
                  <p className="text-white mt-1">{project.problem}</p>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                    La Solución
                  </span>
                  <p className="text-text-dim mt-1 text-sm leading-relaxed">
                    {project.solution}
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
          ))}
        </div>
      </Container>
    </section>
  );
}
