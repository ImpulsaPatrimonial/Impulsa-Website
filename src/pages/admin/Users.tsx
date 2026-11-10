import { Seo } from '@/components/sections/Seo'

export default function AdminUsers() {
  return (
    <>
      <Seo title="Usuarios · Admin" path="/admin/usuarios" noindex />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">
          Administración · Usuarios
        </h1>
      </div>
    </>
  )
}
