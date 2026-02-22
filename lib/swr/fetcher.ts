import { ApiError, apiClient } from '@/lib/api/client'

/**
 * Generic fetcher for SWR
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  return apiClient.get<T>(url)
}

/**
 * Fetcher that handles API errors and returns null for 404s
 */
export const safeFetcher = async <T>(url: string): Promise<T | null> => {
  try {
    return await apiClient.get<T>(url)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }
    throw error
  }
}

/**
 * SWR configuration defaults
 */
export const swrConfig = {
  // Revalidate on focus
  revalidateOnFocus: false,
  // Revalidate on reconnect
  revalidateOnReconnect: true,
  // Dedupe requests within this time window (in milliseconds)
  dedupingInterval: 2000,
  // Error retry count
  errorRetryCount: 3,
  // Error retry interval
  errorRetryInterval: 5000,
  // Don't revalidate when mounting if data is fresh
  revalidateIfStale: true,
  // Refresh interval (0 = disabled)
  refreshInterval: 0,
}
