import { useState } from 'react'

import { ActivityBlock } from '@/components/activities/ActivityBlock'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { activityDetailUi } from '@/content/activities'
import { cn } from '@/lib/utils'
import type { ActivityFaq } from '@/types/activity'

type ActivityFaqsProps = {
  faqs: ActivityFaq[]
}

export function ActivityFaqs({ faqs }: ActivityFaqsProps) {
  const [open, setOpen] = useState<string | undefined>(undefined)

  if (faqs.length === 0) return null

  return (
    <ActivityBlock
      id="preguntas"
      title={activityDetailUi.sectionTitles.preguntas}
    >
      <Accordion
        type="single"
        collapsible
        value={open}
        onValueChange={setOpen}
        className="border-b border-line"
      >
        {faqs.map((faq, index) => {
          const value = `faq-${index}`
          const isOpen = open === value
          return (
            <AccordionItem
              key={faq.q}
              value={value}
              className="border-t border-line border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  'gap-4 py-5 text-left font-semibold text-navy hover:no-underline [&_svg]:hidden',
                )}
              >
                <span className="flex-1 pr-4">{faq.q}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-brand"
                >
                  {isOpen ? '−' : '+'}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-[1.8] text-ink">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </ActivityBlock>
  )
}
