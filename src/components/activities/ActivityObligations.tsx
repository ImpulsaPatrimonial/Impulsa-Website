import { ActivityBlock } from '@/components/activities/ActivityBlock'
import { activityDetailUi } from '@/content/activities'

type ActivityObligationsProps = {
  obligations: string[]
}

export function ActivityObligations({ obligations }: ActivityObligationsProps) {
  if (obligations.length === 0) return null

  return (
    <ActivityBlock
      id="obligaciones"
      title={activityDetailUi.sectionTitles.obligaciones}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
        {obligations.map((text, index) => (
          <div
            key={text}
            className="flex gap-3.5 border border-line p-5 text-[15px] text-navy"
          >
            <b className="font-serif text-xl font-normal leading-[1.2] text-brand">
              {String(index + 1).padStart(2, '0')}
            </b>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </ActivityBlock>
  )
}
