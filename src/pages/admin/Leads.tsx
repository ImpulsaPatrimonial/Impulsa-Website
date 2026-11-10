import { Seo } from '@/components/sections/Seo'

export default function AdminLeads() {
  return (
    <>
      <Seo title="Prospectos · Admin" path="/admin/prospectos" noindex />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">
          Administración · Prospectos
        </h1>
      </div>
    </>
  )
}
