import { useQuery } from '@tanstack/react-query'

import { mockActivities } from '@/data/activities/mock'
import type { ActivitySummary, VulnerableActivity } from '@/types/activity'

const STALE_MS = 5 * 60 * 1000
const LATENCY_MS = 300

async function withLatency<T>(value: T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS))
  return value
}

function toSummary(activity: VulnerableActivity): ActivitySummary {
  return {
    id: activity.id,
    slug: activity.slug,
    name: activity.name,
    summary: activity.summary,
    cardImageUrl: activity.cardImageUrl,
    sortOrder: activity.sortOrder,
    heroImageAlt: activity.heroImageAlt,
    heroImagePosition: activity.heroImagePosition,
  }
}

function publishedActivities(): VulnerableActivity[] {
  return mockActivities
    .filter((a) => a.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

async function fetchActivities(): Promise<ActivitySummary[]> {
  return withLatency(publishedActivities().map(toSummary))
}

async function fetchActivity(
  slug: string,
): Promise<VulnerableActivity | null> {
  const activity =
    publishedActivities().find((a) => a.slug === slug) ?? null
  return withLatency(activity)
}

async function fetchCarouselActivities(): Promise<ActivitySummary[]> {
  return withLatency(
    publishedActivities()
      .filter((a) => a.showInHomeCarousel)
      .map(toSummary),
  )
}

async function fetchOtherActivities(
  currentSlug: string,
  limit: number,
): Promise<ActivitySummary[]> {
  return withLatency(
    publishedActivities()
      .filter((a) => a.slug !== currentSlug)
      .slice(0, limit)
      .map(toSummary),
  )
}

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
    staleTime: STALE_MS,
  })
}

export function useActivity(slug: string | undefined) {
  return useQuery({
    queryKey: ['activity', slug],
    queryFn: () => fetchActivity(slug!),
    enabled: Boolean(slug),
    staleTime: STALE_MS,
  })
}

export function useCarouselActivities() {
  return useQuery({
    queryKey: ['activities', 'carousel'],
    queryFn: fetchCarouselActivities,
    staleTime: STALE_MS,
  })
}

export function useOtherActivities(
  currentSlug: string | undefined,
  limit = 3,
) {
  return useQuery({
    queryKey: ['activities', 'other', currentSlug, limit],
    queryFn: () => fetchOtherActivities(currentSlug!, limit),
    enabled: Boolean(currentSlug),
    staleTime: STALE_MS,
  })
}
