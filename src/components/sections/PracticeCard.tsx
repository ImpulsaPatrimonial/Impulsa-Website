import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { cn } from '@/lib/utils'

type PracticeCardProps = {
  href: string
  label: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
  className?: string
}

export function PracticeCard({
  href,
  label,
  title,
  description,
  image,
  imageAlt,
  imagePosition = 'center',
  className,
}: PracticeCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        'group flex flex-col border border-line bg-white text-ink no-underline',
        className,
      )}
    >
      <span className="relative block h-[260px] overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
          style={{ objectPosition: imagePosition }}
          width={800}
          height={520}
          loading="lazy"
        />
      </span>
      <span className="flex flex-col gap-3.5 p-9">
        <Label>{label}</Label>
        <span className="font-serif text-[32px] leading-[1.15] text-navy transition-colors group-hover:text-brand">
          {title}
        </span>
        <span className="text-[15px] leading-[1.75]">{description}</span>
        <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-brand">
          Conocer el servicio
          <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  )
}
