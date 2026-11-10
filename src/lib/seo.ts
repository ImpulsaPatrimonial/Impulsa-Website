export function absoluteUrl(path: string, siteUrl?: string): string {
  const base = (siteUrl ?? import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')
  if (!base) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
