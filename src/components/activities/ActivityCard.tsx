import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import { resolveActivityImage } from '@/lib/activity-images'
import { cn } from '@/lib/utils'
import type { ActivitySummary } from '@/types/activity'

type ActivityCardProps = {
  activity: ActivitySummary
  className?: string
}

const GRADIENT =
  'linear-gradient(180deg, rgba(12,28,52,0) 40%, rgba(12,28,52,.88) 100%)'
const GRADIENT_HOVER =
  'linear-gradient(180deg, rgba(12,28,52,.1) 20%, rgba(12,28,52,.92) 100%)'

export function ActivityCard({ activity, className }: ActivityCardProps) {
  const image = resolveActivityImage(activity.cardImageUrl)

  return (
    <Link
      to={`/actividades-vulnerables/${activity.slug}`}
      className={cn(
        'group relative block h-[420px] overflow-hidden no-underline outline-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand',
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: activity.heroImagePosition ?? 'center',
          }}
          width={640}
          height={420}
          loading="lazy"
        />
      ) : (
        <ImagePlaceholder className="absolute inset-0 h-full w-full" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[background] duration-300 ease-out motion-reduce:transition-none"
        style={{ background: GRADIENT }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none"
        style={{ background: GRADIENT_HOVER }}
      />
      <span className="absolute bottom-7 left-8 right-8 z-[1] font-serif text-[28px] leading-[1.25] text-white group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[5px]">
        {activity.name}{' '}
        <span aria-hidden="true" className="text-xl">
          →
        </span>
      </span>
    </Link>
  )
}
