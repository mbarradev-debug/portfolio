import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1100px]',
        'px-4 md:px-6 xl:px-8',
        className
      )}
    >
      {children}
    </div>
  )
}
