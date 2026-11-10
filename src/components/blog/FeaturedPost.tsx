import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import { Label } from '@/components/sections/Label'
import { blogListing } from '@/content/blog'
import { formatPostMeta } from '@/lib/format-date'
import type { BlogPostSummary } from '@/types/blog'

type FeaturedPostProps = {
  post: BlogPostSummary
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const categoryName = post.category?.name ?? ''

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="grid grid-cols-1 bg-tint text-ink no-underline md:grid-cols-2"
    >
      <span className="relative block min-h-[280px] md:min-h-[400px]">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt={post.coverImageAlt ?? ''}
            className="absolute inset-0 h-full w-full object-cover"
            width={800}
            height={400}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder className="absolute inset-0 h-full w-full" />
        )}
      </span>
      <span className="flex flex-col justify-center gap-[18px] p-8 md:p-12">
        <Label>
          {blogListing.featuredPrefix}
          {categoryName ? ` · ${categoryName}` : ''}
        </Label>
        <span className="font-serif text-[28px] leading-[1.2] text-navy md:text-[36px]">
          {post.title}
        </span>
        <span className="text-base leading-[1.75]">{post.excerpt}</span>
        <span className="text-[13px] text-muted">
          {formatPostMeta(
            post.authorName,
            post.publishedAt,
            post.readingMinutes,
          )}
        </span>
      </span>
    </Link>
  )
}
