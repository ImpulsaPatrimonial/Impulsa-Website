export type ActivityThreshold = {
  supuesto: string
  identificacion: string
  aviso: string
}

export type ActivityDeadline = {
  plazo: string
  tramite: string
}

export type ActivitySanction = {
  incumplimiento: string
  sancion: string
}

export type ActivityFaq = {
  q: string
  a: string
}

export type VulnerableActivity = {
  id: string
  slug: string
  name: string
  summary: string
  heroImageUrl: string | null
  heroImageAlt: string | null
  /** Encabezado visual (no está en el esquema SQL; se usa en el hero). */
  heroImagePosition: string
  cardImageUrl: string | null
  bodyImageUrl: string | null
  bodyImageAlt: string | null
  descriptionHtml: string
  obligations: string[]
  thresholds: ActivityThreshold[]
  deadlines: ActivityDeadline[]
  sanctions: ActivitySanction[]
  faqs: ActivityFaq[]
  showInHomeCarousel: boolean
  sortOrder: number
  status: 'draft' | 'published'
  seoTitle: string | null
  seoDescription: string | null
  updatedAt: string
}

export type ActivitySummary = {
  id: string
  slug: string
  name: string
  summary: string
  cardImageUrl: string | null
  sortOrder: number
  // DECISIÓN: alt y position opcionales para reutilizar el summary en cards y carrusel sin un fetch extra.
  heroImageAlt?: string | null
  heroImagePosition?: string
}
