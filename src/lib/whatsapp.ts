const WHATSAPP_NUMBER = '523339079868'
const DEFAULT_MESSAGE = 'Hola, me interesa una asesoría con Impulsa Patrimonial.'

export function getWhatsAppUrl(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppUrlForService(serviceName: string): string {
  return getWhatsAppUrl(
    `Hola, me interesa una asesoría de ${serviceName} con Impulsa Patrimonial.`,
  )
}

export function getWhatsAppUrlForActivity(activityName: string): string {
  return getWhatsAppUrl(
    `Hola, me interesa una asesoría sobre la actividad vulnerable «${activityName}» con Impulsa Patrimonial.`,
  )
}
