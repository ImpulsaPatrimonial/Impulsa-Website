import { useParams } from 'react-router-dom'

import { Seo } from '@/components/sections/Seo'

export default function AdminPostEdit() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'nuevo'
  const title = isNew ? 'Nuevo artículo' : `Editar artículo ${id}`

  return (
    <>
      <Seo
        title={title}
        path={isNew ? '/admin/blog/nuevo' : `/admin/blog/${id}`}
        noindex
      />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">{title}</h1>
      </div>
    </>
  )
}
