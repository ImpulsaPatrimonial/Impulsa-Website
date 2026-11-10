import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ContactChannels } from '@/components/contact/ContactChannels'
import { ContactForm } from '@/components/contact/ContactForm'
import { CoverageSection } from '@/components/contact/CoverageSection'
import { PageHero } from '@/components/sections/PageHero'
import { Seo } from '@/components/sections/Seo'
import { contactCopy } from '@/content/contact'
import { serviceOptions } from '@/content/form-options'
import { heroes } from '@/content/heroes'
import heroImage from '@/assets/images/hero-contacto.jpg'

export default function Contact() {
  const { badge, title, imagePosition, overlay } = heroes.contact
  const [searchParams] = useSearchParams()

  const serviceLabel = useMemo(() => {
    const slug = searchParams.get('servicio')
    if (!slug) return null
    return serviceOptions.find((o) => o.value === slug)?.label ?? null
  }, [searchParams])

  return (
    <>
      <Seo
        title="Contacto"
        description={contactCopy.seoDescription}
        path="/contacto"
      />
      <PageHero
        badge={badge}
        title={title}
        image={heroImage}
        imagePosition={imagePosition}
        overlay={overlay}
      />

      <section className="pb-12 pt-20">
        <div className="wrap grid grid-cols-1 items-end gap-12 md:grid-cols-2">
          <p className="m-0 font-serif text-[26px] leading-[1.45] text-navy">
            {contactCopy.introPrimary}
          </p>
          <p className="m-0 border-l-2 border-brand pl-6 text-[15px] leading-[1.8] text-muted">
            {contactCopy.introScope}
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="wrap flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-[999_1_600px] bg-tint p-12">
            <ContactForm />
          </div>
          <ContactChannels serviceLabel={serviceLabel} />
        </div>
      </section>

      <CoverageSection />
    </>
  )
}
