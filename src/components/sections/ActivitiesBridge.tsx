import { Link } from 'react-router-dom'

import type { Service } from '@/content/services'

type ActivitiesBridgeProps = {
  data: NonNullable<Service['activitiesBridge']>
}

export function ActivitiesBridge({ data }: ActivitiesBridgeProps) {
  return (
    <section className="pb-14 pt-28">
      <div className="wrap">
        <div className="grid grid-cols-1 items-center gap-8 border border-line p-8 md:grid-cols-2 md:p-11">
          <div className="flex flex-col gap-2.5">
            <h3 className="m-0 text-[28px] leading-[1.25]">{data.title}</h3>
            <span className="text-[15px] text-ink">{data.text}</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {data.links.map((link) => (
              <Link
                key={link.slug}
                to={`/actividades-vulnerables/${link.slug}`}
                className="inline-flex min-h-11 items-center border border-[#C9D6E4] px-[18px] text-sm font-medium text-navy no-underline hover:border-brand hover:text-brand"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/actividades-vulnerables"
              className="inline-flex min-h-11 items-center border border-dashed border-brand px-[18px] text-sm font-medium text-brand no-underline hover:bg-tint"
            >
              Ver todas →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
