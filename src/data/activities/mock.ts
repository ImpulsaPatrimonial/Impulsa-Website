import { defaultObligations } from '@/content/activities'
import type { VulnerableActivity } from '@/types/activity'

const obligations = [...defaultObligations]

const placeholderThresholds = [
  {
    supuesto: '[Supuesto A — pendiente]',
    identificacion: '[UMA — pendiente]',
    aviso: '[UMA — pendiente]',
  },
  {
    supuesto: '[Supuesto B — pendiente]',
    identificacion: '[UMA — pendiente]',
    aviso: '[UMA — pendiente]',
  },
  {
    supuesto: '[Supuesto C — pendiente]',
    identificacion: '[UMA — pendiente]',
    aviso: '[UMA — pendiente]',
  },
]

const placeholderDeadlines = [
  {
    plazo: '[Plazo — pendiente]',
    tramite: '[Trámite — pendiente]',
  },
  {
    plazo: '[Plazo — pendiente]',
    tramite: '[Trámite — pendiente]',
  },
  {
    plazo: '[Plazo — pendiente]',
    tramite: '[Trámite — pendiente]',
  },
]

const placeholderSanctions = [
  {
    incumplimiento: '[Incumplimiento — pendiente]',
    sancion: '[Rango de sanción — pendiente]',
  },
  {
    incumplimiento: '[Incumplimiento — pendiente]',
    sancion: '[Rango de sanción — pendiente]',
  },
  {
    incumplimiento: '[Incumplimiento — pendiente]',
    sancion: '[Rango de sanción — pendiente]',
  },
]

const placeholderFaqs = [
  {
    q: '[Pregunta frecuente 1 — pendiente]',
    a: '[Respuesta pendiente. Aquí irá la explicación breve y clara correspondiente a esta actividad.]',
  },
  {
    q: '[Pregunta frecuente 2 — pendiente]',
    a: '[Respuesta pendiente. Aquí irá la explicación breve y clara correspondiente a esta actividad.]',
  },
  {
    q: '[Pregunta frecuente 3 — pendiente]',
    a: '[Respuesta pendiente. Aquí irá la explicación breve y clara correspondiente a esta actividad.]',
  },
]

const descriptionHtml = `<p>[Descripción pendiente. Aquí se explicará en qué consiste esta actividad vulnerable, quiénes la realizan y bajo qué supuestos se activan las obligaciones de la LFPIORPI.]</p>
<p>[Párrafo adicional pendiente con matices operativos, ejemplos frecuentes y alcance típico para esta actividad.]</p>`

function base(
  partial: Pick<
    VulnerableActivity,
    | 'id'
    | 'slug'
    | 'name'
    | 'heroImageUrl'
    | 'heroImageAlt'
    | 'heroImagePosition'
    | 'cardImageUrl'
    | 'sortOrder'
  >,
): VulnerableActivity {
  return {
    ...partial,
    summary:
      '[Resumen pendiente. Frase breve que describe la actividad y anticipa las obligaciones principales.]',
    bodyImageUrl: null,
    bodyImageAlt: null,
    descriptionHtml,
    obligations,
    thresholds: placeholderThresholds,
    deadlines: placeholderDeadlines,
    sanctions: placeholderSanctions,
    faqs: placeholderFaqs,
    showInHomeCarousel: true,
    status: 'published',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-03-01T12:00:00.000Z',
  }
}

export const mockActivities: VulnerableActivity[] = [
  base({
    id: 'act-1',
    slug: 'compraventa-de-inmuebles',
    name: 'Compraventa de inmuebles',
    heroImageUrl: 'av-compraventa-inmuebles.jpg',
    heroImageAlt: 'Asesora inmobiliaria con carpeta, planos y llaves',
    heroImagePosition: 'center',
    cardImageUrl: 'av-compraventa-inmuebles.jpg',
    sortOrder: 1,
  }),
  base({
    id: 'act-2',
    slug: 'comercializacion-de-vehiculos',
    name: 'Comercialización de vehículos',
    heroImageUrl: 'av-comercializacion-vehiculos.jpg',
    heroImageAlt: 'Apretón de manos frente a un automóvil en agencia',
    heroImagePosition: 'center 55%',
    cardImageUrl: 'av-comercializacion-vehiculos.jpg',
    sortOrder: 2,
  }),
  base({
    id: 'act-3',
    slug: 'joyeria-y-metales-preciosos',
    name: 'Joyería y metales preciosos',
    heroImageUrl: 'av-joyeria-metales.jpg',
    heroImageAlt: 'Anillos con piedras preciosas en vitrina',
    heroImagePosition: '45% center',
    cardImageUrl: 'av-joyeria-metales.jpg',
    sortOrder: 3,
  }),
  base({
    id: 'act-4',
    slug: 'activos-virtuales',
    name: 'Activos virtuales',
    heroImageUrl: 'av-activos-virtuales.jpg',
    heroImageAlt: 'Monedas de criptoactivos frente a una gráfica de operaciones',
    heroImagePosition: 'center',
    cardImageUrl: 'av-activos-virtuales.jpg',
    sortOrder: 4,
  }),
  base({
    id: 'act-5',
    slug: 'juegos-con-apuesta-y-sorteos',
    name: 'Juegos con apuesta y sorteos',
    heroImageUrl: 'av-juegos-apuestas.jpg',
    heroImageAlt: 'Mesa de ruleta con fichas de apuesta',
    heroImagePosition: 'center',
    cardImageUrl: 'av-juegos-apuestas.jpg',
    sortOrder: 5,
  }),
]
