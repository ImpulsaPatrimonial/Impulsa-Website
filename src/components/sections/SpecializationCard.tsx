import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { aboutSpecialization } from '@/content/about'

type SpecializationCardProps = {
  number: string
  title: string
  description: string
  href: string
}

export function SpecializationCard({
  number,
  title,
  description,
  href,
}: SpecializationCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-3.5 border border-line p-9 text-ink no-underline transition-colors hover:border-brand"
    >
      <Label>{number}</Label>
      <span className="font-serif text-[26px] leading-[1.2] text-navy transition-colors group-hover:text-brand">
        {title}
      </span>
      <span className="text-[15px] leading-[1.7]">{description}</span>
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-brand">
        {aboutSpecialization.linkLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}
