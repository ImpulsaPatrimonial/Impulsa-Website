import { cn } from '@/lib/utils'

type StatItemProps = {
  value: number
  suffix?: string
  label: string
  /** Valor animado actual (del useCountUp). */
  displayValue: number
  className?: string
}

export function StatItem({
  value,
  suffix = '+',
  label,
  displayValue,
  className,
}: StatItemProps) {
  return (
    <div className={cn('about-stat', className)}>
      <span className="about-stat-n" aria-hidden="true">
        {displayValue}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix} {label}
      </span>
      <span className="about-stat-l">{label}</span>
    </div>
  )
}
