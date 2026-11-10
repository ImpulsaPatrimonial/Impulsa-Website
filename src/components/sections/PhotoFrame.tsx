import { cn } from '@/lib/utils'

type PhotoFrameProps = {
  children: React.ReactNode
  offset?: 'bottom-right' | 'bottom-left'
  className?: string
}

export function PhotoFrame({
  children,
  offset = 'bottom-right',
  className,
}: PhotoFrameProps) {
  return (
    <div
      className={cn(
        'relative',
        offset === 'bottom-right' ? 'pb-7 pr-7' : 'pb-7 pl-7',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 top-7 border border-tint-3 bg-tint',
          offset === 'bottom-right' ? 'left-7 right-0' : 'left-0 right-7',
        )}
      />
      <div className="relative z-[1] overflow-hidden">{children}</div>
    </div>
  )
}
