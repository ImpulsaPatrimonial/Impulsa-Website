import { Eyebrow } from '@/components/sections/Eyebrow'
import { PhaseBar } from '@/components/sections/PhaseBar'
import type { Service } from '@/content/services'
import { cn } from '@/lib/utils'

type ServiceOfferingsProps = {
  phases: Service['phases']
  offerings: Service['services']
}

export function ServiceOfferings({ phases, offerings }: ServiceOfferingsProps) {
  return (
    <section className="py-28">
      <div className="wrap">
        <div className="mb-9 flex max-w-[760px] flex-col gap-[18px]">
          <Eyebrow>Servicios especializados</Eyebrow>
          <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
            Del diagnóstico a la defensa
          </h2>
        </div>

        <PhaseBar
          phases={phases}
          showRange
          proportional
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-y-11 gap-x-12 md:grid-cols-2 xl:grid-cols-3">
          {offerings.map((item) => (
            <div
              key={item.number}
              className={cn(
                'flex flex-col gap-2.5',
                item.note &&
                  'border-t-2 border-brand bg-tint px-6 pb-[26px] pt-[22px]',
              )}
            >
              <b className="font-serif text-lg font-normal text-brand">
                {item.note ? `${item.number} · ${item.note}` : item.number}
              </b>
              <strong className="font-sans text-base font-semibold text-navy">
                {item.title}
              </strong>
              <span className="text-[15px] leading-[1.75] text-ink">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
