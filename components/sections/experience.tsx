import { SectionTitle } from '@/components/ui/section-title'
import { ExperienceCard } from '@/components/ui/experience-card'
import { Reveal } from '@/components/ui/reveal'
import { StaggerList, StaggerItem } from '@/components/ui/stagger-list'
import { portfolio } from '@/data/portfolio'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experiencia"
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        <Reveal>
          <SectionTitle number="04">Experiencia</SectionTitle>
        </Reveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — extends slightly left of container per design system */}
          <div
            className="absolute bottom-0 top-2 w-px"
            style={{ left: '5px', backgroundColor: 'var(--bg-border)' }}
            aria-hidden="true"
          />

          <StaggerList className="flex flex-col gap-12">
            {portfolio.experience.map((item, index) => (
              <StaggerItem key={item.company}>
                <ExperienceCard {...item} isFirst={index === 0} />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  )
}
