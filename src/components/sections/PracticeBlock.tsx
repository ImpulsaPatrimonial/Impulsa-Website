import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { PhaseBar } from '@/components/sections/PhaseBar'
import { Button } from '@/components/ui/button'
import { servicesListing, type Service } from '@/content/services'

type PracticeBlockProps = {
  service: Service
  imageSrc: string
}

export function PracticeBlock({ service, imageSrc }: PracticeBlockProps) {
  const text = (
    <div className="flex flex-col gap-[18px] p-8 md:p-12">
      <Label>{service.listingLabel}</Label>
      <h2 className="text-[30px] leading-[1.15] md:text-[38px]">
        {service.name}
      </h2>
      <p className="m-0 text-base leading-[1.7] text-ink">
        {service.listingDescription}
      </p>
      <PhaseBar phases={service.phases} />
      <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-ink">
        {service.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-1.5 flex flex-wrap gap-3">
        <Button asChild variant={service.listingButtonVariant}>
          <Link to={`/servicios/${service.slug}`}>
            {servicesListing.knowService}
          </Link>
        </Button>
        {service.showActivitiesLink ? (
          <Button asChild variant="outline">
            <Link to={servicesListing.activitiesHref}>
              {servicesListing.activitiesLink}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  )

  const photo = (
    <div className="relative min-h-[280px] md:min-h-[420px]">
      <img
        src={imageSrc}
        alt={service.cardAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: service.cardPosition }}
        width={800}
        height={420}
        loading="lazy"
      />
    </div>
  )

return (
    <article className="grid grid-cols-1 border border-line md:grid-cols-2">
      {service.photoFirst ? (
        <>
          {photo}
          {text}
        </>
      ) : (
        <>
          {text}
          {photo}
        </>
      )}
    </article>
  )
}
