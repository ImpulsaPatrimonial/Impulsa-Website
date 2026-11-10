import { Seo } from '@/components/sections/Seo'

export default function AdminPosts() {
  return (
    <>
      <Seo title="Blog · Admin" path="/admin/blog" noindex />
      <div className="p-8">
        <h1 className="font-serif text-3xl text-navy">Administración · Blog</h1>
      </div>
    </>
  )
}
