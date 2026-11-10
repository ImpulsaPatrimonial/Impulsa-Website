import { Seo } from '@/components/sections/Seo'

export default function AdminDashboard() {
  return (
    <>
      <Seo title="Panel" path="/admin" noindex />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">Panel · Resumen</h1>
      </div>
    </>
  )
}
