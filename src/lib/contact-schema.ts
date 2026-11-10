import { z } from 'zod'

import {
  serviceOptions,
  stateOptions,
  urgencyOptions,
} from '@/content/form-options'

const serviceValues = serviceOptions.map((o) => o.value)
const urgencyValues = urgencyOptions.map((o) => o.value)
const stateValues = stateOptions.map((o) => o.value)

/** Extrae 10 dígitos locales MX aceptando +52, espacios y guiones. */
export function normalizeMxPhone(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 10) return digits
  if (digits.length === 12 && digits.startsWith('52')) return digits.slice(2)
  return null
}

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { error: 'Indique su nombre completo (mínimo 3 caracteres).' })
    .max(120, { error: 'El nombre no puede superar 120 caracteres.' }),
  company: z
    .string()
    .trim()
    .min(2, { error: 'Indique el nombre de su empresa (mínimo 2 caracteres).' })
    .max(160, { error: 'El nombre de la empresa no puede superar 160 caracteres.' }),
  email: z
    .email({ error: 'Indique un correo electrónico válido.' })
    .max(160, { error: 'El correo no puede superar 160 caracteres.' }),
  phone: z
    .string()
    .trim()
    .refine((value) => normalizeMxPhone(value) !== null, {
      error:
        'Indique un teléfono de 10 dígitos (puede incluir +52, espacios o guiones).',
    }),
  activity: z
    .string()
    .trim()
    .min(2, { error: 'Indique su actividad o giro (mínimo 2 caracteres).' })
    .max(160, { error: 'La actividad no puede superar 160 caracteres.' }),
  service: z
    .string()
    .refine((value) => serviceValues.includes(value), {
      error: 'Seleccione un servicio de interés.',
    }),
  urgency: z
    .string()
    .refine((value) => urgencyValues.includes(value), {
      error: 'Seleccione la urgencia de su caso.',
    }),
  state: z
    .string()
    .refine((value) => stateValues.includes(value), {
      error: 'Seleccione su estado de la república.',
    }),
  message: z
    .string()
    .max(2000, { error: 'El mensaje no puede superar 2000 caracteres.' })
    .optional()
    .transform((value) => value ?? ''),
  privacyAccepted: z.boolean().refine((value) => value === true, {
    error: 'Debe aceptar el Aviso de privacidad para continuar.',
  }),
  // DECISIÓN: el honeypot no se valida en cliente (evita errores visibles); el mock/Edge lo ignoran si viene lleno.
  website: z.string().optional().default(''),
})

export type ContactFormValues = z.input<typeof contactFormSchema>
export type ContactFormOutput = z.output<typeof contactFormSchema>
