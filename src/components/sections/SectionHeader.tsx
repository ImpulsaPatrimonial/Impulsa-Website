import { Eyebrow } from '@/components/sections/Eyebrow'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-14',
        className,
      )}
    >
      <div className="flex max-w-[720px] flex-col gap-[18px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            'text-[30px] leading-[1.15] md:text-[44px]',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <div className="text-base leading-[1.8] text-ink md:text-[17px]">
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0 self-end">{action}</div> : null}
    </div>
  )
}
