export const site = {
  name: 'Impulsa Patrimonial',
  legalName: 'Impulsa Patrimonial, Asesores Legales y Fiscales, S.C.',
  tagline: 'Asesoría legal y fiscal',
  description:
    'Firma mexicana de contadores públicos y abogados especializada en Prevención de Lavado de Dinero, Precios de Transferencia y Legal Corporativo.',
  phoneDisplay: '+52 33 3907 9868',
  phoneTel: '+523339079868',
  email: 'contacto@impulsapatrimonial.com',
  whatsappNumber: '523339079868',
  // DECISIÓN: URLs de redes tomadas del HTML de referencia (placeholders); sustituir por las cuentas reales del despacho.
  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  /** Perfil LinkedIn de la socia directora (placeholder hasta confirmar URL real). */
  sociaLinkedIn: 'https://www.linkedin.com/',

  // DECISIÓN: posiciones y anclas de etiqueta del mapa salen del HTML 08-contacto.html.
  offices: [
    {
      city: 'Ciudad de México',
      region: 'centro del país',
      blurb:
        'Reuniones presenciales bajo cita. Atención a empresas del centro del país.',
      map: {
        left: '57.6%',
        top: '75.9%',
        line: { left: '12px', top: '0', width: '108px', height: '1px' },
        label: { left: '120px', top: '-22px' },
      },
    },
    {
      city: 'Guadalajara',
      region: 'occidente',
      blurb:
        'Reuniones presenciales bajo cita. Atención a empresas del occidente.',
      map: {
        left: '43%',
        top: '67.4%',
        line: { right: '12px', top: '0', width: '94px', height: '1px' },
        label: { right: '106px', top: '-22px' },
      },
    },
    {
      city: 'Morelia',
      region: 'Bajío',
      blurb:
        'Reuniones presenciales bajo cita. Atención a empresas del Bajío.',
      map: {
        left: '51.2%',
        top: '73.6%',
        line: { left: '0', top: '12px', width: '1px', height: '76px' },
        label: { left: '-46px', top: '88px' },
      },
    },
    {
      city: 'Querétaro',
      region: 'Bajío',
      blurb:
        'Reuniones presenciales bajo cita. Atención a empresas del Bajío.',
      map: {
        left: '54.1%',
        top: '69.7%',
        line: { left: '0', bottom: '12px', width: '1px', height: '94px' },
        label: { left: '-50px', bottom: '106px' },
      },
    },
  ],
  onlineCoverage: 'Atención en línea en todo México',
  footerPhrase:
    'Impulsamos el crecimiento de las empresas con seguridad jurídica y patrimonial.',
  designer: {
    name: 'Docabyte',
    url: 'https://docabyte.com',
  },
} as const

export type NavItem = {
  label: string
  href: string
  children?: Array<{
    label: string
    description: string
    href: string
    accent: 'brand' | 'line'
  }>
}

export const mainNav: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
  {
    label: 'Servicios',
    href: '/servicios',
    children: [
      {
        label: 'Prevención de Lavado de Dinero',
        description: 'Actividades vulnerables y sector financiero',
        href: '/servicios/prevencion-de-lavado-de-dinero',
        accent: 'brand',
      },
      {
        label: 'Precios de Transferencia',
        description: 'Operaciones con partes relacionadas',
        href: '/servicios/precios-de-transferencia',
        accent: 'brand',
      },
      {
        label: 'Legal Corporativo',
        description: 'Constitución, operación y reorganización',
        href: '/servicios/legal-corporativo',
        accent: 'line',
      },
      {
        label: 'Soluciones complementarias',
        description: 'Fiscal, contable, litigio y auditoría',
        href: '/servicios#complementarios',
        accent: 'line',
      },
    ],
  },
  { label: 'Actividades vulnerables', href: '/actividades-vulnerables' },
  { label: 'Blog', href: '/blog' },
]

export const footerSiteLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Quiénes somos', href: '/quienes-somos' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Actividades vulnerables', href: '/actividades-vulnerables' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
] as const

export const footerServiceLinks = [
  {
    label: 'Prevención de Lavado de Dinero',
    href: '/servicios/prevencion-de-lavado-de-dinero',
  },
  {
    label: 'Precios de Transferencia',
    href: '/servicios/precios-de-transferencia',
  },
  { label: 'Legal Corporativo', href: '/servicios/legal-corporativo' },
  { label: 'Complementarios', href: '/servicios#complementarios' },
] as const

export const legalLinks = [
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
  { label: 'Términos de uso', href: '/terminos-de-uso' },
  { label: 'Política de cookies', href: '/politica-de-cookies' },
  { label: 'Descargo de responsabilidad', href: '/descargo-de-responsabilidad' },
] as const

export const serviceSlugs = [
  'prevencion-de-lavado-de-dinero',
  'precios-de-transferencia',
  'legal-corporativo',
] as const

export type ServiceSlug = (typeof serviceSlugs)[number]
