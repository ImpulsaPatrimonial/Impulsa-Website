import { Helmet } from 'react-helmet-async'

import { absoluteUrl } from '@/lib/seo'
import { site } from '@/content/site'

type SeoProps = {
  title: string
  description?: string
  path?: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authorName?: string
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

export function Seo({
  title,
  description = site.description,
  path = '/',
  image,
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authorName,
  jsonLd,
}: SeoProps) {
  const fullTitle =
    title === site.name ? title : `${title} · ${site.name}`
  const canonical = absoluteUrl(path)
  const ogImage = image ? absoluteUrl(image) : absoluteUrl('/og-default.jpg')

  return (
    <Helmet>
      <html lang="es-MX" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="es_MX" />
      <meta property="og:site_name" content={site.name} />
      {type === 'article' && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {type === 'article' && modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}
      {type === 'article' && authorName ? (
        <meta property="article:author" content={authorName} />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}
