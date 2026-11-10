import { Link } from 'react-router-dom'

import { ActivityBlock } from '@/components/activities/ActivityBlock'
import { activityDetailUi } from '@/content/activities'
import type { ActivitySanction } from '@/types/activity'

type ActivitySanctionsProps = {
  sanctions: ActivitySanction[]
}

export function ActivitySanctions({ sanctions }: ActivitySanctionsProps) {
  if (sanctions.length === 0) return null

  return (
    <ActivityBlock
      id="sanciones"
      title={activityDetailUi.sectionTitles.sanciones}
    >
      <div className="flex flex-col gap-3.5 border-l-2 border-navy bg-tint px-8 py-7">
        {sanctions.map((item, index) => {
          const isLast = index === sanctions.length - 1
          return (
            <div
              key={`${item.incumplimiento}-${index}`}
              className={`flex flex-wrap justify-between gap-4 ${isLast ? '' : 'border-b border-line pb-3.5'}`}
            >
              <span>{item.incumplimiento}</span>
              <strong className="font-semibold text-navy">{item.sancion}</strong>
            </div>
          )
        })}
      </div>
      <span className="text-sm">
        {activityDetailUi.sanctionsNoteBefore}
        <Link
          to={activityDetailUi.sanctionsLinkHref}
          className="font-semibold text-brand no-underline hover:text-navy"
        >
          {activityDetailUi.sanctionsNoteLink}
        </Link>
        {activityDetailUi.sanctionsNoteAfter}
      </span>
    </ActivityBlock>
  )
}
