import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { mainNav } from '@/content/site'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ServicesMenuProps = {
  scrolled: boolean
  linkClassName: (active: boolean) => string
}

const servicesItem = mainNav.find((item) => item.href === '/servicios')

function isChildCurrent(pathname: string, hash: string, href: string) {
  if (href.includes('#')) {
    const [path, fragment] = href.split('#')
    return pathname === path && hash === `#${fragment}`
  }
  return pathname === href
}

export function ServicesMenu({ linkClassName }: ServicesMenuProps) {
  const panelId = useId()
  const { pathname, hash } = useLocation()
  const reducedMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [panelTop, setPanelTop] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const enterTimer = useRef<number>(0)
  const leaveTimer = useRef<number>(0)

  const active =
    pathname === '/servicios' || pathname.startsWith('/servicios/')
  const triggerClass = linkClassName(active)

  const clearTimers = () => {
    window.clearTimeout(enterTimer.current)
    window.clearTimeout(leaveTimer.current)
  }

  const openMenu = (delay = 120) => {
    clearTimers()
    enterTimer.current = window.setTimeout(() => setOpen(true), delay)
  }

  const closeMenu = (delay = 200) => {
    clearTimers()
    leaveTimer.current = window.setTimeout(() => setOpen(false), delay)
  }

  const updatePanelTop = () => {
    const header = rootRef.current?.closest('header')
    if (header) setPanelTop(header.getBoundingClientRect().bottom)
  }

  useLayoutEffect(() => {
    if (!open) return
    updatePanelTop()
    window.addEventListener('resize', updatePanelTop)
    window.addEventListener('scroll', updatePanelTop, { passive: true })
    return () => {
      window.removeEventListener('resize', updatePanelTop)
      window.removeEventListener('scroll', updatePanelTop)
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        linkRef.current?.focus()
      }
    }

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        !rootRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  useEffect(() => () => clearTimers(), [])

  if (!servicesItem?.children) return null

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => openMenu(120)}
      onMouseLeave={() => closeMenu(200)}
    >
      {/* El subrayado activo va solo en el contenedor para una sola línea continua bajo "Servicios ▾". */}
      <div className={cn(triggerClass, 'inline-flex items-center gap-1')}>
        <Link
          ref={linkRef}
          to="/servicios"
          className="bg-transparent p-0 text-inherit no-underline"
          aria-current={active ? 'page' : undefined}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
            }
          }}
        >
          Servicios
        </Link>
        <button
          type="button"
          className="inline-flex cursor-pointer bg-transparent p-0 text-inherit"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Cerrar menú de servicios' : 'Abrir menú de servicios'}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
            }
          }}
        >
          <span aria-hidden="true">▾</span>
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-label="Menú de servicios"
          className={cn(
            'fixed inset-x-0 z-[60] border-b border-line bg-white shadow-[0_10px_30px_rgba(12,28,52,0.06)]',
            !reducedMotion &&
              'animate-in fade-in-0 slide-in-from-top-1 duration-180',
          )}
          style={{ top: panelTop }}
          onMouseEnter={() => openMenu(0)}
          onMouseLeave={() => closeMenu(200)}
        >
          <div className="wrap py-7">
            <div className="mb-5 flex justify-end">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-brand no-underline hover:text-navy"
                onClick={() => setOpen(false)}
              >
                Ver todos los servicios
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 xl:grid-cols-4">
              {servicesItem.children.map((child) => {
                const current = isChildCurrent(pathname, hash, child.href)
                return (
                  <Link
                    key={child.href}
                    to={child.href}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'group flex cursor-pointer flex-col gap-1 border-l-2 py-2 pl-4 text-left no-underline transition-colors duration-180',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                      child.accent === 'brand' ? 'border-brand' : 'border-line',
                      'hover:border-brand hover:bg-tint focus-visible:border-brand focus-visible:bg-tint',
                      current && 'border-brand bg-tint',
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <strong
                      className={cn(
                        'inline-flex items-center gap-2 font-semibold text-navy transition-colors duration-180',
                        'group-hover:text-brand group-focus-visible:text-brand',
                        current && 'text-brand',
                      )}
                    >
                      {child.label}
                      <span
                        aria-hidden="true"
                        className="inline-block translate-x-0 opacity-0 transition duration-180 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100"
                      >
                        →
                      </span>
                    </strong>
                    <span className="text-muted">{child.description}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
