import { SectionTitle } from '@/components/ui/section-title'
import { Badge } from '@/components/ui/badge'
import { portfolio } from '@/data/portfolio'

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative"
      style={{ paddingBlock: 'clamp(5rem, 10vw, 9rem)' }}
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        <SectionTitle number="02">Sobre mí</SectionTitle>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.65fr] md:gap-[var(--space-16)]">
          {/* Left: bio */}
          <div className="flex flex-col gap-5">
            <p
              className="font-body text-secondary"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.65 }}
            >
              Soy Full Stack Developer con más de 3 años construyendo aplicaciones en producción,
              tanto para el sector público como para consultoras y SaaS B2B.
            </p>
            <p
              className="font-body text-secondary"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.65 }}
            >
              Trabajo principalmente con React, Next.js y TypeScript, y manejo el stack completo:
              desde el diseño de base de datos hasta el despliegue en la nube.
            </p>
            <p
              className="font-body text-secondary"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.65 }}
            >
              Lo que me importa es que el código sea mantenible y que tenga impacto real en el
              producto, no solo que funcione el día del deploy.
            </p>
          </div>

          {/* Right: stack visual grouped by category */}
          <div className="flex flex-col gap-6">
            {portfolio.skills.map(({ category, label, items }) => (
              <div key={category}>
                <p
                  className="font-mono text-muted mb-2"
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
