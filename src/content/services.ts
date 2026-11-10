export type ServicePhase = {
  label: string
  range: string
  weight: number
}

export type ServiceOffering = {
  number: string
  title: string
  text: string
  note?: string
}

export type ServiceCalendarStage = {
  stage: string
  rows: Array<{ date: string; text: string }>
}

export type Service = {
  slug: string
  name: string
  shortName: string
  badge: string
  listingLabel: string
  /** Clave de imagen en assets (sin extensión). */
  heroImage: string
  heroPosition: string
  heroAlt: string
  cardImage: string
  cardPosition: string
  cardAlt: string
  /** Resumen corto para tarjetas (Inicio / Quiénes somos). */
  summary: string
  /** Descripción del bloque en /servicios. */
  listingDescription: string
  valueProposition: string
  phases: ServicePhase[]
  highlights: [string, string, string, string]
  /** En /servicios: foto a la derecha (false) o izquierda (true). */
  photoFirst: boolean
  /** Legal usa outline en el listado. */
  listingButtonVariant: 'primary' | 'outline'
  showActivitiesLink?: boolean
  regulatoryContext: {
    title: string
    paragraphs: string[]
    quote?: string
  }
  appliesTo: {
    eyebrow: string
    title: string
    image?: string | null
    imageAlt?: string
    items: Array<{ title: string; text: string }>
  }
  services: ServiceOffering[]
  calendar?: ServiceCalendarStage[]
  activitiesBridge?: {
    title: string
    text: string
    links: Array<{ name: string; slug: string }>
  }
  faqs: Array<{ q: string; a: string }>
  legalFramework: string
  ctaTitle: string
  ctaText: string
  ctaButton: string
  blogCategorySlug: string
  seoDescription: string
}

const PENDING = '[pendiente]'

export const servicesListing = {
  introEyebrow: 'Nuestra práctica',
  intro:
    'Integramos el conocimiento contable y jurídico para identificar sus obligaciones, documentar su cumplimiento y defenderlo ante la autoridad. Cada proyecto parte del modelo de negocio y de las operaciones que su empresa efectivamente realiza.',
  knowService: 'Conocer el servicio',
  activitiesLink: 'Actividades vulnerables',
  activitiesHref: '/actividades-vulnerables',
  cta: {
    title: '¿No sabe qué servicio necesita?',
    text: 'Cuéntenos su actividad o giro y le orientamos sobre las obligaciones que le aplican. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
  },
  seoDescription:
    'Asesoría en Prevención de Lavado de Dinero, Precios de Transferencia, Legal Corporativo y soluciones fiscales, contables y de auditoría.',
} as const

export const complementarySection = {
  id: 'complementarios',
  eyebrow: 'Soluciones complementarias',
  title: 'Una atención integral para su empresa',
  text: 'Servicios que completan nuestras tres prácticas principales y que coordinamos con el mismo equipo.',
  items: [
    {
      title: 'Soluciones fiscales',
      text: 'Cumplimiento de obligaciones nacionales e internacionales, tratados para evitar la doble tributación y más.',
      image: 'complementarios-fiscales' as const,
      imagePosition: '40% center',
      imageAlt: 'Formato de declaración anual del SAT con pluma',
      icon: null,
    },
    {
      title: 'Litigio fiscal y defensa',
      text: 'Medios de defensa ante SAT, IMSS, INFONAVIT y acuerdos conclusivos ante PRODECON.',
      image: null,
      icon: 'Scale' as const,
    },
    {
      title: 'Soluciones contables',
      text: 'Contabilidad, nómina, declaraciones y regularización de la situación fiscal.',
      image: null,
      icon: 'Calculator' as const,
    },
    {
      title: 'Sector financiero',
      text: 'Cumplimiento regulatorio, control interno, administración de riesgos y trámites ante CNBV y CONDUSEF.',
      image: null,
      icon: 'Landmark' as const,
    },
    {
      title: 'Auditoría',
      text: 'Auditoría financiera, fiscal y de PLD, y due diligence en la compra o venta de negocios.',
      image: 'complementarios-auditoria' as const,
      imagePosition: 'center 45%',
      imageAlt: 'Profesionistas revisando reportes y gráficas financieras',
      icon: null,
    },
  ],
} as const

