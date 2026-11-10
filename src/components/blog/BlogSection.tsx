import { PostCard } from '@/components/sections/PostCard'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { TextLink } from '@/components/sections/TextLink'
import { PostCardSkeleton } from '@/components/blog/PostCardSkeleton'
import { blogSectionDefaults } from '@/content/blog'
import { formatPostMeta } from '@/lib/format-date'
import { usePosts } from '@/hooks/queries/usePosts'

type BlogSectionProps = {
  eyebrow?: string
  title?: string
  linkLabel?: string
  linkHref?: string
  /** Si se indica, filtra por categoría; si no, toma los más recientes. */
  categorySlug?: string
  limit?: number
  className?: string
}

export function BlogSection({
  eyebrow = blogSectionDefaults.eyebrow,
  title = blogSectionDefaults.title,
  linkLabel = blogSectionDefaults.linkLabel,
  linkHref = blogSectionDefaults.linkHref,
  categorySlug,
  limit = 3,
  className,
}: BlogSectionProps) {
  const { data, isLoading } = usePosts({
    categorySlug,
    page: 1,
    pageSize: limit,
  })

  const posts = data?.items ?? []

  return (
    <section className={className ?? 'py-28'}>
      <div className="wrap">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          className="mb-12"
          action={<TextLink to={linkHref}>{linkLabel}</TextLink>}
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: limit }, (_, i) => (
                <PostCardSkeleton key={i} />
              ))
            : posts.map((post) => (
                <PostCard
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  category={post.category?.name ?? ''}
                  title={post.title}
                  meta={formatPostMeta(
                    post.authorName,
                    post.publishedAt,
                    post.readingMinutes,
                  )}
                  image={post.coverImageUrl ?? undefined}
                  imageAlt={post.coverImageAlt ?? undefined}
                />
              ))}
        </div>
      </div>
    </section>
  )
}
