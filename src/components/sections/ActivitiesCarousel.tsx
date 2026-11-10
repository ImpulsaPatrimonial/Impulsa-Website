import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { PhotoFrame } from '@/components/sections/PhotoFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

export type CarouselSlide = {
  slug: string
  name: string
  image: string
  imageAlt: string
  imagePosition?: string
}

type ActivitiesCarouselProps = {
  slides: CarouselSlide[]
}

const INTERVAL_MS = 4500
const OVERLAY =
  'linear-gradient(180deg, rgba(12,28,52,0) 40%, rgba(12,28,52,.88) 100%)'

export function ActivitiesCarousel({ slides }: ActivitiesCarouselProps) {
  const reducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<number>(0)

  const goTo = useCallback((next: number) => {
    setIndex(next)
  }, [])

  useEffect(() => {
    if (reducedMotion || paused || slides.length < 2) return

    timerRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(timerRef.current)
  }, [paused, reducedMotion, slides.length, index])

  useEffect(() => {
    const onVisibility = () => {
      setPaused(document.visibilityState !== 'visible')
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const current = slides[index]
  if (!current) return null

  return (
    <PhotoFrame offset="bottom-left">
      <div
        className="relative h-[560px] overflow-hidden"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Ejemplos de actividades vulnerables"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setPaused(false)
          }
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            className={cn(
              'absolute inset-0 transition-opacity duration-1100 ease-in-out',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: slide.imagePosition ?? 'center' }}
              width={960}
              height={560}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: OVERLAY }}
        />

        <div className="absolute bottom-5 left-8 right-8 flex flex-col items-start gap-2">
          <Link
            to={`/actividades-vulnerables/${current.slug}`}
            className="text-white no-underline"
          >
            <span
              aria-live="polite"
              className="font-serif text-[28px] leading-[1.2] text-white"
            >
              {current.name}
            </span>
          </Link>
          <div className="flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.slug}
                type="button"
                className="flex h-11 w-[30px] items-center border-0 bg-transparent p-0"
                aria-label={`Ver ${slide.name}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                <span
                  className={cn(
                    'block h-0.5 w-full',
                    i === index
                      ? 'bg-white'
                      : 'bg-[rgba(255,255,255,0.4)]',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </PhotoFrame>
  )
}
