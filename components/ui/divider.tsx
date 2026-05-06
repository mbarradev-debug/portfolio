import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('w-full h-px my-[var(--space-1)]', className)}
      style={{
        background:
          'linear-gradient(90deg, transparent, var(--bg-border) 20%, var(--bg-border) 80%, transparent)',
      }}
    />
  )
}
