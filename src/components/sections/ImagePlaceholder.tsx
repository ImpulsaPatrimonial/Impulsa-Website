import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
  className?: string
  label?: string
}

export function ImagePlaceholder({ className, label }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[linear-gradient(140deg,#2C5283_0%,#16325B_55%,#0E2342_100%)]',
        className,
      )}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_22px)]"
      />
    </div>
  )
}
