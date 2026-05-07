import { SectionTitle } from '@/components/ui/section-title'
import { ProjectCard } from '@/components/ui/project-card'
import { portfolio } from '@/data/portfolio'

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        <SectionTitle number="03">Proyectos</SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
