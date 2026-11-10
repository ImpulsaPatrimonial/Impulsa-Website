export type MethodStep = {
  number: string
  title: string
  text: string
  tone: 'tint' | 'tint-2' | 'tint-3' | 'navy'
  linkLabel?: string
  linkHref?: string
}

export const methodologyIntro = {
  eyebrow: 'Metodología',
  title: 'Cómo trabajamos',
  description:
    'Un proceso en cuatro etapas, del primer dato que nos comparte a la defensa de su cumplimiento ante la autoridad.',
} as const

export const methodologySteps: MethodStep[] = [
  {
    number: '01',
    title: 'Información inicial',
    text: 'Reunimos la información financiera, contractual y corporativa de su empresa.',
    tone: 'tint',
  },
  {
    number: '02',
    title: 'Diagnóstico',
    text: 'Identificamos obligaciones, omisiones y riesgos, y definimos las prioridades de atención.',
    tone: 'tint-2',
  },
  {
    number: '03',
    title: 'Desarrollo',
    text: 'Elaboramos la documentación y los mecanismos de cumplimiento, con trazabilidad de cada fundamento.',
    tone: 'tint-3',
  },
  {
    number: '04',
    title: 'Entrega y seguimiento',
    text: 'Entregamos, presentamos ante la autoridad y le acompañamos en revisiones y requerimientos.',
    tone: 'navy',
    linkLabel: 'Solicitar asesoría',
    linkHref: '/contacto',
  },
]
