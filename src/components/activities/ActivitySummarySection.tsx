import { Button } from '@/components/ui/button'
import { activityDetailUi } from '@/content/activities'
import { getWhatsAppUrlForActivity } from '@/lib/whatsapp'

type ActivitySummarySectionProps = {
  summary: string
  activityName: string
}

export function ActivitySummarySection({
  summary,
  activityName,
}: ActivitySummarySectionProps) {
  return (
    <section className="border-b border-line py-20">
      <div className="wrap flex flex-wrap items-end justify-between gap-10">
        <p className="m-0 max-w-[720px] font-serif text-[28px] leading-[1.45] text-navy">
          {summary}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <a href="#contacto">{activityDetailUi.evaluateLabel}</a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={getWhatsAppUrlForActivity(activityName)}
              target="_blank"
              rel="noreferrer"
            >
              {activityDetailUi.whatsappLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
