import { useLocation } from 'react-router-dom'

import { PageHero } from '@/components/sections/PageHero'
import { Seo } from '@/components/sections/Seo'
import { heroes, legalPageTitles } from '@/content/heroes'
import heroImage from '@/assets/images/hero-legales.jpg'

export default function Legal() {
  const { pathname } = useLocation()
  const title = legalPageTitles[pathname] ?? 'Información legal'

  return (
    <>
      <Seo title={title} path={pathname} />
      <PageHero
        badge={heroes.legal.badge}
        title={title}
        image={heroImage}
        imagePosition={heroes.legal.imagePosition}
        overlay={heroes.legal.overlay}
      />
    </>
  )
}
