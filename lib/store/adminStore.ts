import { create } from 'zustand'
import type { Event } from '@/types'

interface AdminState {
  event: Event | null
  isLoading: boolean
  error: string | null
  setEvent: (event: Event | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useAdminStore = create<AdminState>((set) => ({
  event: null,
  isLoading: false,
  error: null,

  setEvent: (event) => set({ event, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, event: null }),
  reset: () => set({ event: null, isLoading: false, error: null }),
}))
