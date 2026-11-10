import { Eyebrow } from '@/components/sections/Eyebrow'
import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import type { Service } from '@/content/services'

type AppliesToSectionProps = {
  data: Service['appliesTo']
}

export function AppliesToSection({ data }: AppliesToSectionProps) {
  return (
    <section className="bg-tint py-28">
      <div className="wrap grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="text-[30px] leading-[1.15] md:text-[40px]">
            {data.title}
          </h2>
          <div className="relative mt-3 h-[280px] overflow-hidden">
            {data.image ? (
              <img
                src={data.image}
                alt={data.imageAlt ?? ''}
                className="absolute inset-0 h-full w-full object-cover"
                width={640}
                height={280}
                loading="lazy"
              />
            ) : (
              <ImagePlaceholder
                className="absolute inset-0 h-full w-full"
                label={data.imageAlt}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col">
          {data.items.map((item, index) => {
            const n = String(index + 1).padStart(2, '0')
            const isLast = index === data.items.length - 1
            return (
              <div
                key={item.title}
                className={`grid grid-cols-[40px_1fr] gap-4 border-t border-[#C9D6E4] py-6 ${
                  isLast ? 'border-b border-[#C9D6E4]' : ''
                }`}
              >
                <span className="font-serif text-[22px] text-brand">{n}</span>
                <span className="text-base leading-[1.7] text-ink">
                  <strong className="text-navy">{item.title}</strong>
                  <br />
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
