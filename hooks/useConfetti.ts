'use client'

import { useCallback, useEffect, useRef } from 'react'
import {
  fireConfetti,
  fireSuccessConfetti,
  fireSideConfetti,
  fireGentleConfetti,
} from '@/lib/utils/confetti'

type ConfettiType = 'success' | 'side' | 'gentle' | 'custom'

interface UseConfettiOptions {
  type?: ConfettiType
  autoFire?: boolean
  delay?: number
}

/**
 * Hook to easily trigger confetti celebrations
 *
 * @example
 * const { fire } = useConfetti()
 * fire() // Fires default success confetti
 *
 * @example
 * const { fire } = useConfetti({ type: 'side' })
 * fire() // Fires side confetti
 */
export function useConfetti(options: UseConfettiOptions = {}) {
  const { type = 'success', autoFire = false, delay = 0 } = options
  const hasFired = useRef(false)

  const fire = useCallback(() => {
    switch (type) {
      case 'side':
        fireSideConfetti()
        break
      case 'gentle':
        fireGentleConfetti()
        break
      case 'custom':
        fireConfetti()
        break
      case 'success':
      default:
        fireSuccessConfetti()
        break
    }
  }, [type])

  useEffect(() => {
    if (autoFire && !hasFired.current) {
      hasFired.current = true
      const timeout = setTimeout(fire, delay)
      return () => clearTimeout(timeout)
    }
  }, [autoFire, delay, fire])

  return { fire }
}

/**
 * Fire celebration confetti once on mount
 */
export function useCelebration(delay: number = 300) {
  const { fire } = useConfetti({ type: 'success', autoFire: true, delay })
  return { fire }
}
