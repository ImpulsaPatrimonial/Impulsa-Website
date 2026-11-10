import { Eyebrow } from '@/components/sections/Eyebrow'
import { Label } from '@/components/sections/Label'
import { aboutCredentials } from '@/content/about'
import { site } from '@/content/site'
import logoCoparmex from '@/assets/logos/logo-coparmex.png'
import logoImcp from '@/assets/logos/logo-imcp.png'

/**
 * Participación institucional de Quiénes somos.
 * DECISIÓN: componente aislado para reemplazarlo fácilmente cuando se
 * confirme el rediseño a perfil de la socia (docs/03 §2 nota).
 */
export function AboutCredentials() {
  const data = aboutCredentials

  return (
    <section className="bg-navy py-28 text-on-dark">
      <div className="wrap flex flex-col gap-16">
        <div className="grid grid-cols-1 items-start gap-[72px] lg:grid-cols-2">
          <div className="flex flex-col gap-[22px]">
            <Eyebrow tone="dark">{data.eyebrow}</Eyebrow>
            <h2 className="text-[30px] leading-[1.2] text-white md:text-[40px]">
              {data.title}
            </h2>
            <p className="m-0 text-base leading-[1.7]">{data.lead}</p>
          </div>

          <div className="flex flex-col">
            {data.items.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col gap-1.5 border-t border-[rgba(255,255,255,0.18)] py-6 ${
                  index === data.items.length - 1
                    ? 'border-b border-[rgba(255,255,255,0.18)]'
                    : ''
                }`}
              >
                <Label className="text-sky">{item.label}</Label>
                <span className="font-serif text-[21px] leading-[1.4] text-white">
                  {'emphasized' in item && item.emphasized ? (
                    <>
                      <em>{item.emphasized[0]}</em> (2026) y{' '}
                      <em>{item.emphasized[1]}</em> (2025)
                    </>
                  ) : (
                    item.text
                  )}
                </span>
              </div>
            ))}
            <a
              href={site.sociaLinkedIn}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-white no-underline hover:text-sky"
            >
              {data.linkedInLabel}{' '}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-[rgba(255,255,255,0.18)] pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.bottomStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="font-serif text-[44px] leading-none text-white">
                {stat.value}
              </span>
              <span className="text-sm">{stat.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="flex h-16 flex-1 items-center justify-center bg-white px-4">
              <img
                src={logoCoparmex}
                alt={data.logos.coparmexAlt}
                className="h-7 w-auto max-w-full"
                width={120}
                height={28}
                loading="lazy"
              />
            </span>
            <span className="flex h-16 flex-1 items-center justify-center bg-white px-4">
              <img
                src={logoImcp}
                alt={data.logos.imcpAlt}
                className="h-[38px] w-auto max-w-full"
                width={120}
                height={38}
                loading="lazy"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
