import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { Label } from '@/components/sections/Label'
import { institutionalSection } from '@/content/home'
import logoCoparmex from '@/assets/logos/logo-coparmex.png'
import logoImcp from '@/assets/logos/logo-imcp.png'
import credenciales from '@/assets/images/inicio-credenciales.jpg'

const CARD_OVERLAY =
  'linear-gradient(180deg, rgba(12,28,52,.05) 20%, rgba(12,28,52,.9) 100%), linear-gradient(90deg, rgba(12,28,52,.6) 0%, rgba(12,28,52,0) 70%)'

export function InstitutionalCard() {
  const data = institutionalSection

  return (
    <section className="py-28">
      <div className="wrap">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {data.title}
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to={data.ctaHref}>{data.ctaLabel}</Link>
          </Button>
        </div>

        <div className="relative flex min-h-[580px] items-end overflow-hidden text-on-dark">
          <div className="absolute inset-0">
            <img
              src={credenciales}
              alt={data.imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
              width={1400}
              height={580}
              loading="lazy"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: CARD_OVERLAY }}
          />
          <div className="relative flex w-full flex-col gap-7 p-8 md:p-14">
            <p className="m-0 max-w-[620px] text-lg leading-[1.7] text-white">
              {data.lead}
            </p>
            <div className="mt-1.5 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {data.columns.map((column) => (
                <div
                  key={column.label}
                  className="flex flex-col gap-2 border-t border-[rgba(255,255,255,0.3)] pt-[18px]"
                >
                  <Label className="text-sky">{column.label}</Label>
                  <span className="text-[15px] leading-[1.6] text-white">
                    {'emphasized' in column && column.emphasized ? (
                      <>
                        Coautoría de <em>{column.emphasized[0]}</em> (2026) y{' '}
                        <em>{column.emphasized[1]}</em> (2025)
                      </>
                    ) : (
                      column.text
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-center gap-1.5 bg-tint px-8 py-7">
            <Label>{data.affiliationsLabel}</Label>
            <span className="text-[15px] text-navy">{data.affiliationsText}</span>
          </div>
          <div className="flex h-[132px] items-center justify-center border border-line px-8">
            <img
              src={logoCoparmex}
              alt="COPARMEX"
              className="block h-12 w-auto max-w-full"
              width={180}
              height={48}
              loading="lazy"
            />
          </div>
          <div className="flex h-[132px] items-center justify-center border border-line px-8">
            <img
              src={logoImcp}
              alt="Instituto Mexicano de Contadores Públicos, Región Noreste"
              className="block h-16 w-auto max-w-full"
              width={200}
              height={64}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
