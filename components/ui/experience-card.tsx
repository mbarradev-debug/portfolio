import type { WorkExperience } from '@/types'

type ExperienceCardProps = WorkExperience & {
  isFirst: boolean
}

export function ExperienceCard({ company, role, type, start, end, highlights, isFirst }: ExperienceCardProps) {
  return (
    <div className="relative pl-9">
      {/* Dot */}
      <div
        className="absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full border-2"
        style={{
          backgroundColor: isFirst ? 'var(--accent)' : 'var(--bg-surface)',
          borderColor: isFirst ? 'var(--accent)' : 'var(--bg-border)',
        }}
      />

      {/* Header */}
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3
          className="font-display font-bold text-primary"
          style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.02em' }}
        >
          {company}
        </h3>
        <span
          className="font-mono text-muted shrink-0"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          {start} – {end ?? 'Presente'}
        </span>
      </div>

      {/* Role + type */}
      <p
        className="font-body text-secondary mb-4"
        style={{ fontSize: 'var(--text-base)' }}
      >
        {role} · {type}
      </p>

      {/* Highlights */}
      <ul className="flex flex-col gap-2">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span
              className="mt-[5px] shrink-0 text-accent"
              style={{ fontSize: 'var(--text-xs)', lineHeight: 1 }}
            >
              ·
            </span>
            <span
              className="font-body text-secondary"
              style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65 }}
            >
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
