import { ActivityBlock } from '@/components/activities/ActivityBlock'
import { activityDetailUi } from '@/content/activities'
import type { ActivityDeadline } from '@/types/activity'

type ActivityDeadlinesProps = {
  deadlines: ActivityDeadline[]
}

export function ActivityDeadlines({ deadlines }: ActivityDeadlinesProps) {
  if (deadlines.length === 0) return null

  return (
    <ActivityBlock id="plazos" title={activityDetailUi.sectionTitles.plazos}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {deadlines.map((item, index) => (
          <div
            key={`${item.plazo}-${index}`}
            className="flex flex-col gap-1.5 bg-tint p-6"
          >
            <span className="font-serif text-[28px] text-navy">{item.plazo}</span>
            <span className="text-sm">{item.tramite}</span>
          </div>
        ))}
      </div>
    </ActivityBlock>
  )
}
