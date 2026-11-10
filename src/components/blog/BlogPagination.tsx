import { Link } from 'react-router-dom'

import { blogListing } from '@/content/blog'
import { cn } from '@/lib/utils'

type BlogPaginationProps = {
  page: number
  totalPages: number
  buildHref: (page: number) => string
}

export function BlogPagination({
  page,
  totalPages,
  buildHref,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      aria-label={blogListing.paginationAria}
      className="flex flex-wrap justify-center gap-2"
    >
      {pages.map((n) => {
        const current = n === page
        return (
          <Link
            key={n}
            to={buildHref(n)}
            aria-current={current ? 'page' : undefined}
            className={cn(
              'flex min-h-[46px] min-w-[46px] items-center justify-center text-sm font-semibold no-underline',
              current
                ? 'bg-navy text-white'
                : 'border border-line text-navy hover:border-brand hover:text-brand',
            )}
          >
            {n}
          </Link>
        )
      })}
      {page < totalPages ? (
        <Link
          to={buildHref(page + 1)}
          className="flex min-h-[46px] items-center border border-line px-[18px] text-sm font-semibold text-navy no-underline hover:border-brand hover:text-brand"
        >
          {blogListing.nextPage}
        </Link>
      ) : null}
    </nav>
  )
}
