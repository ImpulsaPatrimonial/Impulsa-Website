import { cn } from '@/lib/utils'

type DateRowProps = {
  date: string
  text: string
  isLast?: boolean
  className?: string
}

export function DateRow({ date, text, isLast = false, className }: DateRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 border-t border-[rgba(255,255,255,0.18)] py-6 sm:grid-cols-[150px_1fr]',
        isLast && 'border-b border-[rgba(255,255,255,0.18)]',
        className,
      )}
    >
      <span className="font-semibold tracking-[0.06em] text-sky">{date}</span>
      <span>{text}</span>
    </div>
  )
}
