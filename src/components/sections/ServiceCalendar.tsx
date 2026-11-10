import { Eyebrow } from '@/components/sections/Eyebrow'
import type { ServiceCalendarStage } from '@/content/services'

type ServiceCalendarProps = {
  stages: ServiceCalendarStage[]
}

export function ServiceCalendar({ stages }: ServiceCalendarProps) {
  return (
    <section className="bg-navy py-28 text-on-dark">
      <div className="wrap">
        <div className="mb-12 grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-[18px]">
            <Eyebrow tone="dark">Calendario de exigibilidad</Eyebrow>
            <h2 className="text-[30px] leading-[1.15] text-white md:text-[44px]">
              Aplicación gradual de las nuevas obligaciones
            </h2>
          </div>
          <p className="m-0 text-base leading-[1.85]">
            Cada proyecto considera la normativa vigente, las disposiciones
            transitorias y el calendario de exigibilidad, para distinguir las
            medidas ya obligatorias de aquellas que debe preparar para su futura
            entrada en vigor.
          </p>
        </div>

        <div className="flex flex-col text-[15px]">
          {stages.map((stage, stageIndex) => (
            <div key={stage.stage}>
              <span
                className={`block py-3.5 text-xs font-semibold uppercase tracking-label text-sky ${
                  stageIndex > 0 ? 'pt-7' : ''
                }`}
              >
                {stage.stage}
              </span>
              {stage.rows.map((row, index) => {
                const isLast =
                  stageIndex === stages.length - 1 &&
                  index === stage.rows.length - 1
                return (
                  <div
                    key={`${row.date}-${index}`}
                    className={`grid grid-cols-1 gap-3 border-t border-[rgba(255,255,255,0.18)] py-[18px] sm:grid-cols-[160px_1fr] sm:gap-6 ${
                      isLast ? 'border-b border-[rgba(255,255,255,0.18)]' : ''
                    }`}
                  >
                    <strong className="text-white">{row.date}</strong>
                    <span>{row.text}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
