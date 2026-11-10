import { Seo } from '@/components/sections/Seo'

export default function AdminLogin() {
  return (
    <>
      <Seo title="Acceso administración" path="/admin/login" noindex />
      <div className="flex min-h-screen items-center justify-center bg-tint px-4">
        <h1 className="font-serif text-3xl text-navy">Administración · Acceso</h1>
      </div>
    </>
  )
}
