import { useEffect, useState } from 'react'

import { blogListing } from '@/content/blog'
import { cn } from '@/lib/utils'

type BlogSearchProps = {
  value: string
  onSearch: (query: string) => void
  className?: string
}

export function BlogSearch({ value, onSearch, className }: BlogSearchProps) {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    setDraft(value)
  }, [value])

  return (
    <form
      className={cn('flex min-w-[260px] flex-[0_1_420px]', className)}
      onSubmit={(event) => {
        event.preventDefault()
        onSearch(draft.trim())
      }}
    >
      <label htmlFor="blog-q" className="sr-only">
        {blogListing.searchLabel}
      </label>
      <input
        id="blog-q"
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={blogListing.searchPlaceholder}
        className="min-h-[52px] min-w-0 flex-1 border border-[#C9D6E4] border-r-0 bg-white px-[18px] text-[15px] text-navy outline-none placeholder:text-muted focus-visible:z-[1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
      />
      <button
        type="submit"
        className="min-h-[52px] border border-navy bg-navy px-6 text-sm font-semibold text-white transition-colors hover:border-brand hover:bg-brand"
      >
        {blogListing.searchButton}
      </button>
    </form>
  )
}
