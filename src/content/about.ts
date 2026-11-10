export const aboutSeo = {
  title: 'Quiénes somos',
  description:
    'Contadores públicos y abogados con experiencia local e internacional. Conozca nuestra trayectoria, principios y participación en IMCP y COPARMEX.',
} as const

export const aboutFirm = {
  eyebrow: 'La firma',
  title: 'Contadores y abogados que protegen su patrimonio',
  paragraphs: [
    'Impulsa Patrimonial, Asesores Legales y Fiscales, S.C. es una firma mexicana fundada en 2012, integrada por contadores públicos y abogados con experiencia local e internacional.',
    'Brindamos servicios legales, fiscales y financieros con altos estándares de calidad, que impulsan el crecimiento de nuestros clientes y colaboradores y protegen su patrimonio mediante el correcto cumplimiento legal de las empresas.',
    'Atendemos a clientes en toda la República Mexicana y a empresas con residencia en países de América, Europa y Asia.',
  ],
  imageAlt:
    'Mtra. Angélica María Ruiz López en las oficinas de COPARMEX Veracruz',
  statsAriaLabel:
    '14 o más años de experiencia, 15 o más sectores atendidos, 7 o más servicios especializados',
  stats: [
    { value: 14, suffix: '+', label: 'Años de experiencia' },
    { value: 15, suffix: '+', label: 'Sectores atendidos' },
    { value: 7, suffix: '+', label: 'Servicios especializados' },
  ],
} as const

export const aboutPrinciples = {
  eyebrow: 'Nuestros principios',
  title: 'Los principios que guían nuestro trabajo',
  text: 'Nuestra forma de trabajar se sostiene en la honestidad, el respeto y la efectividad en cada asunto que atendemos.',
  cards: [
    {
      number: '01',
      title: 'Legalidad',
      text: 'Cada recomendación tiene fundamento en la ley vigente y en los criterios de la autoridad, para que su empresa cumpla con certeza.',
    },
    {
      number: '02',
      title: 'Confidencialidad',
      text: 'Cuidamos la información que nos confían. No publicamos nombres ni datos de nuestros clientes.',
    },
    {
      number: '03',
      title: 'Ética',
      text: 'Actuamos con honestidad e integridad, y le decimos con claridad lo que su empresa necesita, aunque no sea lo más sencillo.',
    },
    {
      number: '04',
      title: 'Profesionalismo',
      text: 'Contadores y abogados especializados, en actualización constante, que responden con rigor técnico y en los plazos acordados.',
    },
  ],
} as const

export type TimelineItem = {
  year: string
  text: string
  /** Fragmentos a envolver en <em> dentro de text. */
  emphasized?: readonly string[]
}

export const aboutTrajectory = {
  eyebrow: 'Trayectoria',
  title: 'Más de una década acompañando a empresas',
  imageAlt:
    'Equipo de trabajo en reunión en una sala con muros de cristal',
  items: [
    {
      year: '2012',
      text: 'Fundación de Impulsa Patrimonial, Asesores Legales y Fiscales, S.C.',
    },
    {
      year: '2021',
      text: 'Nuestra socia directora asume la Presidencia de la Comisión Nacional de Prevención de Lavado de Dinero y Anticorrupción del IMCP.',
    },
    {
      year: '2025',
      text: 'Coautoría de Precios de Transferencia en Iberoamérica, editorial IMCP.',
      emphasized: ['Precios de Transferencia en Iberoamérica'],
    },
    {
      year: '2026',
      text: 'Coautoría de Antilavado de dinero y sus conceptos básicos, editorial IMCP.',
      emphasized: ['Antilavado de dinero y sus conceptos básicos'],
    },
    {
      year: 'Hoy',
      text: 'Oficinas en Ciudad de México, Guadalajara, Morelia y Querétaro, con atención en línea en todo el país.',
    },
  ] satisfies TimelineItem[],
} as const

export const aboutSpecialization = {
  eyebrow: 'Especialización',
  title: 'En qué nos especializamos',
  linkLabel: 'Conocer más',
  cards: [
    {
      number: '01',
      title: 'Prevención de Lavado de Dinero',
      description:
        'Del diagnóstico a la defensa para quienes realizan actividades vulnerables.',
      href: '/servicios/prevencion-de-lavado-de-dinero',
    },
    {
      number: '02',
      title: 'Precios de Transferencia',
      description:
        'Del análisis a la defensa de operaciones con partes relacionadas.',
      href: '/servicios/precios-de-transferencia',
    },
    {
      number: '03',
      title: 'Legal Corporativo',
      description:
        'De la constitución a la reorganización de su empresa en México.',
      href: '/servicios/legal-corporativo',
    },
  ],
} as const

export const aboutCredentials = {
  eyebrow: 'Participación institucional',
  title:
    'Presencia en los organismos que definen la práctica de prevención de lavado de dinero en México',
  lead: 'Por medio de nuestra socia directora, la Mtra. Angélica María Ruiz López, la firma participa en:',
  linkedInLabel: 'Ver perfil de la socia directora en LinkedIn',
  items: [
    {
      label: 'IMCP · Desde 2021',
      text: 'Presidencia de la Comisión Nacional de Prevención de Lavado de Dinero y Anticorrupción',
    },
    {
      label: 'COPARMEX',
      text: 'Vicepresidencia de Prevención de Lavado de Dinero de la Comisión Fiscal Nacional',
    },
    {
      label: 'Publicaciones · Editorial IMCP',
      // DECISIÓN: títulos de libros en <em>, como en el HTML de referencia.
      text: 'Antilavado de dinero y sus conceptos básicos (2026) y Precios de Transferencia en Iberoamérica (2025)',
      emphasized: [
        'Antilavado de dinero y sus conceptos básicos',
        'Precios de Transferencia en Iberoamérica',
      ] as const,
    },
  ],
  // DECISIÓN: se mantiene la fila de cifras del HTML actual (docs/03 nota: quitar si el cliente confirma el rediseño).
  bottomStats: [
    { value: '2012', label: 'Año de fundación' },
    { value: '15', label: 'Sectores atendidos' },
    { value: '3', label: 'Continentes con clientes' },
  ],
  logos: {
    coparmexAlt: 'COPARMEX',
    imcpAlt: 'Instituto Mexicano de Contadores Públicos, Región Noreste',
  },
} as const

export const aboutEventsBlog = {
  eyebrow: 'Blog',
  title: 'Presencia en eventos y foros',
  linkLabel: 'Ver todos los artículos',
  linkHref: '/blog?categoria=eventos-y-participaciones',
  categorySlug: 'eventos-y-participaciones',
} as const

export const aboutCta = {
  title: 'Hablemos de las necesidades de su empresa',
  text: 'Le acompañamos en el diagnóstico, la implementación y la defensa de sus obligaciones legales, fiscales y regulatorias. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
} as const
