import { Link } from 'react-router-dom'

import { ActivityBlock } from '@/components/activities/ActivityBlock'
import { Button } from '@/components/ui/button'
import { activityDetailUi } from '@/content/activities'
import { getWhatsAppUrlForActivity } from '@/lib/whatsapp'

type ActivityContactBlockProps = {
  activityName: string
}

export function ActivityContactBlock({
  activityName,
}: ActivityContactBlockProps) {
  const contactHref = `/contacto?servicio=prevencion-de-lavado-de-dinero&actividad=${encodeURIComponent(activityName)}`

  return (
    <ActivityBlock
      id="contacto"
      title={activityDetailUi.sectionTitles.contacto}
      className="[&>h2]:sr-only"
    >
      <div className="flex flex-wrap items-center justify-between gap-7 bg-navy p-11 text-[#D5DEE9]">
        <div className="flex max-w-[520px] flex-col gap-2">
          <span className="font-serif text-[28px] leading-[1.25] text-white">
            {activityDetailUi.contactTitle}
          </span>
          <span>{activityDetailUi.contactText}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="white">
            <Link to={contactHref}>{activityDetailUi.contactFormLabel}</Link>
          </Button>
          <Button asChild variant="ghostDark">
            <a
              href={getWhatsAppUrlForActivity(activityName)}
              target="_blank"
              rel="noreferrer"
            >
              {activityDetailUi.whatsappLabel}
            </a>
          </Button>
        </div>
      </div>
    </ActivityBlock>
  )
}
