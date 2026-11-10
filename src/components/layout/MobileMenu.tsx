import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { mainNav, site } from '@/content/site'
import { cn } from '@/lib/utils'
import logoColor from '@/assets/brand/logo-horizontal-color.png'

type MobileMenuProps = {
  scrolled: boolean
}

export function MobileMenu({ scrolled }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex size-11 items-center justify-center min-[901px]:hidden',
            scrolled ? 'nav-mobile-trigger-dark' : 'nav-mobile-trigger-light',
          )}
          aria-label="Abrir menú"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full border-l-0 bg-white p-0 sm:max-w-full [&>button]:hidden"
      >
        <SheetHeader className="flex-row items-center justify-between space-y-0 border-b border-line px-4 py-4 text-left">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <Link
            to="/"
            aria-label={`${site.name}, ir a Inicio`}
            className="block leading-none"
            onClick={() => setOpen(false)}
          >
            <img
              src={logoColor}
              alt={`${site.name} · ${site.tagline}`}
              className="block h-[38px] w-auto"
              width={220}
              height={38}
            />
          </Link>
          <SheetClose asChild>
            <button
              type="button"
              className="nav-mobile-trigger-dark inline-flex size-11 items-center justify-center"
              aria-label="Cerrar menú"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </SheetClose>
        </SheetHeader>

        <nav aria-label="Principal móvil" className="flex flex-col px-4 py-6">
          {mainNav.map((item) => {
            if (item.children) {
              const servicesActive =
                pathname === '/servicios' || pathname.startsWith('/servicios/')

              return (
                <div key={item.href} className="border-b border-line">
                  <Link
                    to="/servicios"
                    className={cn(
                      'block py-4 text-base no-underline',
                      servicesActive
                        ? 'font-semibold text-brand'
                        : 'font-medium text-navy',
                    )}
                    aria-current={servicesActive ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <div className="flex flex-col gap-3 pb-4 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          'border-l-2 py-1 pl-3 text-sm text-navy no-underline',
                          child.accent === 'brand' ? 'border-brand' : 'border-line',
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <span className="block font-semibold">{child.label}</span>
                        <span className="block text-muted">{child.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'border-b border-line py-4 text-base no-underline',
                  active ? 'font-semibold text-brand' : 'font-medium text-navy',
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto px-4 pb-8">
          <Button asChild variant="primary" className="w-full">
            <Link to="/contacto" onClick={() => setOpen(false)}>
              Contactar
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
