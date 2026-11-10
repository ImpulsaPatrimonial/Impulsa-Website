import type { ServicePhase } from '@/content/services'
import { cn } from '@/lib/utils'

const TONES = [
  'bg-tint-2 text-navy',
  'bg-tint-3 text-navy',
  'bg-brand text-white',
  'bg-navy text-white',
] as const

type PhaseBarProps = {
  phases: ServicePhase[]
  /** Muestra el rango (01–02) encima del label. */
  showRange?: boolean
  /** En listado: columnas iguales; en detalle: weights proporcionales. */
  proportional?: boolean
  className?: string
}

export function PhaseBar({
  phases,
  showRange = false,
  proportional = false,
  className,
}: PhaseBarProps) {
  const columns = proportional
    ? phases.map((p) => `${p.weight}fr`).join(' ')
    : `repeat(${phases.length}, minmax(0, 1fr))`

  return (
    <>
      {/* Escritorio */}
      <div
        className={cn('hidden gap-1 md:grid', className)}
        style={{ gridTemplateColumns: columns }}
        role="list"
        aria-label="Fases del servicio"
      >
        {phases.map((phase, index) => (
          <span
            key={phase.label}
            role="listitem"
            className={cn(
              'flex flex-col gap-0.5 px-3.5 py-2.5 text-xs font-semibold uppercase leading-[1.3]',
              TONES[index] ?? TONES[0],
            )}
          >
            {showRange ? (
              <small className="text-[11px] font-semibold tracking-[0.08em] opacity-90">
                {phase.range}
              </small>
            ) : null}
            {phase.label}
          </span>
        ))}
      </div>

      {/* Móvil: lista vertical fase + rango */}
      <ul
        className={cn('flex flex-col gap-2 md:hidden', className)}
        aria-label="Fases del servicio"
      >
        {phases.map((phase, index) => (
          <li
            key={phase.label}
            className={cn(
              'flex items-baseline justify-between gap-3 px-3.5 py-2.5 text-xs font-semibold uppercase',
              TONES[index] ?? TONES[0],
            )}
          >
            <span>{phase.label}</span>
            {showRange ? (
              <span className="text-[11px] tracking-[0.08em] opacity-90">
                {phase.range}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  )
}
