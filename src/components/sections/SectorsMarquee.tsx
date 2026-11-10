import { Eyebrow } from '@/components/sections/Eyebrow'
import { sectors, sectorsAccessibleList } from '@/content/sectors'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import isotipo from '@/assets/brand/isotipo.png'

type SectorsMarqueeProps = {
  className?: string
}

export function SectorsMarquee({ className }: SectorsMarqueeProps) {
  const reducedMotion = useReducedMotion()
  const track = [...sectors, ...sectors]

  return (
    <section
      aria-label="Sectores que atendemos"
      className={cn('pb-14 pt-10', className)}
    >
      <div className="wrap mb-7 flex flex-wrap items-center justify-start gap-4 text-start">
        <Eyebrow>15 sectores atendidos</Eyebrow>
      </div>
      <p className="sr-only">{sectorsAccessibleList}</p>
      <div
        className={cn(
          'group mq overflow-hidden py-[30px]',
          '[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]',
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'flex w-max items-center gap-14',
            !reducedMotion &&
              'animate-marquee group-hover:[animation-play-state:paused]',
          )}
        >
          {track.map((sector, index) => (
            <span key={`${sector}-${index}`} className="flex items-center gap-14">
              <span className="font-serif text-[40px] leading-[1.1] text-navy whitespace-nowrap md:text-[64px]">
                {sector}
              </span>
              <img
                src={isotipo}
                alt=""
                className="block h-[30px] w-auto"
                width={30}
                height={30}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
