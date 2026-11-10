/** Overlay estándar: A 0 %, B 38 %, C 100 % sobre rgba(12,28,52). */
export function pageHeroOverlay(
  a = 0.72,
  b = 0.3,
  c = 0.9,
): string {
  return `linear-gradient(180deg, rgba(12,28,52,${a}) 0%, rgba(12,28,52,${b}) 38%, rgba(12,28,52,${c}) 100%)`
}

export const heroes = {
  about: {
    badge: 'Quiénes somos',
    title: 'Especialistas en cumplimiento legal y fiscal desde 2012',
    imagePosition: 'center 55%',
    overlay: pageHeroOverlay(0.72, 0.3, 0.9),
  },
  services: {
    badge: 'Servicios',
    title: 'Asesoría especializada para cumplir con certeza',
    imagePosition: 'center 32%',
    overlay: pageHeroOverlay(0.65, 0.15, 0.85),
  },
  servicePld: {
    badge: 'Práctica principal',
    title: 'Prevención de Lavado de Dinero',
    imagePosition: 'center 42%',
    overlay: pageHeroOverlay(),
  },
  servicePt: {
    badge: 'Práctica principal',
    title: 'Precios de Transferencia',
    imagePosition: 'center 65%',
    overlay: pageHeroOverlay(),
  },
  // DECISIÓN: Legal Corporativo no se etiqueta como práctica principal.
  serviceLegal: {
    badge: 'Práctica',
    title: 'Legal Corporativo',
    imagePosition: '60% center',
    overlay: pageHeroOverlay(),
  },
  activities: {
    badge: 'Actividades vulnerables',
    title: 'Consulte las obligaciones de su actividad',
    imagePosition: 'center 55%',
    overlay: pageHeroOverlay(),
  },
  activityDetail: {
    badge: 'Actividad vulnerable',
    overlay: pageHeroOverlay(),
    imagePosition: 'center 55%',
  },
  blog: {
    badge: 'Blog',
    title: 'Análisis y actualizaciones',
    imagePosition: 'center 45%',
    overlay: pageHeroOverlay(),
  },
  blogPost: {
    imagePosition: 'center 45%',
    overlay: pageHeroOverlay(),
    minHeightClass: 'min-h-[540px]',
  },
  contact: {
    badge: 'Contacto',
    title: 'Cuéntenos sobre su empresa',
    imagePosition: 'center 40%',
    overlay: pageHeroOverlay(0.72, 0.35, 0.9),
  },
  legal: {
    badge: 'Información legal',
    imagePosition: 'center 40%',
    overlay: pageHeroOverlay(0.75, 0.45, 0.9),
  },
  notFound: {
    badge: 'Error 404',
    title: 'No encontramos esta página',
    overlay: pageHeroOverlay(),
  },
} as const

export const legalPageTitles: Record<string, string> = {
  '/aviso-de-privacidad': 'Aviso de privacidad',
  '/terminos-de-uso': 'Términos de uso',
  '/politica-de-cookies': 'Política de cookies',
  '/descargo-de-responsabilidad': 'Descargo de responsabilidad jurídica',
}

/** Datos de ejemplo hasta conectar Supabase (Fases 6–7). */
export const exampleActivity = {
  slug: 'comercializacion-de-vehiculos',
  name: 'Comercialización de vehículos',
} as const
