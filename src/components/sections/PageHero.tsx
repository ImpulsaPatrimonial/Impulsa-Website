import { Link } from 'react-router-dom'

import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import { pageHeroOverlay } from '@/content/heroes'
import { cn } from '@/lib/utils'

type Breadcrumb = {
  label: string
  href?: string
}

type PageHeroProps = {
  title: string
  badge?: string
  badgeHref?: string
  image?: string
  imagePosition?: string
  overlay?: string
  breadcrumbs?: Breadcrumb[]
  className?: string
  titleClassName?: string
}

export function PageHero({
  title,
  badge,
  badgeHref,
  image,
  imagePosition = 'center',
  overlay = pageHeroOverlay(),
  breadcrumbs,
  className,
  titleClassName,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[520px] items-end overflow-hidden bg-navy-deep',
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
          width={1920}
          height={1080}
        />
      ) : (
        <ImagePlaceholder className="absolute inset-0 h-full w-full" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: overlay }}
      />

      <div className="wrap relative z-[1] pb-16 pt-[180px]">
        <div className="flex max-w-[900px] flex-col gap-5">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav
              aria-label="Miga de pan"
              className="text-sm text-[rgba(255,255,255,0.70)]"
            >
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((crumb, index) => (
                  <li
                    key={`${crumb.label}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    {crumb.href ? (
                      <Link
                        to={crumb.href}
                        className="text-[rgba(255,255,255,0.80)] no-underline hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {badge ? (
            badgeHref ? (
              <Link to={badgeHref} className="hero-badge no-underline">
                <span aria-hidden="true" className="size-1.5 bg-sky" />
                {badge}
              </Link>
            ) : (
              <span className="hero-badge">
                <span aria-hidden="true" className="size-1.5 bg-sky" />
                {badge}
              </span>
            )
          ) : null}

          <h1
            className={cn(
              'text-[40px] leading-[1.08] text-white md:text-[56px]',
              titleClassName,
            )}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
