import { ActivityBlock } from '@/components/activities/ActivityBlock'
import { activityDetailUi } from '@/content/activities'
import type { ActivityThreshold } from '@/types/activity'

type ActivityThresholdsProps = {
  thresholds: ActivityThreshold[]
}

export function ActivityThresholds({ thresholds }: ActivityThresholdsProps) {
  if (thresholds.length === 0) return null

  return (
    <ActivityBlock id="umbrales" title={activityDetailUi.sectionTitles.umbrales}>
      {/* DECISIÓN: overflow-x propio en el contenedor para tablas en móvil. */}
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              <th className="bg-tint px-[18px] py-4 text-[13px] font-semibold tracking-[0.04em] text-navy">
                Supuesto
              </th>
              <th className="bg-tint px-[18px] py-4 text-[13px] font-semibold tracking-[0.04em] text-navy">
                Umbral de identificación
              </th>
              <th className="bg-tint px-[18px] py-4 text-[13px] font-semibold tracking-[0.04em] text-navy">
                Umbral de aviso
              </th>
            </tr>
          </thead>
          <tbody>
            {thresholds.map((row, index) => {
              const isLast = index === thresholds.length - 1
              return (
                <tr key={`${row.supuesto}-${index}`}>
                  <td
                    className={`px-[18px] py-4 text-[15px] ${isLast ? '' : 'border-b border-line'}`}
                  >
                    {row.supuesto}
                  </td>
                  <td
                    className={`px-[18px] py-4 text-[15px] ${isLast ? '' : 'border-b border-line'}`}
                  >
                    {row.identificacion}
                  </td>
                  <td
                    className={`px-[18px] py-4 text-[15px] ${isLast ? '' : 'border-b border-line'}`}
                  >
                    {row.aviso}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <span className="text-[13px] text-muted">
        {activityDetailUi.thresholdsNote}
      </span>
    </ActivityBlock>
  )
}
