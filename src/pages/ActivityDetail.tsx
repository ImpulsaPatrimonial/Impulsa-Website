import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { ActivityContactBlock } from '@/components/activities/ActivityContactBlock'
import { ActivityDeadlines } from '@/components/activities/ActivityDeadlines'
import { ActivityDescription } from '@/components/activities/ActivityDescription'
import { ActivityFaqs } from '@/components/activities/ActivityFaqs'
import { ActivityObligations } from '@/components/activities/ActivityObligations'
import { ActivitySanctions } from '@/components/activities/ActivitySanctions'
import { ActivitySummarySection } from '@/components/activities/ActivitySummarySection'
import { ActivityThresholds } from '@/components/activities/ActivityThresholds'
import {
  ActivityToc,
  type ActivityTocItem,
} from '@/components/activities/ActivityToc'
import { OtherActivities } from '@/components/activities/OtherActivities'
import { PageHero } from '@/components/sections/PageHero'
import { Seo } from '@/components/sections/Seo'
import { activityDetailUi } from '@/content/activities'
import { heroes } from '@/content/heroes'
import { site } from '@/content/site'
import {
  useActivity,
  useOtherActivities,
} from '@/hooks/queries/useActivities'
import { resolveActivityImage } from '@/lib/activity-images'
import { absoluteUrl } from '@/lib/seo'
import NotFound from '@/pages/NotFound'

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: activity, isLoading, isError } = useActivity(slug)
  const { data: others = [] } = useOtherActivities(slug, 3)

  const tocItems = useMemo((): ActivityTocItem[] => {
    if (!activity) return []
    const items: ActivityTocItem[] = [
      {
        id: 'descripcion',
        label: activityDetailUi.sectionTitles.descripcion,
      },
      {
        id: 'obligaciones',
        label: activityDetailUi.sectionTitles.obligaciones,
      },
    ]
    if (activity.thresholds.length > 0) {
      items.push({
        id: 'umbrales',
        label: activityDetailUi.sectionTitles.umbrales,
      })
    }
    if (activity.deadlines.length > 0) {
      items.push({
        id: 'plazos',
        label: activityDetailUi.sectionTitles.plazos,
      })
    }
    if (activity.sanctions.length > 0) {
      items.push({
        id: 'sanciones',
        label: activityDetailUi.sectionTitles.sanciones,
      })
    }
    if (activity.faqs.length > 0) {
      items.push({
        id: 'preguntas',
        label: activityDetailUi.sectionTitles.preguntas,
      })
    }
    items.push({
      id: 'contacto',
      label: activityDetailUi.sectionTitles.contacto,
    })
    return items
  }, [activity])

  if (!isLoading && (isError || !activity)) {
    return <NotFound />
  }

  if (isLoading || !activity) {
    return (
      <>
        <Seo title="Actividad vulnerable" path={`/actividades-vulnerables/${slug ?? ''}`} />
        <PageHero
          badge={heroes.activityDetail.badge}
          title="…"
          overlay={heroes.activityDetail.overlay}
        />
        <section className="wrap py-20">
          <div className="flex flex-col gap-6">
            <div className="h-8 w-3/4 animate-pulse bg-tint" />
            <div className="h-4 w-1/2 animate-pulse bg-tint" />
            <div className="aspect-video animate-pulse bg-tint" />
          </div>
        </section>
      </>
    )
  }

  const path = `/actividades-vulnerables/${activity.slug}`
  const seoTitle = activity.seoTitle ?? activity.name
  const seoDescription = activity.seoDescription ?? activity.summary
  const heroImage = resolveActivityImage(activity.heroImageUrl)

  const jsonLd: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'PLD',
          item: absoluteUrl('/servicios/prevencion-de-lavado-de-dinero'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Actividades vulnerables',
          item: absoluteUrl('/actividades-vulnerables'),
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: activity.name,
          item: absoluteUrl(path),
        },
      ],
    },
  ]

  if (activity.faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: activity.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
      about: {
        '@type': 'Thing',
        name: activity.name,
      },
      publisher: {
        '@type': 'Organization',
        name: site.legalName,
      },
    })
  }

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        image={heroImage}
        jsonLd={jsonLd}
      />

      {/* DECISIÓN: migas en el PageHero existente (columna izquierda); etiqueta «PLD» según docs/03 §5.2. */}
      <PageHero
        badge={heroes.activityDetail.badge}
        title={activity.name}
        image={heroImage}
        imagePosition={activity.heroImagePosition}
        overlay={heroes.activityDetail.overlay}
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          {
            label: 'PLD',
            href: '/servicios/prevencion-de-lavado-de-dinero',
          },
          {
            label: 'Actividades vulnerables',
            href: '/actividades-vulnerables',
          },
        ]}
      />

      <ActivitySummarySection
        summary={activity.summary}
        activityName={activity.name}
      />

      <section className="pb-24 pt-16">
        <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[72px]">
          <ActivityToc items={tocItems} />
          <div className="flex min-w-0 flex-[999_1_560px] flex-col">
            <ActivityDescription
              html={activity.descriptionHtml}
              bodyImageUrl={activity.bodyImageUrl}
              bodyImageAlt={activity.bodyImageAlt}
            />
            <ActivityObligations obligations={activity.obligations} />
            <ActivityThresholds thresholds={activity.thresholds} />
            <ActivityDeadlines deadlines={activity.deadlines} />
            <ActivitySanctions sanctions={activity.sanctions} />
            <ActivityFaqs faqs={activity.faqs} />
            <ActivityContactBlock activityName={activity.name} />
          </div>
        </div>
      </section>

      <OtherActivities activities={others} />
    </>
  )
}
