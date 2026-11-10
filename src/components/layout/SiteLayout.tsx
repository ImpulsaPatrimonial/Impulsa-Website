import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { Toaster } from '@/components/ui/sonner'

export function SiteLayout() {
  // DECISIÓN: CookieBanner se implementa en la Fase 8.
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
