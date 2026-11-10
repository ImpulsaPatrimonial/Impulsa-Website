import { Link } from 'react-router-dom'

import { Label } from '@/components/sections/Label'
import { Button } from '@/components/ui/button'
import { blogArticle } from '@/content/blog'

type ServiceCtaBlockProps = {
  label: string
  href: string
}

export function ServiceCtaBlock({ label, href }: ServiceCtaBlockProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 border border-line border-l-2 border-l-brand px-8 py-7">
      <div className="flex max-w-[420px] flex-col gap-1.5">
        <Label>{label}</Label>
        <span className="font-serif text-[21px] leading-[1.35] text-navy">
          {blogArticle.serviceCtaTitle}
        </span>
      </div>
      <Button asChild variant="primary">
        <Link to={href}>{blogArticle.serviceCtaButton}</Link>
      </Button>
    </div>
  )
}
