import { SectionTitle } from '@/components/ui/section-title'
import { ProjectCard } from '@/components/ui/project-card'
import { Reveal } from '@/components/ui/reveal'
import { StaggerList, StaggerItem } from '@/components/ui/stagger-list'
import { portfolio } from '@/data/portfolio'

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Proyectos"
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        <Reveal>
          <SectionTitle number="03">Proyectos</SectionTitle>
        </Reveal>

        <StaggerList className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {portfolio.projects.map((project) => (
            <StaggerItem key={project.name}>
              <ProjectCard {...project} />
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
