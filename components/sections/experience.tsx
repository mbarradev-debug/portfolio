import { SectionTitle } from '@/components/ui/section-title'
import { ExperienceCard } from '@/components/ui/experience-card'
import { portfolio } from '@/data/portfolio'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        <SectionTitle number="04">Experiencia</SectionTitle>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — extends slightly left of container per design system */}
          <div
            className="absolute bottom-0 top-2 w-px"
            style={{ left: '5px', backgroundColor: 'var(--bg-border)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {portfolio.experience.map((item, index) => (
              <ExperienceCard key={item.company} {...item} isFirst={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
