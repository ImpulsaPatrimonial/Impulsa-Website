import { AboutCredentials } from '@/components/sections/AboutCredentials'
import { AboutPrinciples } from '@/components/sections/AboutPrinciples'
import { AboutStats } from '@/components/sections/AboutStats'
import { BlogSection } from '@/components/blog/BlogSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { MethodologySteps } from '@/components/sections/MethodologySteps'
import { PageHero } from '@/components/sections/PageHero'
import { SectorsMarquee } from '@/components/sections/SectorsMarquee'
import { Seo } from '@/components/sections/Seo'
import { SpecializationCard } from '@/components/sections/SpecializationCard'
import { TimelineRow } from '@/components/sections/TimelineRow'
import {
  aboutCta,
  aboutEventsBlog,
  aboutFirm,
  aboutSeo,
  aboutSpecialization,
  aboutTrajectory,
} from '@/content/about'
import { heroes } from '@/content/heroes'
import heroImage from '@/assets/images/servicio-legal-corporativo.jpg'
import firmaImg from '@/assets/images/nosotros-la-firma.jpg'
import trayectoriaImg from '@/assets/images/nosotros-trayectoria.jpg'

export default function About() {
  const { badge, title, imagePosition, overlay } = heroes.about

  return (
    <>
      <Seo
        title={aboutSeo.title}
        description={aboutSeo.description}
        path="/quienes-somos"
      />
      <PageHero
        badge={badge}
        title={title}
        image={heroImage}
        imagePosition={imagePosition}
        overlay={overlay}
      />

      {/* La firma */}
      <section className="py-[120px]">
        <div className="wrap about-firm">
          <div className="about-firm-left">
            <Eyebrow>{aboutFirm.eyebrow}</Eyebrow>
            <div className="relative h-[440px] overflow-hidden">
              <img
                src={firmaImg}
                alt={aboutFirm.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-[42%_center]"
                width={640}
                height={440}
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h2 className="text-[30px] leading-[1.1] md:text-[52px]">
              {aboutFirm.title}
            </h2>
            <div className="mt-9 flex flex-col gap-5 text-[17px] leading-[1.85] text-ink">
              {aboutFirm.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <AboutStats />
          </div>
        </div>
      </section>

      <AboutPrinciples />

      {/* Trayectoria */}
      <section className="py-28">
        <div className="wrap grid grid-cols-1 items-start gap-[72px] lg:grid-cols-2">
          <div className="flex flex-col gap-[22px]">
            <Eyebrow>{aboutTrajectory.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {aboutTrajectory.title}
            </h2>
            <div className="relative mt-3 h-[340px] overflow-hidden">
              <img
                src={trayectoriaImg}
                alt={aboutTrajectory.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-[center_65%]"
                width={800}
                height={340}
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col">
            {aboutTrajectory.items.map((item, index) => (
              <TimelineRow
                key={item.year}
                year={item.year}
                text={item.text}
                emphasized={
                  'emphasized' in item ? item.emphasized : undefined
                }
                isLast={index === aboutTrajectory.items.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Especialización */}
      <section className="py-28">
        <div className="wrap">
          <div className="mb-12 flex flex-col gap-[18px]">
            <Eyebrow>{aboutSpecialization.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {aboutSpecialization.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {aboutSpecialization.cards.map((card) => (
              <SpecializationCard
                key={card.href}
                number={card.number}
                title={card.title}
                description={card.description}
                href={card.href}
              />
            ))}
          </div>
        </div>
      </section>

      <MethodologySteps />
      <AboutCredentials />
      <SectorsMarquee />

      <BlogSection
        eyebrow={aboutEventsBlog.eyebrow}
        title={aboutEventsBlog.title}
        linkLabel={aboutEventsBlog.linkLabel}
        linkHref={aboutEventsBlog.linkHref}
        categorySlug={aboutEventsBlog.categorySlug}
      />

      <CtaSection title={aboutCta.title} text={aboutCta.text} />
    </>
  )
}
