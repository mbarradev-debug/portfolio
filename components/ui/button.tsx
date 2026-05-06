import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]',
  ghost: 'text-accent hover:bg-accent-subtle',
  outline:
    'border border-accent text-accent hover:bg-accent-subtle hover:-translate-y-0.5',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs rounded gap-1.5',
  md: 'h-10 px-5 text-sm rounded-md gap-2',
  lg: 'h-12 px-6 text-base rounded-md gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-body font-medium',
        'transition-[transform,background-color,box-shadow] duration-200',
        '[transition-timing-function:var(--ease-out-expo)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
