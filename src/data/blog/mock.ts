import type { BlogCategory, BlogPost } from '@/types/blog'

export const mockCategories: BlogCategory[] = [
  {
    id: 'cat-pld',
    slug: 'prevencion-de-lavado-de-dinero',
    name: 'Prevención de Lavado de Dinero',
    sortOrder: 1,
  },
  {
    id: 'cat-pt',
    slug: 'precios-de-transferencia',
    name: 'Precios de Transferencia',
    sortOrder: 2,
  },
  {
    id: 'cat-legal',
    slug: 'legal-corporativo',
    name: 'Legal Corporativo',
    sortOrder: 3,
  },
  {
    id: 'cat-av',
    slug: 'actividades-vulnerables',
    name: 'Actividades vulnerables',
    sortOrder: 4,
  },
  {
    id: 'cat-eventos',
    slug: 'eventos-y-participaciones',
    name: 'Eventos y participaciones',
    sortOrder: 5,
  },
]

const AUTHOR = {
  name: '[Nombre del autor]',
  role: '[Cargo]',
  bio: '[Bio breve de una o dos líneas.]',
  roleArea: '[Cargo · área]',
} as const

function pendingBody(topic: string): string {
  return `
<h2>Contexto de ${topic}</h2>
<p>[pendiente] Texto introductorio sobre el tema. Sustituir con el contenido aprobado por el despacho.</p>
<h2>Obligaciones y criterios aplicables</h2>
<p>[pendiente] Desarrollo de las obligaciones, plazos y criterios relevantes.</p>
<ul>
<li>[pendiente] Punto clave 1</li>
<li>[pendiente] Punto clave 2</li>
<li>[pendiente] Punto clave 3</li>
</ul>
<h2>Recomendaciones prácticas</h2>
<p>[pendiente] Acciones concretas que su empresa puede considerar.</p>
`.trim()
}

const reformaContentHtml = `
<h2>Qué cambió con la reforma de 2025</h2>
<p>La reforma a la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita, publicada el 16 de julio de 2025, y los ajustes al Reglamento y a las Reglas de Carácter General de 2026 profundizan cinco frentes: la evaluación de riesgos, el conocimiento de clientes y beneficiarios controladores, los controles internos, la capacitación y la revisión del cumplimiento.</p>
<h3>Lo que se mantiene</h3>
<p>Las actividades vulnerables siguen definidas en el artículo 17 de la Ley, y las obligaciones particulares se determinan para cada actividad y operación. Lo que cambia es el nivel de detalle con el que cada sujeto obligado debe documentar y acreditar su cumplimiento.</p>
<h2>Un calendario gradual</h2>
<p>La implementación ocurre en tres etapas: estructural, operativa y tecnológica. Estas son algunas de las fechas clave:</p>
<ul>
<li><strong>30 de noviembre de 2026:</strong> entrada en vigor general de las Reglas.</li>
<li><strong>1 de marzo de 2027:</strong> evaluación con enfoque basado en riesgo y beneficiario controlador en operaciones nuevas.</li>
<li><strong>1 de junio de 2027:</strong> mecanismos automatizados y nuevos formatos de avisos e informes.</li>
<li><strong>30 de marzo de 2029:</strong> entrega del primer dictamen de auditoría.</li>
</ul>
<blockquote>Cada proyecto debe distinguir las medidas que ya son obligatorias de aquellas que deben prepararse para su futura entrada en vigor.</blockquote>
<h2>Qué hacer antes del 30 de noviembre de 2026</h2>
<ul>
<li>Confirmar si su actividad es vulnerable y si sus operaciones superan los umbrales.</li>
<li>Revisar que su manual cumpla con el nuevo contenido mínimo.</li>
<li>Identificar a las personas políticamente expuestas entre sus clientes.</li>
<li>Prever la auditoría como una obligación y su calendario.</li>
<li>Si detecta omisiones, valorar la autorregularización espontánea antes de una visita de verificación.</li>
</ul>
`.trim()

function cat(slug: string): BlogCategory {
  const found = mockCategories.find((c) => c.slug === slug)
  if (!found) throw new Error(`Categoría no encontrada: ${slug}`)
  return found
}

