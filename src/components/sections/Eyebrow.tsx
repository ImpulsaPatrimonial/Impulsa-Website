import { cn } from '@/lib/utils'

type EyebrowProps = {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
  lineWidth?: 32 | 40
}

export function Eyebrow({
  children,
  tone = 'light',
  className,
  lineWidth = 32,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3.5 text-xs font-semibold uppercase tracking-eyebrow',
        tone === 'light' ? 'text-brand' : 'text-sky',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="block h-px bg-current"
        style={{ width: lineWidth }}
      />
      {children}
    </span>
  )
}
