import { toast } from 'sonner'

import { blogArticle } from '@/content/blog'
import { absoluteUrl } from '@/lib/seo'
import { cn } from '@/lib/utils'

type ShareButtonsProps = {
  title: string
  path: string
  className?: string
}

export function ShareButtons({ title, path, className }: ShareButtonsProps) {
  const url = absoluteUrl(path) || (typeof window !== 'undefined' ? window.location.href : path)
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const whatsApp = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url)
      toast.success(blogArticle.copyToast)
    } catch {
      toast.error('No se pudo copiar el enlace')
    }
  }

  return (
    <div className={cn('flex gap-2', className)}>
      <a
        href={linkedIn}
        target="_blank"
        rel="noreferrer"
        aria-label={blogArticle.linkedInLabel}
        className="flex size-11 items-center justify-center border border-line text-xs font-semibold text-navy no-underline hover:border-brand hover:text-brand"
      >
        in
      </a>
      <a
        href={whatsApp}
        target="_blank"
        rel="noreferrer"
        aria-label={blogArticle.whatsAppLabel}
        className="flex size-11 items-center justify-center border border-line text-xs font-semibold text-navy no-underline hover:border-brand hover:text-brand"
      >
        WA
      </a>
      <button
        type="button"
        onClick={() => void copyUrl()}
        aria-label={blogArticle.copyUrlLabel}
        className="flex size-11 items-center justify-center border border-line text-xs font-semibold text-navy hover:border-brand hover:text-brand"
      >
        URL
      </button>
    </div>
  )
}
