import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'font-mono text-[length:var(--text-xs)]',
        'text-accent-alt bg-accent-subtle',
        'rounded px-2 py-[2px]',
        'border border-accent-alt/[.15]',
        'transition-colors duration-150',
        className
      )}
    >
      {children}
    </span>
  )
}
