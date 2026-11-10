import { Seo } from '@/components/sections/Seo'

export default function AdminActivities() {
  return (
    <>
      <Seo title="Actividades · Admin" path="/admin/actividades" noindex />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">
          Administración · Actividades vulnerables
        </h1>
      </div>
    </>
  )
}