export const mockPosts: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'reforma-lfpriorpi-que-cambia',
    title:
      'Reforma a la LFPIORPI: qué cambia y cuándo debe cumplir su empresa',
    excerpt:
      'Las nuevas obligaciones se aplican de forma gradual entre noviembre de 2026 y marzo de 2029. Le explicamos el calendario y qué medidas conviene preparar desde ahora.',
    contentHtml: reformaContentHtml,
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('prevencion-de-lavado-de-dinero'),
    tags: ['reforma2025', 'actividadesvulnerables', 'avisos'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 7,
    featured: true,
    status: 'published',
    publishedAt: '2026-11-12T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-11-12T10:00:00.000Z',
  },
  {
    id: 'post-02',
    slug: 'declaraciones-maestra-local-pais',
    title:
      'Declaraciones maestra, local y país por país: ¿su grupo está obligado?',
    excerpt:
      'Revisamos los umbrales, el alcance de cada declaración y cómo anticipar la documentación que suelen solicitar las autoridades.',
    contentHtml: pendingBody('declaraciones de precios de transferencia'),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('precios-de-transferencia'),
    tags: ['partesrelacionadas', 'OCDE'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 6,
    featured: false,
    status: 'published',
    publishedAt: '2026-10-28T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-10-28T10:00:00.000Z',
  },
  {
    id: 'post-03',
    slug: 'beneficiario-controlador',
    title:
      'Beneficiario controlador: la información que su empresa debe identificar y conservar',
    excerpt:
      'Qué datos debe recabar, por cuánto tiempo conservarlos y cómo documentar el cumplimiento ante una revisión.',
    contentHtml: pendingBody('beneficiario controlador'),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('legal-corporativo'),
    tags: ['beneficiariocontrolador', 'gobiernocorporativo'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 5,
    featured: false,
    status: 'published',
    publishedAt: '2026-10-14T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-10-14T10:00:00.000Z',
  },
  {
    id: 'post-04',
    slug: 'activos-virtuales-obligaciones-2027',
    title: 'Activos virtuales: nuevas obligaciones a partir de mayo de 2027',
    excerpt:
      'Las operaciones con activos virtuales incorporan obligaciones específicas. Le explicamos qué cambia y desde cuándo aplica.',
    contentHtml: pendingBody('activos virtuales'),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('actividades-vulnerables'),
    tags: ['actividadesvulnerables', 'avisos'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 5,
    featured: false,
    status: 'published',
    publishedAt: '2026-09-30T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-09-30T10:00:00.000Z',
  },
  {
    id: 'post-05',
    slug: 'autorregularizacion-espontanea',
    title:
      'Autorregularización espontánea: cómo corregir omisiones antes de una visita',
    excerpt:
      'Corregir a tiempo puede reducir riesgos. Revisamos el procedimiento y los elementos que conviene documentar.',
    contentHtml: pendingBody('autorregularización espontánea'),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('prevencion-de-lavado-de-dinero'),
    tags: ['reforma2025', 'avisos'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 6,
    featured: false,
    status: 'published',
    publishedAt: '2026-09-16T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-09-16T10:00:00.000Z',
  },
  {
    id: 'post-06',
    slug: 'acuerdos-conclusivos-prodecon',
    title:
      'Acuerdos conclusivos ante PRODECON en revisiones de precios de transferencia',
    excerpt:
      'Una vía para concluir controversias fiscales. Explicamos cuándo conviene valorarla y qué preparar.',
    contentHtml: pendingBody('acuerdos conclusivos ante PRODECON'),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('precios-de-transferencia'),
    tags: ['partesrelacionadas', 'OCDE'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 7,
    featured: false,
    status: 'published',
    publishedAt: '2026-09-02T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-09-02T10:00:00.000Z',
  },
  {
    id: 'post-07',
    slug: 'libros-corporativos-al-dia',
    title:
      'Libros corporativos: por qué mantenerlos al día protege a su empresa',
    excerpt:
      'Actas, registros y libros actualizados facilitan operaciones societarias y reducen riesgos ante terceros y autoridades.',
    contentHtml: pendingBody('libros corporativos'),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('legal-corporativo'),
    tags: ['gobiernocorporativo'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 4,
    featured: false,
    status: 'published',
    publishedAt: '2026-08-19T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-08-19T10:00:00.000Z',
  },
  {
    id: 'post-08',
    slug: 'reconocimiento-imcp-obra-colaborativa-2026',
    title:
      'La Comisión de PLD y Anticorrupción del IMCP recibe el reconocimiento a la Mejor Obra Colaborativa 2026',
    excerpt:
      'La comisión presidida por nuestra socia directora fue reconocida por su trabajo editorial y de difusión en materia de prevención de lavado de dinero.',
    contentHtml: pendingBody(
      'el reconocimiento del IMCP a la Mejor Obra Colaborativa 2026',
    ),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('eventos-y-participaciones'),
    tags: ['reforma2025'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 4,
    featured: false,
    status: 'published',
    publishedAt: '2026-08-05T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-08-05T10:00:00.000Z',
  },
  {
    id: 'post-09',
    slug: 'reforma-lfpriorpi-coparmex',
    title:
      'Reforma a la LFPIORPI: claves compartidas en la Comisión Fiscal Nacional de COPARMEX',
    excerpt:
      'Resumen de los puntos clave presentados en el foro empresarial sobre la reforma y su calendario de implementación.',
    contentHtml: pendingBody(
      'la participación en la Comisión Fiscal Nacional de COPARMEX',
    ),
    coverImageUrl: null,
    coverImageAlt: null,
    category: cat('eventos-y-participaciones'),
    tags: ['reforma2025', 'avisos'],
    authorName: AUTHOR.name,
    authorRole: AUTHOR.roleArea,
    authorBio: AUTHOR.bio,
    readingMinutes: 5,
    featured: false,
    status: 'published',
    publishedAt: '2026-07-22T10:00:00.000Z',
    seoTitle: null,
    seoDescription: null,
    updatedAt: '2026-07-22T10:00:00.000Z',
  },
]

export function toSummary(
  post: BlogPost,
): Omit<BlogPost, 'contentHtml' | 'authorBio'> {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
    category: post.category,
    tags: post.tags,
    authorName: post.authorName,
    authorRole: post.authorRole,
    readingMinutes: post.readingMinutes,
    featured: post.featured,
    status: post.status,
    publishedAt: post.publishedAt,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    updatedAt: post.updatedAt,
  }
}
