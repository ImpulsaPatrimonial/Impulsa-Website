import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type TimelineRowProps = {
  year: string
  text: string
  emphasized?: readonly string[]
  isLast?: boolean
}

function withEmphasis(
  text: string,
  emphasized?: readonly string[],
): ReactNode {
  if (!emphasized || emphasized.length === 0) return text

  const parts: ReactNode[] = []
  let remaining = text
  let key = 0

  for (const phrase of emphasized) {
    const index = remaining.indexOf(phrase)
    if (index === -1) continue
    if (index > 0) parts.push(remaining.slice(0, index))
    parts.push(<em key={key}>{phrase}</em>)
    key += 1
    remaining = remaining.slice(index + phrase.length)
  }
  if (remaining) parts.push(remaining)
  return parts.length > 0 ? parts : text
}

export function TimelineRow({
  year,
  text,
  emphasized,
  isLast = false,
}: TimelineRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-3 border-t border-line py-7 sm:grid-cols-[110px_1fr] sm:gap-6',
        isLast && 'border-b border-line',
      )}
    >
      <span className="font-serif text-[30px] leading-none text-brand">
        {year}
      </span>
      <span className="text-base leading-[1.7] text-ink">
        {withEmphasis(text, emphasized)}
      </span>
    </div>
  )
}
