import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

type UseCountUpOptions = {
  target: number
  /** true cuando la fila está activa (≥ 50 % visible). */
  active: boolean
  durationMs?: number
  delayMs?: number
}

/**
 * Contador animado (docs/04 §7). La visibilidad la controla el padre
 * (inicia ≥ 50 %, reinicia al salir por completo).
 */
export function useCountUp({
  target,
  active,
  durationMs = 1800,
  delayMs = 300,
}: UseCountUpOptions) {
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }

    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    let start: number | null = null
    const delayTimer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now
        const progress = Math.min(1, (now - start) / durationMs)
        setValue(Math.round(easeOutCubic(progress) * target))
        if (progress < 1) frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      window.clearTimeout(delayTimer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [active, delayMs, durationMs, reducedMotion, target])

  return value
}

/** Observa una fila: activa ≥ 50 %; desactiva solo al salir por completo. */
export function useCountUpTrigger(threshold = 0.5) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.intersectionRatio >= threshold) setActive(true)
        else if (entry.intersectionRatio === 0) setActive(false)
      },
      { threshold: [0, threshold, 1] },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, active }
}
