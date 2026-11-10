import { cn } from '@/lib/utils'

type ActivityBlockProps = {
  id: string
  title: string
  first?: boolean
  children: React.ReactNode
  className?: string
}

export function ActivityBlock({
  id,
  title,
  first = false,
  children,
  className,
}: ActivityBlockProps) {
  return (
    <div
      id={id}
      className={cn(
        'flex scroll-mt-[100px] flex-col gap-[18px] py-12',
        first ? 'border-t-0 pt-0' : 'border-t border-line',
        className,
      )}
    >
      <h2 className="text-[32px] leading-[1.2]">{title}</h2>
      {children}
    </div>
  )
}
