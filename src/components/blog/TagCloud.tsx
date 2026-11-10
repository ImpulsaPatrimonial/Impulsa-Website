import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { blogListing } from '@/content/blog'
import { cn } from '@/lib/utils'

type TagCloudProps = {
  tags: string[]
  activeTag?: string | null
  className?: string
}

export function TagCloud({ tags, activeTag, className }: TagCloudProps) {
  if (tags.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 border-t border-line pt-7',
        className,
      )}
    >
      <Label className="mr-2.5">{blogListing.tagsLabel}</Label>
      {tags.map((tag) => {
        const active = activeTag === tag
        return (
          <Link
            key={tag}
            to={`/blog?etiqueta=${encodeURIComponent(tag)}`}
            className={cn(
              'bg-tint px-3 py-1.5 text-[13px] text-navy no-underline hover:text-brand',
              active && 'bg-navy text-white hover:text-white',
            )}
          >
            #{tag}
          </Link>
        )
      })}
    </div>
  )
}
