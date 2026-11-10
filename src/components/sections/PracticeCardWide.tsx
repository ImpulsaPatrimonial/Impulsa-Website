import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { cn } from '@/lib/utils'

type PracticeCardWideProps = {
  href: string
  label: string
  title: string
  description: string
  image: string
  imageAlt: string
  imagePosition?: string
  className?: string
}

export function PracticeCardWide({
  href,
  label,
  title,
  description,
  image,
  imageAlt,
  imagePosition = 'center',
  className,
}: PracticeCardWideProps) {
  return (
    <Link
      to={href}
      className={cn(
        'group grid grid-cols-1 border border-line bg-white text-ink no-underline sm:grid-cols-2',
        className,
      )}
    >
      <span className="relative block min-h-[220px] overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
          style={{ objectPosition: imagePosition }}
          width={800}
          height={440}
          loading="lazy"
        />
      </span>
      <span className="flex flex-col gap-3 p-8">
        <Label>{label}</Label>
        <span className="font-serif text-[26px] leading-[1.2] text-navy transition-colors group-hover:text-brand">
          {title}
        </span>
        <span className="text-[15px] leading-[1.7]">{description}</span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-brand">
          Conocer el servicio
          <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  )
}
