import { SectionTitle } from '@/components/ui/section-title'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/ui/reveal'
import { StaggerList, StaggerItem } from '@/components/ui/stagger-list'
import { portfolio } from '@/data/portfolio'

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="relative"
      style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        <Reveal>
          <SectionTitle number="05">Skills</SectionTitle>
        </Reveal>

        <StaggerList className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills.map(({ category, label, items }) => (
            <StaggerItem key={category}>
              <div className="card flex flex-col gap-4">
                <h3
                  className="font-mono text-muted"
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  )
}
