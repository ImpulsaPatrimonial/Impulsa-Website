/** Reservado para GA4 (fase de cookies). */
export function trackLead(payload?: {
  service?: string
  urgency?: string
}): void {
  void payload
  // Intencionalmente vacío hasta conectar el consentimiento de cookies.
}
