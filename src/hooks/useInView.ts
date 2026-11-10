import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = IntersectionObserverInit & {
  once?: boolean
}

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { once = false, root = null, rootMargin, threshold } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { root, rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, root, rootMargin, threshold])

  return { ref, inView }
}
