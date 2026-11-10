import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ActivitiesCarousel } from '@/components/sections/ActivitiesCarousel'
import { ComplementCard } from '@/components/sections/ComplementCard'
import { CtaSection } from '@/components/sections/CtaSection'
import { DateRow } from '@/components/sections/DateRow'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { HomeHero } from '@/components/sections/HomeHero'
import { InstitutionalCard } from '@/components/sections/InstitutionalCard'
import { MethodologySteps } from '@/components/sections/MethodologySteps'
import { PhotoFrame } from '@/components/sections/PhotoFrame'
import { BlogSection } from '@/components/blog/BlogSection'
import { PracticeCard } from '@/components/sections/PracticeCard'
import { PracticeCardWide } from '@/components/sections/PracticeCardWide'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { SectorsMarquee } from '@/components/sections/SectorsMarquee'
import { Seo } from '@/components/sections/Seo'
import { TextLink } from '@/components/sections/TextLink'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { Button } from '@/components/ui/button'
import {
  activitiesSection,
  firmSection,
  homeCta,
  pldReformSection,
  practicesSection,
} from '@/content/home'
import { pldCalendar } from '@/content/pld-calendar'
import { practices } from '@/content/services'
import { site } from '@/content/site'
import { useCarouselActivities } from '@/hooks/queries/useActivities'
import { resolveActivityImage } from '@/lib/activity-images'
import firmaImg from '@/assets/images/inicio-la-firma.jpg'
import servicioPld from '@/assets/images/servicio-pld.jpg'
import servicioPt from '@/assets/images/servicio-precios-transferencia.jpg'
import servicioLegal from '@/assets/images/servicio-legal-corporativo.jpg'

const practiceImages = {
  'servicio-pld': servicioPld,
  'servicio-precios-transferencia': servicioPt,
  'servicio-legal-corporativo': servicioLegal,
} as const

export default function Home() {
  const [pld, pt, legal] = practices
  const { data: carouselActivities = [] } = useCarouselActivities()
  const carouselSlides = carouselActivities
    .map((activity) => {
      const image = resolveActivityImage(activity.cardImageUrl)
      if (!image) return null
      return {
        slug: activity.slug,
        name: activity.name,
        image,
        imageAlt: activity.heroImageAlt ?? activity.name,
        imagePosition: activity.heroImagePosition,
      }
    })
    .filter((slide): slide is NonNullable<typeof slide> => slide !== null)

  return (
    <>
      <Seo title={site.name} path="/" />
      <HomeHero />
      <TrustStrip />

      {/* La firma */}
      <section className="py-[120px]">
        <div className="wrap grid grid-cols-1 items-center gap-[88px] lg:grid-cols-2">
          <PhotoFrame offset="bottom-right">
            <div className="relative h-[560px]">
              <img
                src={firmaImg}
                alt={firmSection.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-[45%_center]"
                width={800}
                height={560}
                loading="lazy"
              />
            </div>
          </PhotoFrame>
          <div className="flex max-w-[520px] flex-col gap-[26px]">
            <Eyebrow>{firmSection.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {firmSection.title}
            </h2>
            <p className="m-0 text-lg leading-[1.85] text-ink">
              {firmSection.text}
            </p>
            <TextLink
              to={firmSection.linkHref}
              underlined
              className="self-start text-[15px]"
            >
              {firmSection.linkLabel}
            </TextLink>
          </div>
        </div>
      </section>

      {/* Áreas de especialización */}
      <section className="bg-tint py-28">
        <div className="wrap">
          <SectionHeader
            eyebrow={practicesSection.eyebrow}
            title={practicesSection.title}
            className="mb-12"
            action={
              <TextLink to={practicesSection.linkHref}>
                {practicesSection.linkLabel}
              </TextLink>
            }
          />
          {pld && pt ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              <PracticeCard
                href={pld.href}
                label={pld.label}
                title={pld.title}
                description={pld.description}
                image={practiceImages[pld.image as keyof typeof practiceImages]}
                imageAlt={pld.imageAlt}
                imagePosition={pld.imagePosition}
              />
              <PracticeCard
                href={pt.href}
                label={pt.label}
                title={pt.title}
                description={pt.description}
                image={practiceImages[pt.image as keyof typeof practiceImages]}
                imageAlt={pt.imageAlt}
                imagePosition={pt.imagePosition}
              />
            </div>
          ) : null}
          {legal ? (
            <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
              <PracticeCardWide
                href={legal.href}
                label={legal.label}
                title={legal.title}
                description={legal.description}
                image={
                  practiceImages[legal.image as keyof typeof practiceImages]
                }
                imageAlt={legal.imageAlt}
                imagePosition={legal.imagePosition}
              />
              <ComplementCard />
            </div>
          ) : null}
        </div>
      </section>

      {/* Reforma PLD */}
      <section className="bg-navy py-28 text-on-dark">
        <div className="wrap grid grid-cols-1 items-start gap-[72px] lg:grid-cols-2">
          <div className="flex flex-col gap-[22px]">
            <Eyebrow tone="dark">{pldReformSection.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] text-white md:text-[44px]">
              {pldReformSection.title}
            </h2>
            <p className="m-0 text-[17px] leading-[1.8]">
              {pldReformSection.text}
            </p>
            <div>
              <Button asChild variant="white">
                <Link to={pldReformSection.ctaHref}>
                  {pldReformSection.ctaLabel}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            {pldCalendar.map((row, index) => (
              <DateRow
                key={row.date}
                date={row.date}
                text={row.text}
                isLast={index === pldCalendar.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Actividades vulnerables */}
      <section className="py-28">
        <div className="wrap grid grid-cols-1 items-center gap-[88px] lg:grid-cols-2">
          <div className="flex max-w-[500px] flex-col gap-7">
            <Eyebrow>{activitiesSection.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.1] md:text-[52px]">
              {activitiesSection.title}
            </h2>
            <p className="m-0 text-[19px] leading-[1.8] text-ink">
              {activitiesSection.text}
            </p>
            <TextLink
              to={activitiesSection.linkHref}
              underlined
              className="self-start text-[15px]"
            >
              {activitiesSection.linkLabel}
            </TextLink>
          </div>
          <ActivitiesCarousel slides={carouselSlides} />
        </div>
      </section>

      <InstitutionalCard />
      <SectorsMarquee />
      <MethodologySteps />

      <BlogSection />

      <CtaSection title={homeCta.title} text={homeCta.text} />
    </>
  )
}
