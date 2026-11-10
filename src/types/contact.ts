export type ContactPayload = {
  fullName: string
  company: string
  email: string
  phone: string
  activity: string
  service: string
  urgency: string
  state: string
  message: string
  privacyAccepted: true
  website: string
  sourcePath: string
}

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'rate_limited' | 'server' }
