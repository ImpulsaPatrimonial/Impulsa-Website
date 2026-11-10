import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Eyebrow } from '@/components/sections/Eyebrow'
import {
  methodologyIntro,
  methodologySteps,
  type MethodStep,
} from '@/content/methodology'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

const TONE_BG: Record<MethodStep['tone'], string> = {
  tint: 'bg-tint text-ink',
  'tint-2': 'bg-tint-2 text-ink',
  'tint-3': 'bg-tint-3 text-[#2A3441]',
  navy: 'bg-navy text-on-dark',
}

const NUMBER_COLOR: Record<MethodStep['tone'], string> = {
  tint: 'text-brand',
  'tint-2': 'text-brand',
  'tint-3': 'text-navy',
  navy: 'text-sky',
}

type MethodologyStepsProps = {
  className?: string
}

export function MethodologySteps({ className }: MethodologyStepsProps) {
  const reducedMotion = useReducedMotion()
  // Estado "in" en React (docs/04 §6): no usar classList manual.
  const [inAnim, setInAnim] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number>(0)

  useEffect(() => {
    if (reducedMotion) {
      setInAnim(true)
      return
    }

    const el = gridRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setInAnim(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.35) {
            if (!timerRef.current) {
              timerRef.current = window.setTimeout(() => {
                timerRef.current = 0
                setInAnim(true)
              }, 1500)
            }
          } else if (!entry.isIntersecting) {
            if (timerRef.current) {
              window.clearTimeout(timerRef.current)
              timerRef.current = 0
            }
            setInAnim(false)
          }
        })
      },
      { threshold: [0, 0.35] },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [reducedMotion])

  return (
    <section className={cn('pb-[120px] pt-[88px]', className)}>
      <div className="wrap">
        <div className="relative">
          <div className="mb-10 flex flex-col gap-[18px] max-[900px]:static min-[901px]:absolute min-[901px]:left-0 min-[901px]:top-0 min-[901px]:z-[1] min-[901px]:mb-0 min-[901px]:w-[calc(50%-10px)]">
            <Eyebrow>{methodologyIntro.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {methodologyIntro.title}
            </h2>
            <p className="m-0 max-w-[480px] text-base leading-[1.8] text-ink">
              {methodologyIntro.description}
            </p>
          </div>

          <div
            ref={gridRef}
            className={cn(
              'met grid grid-cols-1 items-end gap-5 min-[901px]:min-h-[520px] min-[901px]:grid-cols-4',
              inAnim && 'met-in',
            )}
          >
            {methodologySteps.map((step) => (
              <div
                key={step.number}
                className={cn(
                  'mc flex flex-col justify-between gap-5 overflow-hidden p-8',
                  TONE_BG[step.tone],
                )}
              >
                <span
                  className={cn(
                    'font-serif text-[56px] leading-none',
                    NUMBER_COLOR[step.tone],
                  )}
                >
                  {step.number}
                </span>
                <div className="mcx flex flex-col gap-2.5">
                  <strong
                    className={cn(
                      step.tone === 'navy'
                        ? 'text-xl text-white'
                        : 'text-lg text-navy',
                    )}
                  >
                    {step.title}
                  </strong>
                  <span className="text-[15px] leading-[1.7]">{step.text}</span>
                  {step.linkLabel && step.linkHref ? (
                    <Link
                      to={step.linkHref}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-white no-underline hover:text-white"
                    >
                      {step.linkLabel}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
