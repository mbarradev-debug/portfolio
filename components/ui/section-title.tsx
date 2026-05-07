import { cn } from '@/lib/utils'
import { Divider } from './divider'

interface SectionTitleProps {
  children: React.ReactNode
  number?: string
  className?: string
}

export function SectionTitle({ children, number, className }: SectionTitleProps) {
  return (
    <div className={cn('relative mb-[var(--space-12)]', className)}>
      {number && (
        <span
          aria-hidden="true"
          className="font-display font-extrabold leading-none text-primary pointer-events-none select-none absolute -top-2 right-0"
          style={{
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            opacity: 0.03,
          }}
        >
          {number}
        </span>
      )}
      <h2
        className="font-display font-bold text-primary"
        style={{
          fontSize: 'var(--text-3xl)',
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
        }}
      >
        {children}
      </h2>
      <Divider className="mt-4" />
    </div>
  )
}
