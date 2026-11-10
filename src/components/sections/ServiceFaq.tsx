import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { cn } from '@/lib/utils'

type ServiceFaqProps = {
  faqs: Array<{ q: string; a: string }>
}

export function ServiceFaq({ faqs }: ServiceFaqProps) {
  const [open, setOpen] = useState<string | undefined>(undefined)

  return (
    <section id="faq" className="scroll-mt-[100px] pb-28 pt-14">
      <div className="wrap grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="text-[30px] leading-[1.15] md:text-[40px]">
            Lo que más nos preguntan
          </h2>
        </div>

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
                    'gap-4 py-[22px] text-left text-[17px] font-medium text-navy hover:no-underline [&_svg]:hidden',
                  )}
                >
                  <span className="flex-1 pr-4">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-normal text-brand"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="max-w-[620px] pb-[22px] text-[15px] leading-[1.8] text-ink">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
