import { blogListing } from '@/content/blog'
import type { BlogCategory } from '@/types/blog'
import { cn } from '@/lib/utils'

type CategoryFiltersProps = {
  categories: BlogCategory[]
  activeSlug?: string | null
  onSelect: (slug: string | null) => void
  className?: string
}

export function CategoryFilters({
  categories,
  activeSlug,
  onSelect,
  className,
}: CategoryFiltersProps) {
  const pills: Array<{ slug: string | null; label: string }> = [
    { slug: null, label: blogListing.allCategories },
    ...categories.map((c) => ({ slug: c.slug, label: c.name })),
  ]

  return (
    <div
      role="group"
      aria-label={blogListing.filtersAria}
      className={cn(
        '-mx-4 flex gap-2.5 overflow-x-auto border-t border-line px-4 pt-7 scrollbar-none md:mx-0 md:flex-wrap md:overflow-visible md:px-0',
        className,
      )}
    >
      {pills.map((pill) => {
        const pressed = (activeSlug ?? null) === pill.slug
        return (
          <button
            key={pill.slug ?? 'all'}
            type="button"
            aria-pressed={pressed}
            onClick={() => onSelect(pill.slug)}
            className={cn(
              'min-h-11 shrink-0 border px-[18px] text-sm font-medium transition-colors',
              pressed
                ? 'border-navy bg-navy text-white'
                : 'border-[#C9D6E4] bg-white text-navy hover:border-brand',
            )}
          >
            {pill.label}
          </button>
        )
      })}
    </div>
  )
}
