import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

/** Fecha larga en español de México, p. ej. "12 de noviembre de 2026". */
export function formatLongDate(iso: string): string {
  return format(parseISO(iso), "d 'de' MMMM 'de' yyyy", { locale: es })
}

export function formatPostMeta(
  authorName: string,
  publishedAt: string,
  readingMinutes: number,
): string {
  return `${authorName} · ${formatLongDate(publishedAt)} · ${readingMinutes} min de lectura`
}
