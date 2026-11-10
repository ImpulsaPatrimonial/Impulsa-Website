import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { contactCopy } from '@/content/contact'
import { site } from '@/content/site'
import { getWhatsAppUrl, getWhatsAppUrlForService } from '@/lib/whatsapp'

type ContactChannelsProps = {
  serviceLabel?: string | null
}

export function ContactChannels({ serviceLabel }: ContactChannelsProps) {
  const whatsappHref = serviceLabel
    ? getWhatsAppUrlForService(serviceLabel)
    : getWhatsAppUrl()

  return (
    <aside className="flex w-full flex-col gap-4 lg:max-w-[320px] lg:flex-[1_1_320px]">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col gap-2.5 bg-navy p-8 text-on-dark no-underline hover:text-on-dark"
      >
        <Label className="text-sky">{contactCopy.whatsappCard.label}</Label>
        <span className="font-serif text-2xl leading-[1.3] text-white">
          {contactCopy.whatsappCard.title}
        </span>
        <span className="text-[15px]">{contactCopy.whatsappCard.text}</span>
        <span className="mt-1 text-sm font-semibold text-white">
          {contactCopy.whatsappCard.cta}
        </span>
      </a>

      <div className="flex flex-col gap-2.5 border border-line p-8">
        <Label>{contactCopy.nationalCard.label}</Label>
        <span className="text-[15px]">{contactCopy.nationalCard.text}</span>
        <a
          href={`mailto:${site.email}`}
          className="text-[15px] font-semibold no-underline [overflow-wrap:anywhere]"
        >
          {site.email}
        </a>
        <a
          href={`tel:${site.phoneTel}`}
          className="text-[15px] font-semibold no-underline"
        >
          {site.phoneDisplay}
        </a>
      </div>

      <Link
        to="#cobertura"
        className="flex min-h-[52px] items-center justify-between border-b border-navy px-1 text-sm font-semibold tracking-[0.03em] text-navy no-underline hover:text-brand"
      >
        {contactCopy.coverageLink}{' '}
        <span aria-hidden="true">↓</span>
      </Link>
    </aside>
  )
}
