export type FormOption = {
  value: string
  label: string
}

export const serviceOptions: FormOption[] = [
  {
    value: 'prevencion-de-lavado-de-dinero',
    label: 'Prevención de Lavado de Dinero',
  },
  {
    value: 'precios-de-transferencia',
    label: 'Precios de Transferencia',
  },
  {
    value: 'legal-corporativo',
    label: 'Legal Corporativo',
  },
  {
    value: 'complementarios',
    label: 'Soluciones complementarias',
  },
  {
    value: 'no-seguro',
    label: 'No estoy seguro',
  },
]

export const urgencyOptions: FormOption[] = [
  {
    value: 'inmediata',
    label: 'Inmediata: tengo un requerimiento o visita de la autoridad',
  },
  {
    value: '30-dias',
    label: 'En los próximos 30 días',
  },
  {
    value: '3-meses',
    label: 'En los próximos 3 meses',
  },
  {
    value: 'explorando',
    label: 'Solo estoy explorando opciones',
  },
]

export const stateOptions: FormOption[] = [
  { value: 'Aguascalientes', label: 'Aguascalientes' },
  { value: 'Baja California', label: 'Baja California' },
  { value: 'Baja California Sur', label: 'Baja California Sur' },
  { value: 'Campeche', label: 'Campeche' },
  { value: 'Chiapas', label: 'Chiapas' },
  { value: 'Chihuahua', label: 'Chihuahua' },
  { value: 'Ciudad de México', label: 'Ciudad de México' },
  { value: 'Coahuila', label: 'Coahuila' },
  { value: 'Colima', label: 'Colima' },
  { value: 'Durango', label: 'Durango' },
  { value: 'Estado de México', label: 'Estado de México' },
  { value: 'Guanajuato', label: 'Guanajuato' },
  { value: 'Guerrero', label: 'Guerrero' },
  { value: 'Hidalgo', label: 'Hidalgo' },
  { value: 'Jalisco', label: 'Jalisco' },
  { value: 'Michoacán', label: 'Michoacán' },
  { value: 'Morelos', label: 'Morelos' },
  { value: 'Nayarit', label: 'Nayarit' },
  { value: 'Nuevo León', label: 'Nuevo León' },
  { value: 'Oaxaca', label: 'Oaxaca' },
  { value: 'Puebla', label: 'Puebla' },
  { value: 'Querétaro', label: 'Querétaro' },
  { value: 'Quintana Roo', label: 'Quintana Roo' },
  { value: 'San Luis Potosí', label: 'San Luis Potosí' },
  { value: 'Sinaloa', label: 'Sinaloa' },
  { value: 'Sonora', label: 'Sonora' },
  { value: 'Tabasco', label: 'Tabasco' },
  { value: 'Tamaulipas', label: 'Tamaulipas' },
  { value: 'Tlaxcala', label: 'Tlaxcala' },
  { value: 'Veracruz', label: 'Veracruz' },
  { value: 'Yucatán', label: 'Yucatán' },
  { value: 'Zacatecas', label: 'Zacatecas' },
]
