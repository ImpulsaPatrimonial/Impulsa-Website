import { useQuery } from '@tanstack/react-query'

import { mockCategories, mockPosts, toSummary } from '@/data/blog/mock'
import { normalizeSearch } from '@/lib/slugify'
import type {
  BlogCategory,
  BlogPost,
  BlogPostSummary,
  Paginated,
  PostFilters,
} from '@/types/blog'

const STALE_MS = 5 * 60 * 1000
const LATENCY_MS = 300

async function withLatency<T>(value: T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS))
  return value
}

function publishedPosts(): BlogPost[] {
  return mockPosts
    .filter((p) => p.status === 'published')
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
}

function matchesQuery(post: BlogPost, q: string): boolean {
  const needle = normalizeSearch(q)
  if (!needle) return true
  return (
    normalizeSearch(post.title).includes(needle) ||
    normalizeSearch(post.excerpt).includes(needle)
  )
}

function filterPosts(filters: PostFilters = {}): BlogPost[] {
  const {
    categorySlug,
    q,
    tag,
    excludeIds = [],
    excludeFeatured = false,
  } = filters

  return publishedPosts().filter((post) => {
    if (excludeIds.includes(post.id)) return false
    if (excludeFeatured && post.featured) return false
    if (categorySlug && post.category?.slug !== categorySlug) return false
    if (tag && !post.tags.includes(tag)) return false
    if (q && !matchesQuery(post, q)) return false
    return true
  })
}

function totalPagesFor(
  total: number,
  pageSize: number,
  firstPageSize: number,
): number {
  if (total <= 0) return 0
  if (total <= firstPageSize) return 1
  return 1 + Math.ceil((total - firstPageSize) / pageSize)
}

function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
  firstPageSize = pageSize,
): Paginated<T> {
  const safePage = Math.max(1, page)
  const first = firstPageSize
  const rest = pageSize
  const totalPages = totalPagesFor(items.length, rest, first)

  const start =
    safePage === 1 ? 0 : first + (safePage - 2) * rest
  const size = safePage === 1 ? first : rest

  return {
    items: items.slice(start, start + size),
    total: items.length,
    page: safePage,
    pageSize: size,
    totalPages,
  }
}

async function fetchPosts(
  filters: PostFilters = {},
): Promise<Paginated<BlogPostSummary>> {
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? 9
  const firstPageSize = filters.firstPageSize ?? pageSize
  const filtered = filterPosts(filters)
  const result = paginate(
    filtered.map(toSummary),
    page,
    pageSize,
    firstPageSize,
  )
  return withLatency(result)
}

async function fetchPost(slug: string): Promise<BlogPost | null> {
  const post =
    publishedPosts().find((p) => p.slug === slug) ??
    mockPosts.find((p) => p.slug === slug && p.status === 'published') ??
    null
  return withLatency(post)
}

async function fetchFeaturedPost(): Promise<BlogPostSummary | null> {
  const featured = publishedPosts().find((p) => p.featured) ?? null
  return withLatency(featured ? toSummary(featured) : null)
}

async function fetchCategories(): Promise<BlogCategory[]> {
  return withLatency(
    [...mockCategories].sort((a, b) => a.sortOrder - b.sortOrder),
  )
}

async function fetchTags(): Promise<string[]> {
  const set = new Set<string>()
  for (const post of publishedPosts()) {
    for (const tag of post.tags) set.add(tag)
  }
  return withLatency([...set].sort((a, b) => a.localeCompare(b, 'es')))
}

async function fetchRelatedPosts(
  post: Pick<BlogPost, 'id' | 'category'>,
  limit = 3,
): Promise<BlogPostSummary[]> {
  const sameCategory = publishedPosts().filter(
    (p) => p.id !== post.id && p.category?.slug === post.category?.slug,
  )
  const others = publishedPosts().filter(
    (p) =>
      p.id !== post.id &&
      !sameCategory.some((s) => s.id === p.id),
  )
  const combined = [...sameCategory, ...others].slice(0, limit).map(toSummary)
  return withLatency(combined)
}

export function usePosts(filters: PostFilters = {}) {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    staleTime: STALE_MS,
  })
}

export function usePost(slug: string | undefined) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug!),
    enabled: Boolean(slug),
    staleTime: STALE_MS,
  })
}

export function useFeaturedPost() {
  return useQuery({
    queryKey: ['posts', 'featured'],
    queryFn: fetchFeaturedPost,
    staleTime: STALE_MS,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: fetchCategories,
    staleTime: STALE_MS,
  })
}

export function useTags() {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: fetchTags,
    staleTime: STALE_MS,
  })
}

export function useRelatedPosts(
  post: Pick<BlogPost, 'id' | 'category'> | null | undefined,
  limit = 3,
) {
  return useQuery({
    queryKey: ['posts', 'related', post?.id, limit],
    queryFn: () => fetchRelatedPosts(post!, limit),
    enabled: Boolean(post?.id),
    staleTime: STALE_MS,
  })
}
