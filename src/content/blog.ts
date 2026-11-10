export const blogListing = {
  intro:
    'Reformas, criterios y guías prácticas sobre Prevención de Lavado de Dinero, Precios de Transferencia y Legal Corporativo.',
  searchPlaceholder: 'Buscar artículos…',
  searchLabel: 'Buscar artículos',
  searchButton: 'Buscar',
  allCategories: 'Todas',
  filtersAria: 'Filtrar por categoría',
  featuredPrefix: 'Destacado',
  emptyTitle: 'No encontramos artículos con esos criterios.',
  clearFilters: 'Limpiar filtros',
  tagsLabel: 'Etiquetas',
  nextPage: 'Siguiente →',
  paginationAria: 'Paginación',
  cta: {
    title: '¿Tiene dudas sobre sus obligaciones?',
    text: 'Cuéntenos su actividad y le orientamos sobre las obligaciones que le aplican. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
  },
} as const

export const blogArticle = {
  tocLabel: 'Contenido',
  shareLabel: 'Compartir',
  copyUrlLabel: 'Copiar enlace',
  copyToast: 'Enlace copiado',
  linkedInLabel: 'Compartir en LinkedIn',
  whatsAppLabel: 'Compartir por WhatsApp',
  disclaimer:
    'Este contenido es informativo y no sustituye una asesoría particular.',
  tagsLabel: 'Etiquetas',
  relatedEyebrow: 'Sigue leyendo',
  relatedTitle: 'Artículos relacionados',
  relatedLink: 'Ver todos los artículos',
  serviceCtaTitle: '¿Necesita un diagnóstico de sus obligaciones?',
  serviceCtaButton: 'Conocer el servicio',
  cta: {
    title: '¿Este tema aplica a su empresa?',
    text: 'Le ayudamos a revisar si estas obligaciones le aplican y qué debe hacer para cumplirlas a tiempo. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
  },
} as const

export const blogSectionDefaults = {
  eyebrow: 'Blog',
  title: 'Análisis y actualizaciones',
  linkLabel: 'Ver todos los artículos',
  linkHref: '/blog',
} as const

/** CTA de servicio insertado tras el primer H2 según la categoría del artículo. */
export const serviceCtaByCategorySlug: Record<
  string,
  { label: string; href: string } | null
> = {
  'prevencion-de-lavado-de-dinero': {
    label: 'Prevención de Lavado de Dinero',
    href: '/servicios/prevencion-de-lavado-de-dinero',
  },
  'actividades-vulnerables': {
    label: 'Prevención de Lavado de Dinero',
    href: '/servicios/prevencion-de-lavado-de-dinero',
  },
  'precios-de-transferencia': {
    label: 'Precios de Transferencia',
    href: '/servicios/precios-de-transferencia',
  },
  'legal-corporativo': {
    label: 'Legal Corporativo',
    href: '/servicios/legal-corporativo',
  },
  'eventos-y-participaciones': null,
}
