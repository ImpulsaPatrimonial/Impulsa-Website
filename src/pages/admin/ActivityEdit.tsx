import { useParams } from 'react-router-dom'

import { Seo } from '@/components/sections/Seo'

export default function AdminActivityEdit() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'nueva'
  const title = isNew ? 'Nueva actividad' : `Editar actividad ${id}`

  return (
    <>
      <Seo
        title={title}
        path={isNew ? '/admin/actividades/nueva' : `/admin/actividades/${id}`}
        noindex
      />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">{title}</h1>
      </div>
    </>
  )
}
