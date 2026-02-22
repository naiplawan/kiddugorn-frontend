/**
 * LocalStorage utilities with error handling and SSR safety
 */

const isClient = typeof window !== 'undefined'

/**
 * Safely get item from localStorage
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue

  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Safely set item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (!isClient) return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  if (!isClient) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Clear all localStorage items with a specific prefix
 */
export function clearStorageWithPrefix(prefix: string): boolean {
  if (!isClient) return false

  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}

/**
 * Storage keys used in the app
 */
export const STORAGE_KEYS = {
  ADMIN_TOKENS: 'kiddugorn_admin_tokens', // Store admin tokens for events user created
  VOTER_NAMES: 'kiddugorn_voter_names', // Store recent voter names
  THEME: 'kiddugorn_theme',
  CREATE_EVENT_DRAFT: 'kiddugorn_create_event_draft',
} as const

/**
 * Admin tokens management
 */
export interface StoredAdminToken {
  eventId: string
  adminToken: string
  eventTitle: string
  createdAt: string
}

export function getAdminTokens(): StoredAdminToken[] {
  return getStorageItem<StoredAdminToken[]>(STORAGE_KEYS.ADMIN_TOKENS, [])
}

export function addAdminToken(
  eventId: string,
  adminToken: string,
  eventTitle: string
): void {
  const tokens = getAdminTokens()
  const existingIndex = tokens.findIndex((t) => t.eventId === eventId)

  const newToken: StoredAdminToken = {
    eventId,
    adminToken,
    eventTitle,
    createdAt: new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    tokens[existingIndex] = newToken
  } else {
    tokens.unshift(newToken)
  }

  // Keep only the last 10 events
  setStorageItem(STORAGE_KEYS.ADMIN_TOKENS, tokens.slice(0, 10))
}

export function getAdminToken(eventId: string): string | null {
  const tokens = getAdminTokens()
  return tokens.find((t) => t.eventId === eventId)?.adminToken || null
}

export function removeAdminToken(eventId: string): void {
  const tokens = getAdminTokens()
  const filtered = tokens.filter((t) => t.eventId !== eventId)
  setStorageItem(STORAGE_KEYS.ADMIN_TOKENS, filtered)
}

/**
 * Voter names management
 */
export function getRecentVoterNames(): string[] {
  return getStorageItem<string[]>(STORAGE_KEYS.VOTER_NAMES, [])
}

export function addRecentVoterName(name: string): void {
  const names = getRecentVoterNames()
  const filtered = names.filter((n) => n !== name)
  filtered.unshift(name)
  setStorageItem(STORAGE_KEYS.VOTER_NAMES, filtered.slice(0, 5))
}
