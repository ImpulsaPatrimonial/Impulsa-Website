import { Calculator, Landmark, Scale, type LucideIcon } from 'lucide-react'

import { Eyebrow } from '@/components/sections/Eyebrow'
import { complementarySection } from '@/content/services'
import fiscales from '@/assets/images/complementarios-fiscales.jpg'
import auditoria from '@/assets/images/complementarios-auditoria.jpg'

const ICONS: Record<string, LucideIcon> = {
  Scale,
  Calculator,
  Landmark,
}

const IMAGES = {
  'complementarios-fiscales': fiscales,
  'complementarios-auditoria': auditoria,
} as const

const PHOTO_OVERLAY =
  'linear-gradient(180deg, rgba(12,28,52,0.72) 0%, rgba(12,28,52,0.30) 42%, rgba(12,28,52,0.90) 100%)'

export function ComplementBento() {
  const data = complementarySection

  return (
    <section
      id={data.id}
      className="scroll-mt-[100px] bg-navy py-28 text-[#C9D6E4]"
    >
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[620px] flex-col gap-[18px]">
            <Eyebrow tone="dark">{data.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] text-white md:text-[44px]">
              {data.title}
            </h2>
          </div>
          <p className="m-0 max-w-[440px] text-base leading-[1.8] text-[#C9D6E4]">
            {data.text}
          </p>
        </div>

        <div className="complement-bento">
          {data.items.map((item) => {
            if (item.image) {
              const src = IMAGES[item.image]
              return (
                <div key={item.title} className="complement-card complement-card-photo">
                  <img
                    src={src}
                    alt={item.imageAlt ?? ''}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: item.imagePosition }}
                    width={600}
                    height={400}
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: PHOTO_OVERLAY }}
                  />
                  <h3 className="relative z-[1] m-0 font-serif text-[28px] font-medium leading-[1.2] text-white">
                    {item.title}
                  </h3>
                  <p className="relative z-[1] m-0 max-w-[440px] text-[15px] leading-[1.75] text-[#E3EAF2]">
                    {item.text}
                  </p>
                </div>
              )
            }

            const Icon = item.icon ? ICONS[item.icon] : null
            return (
              <div key={item.title} className="complement-card">
                <div className="flex flex-col gap-7">
                  {Icon ? (
                    <span
                      className="flex size-14 items-center justify-center bg-[rgba(255,255,255,0.10)] text-white"
                      aria-hidden="true"
                    >
                      <Icon className="size-6" strokeWidth={1.6} />
                    </span>
                  ) : null}
                  <h3 className="m-0 font-serif text-[28px] font-medium leading-[1.2] text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="m-0 max-w-[440px] text-[15px] leading-[1.75] text-[#C9D6E4]">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
