import { Link, useParams } from 'react-router-dom'

import { ActivitiesBridge } from '@/components/sections/ActivitiesBridge'
import { AppliesToSection } from '@/components/sections/AppliesToSection'
import { BlogSection } from '@/components/blog/BlogSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { Label } from '@/components/sections/Label'
import { PageHero } from '@/components/sections/PageHero'
import { Seo } from '@/components/sections/Seo'
import { ServiceCalendar } from '@/components/sections/ServiceCalendar'
import { ServiceFaq } from '@/components/sections/ServiceFaq'
import { ServiceOfferings } from '@/components/sections/ServiceOfferings'
import { Button } from '@/components/ui/button'
import { heroes } from '@/content/heroes'
import { getServiceBySlug } from '@/content/services'
import { site } from '@/content/site'
import { absoluteUrl } from '@/lib/seo'
import NotFound from '@/pages/NotFound'
import heroPld from '@/assets/images/servicio-pld.jpg'
import heroPt from '@/assets/images/servicio-precios-transferencia.jpg'
import heroLegal from '@/assets/images/servicio-legal-corporativo.jpg'

const HERO_IMAGES: Record<string, string> = {
  'servicio-pld': heroPld,
  'servicio-precios-transferencia': heroPt,
  'servicio-legal-corporativo': heroLegal,
}

const HERO_META = {
  'prevencion-de-lavado-de-dinero': heroes.servicePld,
  'precios-de-transferencia': heroes.servicePt,
  'legal-corporativo': heroes.serviceLegal,
} as const

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service || !slug) return <NotFound />

  const path = `/servicios/${slug}`
  const contactHref = `/contacto?servicio=${slug}`
  const heroImage = HERO_IMAGES[service.heroImage]
  const heroMeta = HERO_META[slug as keyof typeof HERO_META]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.seoDescription,
      provider: {
        '@type': 'Organization',
        name: site.legalName,
      },
      areaServed: 'MX',
      url: absoluteUrl(path),
    },
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
          name: 'Servicios',
          item: absoluteUrl('/servicios'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.name,
          item: absoluteUrl(path),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ]

  return (
    <>
      <Seo
        title={service.name}
        description={service.seoDescription}
        path={path}
        jsonLd={jsonLd}
      />
      <PageHero
        badge={service.badge}
        title={service.name}
        image={heroImage}
        imagePosition={service.heroPosition}
        overlay={heroMeta?.overlay}
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Servicios', href: '/servicios' },
          { label: service.name },
        ]}
      />

      <section className="border-b border-line py-[88px]">
        <div className="wrap flex flex-wrap items-end justify-between gap-10">
          <p className="m-0 max-w-[720px] font-serif text-[26px] leading-[1.4] text-navy md:text-[30px]">
            {service.valueProposition}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <Link to={contactHref}>
                Solicitar asesoría en {service.shortName}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#faq">Preguntas frecuentes</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="wrap flex flex-col gap-12">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <Eyebrow>Entorno regulatorio</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {service.regulatoryContext.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 text-base leading-[1.85] text-ink md:grid-cols-2">
            {service.regulatoryContext.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="m-0">
                {p}
              </p>
            ))}
          </div>
          {service.regulatoryContext.quote ? (
            <blockquote className="m-0 max-w-[900px] border-l-2 border-brand py-2 pl-8 font-serif text-[22px] italic leading-[1.5] text-navy md:text-[26px]">
              {service.regulatoryContext.quote}
            </blockquote>
          ) : null}
        </div>
      </section>

      <AppliesToSection data={service.appliesTo} />

      <ServiceOfferings
        phases={service.phases}
        offerings={service.services}
      />

      {service.calendar ? (
        <ServiceCalendar stages={service.calendar} />
      ) : null}

      {service.activitiesBridge ? (
        <ActivitiesBridge data={service.activitiesBridge} />
      ) : null}

      <ServiceFaq faqs={service.faqs} />

      <section className="pb-28">
        <div className="wrap">
          <div className="flex flex-col gap-3 bg-tint px-10 py-9">
            <Label className="text-navy">Marco normativo de referencia</Label>
            <p className="m-0 text-sm leading-[1.85] text-ink">
              {service.legalFramework}
            </p>
          </div>
        </div>
      </section>

      <BlogSection
        title={`Artículos sobre ${service.name}`}
        linkHref={`/blog?categoria=${encodeURIComponent(service.blogCategorySlug)}`}
        categorySlug={service.blogCategorySlug}
      />

      <CtaSection
        title={service.ctaTitle}
        text={service.ctaText}
        primaryLabel={service.ctaButton}
        primaryHref={contactHref}
      />
    </>
  )
}
