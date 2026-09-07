import { projects, projectsSection } from "@/content";
import type { Project } from "@/content";

function ProjectRow({ project }: { project: Project }) {
  const body = (
    <>
      <div className="project-year">{project.year}</div>
      <div className="project-main">
        <h3>
          {project.name}
          {project.url && (
            <>
              {" "}
              <span className="ext" aria-hidden="true">
                ↗
              </span>
            </>
          )}
        </h3>
        <p>{project.desc}</p>
      </div>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </>
  );

  if (project.url) {
    return (
      <a
        className="project-row reveal"
        href={project.url}
        target="_blank"
        rel="noopener"
      >
        {body}
      </a>
    );
  }
  return <div className="project-row reveal">{body}</div>;
}

export function Projects() {
  return (
    <section
      className="projects"
      id="proyectos"
      data-nav-dark
      aria-labelledby="projects-title"
    >
      <div className="wrap">
        <span className="badge">
          <span className="dot" aria-hidden="true" />
          {projectsSection.badge}
        </span>
        <h2 className="ghost" id="projects-title">
          {projectsSection.title}
        </h2>
      </div>
      <div className="project-list" id="projectList">
        {projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
