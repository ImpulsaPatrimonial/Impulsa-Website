import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/sections/Label'
import { activityDetailUi } from '@/content/activities'
import { cn } from '@/lib/utils'

export type ActivityTocItem = {
  id: string
  label: string
}

type ActivityTocProps = {
  items: ActivityTocItem[]
}

function TocLinks({
  items,
  activeId,
}: {
  items: ActivityTocItem[]
  activeId: string | null
}) {
  return (
    <nav aria-label={activityDetailUi.tocLabel} className="flex flex-col gap-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            'border-l-2 border-line py-2.5 pl-4 text-sm text-ink no-underline hover:text-brand',
            activeId === item.id && 'border-brand font-semibold text-navy',
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export function ActivityToc({ items }: ActivityTocProps) {
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
      {/* DECISIÓN: en ≤1024 px el índice lateral pasa a acordeón arriba del contenido. */}
      <div className="mb-10 w-full lg:hidden">
        <Accordion type="single" collapsible className="border border-line">
          <AccordionItem value="toc" className="border-0 px-4">
            <AccordionTrigger className="py-4 text-sm font-semibold uppercase tracking-label text-brand hover:no-underline">
              {activityDetailUi.tocLabel}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <TocLinks items={items} activeId={activeId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <aside className="sticky top-[120px] hidden w-full max-w-[270px] shrink-0 flex-col gap-1 lg:flex">
        <Label className="mb-3">{activityDetailUi.tocLabel}</Label>
        <TocLinks items={items} activeId={activeId} />
      </aside>
    </>
  )
}
