import { useSearchParams } from 'react-router-dom'

import { BlogEmptyState } from '@/components/blog/BlogEmptyState'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { CategoryFilters } from '@/components/blog/CategoryFilters'
import { FeaturedPost } from '@/components/blog/FeaturedPost'
import {
  FeaturedPostSkeleton,
  PostCardSkeleton,
} from '@/components/blog/PostCardSkeleton'
import { TagCloud } from '@/components/blog/TagCloud'
import { CtaSection } from '@/components/sections/CtaSection'
import { PageHero } from '@/components/sections/PageHero'
import { PostCard } from '@/components/sections/PostCard'
import { Seo } from '@/components/sections/Seo'
import { blogListing } from '@/content/blog'
import { heroes } from '@/content/heroes'
import { formatPostMeta } from '@/lib/format-date'
import {
  useCategories,
  useFeaturedPost,
  usePosts,
  useTags,
} from '@/hooks/queries/usePosts'
import heroImage from '@/assets/images/hero-blog.jpg'

/** Páginas ≥ 2: 3 filas × 3. */
const PAGE_SIZE = 9
/** Página 1 con destacado: 2 filas × 3 en la rejilla. */
const FIRST_PAGE_SIZE = 6

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria')
  const q = params.get('q') ?? ''
  const etiqueta = params.get('etiqueta')
  const pagina = Math.max(1, Number(params.get('pagina') ?? '1') || 1)

  const { data: categories = [], isLoading: loadingCats } = useCategories()
  const { data: tags = [] } = useTags()
  const { data: featured, isLoading: loadingFeatured } = useFeaturedPost()

  // Listado “Todas” sin búsqueda/etiqueta: destacado aparte + paginación 6 / 9.
  const isDefaultListing = !categoria && !q && !etiqueta
  const showFeatured = isDefaultListing && pagina === 1
  const firstPageSize = isDefaultListing ? FIRST_PAGE_SIZE : PAGE_SIZE
  const skeletonCount =
    showFeatured || (isDefaultListing && pagina === 1)
      ? FIRST_PAGE_SIZE
      : PAGE_SIZE

  // DECISIÓN: en el listado por defecto el destacado se excluye de la rejilla
  // en todas las páginas (solo aparece como card grande en la página 1).
  const { data: postsPage, isLoading: loadingPosts } = usePosts({
    categorySlug: categoria ?? undefined,
    q: q || undefined,
    tag: etiqueta ?? undefined,
    page: pagina,
    pageSize: PAGE_SIZE,
    firstPageSize,
    excludeFeatured: isDefaultListing,
  })

  const { badge, title, imagePosition, overlay } = heroes.blog

  function updateParams(next: {
    categoria?: string | null
    q?: string | null
    etiqueta?: string | null
    pagina?: number | null
  }) {
    const updated = new URLSearchParams(params)

    const apply = (key: string, value: string | null | undefined) => {
      if (value === undefined) return
      if (value === null || value === '') updated.delete(key)
      else updated.set(key, value)
    }

    apply('categoria', next.categoria)
    apply('q', next.q)
    apply('etiqueta', next.etiqueta)

    if (next.pagina !== undefined) {
      if (!next.pagina || next.pagina <= 1) updated.delete('pagina')
      else updated.set('pagina', String(next.pagina))
    }

    setParams(updated, { replace: false })
  }

  function buildPageHref(page: number): string {
    const next = new URLSearchParams(params)
    if (page <= 1) next.delete('pagina')
    else next.set('pagina', String(page))
    const qs = next.toString()
    return qs ? `/blog?${qs}` : '/blog'
  }

  const gridItems = postsPage?.items ?? []
  const total = postsPage?.total ?? 0
  const totalPages = postsPage?.totalPages ?? 0
  const isEmpty = !loadingPosts && total === 0

  return (
    <>
      <Seo title="Blog" description={blogListing.intro} path="/blog" />
      <PageHero
        badge={badge}
        title={title}
        image={heroImage}
        imagePosition={imagePosition}
        overlay={overlay}
      />

      <section className="pb-12 pt-[72px]">
        <div className="wrap flex flex-col gap-7">
          <div className="flex flex-wrap items-end justify-between gap-7">
            <p className="m-0 max-w-[620px] font-serif text-2xl leading-[1.45] text-navy">
              {blogListing.intro}
            </p>
            <BlogSearch
              value={q}
              onSearch={(query) =>
                updateParams({ q: query || null, pagina: 1 })
              }
            />
          </div>
          {!loadingCats ? (
            <CategoryFilters
              categories={categories}
              activeSlug={categoria}
              onSelect={(slug) =>
                updateParams({ categoria: slug, pagina: 1 })
              }
            />
          ) : (
            <div className="flex gap-2.5 border-t border-line pt-7" aria-hidden>
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-11 w-36 animate-pulse bg-tint" />
              ))}
            </div>
          )}
        </div>
      </section>

      {showFeatured ? (
        <section className="pb-[72px]">
          <div className="wrap">
            {loadingFeatured ? (
              <FeaturedPostSkeleton />
            ) : featured ? (
              <FeaturedPost post={featured} />
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="pb-20">
        <div className="wrap">
          {isEmpty ? (
            <BlogEmptyState
              onClear={() => {
                setParams(new URLSearchParams(), { replace: false })
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {loadingPosts
                ? Array.from({ length: skeletonCount }, (_, i) => (
                    <PostCardSkeleton key={i} />
                  ))
                : gridItems.map((post) => (
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
          )}
        </div>
      </section>

      <section className="pb-[104px]">
        <div className="wrap flex flex-col gap-10">
          <BlogPagination
            page={pagina}
            totalPages={totalPages}
            buildHref={buildPageHref}
          />
          <TagCloud tags={tags} activeTag={etiqueta} />
        </div>
      </section>

      <CtaSection title={blogListing.cta.title} text={blogListing.cta.text} />
    </>
  )
}
