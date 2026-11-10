export type BlogCategory = {
  id: string
  slug: string
  name: string
  sortOrder: number
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  coverImageUrl: string | null
  coverImageAlt: string | null
  category: BlogCategory | null
  tags: string[]
  authorName: string
  authorRole: string
  authorBio: string
  readingMinutes: number
  featured: boolean
  status: 'draft' | 'published'
  publishedAt: string
  seoTitle: string | null
  seoDescription: string | null
  updatedAt: string
}

export type BlogPostSummary = Omit<BlogPost, 'contentHtml' | 'authorBio'>

export type PostFilters = {
  categorySlug?: string
  q?: string
  tag?: string
  page?: number
  /** Tamaño de página a partir de la 2 (p. ej. 9 = 3 filas × 3). */
  pageSize?: number
  /**
   * Tamaño solo de la página 1 cuando el listado lleva destacado
   * (p. ej. 6 = 2 filas × 3). Si no se indica, se usa pageSize.
   */
  firstPageSize?: number
  excludeIds?: string[]
  /** Excluye posts con featured=true (p. ej. cuando el destacado se muestra aparte). */
  excludeFeatured?: boolean
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
