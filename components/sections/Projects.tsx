import type { Project, SiteContent } from "@/content";

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
      <article>
        <a
          className="project-row reveal"
          href={project.url}
          target="_blank"
          rel="noopener"
        >
          {body}
        </a>
      </article>
    );
  }
  return (
    <article>
      <div className="project-row reveal">{body}</div>
    </article>
  );
}

export function Projects({ c }: { c: SiteContent }) {
  const { projects, projectsSection } = c;

  return (
    <section
      className="projects"
      id="proyectos"
      data-nav-dark
      aria-labelledby="projects-title"
    >
      <div className="wrap">
        <h2 className="badge" id="projects-title">
          <span className="dot" aria-hidden="true" />
          {projectsSection.badge}
        </h2>
        <p className="ghost" aria-hidden="true">
          {projectsSection.title}
        </p>
      </div>
      <div className="project-list" id="projectList">
        {projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
