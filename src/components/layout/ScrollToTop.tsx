import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_OFFSET = 100

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // Esperar un frame por si el destino está en una ruta lazy.
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id)
        if (!el) return
        const top =
          el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
        window.scrollTo({ top, left: 0, behavior: 'smooth' })
      }, 0)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
