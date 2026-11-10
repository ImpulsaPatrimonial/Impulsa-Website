import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/sections/Label'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { blogArticle } from '@/content/blog'
import type { TocItem } from '@/lib/article-html'
import { cn } from '@/lib/utils'

type ArticleTocProps = {
  items: TocItem[]
  title: string
  path: string
}

function TocLinks({
  items,
  activeId,
}: {
  items: TocItem[]
  activeId: string | null
}) {
  return (
    <nav aria-label={blogArticle.tocLabel} className="flex flex-col gap-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            'border-l-2 border-transparent py-2 pl-3 text-sm text-ink no-underline hover:text-brand',
            activeId === item.id &&
              'border-brand font-semibold text-navy',
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}

export function ArticleToc({ items, title, path }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (items.length === 0) return

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (top?.target.id) setActiveId(top.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <>
      {/* Móvil: TOC plegable + compartir en fila */}
      <div className="mb-10 w-full lg:hidden">
        <Accordion type="single" collapsible className="border border-line">
          <AccordionItem value="toc" className="border-0 px-4">
            <AccordionTrigger className="py-4 text-sm font-semibold uppercase tracking-label text-brand hover:no-underline">
              {blogArticle.tocLabel}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <TocLinks items={items} activeId={activeId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Label>{blogArticle.shareLabel}</Label>
          <ShareButtons title={title} path={path} />
        </div>
      </div>

      {/* Escritorio: aside sticky */}
      <aside className="sticky top-[120px] hidden w-full max-w-[220px] shrink-0 flex-col gap-1 lg:flex">
        <Label className="mb-2.5">{blogArticle.tocLabel}</Label>
        <TocLinks items={items} activeId={activeId} />
        <Label className="mb-2.5 mt-7">{blogArticle.shareLabel}</Label>
        <ShareButtons title={title} path={path} />
      </aside>
    </>
  )
}
