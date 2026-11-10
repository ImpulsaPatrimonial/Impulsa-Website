import { cn } from '@/lib/utils'

type PostCardSkeletonProps = {
  className?: string
}

export function PostCardSkeleton({ className }: PostCardSkeletonProps) {
  return (
    <div
      className={cn('flex flex-col gap-3.5', className)}
      aria-hidden="true"
    >
      <div className="h-[230px] animate-pulse bg-tint" />
      <div className="h-3 w-40 animate-pulse bg-tint" />
      <div className="h-7 w-full animate-pulse bg-tint" />
      <div className="h-7 w-4/5 animate-pulse bg-tint" />
      <div className="h-3 w-48 animate-pulse bg-tint" />
    </div>
  )
}

export function FeaturedPostSkeleton() {
  return (
    <div
      className="grid grid-cols-1 bg-tint md:grid-cols-2"
      aria-hidden="true"
    >
      <div className="min-h-[280px] animate-pulse bg-[#E2E8F0] md:min-h-[400px]" />
      <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
        <div className="h-3 w-48 animate-pulse bg-[#E2E8F0]" />
        <div className="h-10 w-full animate-pulse bg-[#E2E8F0]" />
        <div className="h-10 w-5/6 animate-pulse bg-[#E2E8F0]" />
        <div className="h-16 w-full animate-pulse bg-[#E2E8F0]" />
        <div className="h-3 w-56 animate-pulse bg-[#E2E8F0]" />
      </div>
    </div>
  )
}
