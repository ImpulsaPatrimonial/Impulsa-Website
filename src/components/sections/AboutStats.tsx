import { StatItem } from '@/components/sections/StatItem'
import { aboutFirm } from '@/content/about'
import { useCountUp, useCountUpTrigger } from '@/hooks/useCountUp'

export function AboutStats() {
  const { ref, active } = useCountUpTrigger(0.5)
  const [s0, s1, s2] = aboutFirm.stats
  const v0 = useCountUp({ target: s0!.value, active })
  const v1 = useCountUp({ target: s1!.value, active })
  const v2 = useCountUp({ target: s2!.value, active })
  const displays = [v0, v1, v2]

  return (
    <div
      ref={ref}
      className="about-stats"
      aria-label={aboutFirm.statsAriaLabel}
    >
      {aboutFirm.stats.map((stat, index) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          displayValue={displays[index] ?? 0}
        />
      ))}
    </div>
  )
}
