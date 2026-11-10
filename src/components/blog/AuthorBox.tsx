import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'

type AuthorBoxProps = {
  name: string
  role: string
  bio: string
}

export function AuthorBox({ name, role, bio }: AuthorBoxProps) {
  return (
    <div className="flex gap-5 border border-line p-7">
      {/* DECISIÓN: avatar circular explícito (rounded-full) como en 07-blog-articulo.html. */}
      <ImagePlaceholder className="size-[72px] shrink-0 rounded-full" />
      <div className="flex flex-col gap-1.5">
        <strong className="font-serif text-xl font-medium text-navy">
          {name}
        </strong>
        <span className="text-sm text-muted">{role}</span>
        <span className="text-[15px] text-ink">{bio}</span>
      </div>
    </div>
  )
}
