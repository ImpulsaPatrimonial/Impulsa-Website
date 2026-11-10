export const trustStrip = [
  {
    value: '2012',
    label: 'Año de fundación de la firma',
    wide: false,
  },
  {
    value: '15',
    label: 'Sectores de la economía atendidos',
    wide: false,
  },
  {
    value: 'IMCP · COPARMEX',
    label: 'Participación institucional en PLD',
    wide: true,
  },
] as const

export const firmSection = {
  eyebrow: 'La firma',
  title: 'Cumplir no es un trámite: es la base para crecer con seguridad',
  text: 'Somos una firma mexicana de contadores públicos y abogados fundada en 2012. Acompañamos a empresas y personas físicas con actividad empresarial en el diagnóstico, la implementación y la defensa de sus obligaciones legales, fiscales y regulatorias, con cobertura en toda la República Mexicana.',
  linkLabel: 'Conozca la firma',
  linkHref: '/quienes-somos',
  imageAlt: 'Equipo de la firma en una reunión de trabajo',
} as const

export const practicesSection = {
  eyebrow: 'Áreas de especialización',
  title: 'Tres prácticas, un mismo objetivo: proteger su patrimonio',
  linkLabel: 'Ver todos los servicios',
  linkHref: '/servicios',
} as const

export const pldReformSection = {
  eyebrow: 'Reforma PLD 2025–2026',
  title: 'Las nuevas obligaciones entran en vigor el 30 de noviembre de 2026',
  text: 'La reforma a la LFPIORPI y las Reglas de Carácter General 2026 se aplican de forma gradual. Identificamos qué medidas ya son obligatorias para su actividad y cuáles debe preparar para su futura entrada en vigor.',
  ctaLabel: 'Evaluar mi situación',
  ctaHref: '/contacto',
} as const

export const activitiesSection = {
  eyebrow: 'Actividades vulnerables',
  title: '¿Su actividad es vulnerable?',
  text: 'La ley establece obligaciones de identificación de clientes, presentación de avisos y conservación de información para cada actividad. Consulte qué le aplica: umbrales, plazos y sanciones.',
  linkLabel: 'Ver todas las actividades',
  linkHref: '/actividades-vulnerables',
} as const

export type HomeActivitySlide = {
  slug: string
  name: string
  imageKey:
    | 'av-compraventa-inmuebles'
    | 'av-comercializacion-vehiculos'
    | 'av-joyeria-metales'
    | 'av-activos-virtuales'
    | 'av-juegos-apuestas'
  imageAlt: string
  imagePosition: string
}

export const homeActivitySlides: HomeActivitySlide[] = [
  {
    slug: 'compraventa-de-inmuebles',
    name: 'Compraventa de inmuebles',
    imageKey: 'av-compraventa-inmuebles',
    imageAlt: 'Asesora inmobiliaria con carpeta, planos y llaves',
    imagePosition: 'center',
  },
  {
    slug: 'comercializacion-de-vehiculos',
    name: 'Comercialización de vehículos',
    imageKey: 'av-comercializacion-vehiculos',
    imageAlt: 'Apretón de manos frente a un automóvil en agencia',
    imagePosition: 'center',
  },
  {
    slug: 'joyeria-y-metales-preciosos',
    name: 'Joyería y metales preciosos',
    imageKey: 'av-joyeria-metales',
    imageAlt: 'Anillos con piedras preciosas en vitrina',
    imagePosition: '45% center',
  },
  {
    slug: 'activos-virtuales',
    name: 'Activos virtuales',
    imageKey: 'av-activos-virtuales',
    imageAlt: 'Monedas de criptoactivos frente a una gráfica de operaciones',
    imagePosition: 'center',
  },
  {
    slug: 'juegos-con-apuesta-y-sorteos',
    name: 'Juegos con apuesta y sorteos',
    imageKey: 'av-juegos-apuestas',
    imageAlt: 'Mesa de ruleta con fichas de apuesta',
    imagePosition: 'center',
  },
]

export const institutionalSection = {
  eyebrow: 'Participación institucional',
  title:
    'Presencia en los organismos que definen la Prevención de Lavado de Dinero en México',
  ctaLabel: 'Conozca la firma',
  ctaHref: '/quienes-somos',
  imageAlt:
    'Mtra. Angélica María Ruiz López recibiendo un reconocimiento del IMCP',
  lead: 'Nuestra socia directora, la Mtra. Angélica María Ruiz López, miembro activo en:',
  columns: [
    {
      label: 'IMCP · Desde 2021',
      text: 'Presidencia de la Comisión Nacional de Prevención de Lavado de Dinero y Anticorrupción',
    },
    {
      label: 'COPARMEX',
      text: 'Vicepresidencia de Prevención de Lavado de Dinero de la Comisión Fiscal Nacional',
    },
    {
      label: 'Editorial IMCP',
      text: 'Coautoría de Antilavado de dinero y sus conceptos básicos (2026) y Precios de Transferencia en Iberoamérica (2025)',
      // DECISIÓN: el HTML usa <em> en los títulos de libros; se renderizan con <em> en InstitutionalCard.
      emphasized: [
        'Antilavado de dinero y sus conceptos básicos',
        'Precios de Transferencia en Iberoamérica',
      ],
    },
  ],
  affiliationsLabel: 'Afiliaciones',
  affiliationsText: 'Organismos de los que forma parte la firma',
} as const

export const homeCta = {
  title: '¿Su empresa está preparada para sus obligaciones?',
  text: 'Cuéntenos su actividad y le orientamos sobre las obligaciones que le aplican. Atendemos en todo México en línea y con reuniones presenciales bajo cita.',
} as const
