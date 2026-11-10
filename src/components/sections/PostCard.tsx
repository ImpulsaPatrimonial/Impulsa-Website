import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import { Label } from '@/components/sections/Label'
import { cn } from '@/lib/utils'

type PostCardProps = {
  href: string
  category: string
  title: string
  meta: string
  image?: string
  imageAlt?: string
  className?: string
}

export function PostCard({
  href,
  category,
  title,
  meta,
  image,
  imageAlt,
  className,
}: PostCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        'group flex flex-col gap-3.5 text-ink no-underline',
        className,
      )}
    >
      <span className="relative block h-[230px] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={imageAlt ?? ''}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 group-hover:scale-[1.03]"
            width={640}
            height={460}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder className="absolute inset-0 h-full w-full" />
        )}
      </span>
      <Label>{category}</Label>
      <span className="font-serif text-2xl leading-[1.3] text-navy transition-colors group-hover:text-brand">
        {title}
      </span>
      <span className="text-[13px] text-muted">{meta}</span>
    </Link>
  )
}
