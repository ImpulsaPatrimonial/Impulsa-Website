import { cn } from '@/lib/utils'

type LabelProps = {
  children: React.ReactNode
  className?: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <span
      className={cn(
        'text-xs font-semibold uppercase tracking-label text-brand',
        className,
      )}
    >
      {children}
    </span>
  )
}
