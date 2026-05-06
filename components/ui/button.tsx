import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

type ButtonBaseProps = {
  variant?: Variant
  size?: Size
  className?: string
  children?: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]',
  ghost: 'text-accent hover:bg-accent-subtle',
  outline: 'border border-accent text-accent hover:bg-accent-subtle hover:-translate-y-0.5',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs rounded gap-1.5',
  md: 'h-10 px-5 text-sm rounded-md gap-2',
  lg: 'h-12 px-6 text-base rounded-md gap-2',
}

const baseClasses =
  'inline-flex items-center justify-center font-body font-medium ' +
  'transition-[transform,background-color,box-shadow] duration-200 ' +
  '[transition-timing-function:var(--ease-out-expo)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-base ' +
  'disabled:pointer-events-none disabled:opacity-50'

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variants[variant], sizes[size], className)

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as ButtonAsAnchor
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  )
}
