import useSWR from 'swr'
import { fetcher, swrConfig } from '@/lib/swr/fetcher'
import type { Vote } from '@/types'

/**
 * Hook to fetch votes for an event
 */
export function useVotes(eventId: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Vote[]>(
    eventId ? `/events/${eventId}/votes` : null,
    fetcher,
    swrConfig
  )

  return {
    votes: data || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
