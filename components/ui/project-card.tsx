import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types'

export function ProjectCard({ name, tagline, outcome, stack, url, repo }: Project) {
  return (
    <article className="card flex flex-col">
      {/* Preview area — gradient placeholder */}
      <div
        aria-hidden="true"
        className="mb-6 h-32 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--bg-border)',
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(79,142,247,0.09) 0%, transparent 70%), var(--bg-elevated)',
        }}
      />

      {/* Name + action links */}
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3
          className="font-display font-bold text-primary"
          style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.02em' }}
        >
          {name}
        </h3>
        <div className="flex shrink-0 items-center gap-3 pt-0.5">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${name} en producción`}
              className="font-mono text-accent transition-colors duration-150 hover:text-accent-hover"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              ↗
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositorio de ${name} en GitHub`}
              className="font-mono text-secondary transition-colors duration-150 hover:text-primary"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Tagline */}
      <p className="font-body text-secondary mb-3" style={{ fontSize: 'var(--text-base)' }}>
        {tagline}
      </p>

      {/* Outcome */}
      <p
        className="font-body text-muted mb-6 flex-1"
        style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65 }}
      >
        {outcome}
      </p>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </article>
  )
}
