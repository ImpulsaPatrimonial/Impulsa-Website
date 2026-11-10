import { ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { MobileMenu } from '@/components/layout/MobileMenu'
import { ServicesMenu } from '@/components/layout/ServicesMenu'
import { Button } from '@/components/ui/button'
import { mainNav, site } from '@/content/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import logoWhite from '@/assets/brand/logo-horizontal-blanco.png'
import logoColor from '@/assets/brand/logo-horizontal-color.png'

type NavbarProps = {
  forceSolid?: boolean
}

export function Navbar({ forceSolid = false }: NavbarProps) {
  const scrolled = useScrolled(48) || forceSolid
  const { pathname } = useLocation()

  const linkClass = (active: boolean) =>
    scrolled
      ? active
        ? 'nav-link-dark-on'
        : 'nav-link-dark'
      : active
        ? 'nav-link-light-on'
        : 'nav-link-light'

  return (
    // pointer-events-none en el wrapper h-0 evita capas invisibles sobre el contenido.
    <div className="pointer-events-none sticky top-0 z-50 h-0">
      <header className="pointer-events-auto absolute inset-x-0 top-0">
        <div className={cn(scrolled ? 'nav-shell-solid' : 'nav-shell-top')}>
          <div className="wrap flex flex-wrap items-center justify-between gap-5">
            <Link
              to="/"
              aria-label={`${site.name}, ir a Inicio`}
              className="relative block leading-none"
            >
              <img
                src={logoWhite}
                alt={`${site.name} · ${site.tagline}`}
                className={cn(
                  'block h-[42px] w-auto transition-opacity duration-250',
                  scrolled ? 'opacity-0' : 'opacity-100',
                )}
                width={240}
                height={42}
              />
              <img
                src={logoColor}
                alt=""
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-0 block h-[42px] w-auto transition-opacity duration-250',
                  scrolled ? 'opacity-100' : 'opacity-0',
                )}
                width={240}
                height={42}
              />
            </Link>

            <nav
              aria-label="Principal"
              className="hidden flex-wrap items-center gap-8 min-[901px]:flex"
            >
              {mainNav.map((item) => {
                if (item.children) {
                  return (
                    <ServicesMenu
                      key={item.href}
                      scrolled={scrolled}
                      linkClassName={linkClass}
                    />
                  )
                }

                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={linkClass(active)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant={scrolled ? 'primary' : 'white'}
                size="nav"
                className="hidden min-[901px]:inline-flex"
              >
                <Link to="/contacto">
                  Contactar
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <MobileMenu scrolled={scrolled} />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
