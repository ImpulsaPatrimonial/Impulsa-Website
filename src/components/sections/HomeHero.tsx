import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import heroVideo from '@/assets/video/hero-inicio.mp4'
import heroPoster from '@/assets/video/hero-inicio-poster.jpg'

const OVERLAY =
  'linear-gradient(180deg, rgba(12,28,52,.78) 0%, rgba(12,28,52,.38) 36%, rgba(12,28,52,.55) 62%, rgba(12,28,52,.94) 100%), linear-gradient(90deg, rgba(14,35,66,.55) 0%, rgba(14,35,66,.15) 60%, rgba(14,35,66,.35) 100%)'

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const saveData =
      typeof navigator !== 'undefined' &&
      'connection' in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      )

    if (reducedMotion || saveData) {
      video.pause()
      video.removeAttribute('src')
      video.load()
      return
    }

    video.muted = true
    video.defaultMuted = true
    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {
        // Algunos navegadores bloquean autoplay; se queda el poster.
      })
    }
  }, [reducedMotion])

  return (
    <section className="relative flex min-h-[820px] overflow-hidden text-white">
      {reducedMotion ? (
        <img
          src={heroPoster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          width={1920}
          height={1080}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: OVERLAY }} />

      <div className="wrap relative z-[2] flex w-full flex-wrap items-end justify-between gap-12 pb-24 pt-[200px]">
        <div className="flex max-w-[740px] flex-[1_1_560px] flex-col gap-6">
          <span className="flex items-center gap-3.5 text-xs font-semibold uppercase tracking-eyebrow text-[rgba(255,255,255,0.88)]">
            <span
              aria-hidden="true"
              className="block h-px w-10 bg-[rgba(255,255,255,0.75)]"
            />
            Asesoría legal y fiscal desde 2012
          </span>
          <h1 className="text-[40px] leading-[1.06] text-white md:text-[64px]">
            Cumplimiento con certeza jurídica y patrimonial
          </h1>
          <p className="m-0 max-w-[560px] text-lg leading-[1.7] text-[rgba(255,255,255,0.86)]">
            Prevención de Lavado de Dinero, Precios de Transferencia y Legal
            Corporativo para empresas y personas físicas con actividad
            empresarial en todo México.
          </p>
        </div>

        <div className="flex min-w-[300px] flex-col items-stretch gap-[18px]">
          <div className="flex items-center gap-[18px] border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.08)] px-[22px] py-[18px] backdrop-blur-[10px]">
            <span className="font-serif text-[48px] leading-none text-white">
              14
            </span>
            <span className="text-[13px] leading-[1.5] text-[rgba(255,255,255,0.88)]">
              años acompañando a empresas
              <br />
              en México y el extranjero
            </span>
          </div>
          <Button asChild variant="white" className="min-h-14">
            <Link to="/contacto">
              Solicitar asesoría
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
