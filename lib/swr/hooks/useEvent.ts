import useSWR from 'swr'
import { fetcher, swrConfig } from '@/lib/swr/fetcher'
import type { Event } from '@/types'

/**
 * Hook to fetch a public event by ID
 */
export function useEvent(eventId: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Event>(
    eventId ? `/events/${eventId}` : null,
    fetcher,
    swrConfig
  )

  return {
    event: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}
