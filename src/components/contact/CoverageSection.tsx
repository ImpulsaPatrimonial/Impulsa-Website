import { Eyebrow } from '@/components/sections/Eyebrow'
import { contactCopy } from '@/content/contact'
import { site } from '@/content/site'
import mapImage from '@/assets/images/mapa-mexico.webp'

export function CoverageSection() {
  return (
    <section id="cobertura" className="scroll-mt-[100px] bg-tint py-28">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-7">
          <div className="flex max-w-[640px] flex-col gap-[18px]">
            <Eyebrow>{contactCopy.coverage.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
              {contactCopy.coverage.title}
            </h2>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block size-4 rounded-full border-4 border-brand bg-white"
              />
              {contactCopy.coverage.legendOffice}
            </span>
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block size-4 bg-[#3F5878]"
              />
              {contactCopy.coverage.legendOnline}
            </span>
          </div>
        </div>

        <div className="relative mx-auto max-w-[940px]">
          <img
            src={mapImage}
            alt={contactCopy.coverage.mapAlt}
            className="block h-auto w-full"
            width={940}
            height={620}
            loading="lazy"
          />

          {site.offices.map((office) => (
            <div
              key={office.city}
              className="absolute h-0 w-0"
              style={{ left: office.map.left, top: office.map.top }}
            >
              <span className="mk" />
              {/* DECISIÓN: etiquetas ocultas en móvil (≤768 px); lista debajo. */}
              <span
                aria-hidden="true"
                className="absolute hidden bg-white md:block"
                style={office.map.line}
              />
              <span
                className="ml hidden md:flex"
                style={office.map.label}
              >
                <strong>{office.city}</strong>
                <span>{contactCopy.coverage.markerSubLabel}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Lista móvil de oficinas (sustituye etiquetas del mapa) */}
        <ul className="mt-8 grid list-none grid-cols-1 gap-3 p-0 md:hidden">
          {site.offices.map((office) => (
            <li
              key={`mobile-${office.city}`}
              className="flex items-center gap-3 border border-line bg-white px-4 py-3"
            >
              <span
                aria-hidden="true"
                className="block size-3 shrink-0 rounded-full border-[3px] border-brand bg-white"
              />
              <span className="flex flex-col leading-tight">
                <strong className="text-sm font-semibold text-navy">
                  {office.city}
                </strong>
                <span className="text-xs text-muted">
                  {contactCopy.coverage.markerSubLabel}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-[72px] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {site.offices.map((office) => (
            <div key={`card-${office.city}`} className="flex flex-col gap-2.5">
              <span aria-hidden="true" className="block h-0.5 w-14 bg-brand" />
              <strong className="font-serif text-[21px] font-medium text-navy">
                {office.city}
              </strong>
              <span className="text-sm">{office.blurb}</span>
            </div>
          ))}
          <div className="flex flex-col gap-2.5 bg-navy p-6 text-on-dark">
            <strong className="font-serif text-[21px] font-medium text-white">
              {contactCopy.nationalCoverage.title}
            </strong>
            <span className="text-sm">{contactCopy.nationalCoverage.text}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
