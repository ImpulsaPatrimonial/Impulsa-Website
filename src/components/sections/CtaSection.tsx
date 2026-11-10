import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { getWhatsAppUrl } from '@/lib/whatsapp'

type CtaSectionProps = {
  title: string
  text: string
  primaryLabel?: string
  primaryHref?: string
  whatsappLabel?: string
}

export function CtaSection({
  title,
  text,
  primaryLabel = 'Solicitar asesoría',
  primaryHref = '/contacto',
  whatsappLabel = 'Escribir por WhatsApp',
}: CtaSectionProps) {
  return (
    <section className="bg-tint py-28">
      <div className="wrap flex flex-col items-center text-center">
        <div className="flex w-full max-w-[860px] flex-col items-center gap-6">
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="text-[30px] leading-[1.15] md:text-[44px]">{title}</h2>
          <p className="m-0 max-w-[680px] text-[17px] leading-[1.8] text-ink">
            {text}
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild variant="primary">
              <Link to={primaryHref}>
                {primaryLabel}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer">
                {whatsappLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
