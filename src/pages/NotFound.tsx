import { Link } from 'react-router-dom'

import { PageHero } from '@/components/sections/PageHero'
import { Seo } from '@/components/sections/Seo'
import { Button } from '@/components/ui/button'
import { heroes } from '@/content/heroes'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" noindex />
      <PageHero
        badge={heroes.notFound.badge}
        title={heroes.notFound.title}
        overlay={heroes.notFound.overlay}
      />
      <section className="wrap py-20">
        <p className="mb-8 max-w-xl text-base leading-[1.8] text-ink">
          La dirección que ingresó no existe o ya no está disponible. Puede
          volver al inicio o escribirnos si necesita ayuda.
        </p>
        <Button asChild variant="primary">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </section>
    </>
  )
}
