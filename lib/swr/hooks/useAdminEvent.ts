import useSWR from 'swr'
import { fetcher, swrConfig } from '@/lib/swr/fetcher'
import type { Event } from '@/types'

/**
 * Hook to fetch an event by admin token
 */
export function useAdminEvent(adminToken: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Event>(
    adminToken ? `/events/admin/${adminToken}` : null,
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
