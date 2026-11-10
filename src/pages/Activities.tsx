import { ActivityCard } from '@/components/activities/ActivityCard'
import { CtaSection } from '@/components/sections/CtaSection'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { PageHero } from '@/components/sections/PageHero'
import { Seo } from '@/components/sections/Seo'
import { activitiesListing } from '@/content/activities'
import { heroes } from '@/content/heroes'
import { useActivities } from '@/hooks/queries/useActivities'
import heroImage from '@/assets/images/av-comercializacion-vehiculos.jpg'

export default function Activities() {
  const { badge, title, imagePosition, overlay } = heroes.activities
  const { data: activities = [], isLoading } = useActivities()

  return (
    <>
      <Seo
        title="Actividades vulnerables"
        description={activitiesListing.seoDescription}
        path="/actividades-vulnerables"
      />
      <PageHero
        badge={badge}
        title={title}
        image={heroImage}
        imagePosition={imagePosition}
        overlay={overlay}
      />

      <section className="pb-12 pt-[72px]">
        <div className="wrap flex max-w-[720px] flex-col gap-[18px]">
          <Eyebrow>{activitiesListing.introEyebrow}</Eyebrow>
          <p className="m-0 text-[17px] leading-[1.8] text-ink">
            {activitiesListing.intro}
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap">
          {isLoading ? (
            <div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              aria-hidden
            >
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-[420px] animate-pulse bg-tint" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title={activitiesListing.cta.title}
        text={activitiesListing.cta.text}
      />
    </>
  )
}
