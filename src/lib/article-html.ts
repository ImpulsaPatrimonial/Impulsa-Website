import DOMPurify from 'dompurify'

import { slugify } from '@/lib/slugify'

export type TocItem = {
  id: string
  text: string
}

export type ProcessedArticle = {
  beforeHtml: string
  afterHtml: string
  toc: TocItem[]
}

const ALLOWED_TAGS = [
  'h2',
  'h3',
  'p',
  'ul',
  'ol',
  'li',
  'strong',
  'em',
  'a',
  'blockquote',
  'br',
]

/**
 * Sanitiza el HTML, asigna ids a los H2 y parte el cuerpo tras la primera
 * sección (antes del segundo H2) para insertar el CTA de servicio.
 */
export function processArticleHtml(rawHtml: string): ProcessedArticle {
  const clean = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['href', 'target', 'rel', 'id'],
  })

  if (typeof DOMParser === 'undefined') {
    return { beforeHtml: clean, afterHtml: '', toc: [] }
  }

  const doc = new DOMParser().parseFromString(
    `<div id="root">${clean}</div>`,
    'text/html',
  )
  const root = doc.getElementById('root')
  if (!root) {
    return { beforeHtml: clean, afterHtml: '', toc: [] }
  }

  const usedIds = new Set<string>()
  const toc: TocItem[] = []
  const h2Nodes = Array.from(root.querySelectorAll('h2'))

  for (const h2 of h2Nodes) {
    const text = h2.textContent?.trim() ?? ''
    let id = slugify(text) || 'seccion'
    let suffix = 2
    while (usedIds.has(id)) {
      id = `${slugify(text)}-${suffix}`
      suffix += 1
    }
    usedIds.add(id)
    h2.id = id
    // scroll-margin-top lo define .article-prose h2 (120 px) para el índice sticky
    toc.push({ id, text })
  }

  // Enlaces externos seguros
  for (const anchor of root.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href') ?? ''
    if (/^https?:\/\//i.test(href)) {
      anchor.setAttribute('target', '_blank')
      anchor.setAttribute('rel', 'noopener noreferrer')
    }
  }

  const children = Array.from(root.childNodes)
  let splitIndex = children.length
  let seenFirstH2 = false

  for (let i = 0; i < children.length; i += 1) {
    const node = children[i]
    if (node?.nodeType !== Node.ELEMENT_NODE) continue
    const el = node as Element
    if (el.tagName.toLowerCase() !== 'h2') continue
    if (!seenFirstH2) {
      seenFirstH2 = true
      continue
    }
    splitIndex = i
    break
  }

  const before = document.createElement('div')
  const after = document.createElement('div')
  children.forEach((child, index) => {
    if (index < splitIndex) before.appendChild(child.cloneNode(true))
    else after.appendChild(child.cloneNode(true))
  })

  return {
    beforeHtml: before.innerHTML,
    afterHtml: after.innerHTML,
    toc,
  }
}
