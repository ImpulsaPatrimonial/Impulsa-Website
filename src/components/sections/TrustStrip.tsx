import { trustStrip } from '@/content/home'
import { cn } from '@/lib/utils'

export function TrustStrip() {
  return (
    <section>
      <div className="wrap flex flex-wrap gap-8 py-11">
        {trustStrip.map((item) => (
          <div
            key={item.value}
            className={cn(
              'flex flex-col gap-1 border-l border-line pl-6',
              item.wide ? 'min-w-[220px] flex-[1.7_1_400px]' : 'flex-[1_1_220px]',
            )}
          >
            <span
              className={cn(
                'font-serif text-[40px] leading-[1.1] text-navy',
                item.wide && 'whitespace-nowrap',
              )}
            >
              {item.value}
            </span>
            <span className="text-sm text-muted">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
