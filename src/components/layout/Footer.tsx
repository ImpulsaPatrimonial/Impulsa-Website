import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  footerServiceLinks,
  footerSiteLinks,
  legalLinks,
  site,
} from '@/content/site'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import logoWhite from '@/assets/brand/logo-horizontal-blanco.png'

// DECISIÓN: lucide-react 1.x ya no incluye íconos de marcas; usamos SVG inline del HTML de referencia.
function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9 9.5c.3 1.8 1.7 3.4 3.5 4l1.2-1.2 2 1-.4 1.6c-3.6.3-7.2-3.1-7.1-6.6L9.8 8l1 2z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-sm text-footer-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,50,91,0.93),rgba(12,28,52,0.97)),repeating-linear-gradient(115deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_24px),linear-gradient(125deg,#3A6496,#0E2342)]"
      />

      <div className="wrap relative z-[1] pb-10 pt-[104px]">
        <div className="flex flex-wrap justify-between gap-16">
          <div className="flex max-w-[440px] flex-[1_1_340px] flex-col items-start gap-[30px]">
            <img
              src={logoWhite}
              alt={`${site.name} · ${site.tagline}`}
              className="block h-[60px] w-auto"
              width={320}
              height={60}
            />
            <p className="m-0 font-serif text-[30px] leading-[1.3] text-white">
              {site.footerPhrase}
            </p>
            <Button asChild variant="ghostDark">
              <Link to="/contacto">
                Agendar asesoría
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid max-w-[600px] flex-[1_1_520px] grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-2">
            <div className="flex flex-col gap-11">
              <div className="flex flex-col gap-3">
                <span className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Sitio
                </span>
                {footerSiteLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <span className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Servicios
                </span>
                {footerServiceLinks.map((link) => (
                  <Link key={link.href} to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-11">
              <div className="flex flex-col gap-3">
                <span className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Oficinas
                </span>
                {site.offices.map((office) => (
                  <span key={office.city}>{office.city}</span>
                ))}
                <span className="footer-divider mt-1.5 pt-3 text-white">
                  {site.onlineCoverage}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <span className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Contacto
                </span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                >
                  {site.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="footer-link"
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {site.email}
                </a>
                <div className="mt-2 flex gap-2.5">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Instagram de ${site.name}`}
                    className="footer-social flex size-11 items-center justify-center"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`LinkedIn de ${site.name}`}
                    className="footer-social flex size-11 items-center justify-center"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp de ${site.name}`}
                    className="footer-social flex size-11 items-center justify-center"
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-20 flex flex-wrap items-center justify-between gap-4 pt-6 text-[13px]">
          <span>
            © {year} {site.name} · Diseñado por{' '}
            <a
              href={site.designer.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white no-underline"
            >
              {site.designer.name}
            </a>
          </span>
          <span className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} to={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
