import type { StoredVoteToken } from '@/types'

const VOTE_TOKENS_KEY = 'kiddugorn_vote_tokens'

export function getStoredVoteTokens(): StoredVoteToken[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(VOTE_TOKENS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function storeVoteToken(token: StoredVoteToken) {
  const tokens = getStoredVoteTokens().filter(t => t.eventId !== token.eventId)
  tokens.push(token)
  localStorage.setItem(VOTE_TOKENS_KEY, JSON.stringify(tokens))
}

export function getStoredVoteToken(eventId: string): StoredVoteToken | undefined {
  return getStoredVoteTokens().find(t => t.eventId === eventId)
}
