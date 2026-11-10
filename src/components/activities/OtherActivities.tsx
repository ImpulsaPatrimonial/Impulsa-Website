import { ActivityCard } from '@/components/activities/ActivityCard'
import { Eyebrow } from '@/components/sections/Eyebrow'
import { activityDetailUi } from '@/content/activities'
import type { ActivitySummary } from '@/types/activity'

type OtherActivitiesProps = {
  activities: ActivitySummary[]
}

export function OtherActivities({ activities }: OtherActivitiesProps) {
  if (activities.length === 0) return null

  return (
    <section className="bg-tint py-28">
      <div className="wrap">
        <div className="mb-12 flex flex-col gap-[18px]">
          <Eyebrow>{activityDetailUi.otherEyebrow}</Eyebrow>
          <h2 className="text-[30px] leading-[1.15] md:text-[44px]">
            {activityDetailUi.otherTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  )
}