/** Resumen para la card navy de Inicio. */
export const complementarySummary = {
  label: complementarySection.eyebrow,
  title: complementarySection.title,
  items:
    'Soluciones fiscales · Litigio fiscal y defensa · Soluciones contables · Auditoría',
  linkLabel: 'Ver servicios complementarios',
  href: '/servicios#complementarios',
} as const

export const services: Service[] = [
  {
    slug: 'prevencion-de-lavado-de-dinero',
    name: 'Prevención de Lavado de Dinero',
    shortName: 'PLD',
    badge: 'Práctica principal',
    listingLabel: '01 · Práctica principal',
    heroImage: 'servicio-pld',
    heroPosition: 'center 42%',
    heroAlt: 'Abogado trabajando junto a una estatuilla de la justicia',
    cardImage: 'servicio-pld',
    cardPosition: '88% center',
    cardAlt: 'Abogado trabajando junto a una estatuilla de la justicia',
    summary:
      'Diagnóstico, implementación y defensa para personas físicas y morales que realizan actividades vulnerables, conforme a la reforma 2025 y las Reglas de Carácter General 2026.',
    listingDescription:
      'Asesoría especializada para personas físicas y morales que realizan actividades vulnerables en México, conforme a la reforma a la LFPIORPI de 2025 y las Reglas de Carácter General de 2026.',
    valueProposition:
      'Asesoría especializada para personas físicas y morales que realizan actividades vulnerables en México.',
    phases: [
      { label: 'Diagnóstico', range: '01 · 11', weight: 2 },
      { label: 'Implementación', range: '02–07', weight: 5 },
      { label: 'Formación', range: '08', weight: 1.4 },
      { label: 'Evaluación y defensa', range: '09–10', weight: 2 },
    ],
    highlights: [
      'Diagnóstico regulatorio y determinación de obligaciones',
      'Manual de políticas, avisos, informes y monitoreo de operaciones',
      'Capacitación especializada para el personal responsable',
      'Auditoría, visitas de verificación y autorregularización espontánea',
    ],
    photoFirst: false,
    listingButtonVariant: 'primary',
    showActivitiesLink: true,
    regulatoryContext: {
      title: 'Una respuesta al entorno regulatorio',
      paragraphs: [
        'Las actividades vulnerables pueden ser utilizadas para introducir recursos de procedencia ilícita en operaciones aparentemente legítimas. Por esa razón, la legislación mexicana establece obligaciones de identificación, conocimiento de clientes, conservación de información y presentación de avisos, entre otras medidas destinadas a detectar y prevenir riesgos.',
        'El marco jurídico evolucionó con la reforma de 2025 a la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita y con las Reglas de Carácter General de 2026, que profundizan la evaluación de riesgos, el conocimiento de clientes y beneficiarios controladores, los controles internos, la capacitación y la revisión del cumplimiento.',
      ],
      quote:
        'El objetivo es que cada sujeto obligado conozca qué debe cumplir, cómo acreditarlo y qué medidas conviene adoptar para reducir contingencias administrativas y fortalecer la trazabilidad de sus operaciones.',
    },
    appliesTo: {
      eyebrow: 'A quién acompañamos',
      title: '¿A quién aplica?',
      image: null,
      imageAlt: 'Manos revisando expedientes y contratos',
      items: [
        {
          title: 'Personas físicas y morales con actividades vulnerables',
          text: 'Quienes realizan alguna de las actividades del artículo 17 de la Ley y superan los umbrales aplicables.',
        },
        {
          title: 'Agencias aduanales, fideicomisos y otras figuras jurídicas',
          text: 'Que deberán darse de baja y de alta con el nuevo formato oficial a partir de febrero de 2027.',
        },
        {
          title: 'Entidades del sector financiero',
          text: 'Auditoría e informe anual, programa de capacitación, manuales y sistemas tecnológicos.',
        },
        {
          title: 'Personas con cuentas bloqueadas por la UIF',
          text: 'Garantía de audiencia, amparo indirecto y estrategia de defensa.',
        },
      ],
    },
    services: [
      {
        number: '01',
        title: 'Diagnóstico regulatorio y determinación de obligaciones',
        text: 'Analizamos sus operaciones y su modelo de negocio para determinar si se actualiza alguna actividad vulnerable del artículo 17, así como los umbrales y obligaciones aplicables.',
      },
      {
        number: '02',
        title: 'Alta, actualización y regularización ante la autoridad',
        text: 'Asesoramos en el alta y registro, la actualización de datos y la regularización de obligaciones ante las autoridades competentes.',
      },
      {
        number: '03',
        title: 'Identificación y conocimiento de clientes y usuarios',
        text: 'Diseñamos políticas, formatos y expedientes de identificación, incluida la información del beneficiario controlador.',
      },
      {
        number: '04',
        title: 'Enfoque basado en riesgos',
        text: 'Metodologías para identificar, evaluar, clasificar y mitigar riesgos de clientes, productos, operaciones y canales.',
      },
      {
        number: '05',
        title: 'Manual de políticas internas y procedimientos',
        text: 'Elaboramos o actualizamos manuales adaptados a su actividad, su estructura y las disposiciones vigentes.',
      },
      {
        number: '06',
        title: 'Avisos, informes y monitoreo de operaciones',
        text: 'Identificamos operaciones sujetas a aviso, controlamos plazos y diseñamos procesos para prevenir omisiones y presentaciones extemporáneas.',
      },
      {
        number: '07',
        title: 'Medidas internas de control y mecanismos automatizados',
        text: 'Definimos controles y flujos de autorización, y asesoramos los requerimientos funcionales de los mecanismos automatizados.',
      },
      {
        number: '08',
        title: 'Capacitación especializada',
        text: 'Sesiones para responsables de cumplimiento, directivos y personal operativo, conforme a las necesidades de cada organización.',
      },
      {
        number: '09',
        title: 'Auditoría y evaluación de cumplimiento',
        text: 'Revisiones independientes del grado de cumplimiento y de la eficacia de los controles, con hallazgos y recomendaciones.',
      },
      {
        number: '10',
        title: 'Visitas de verificación y defensa administrativa',
        text: 'Preparación y atención de visitas y requerimientos, y defensa frente a resoluciones y sanciones.',
      },
      {
        number: '11',
        title: 'Autorregularización espontánea',
        text: 'Regularizamos obligaciones omitidas antes del inicio de las facultades de verificación, para acceder a la abstención de sanción.',
        note: 'Art. 55 de la Ley · Art. 55 Bis del Reglamento',
      },
    ],
    calendar: [
      {
        stage: 'Etapa I · Estructural',
        rows: [
          {
            date: '30 nov 2026',
            text: 'Entrada en vigor general de las Reglas: personas políticamente expuestas, contenido mínimo del manual, mecanismos de prevención, auditoría y activos virtuales.',
          },
        ],
      },
      {
        stage: 'Etapa II · Operativa',
        rows: [
          {
            date: 'Ene–dic 2027',
            text: 'Primer periodo anual de capacitación.',
          },
          {
            date: '1 feb 2027',
            text: 'Nuevo formato oficial de alta y registro; baja y nueva alta para agencias aduanales y figuras como el fideicomiso.',
          },
          {
            date: '1 mar 2027',
            text: 'Evaluación con enfoque basado en riesgo, clasificación de clientes y beneficiario controlador en operaciones nuevas.',
          },
        ],
      },
      {
        stage: 'Etapa III · Tecnológica y de verificación',
        rows: [
          {
            date: '30 may 2027',
            text: 'Activos virtuales: actualización de la información del artículo 10 Bis.',
          },
          {
            date: '1 jun 2027',
            text: 'Mecanismos automatizados y nuevos formatos electrónicos de avisos e informes.',
          },
          {
            date: '30 jul 2027',
            text: 'Sistema de notificaciones electrónicas.',
          },
          {
            date: '30 ago 2027',
            text: 'Consulta de Personas Políticamente Expuestas en “Consulta PEP 2.0”.',
          },
          {
            date: 'Ene–dic 2028',
            text: 'Primer periodo de revisión de auditoría.',
          },
          {
            date: '30 mar 2029',
            text: 'Entrega del primer dictamen de auditoría.',
          },
        ],
      },
    ],
    activitiesBridge: {
      title: 'Consulte su actividad vulnerable',
      text: 'Obligaciones, umbrales, plazos y sanciones explicados por actividad.',
      links: [
        { name: 'Compraventa de inmuebles', slug: 'compraventa-de-inmuebles' },
        {
          name: 'Comercialización de vehículos',
          slug: 'comercializacion-de-vehiculos',
        },
        { name: 'Activos virtuales', slug: 'activos-virtuales' },
      ],
    },
    faqs: [
      {
        q: '¿Cómo sé si mi actividad es vulnerable?',
        a: 'Analizamos sus operaciones y su modelo de negocio frente a las actividades del artículo 17 de la Ley, así como los umbrales y supuestos aplicables. El diagnóstico identifica sus obligaciones y las prioridades de atención.',
      },
      {
        q: '¿Qué pasa si omití avisos u otras obligaciones?',
        a: 'La Ley prevé la autorregularización espontánea antes de que inicien las facultades de verificación, lo que permite acceder a la abstención de sanción del artículo 55. Le ayudamos a determinar las omisiones e integrar el cumplimiento correspondiente.',
      },
      {
        q: '¿Cuándo entran en vigor las nuevas obligaciones?',
        a: 'La entrada en vigor es gradual: las Reglas aplican de forma general desde el 30 de noviembre de 2026 y otras obligaciones se exigen entre 2027 y 2029, como el enfoque basado en riesgo, los mecanismos automatizados y el dictamen de auditoría.',
      },
      {
        q: '¿Desarrollan el software para los mecanismos automatizados?',
        a: 'No. Asesoramos en los requerimientos funcionales que deben atender los mecanismos automatizados, su documentación y sus pruebas de funcionamiento, sin ofrecer el desarrollo de software.',
      },
      {
        q: '¿Atienden fuera de las ciudades donde tienen oficina?',
        a: 'Sí. Atendemos en línea a empresas de todo México y ofrecemos reuniones presenciales bajo cita en Ciudad de México, Guadalajara, Morelia y Querétaro.',
      },
    ],
    legalFramework:
      'Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita, artículos 17 y 18, con reforma publicada en el Diario Oficial de la Federación el 16 de julio de 2025; Reglamento de dicha Ley, modificado el 27 de marzo de 2026; Reglas de Carácter General modificadas mediante Acuerdo 115/2026, publicado el 7 de agosto de 2026; y resoluciones que modifican los formatos oficiales de alta y registro y de avisos e informes, publicadas el 24 de septiembre de 2026. Las obligaciones particulares se determinan para cada actividad y operación.',
    ctaTitle: 'Conversemos sobre las obligaciones de su actividad',
    ctaText:
      'Le ayudamos a identificar qué debe cumplir, cómo acreditarlo y en qué plazos. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
    ctaButton: 'Solicitar asesoría en PLD',
    blogCategorySlug: 'prevencion-de-lavado-de-dinero',
    seoDescription:
      'Asesoría en Prevención de Lavado de Dinero para actividades vulnerables: diagnóstico, implementación, capacitación, auditoría y defensa.',
  },
  {
    slug: 'precios-de-transferencia',
    name: 'Precios de Transferencia',
    shortName: 'PT',
    badge: 'Práctica principal',
    listingLabel: '02 · Práctica principal',
    heroImage: 'servicio-precios-transferencia',
    heroPosition: 'center 65%',
    heroAlt: 'Reportes financieros, libreta y calculadora sobre un escritorio',
    cardImage: 'servicio-precios-transferencia',
    cardPosition: 'center 65%',
    cardAlt: 'Reportes financieros, libreta y calculadora sobre un escritorio',
    summary:
      'Identificación, documentación y defensa de operaciones con partes relacionadas en México y el extranjero, conforme a la Ley del ISR y las Directrices de la OCDE.',
    listingDescription:
      'Asesoría especializada para empresas que celebran operaciones con partes relacionadas en México y en el extranjero, conforme a la Ley del ISR y las Directrices de la OCDE.',
    valueProposition:
      'Asesoría especializada para empresas con operaciones con partes relacionadas en México y el extranjero.',
    phases: [
      { label: 'Diagnóstico', range: '01–02', weight: 2 },
      { label: 'Documentación', range: '03–06', weight: 4 },
      { label: 'Planeación', range: '07–08', weight: 2 },
      { label: 'Revisión y defensa', range: '09–11', weight: 3 },
    ],
    highlights: [
      'Estudio de precios de transferencia y análisis funcional',
      'Declaraciones informativas maestra, local y país por país',
      'Anexos del dictamen fiscal y de la ISSIF',
      'Resoluciones anticipadas (APA) y acuerdos conclusivos',
    ],
    photoFirst: true,
    listingButtonVariant: 'primary',
    regulatoryContext: {
      title: 'Una respuesta al entorno regulatorio',
      paragraphs: [
        `${PENDING} Contexto sobre operaciones con partes relacionadas, LISR y Directrices de la OCDE.`,
        `${PENDING} Criterios de documentación, umbrales y obligaciones de información en México.`,
      ],
    },
    appliesTo: {
      eyebrow: 'A quién acompañamos',
      title: '¿A quién aplica?',
      image: null,
      items: [
        {
          title: `${PENDING} Grupos con partes relacionadas`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
        {
          title: `${PENDING} Empresas con operaciones internacionales`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
        {
          title: `${PENDING} Contribuyentes sujetos a documentación`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
        {
          title: `${PENDING} Empresas en revisión o planeación`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
      ],
    },
    services: [
      {
        number: '01',
        title: 'Identificación de partes relacionadas',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '02',
        title: 'Análisis funcional y de riesgos',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '03',
        title: 'Estudio de precios de transferencia',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '04',
        title: 'Declaración informativa de operaciones con partes relacionadas',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '05',
        title: 'Declaraciones maestra, local y país por país',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '06',
        title: 'Anexos del dictamen fiscal e ISSIF',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '07',
        title: 'Reestructuraciones corporativas',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '08',
        title: 'Ajustes de precios de transferencia',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '09',
        title: 'Atención de requerimientos y revisiones',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '10',
        title: 'Medios de defensa y acuerdos conclusivos (PRODECON)',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '11',
        title: 'Resoluciones anticipadas (APA, art. 34-A CFF)',
        text: `${PENDING} Descripción del servicio.`,
      },
    ],
    faqs: [
      {
        q: `${PENDING} Pregunta frecuente 1`,
        a: `${PENDING} Respuesta a validar con el despacho.`,
      },
      {
        q: `${PENDING} Pregunta frecuente 2`,
        a: `${PENDING} Respuesta a validar con el despacho.`,
      },
      {
        q: `${PENDING} Pregunta frecuente 3`,
        a: `${PENDING} Respuesta a validar con el despacho.`,
      },
    ],
    legalFramework: `${PENDING} Marco normativo: LISR arts. 76, 76-A, 179 y 180, CFF y Directrices OCDE. Validar redacción con el despacho.`,
    ctaTitle: 'Conversemos sobre las obligaciones de su actividad',
    ctaText:
      'Le ayudamos a identificar qué debe cumplir, cómo acreditarlo y en qué plazos. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
    ctaButton: 'Solicitar asesoría en PT',
    blogCategorySlug: 'precios-de-transferencia',
    seoDescription:
      'Asesoría en Precios de Transferencia: documentación, declaraciones y defensa de operaciones con partes relacionadas.',
  },
  {
    slug: 'legal-corporativo',
    name: 'Legal Corporativo',
    shortName: 'Legal Corporativo',
    badge: 'Práctica',
    listingLabel: '03',
    heroImage: 'servicio-legal-corporativo',
    heroPosition: '60% center',
    heroAlt: 'Sala de consejo con vista a la ciudad',
    cardImage: 'servicio-legal-corporativo',
    cardPosition: '60% center',
    cardAlt: 'Sala de consejo con vista a la ciudad',
    summary: 'Constitución, operación y reorganización de su empresa en México.',
    listingDescription:
      'Soluciones jurídicas para la constitución, operación y reorganización de su empresa en México, en coordinación con sus áreas fiscal y contable.',
    valueProposition:
      'Soluciones jurídicas para la constitución, operación y reorganización de su empresa en México.',
    phases: [
      { label: 'Gobierno corporativo', range: '01–04', weight: 4 },
      { label: 'Operación', range: '05–06', weight: 2 },
      { label: 'Reorganización', range: '07–09', weight: 3 },
      { label: 'Cumplimiento', range: '10', weight: 1.4 },
    ],
    highlights: [
      'Constitución de sociedades, asambleas y sesiones de consejo',
      'Libros corporativos y beneficiario controlador',
      'Contratos de negocios, poderes y representación legal',
      'Fusión, escisión, reestructuración y due diligence',
    ],
    photoFirst: false,
    listingButtonVariant: 'outline',
    regulatoryContext: {
      title: 'Una respuesta al entorno regulatorio',
      paragraphs: [
        `${PENDING} Contexto sobre gobierno corporativo, LGSM, Código de Comercio y obligaciones societarias.`,
        `${PENDING} Criterios de operación, reorganización y cumplimiento en México.`,
      ],
    },
    appliesTo: {
      eyebrow: 'A quién acompañamos',
      title: '¿A quién aplica?',
      image: null,
      items: [
        {
          title: `${PENDING} Sociedades mercantiles`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
        {
          title: `${PENDING} Grupos en reorganización`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
        {
          title: `${PENDING} Empresas en etapa de constitución`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
        {
          title: `${PENDING} Operaciones que requieren due diligence`,
          text: `${PENDING} Descripción del perfil de cliente.`,
        },
      ],
    },
    services: [
      {
        number: '01',
        title: 'Constitución de sociedades',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '02',
        title: 'Asambleas y sesiones de consejo',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '03',
        title: 'Libros corporativos',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '04',
        title: 'Beneficiario controlador',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '05',
        title: 'Contratos de negocios',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '06',
        title: 'Poderes y representación legal',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '07',
        title: 'Fusión y escisión',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '08',
        title: 'Reestructuración corporativa',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '09',
        title: 'Disolución, liquidación y concurso mercantil',
        text: `${PENDING} Descripción del servicio.`,
      },
      {
        number: '10',
        title: 'Due diligence y compliance',
        text: `${PENDING} Descripción del servicio.`,
      },
    ],
    faqs: [
      {
        q: `${PENDING} Pregunta frecuente 1`,
        a: `${PENDING} Respuesta a validar con el despacho.`,
      },
      {
        q: `${PENDING} Pregunta frecuente 2`,
        a: `${PENDING} Respuesta a validar con el despacho.`,
      },
      {
        q: `${PENDING} Pregunta frecuente 3`,
        a: `${PENDING} Respuesta a validar con el despacho.`,
      },
    ],
    legalFramework: `${PENDING} Marco normativo: LGSM, Código de Comercio, CFF, Ley de Concursos Mercantiles, LFPDPPP. Validar redacción con el despacho.`,
    ctaTitle: 'Conversemos sobre las obligaciones de su actividad',
    ctaText:
      'Le ayudamos a identificar qué debe cumplir, cómo acreditarlo y en qué plazos. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
    ctaButton: 'Solicitar asesoría en Legal Corporativo',
    blogCategorySlug: 'legal-corporativo',
    seoDescription:
      'Asesoría en Legal Corporativo: constitución, gobierno corporativo, contratos, reorganización y cumplimiento.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

/** Compatibilidad con Inicio / PracticeCard. */
export type PracticeSummary = {
  slug: string
  label: string
  title: string
  description: string
  image: string
  imagePosition: string
  imageAlt: string
  href: string
}

export const practices: PracticeSummary[] = services.map((s) => ({
  slug: s.slug,
  label: s.listingLabel,
  title: s.name,
  description: s.summary,
  image: s.cardImage,
  // En Inicio las cards usan posiciones del diseño de tarjetas (PLD center 40 %).
  // DECISIÓN: Inicio mantiene object-position de tarjeta compacta; /servicios usa cardPosition del bloque.
  imagePosition:
    s.slug === 'prevencion-de-lavado-de-dinero' ? 'center 40%' : s.cardPosition,
  imageAlt: s.cardAlt,
  href: `/servicios/${s.slug}`,
}))
