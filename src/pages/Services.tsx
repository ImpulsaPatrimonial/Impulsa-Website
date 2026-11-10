import { ComplementBento } from '@/components/sections/ComplementBento'
import { CtaSection } from '@/components/sections/CtaSection'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { PageHero } from '@/components/sections/PageHero'
import { PracticeBlock } from '@/components/sections/PracticeBlock'
import { Seo } from '@/components/sections/Seo'
import { heroes } from '@/content/heroes'
import { services, servicesListing } from '@/content/services'
import heroImage from '@/assets/images/hero-servicios.jpg'
import servicioPld from '@/assets/images/servicio-pld.jpg'
import servicioPt from '@/assets/images/servicio-precios-transferencia.jpg'
import servicioLegal from '@/assets/images/servicio-legal-corporativo.jpg'

const IMAGES: Record<string, string> = {
  'servicio-pld': servicioPld,
  'servicio-precios-transferencia': servicioPt,
  'servicio-legal-corporativo': servicioLegal,
}

export default function Services() {
  const { badge, title, imagePosition, overlay } = heroes.services

  return (
    <>
      <Seo
        title="Servicios"
        description={servicesListing.seoDescription}
        path="/servicios"
      />
      <PageHero
        badge={badge}
        title={title}
        image={heroImage}
        imagePosition={imagePosition}
        overlay={overlay}
      />

      <section className="pb-[72px] pt-[104px]">
        <div className="wrap grid grid-cols-1 items-start gap-[72px] lg:grid-cols-2">
          <Eyebrow className="pt-3">{servicesListing.introEyebrow}</Eyebrow>
          <p className="m-0 font-serif text-[28px] leading-[1.45] text-navy">
            {servicesListing.intro}
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap flex flex-col gap-8">
          {services.map((service) => (
            <PracticeBlock
              key={service.slug}
              service={service}
              imageSrc={IMAGES[service.cardImage] ?? ''}
            />
          ))}
        </div>
      </section>

      <ComplementBento />

      <CtaSection
        title={servicesListing.cta.title}
        text={servicesListing.cta.text}
      />
    </>
  )
}
