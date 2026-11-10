import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { complementarySummary } from '@/content/services'
import { cn } from '@/lib/utils'

type ComplementCardProps = {
  className?: string
}

export function ComplementCard({ className }: ComplementCardProps) {
  return (
    <Link
      to={complementarySummary.href}
      className={cn(
        'flex flex-col justify-between gap-5 bg-navy p-9 text-on-dark no-underline',
        className,
      )}
    >
      <span className="flex flex-col gap-3">
        <Label className="text-sky">{complementarySummary.label}</Label>
        <span className="font-serif text-[26px] leading-[1.25] text-white">
          {complementarySummary.title}
        </span>
        <span className="text-[15px] leading-[1.9]">
          {complementarySummary.items}
        </span>
      </span>
      <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-white">
        {complementarySummary.linkLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}
