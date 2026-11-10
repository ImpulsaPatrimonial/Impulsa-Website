import { blogListing } from '@/content/blog'
import { Button } from '@/components/ui/button'

type BlogEmptyStateProps = {
  onClear: () => void
}

export function BlogEmptyState({ onClear }: BlogEmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-6 border border-line bg-tint px-8 py-12">
      <p className="m-0 font-serif text-2xl leading-[1.35] text-navy">
        {blogListing.emptyTitle}
      </p>
      <Button type="button" variant="primary" onClick={onClear}>
        {blogListing.clearFilters}
      </Button>
    </div>
  )
}
