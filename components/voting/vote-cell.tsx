'use client'

import { memo, useCallback } from 'react'
import { cn } from '@/lib/utils/cn'
import { Check, X, HelpCircle } from 'lucide-react'
import type { AnswerValue } from '@/types'

export type VoteCellState = AnswerValue | null

interface VoteCellProps {
  state: VoteCellState
  onChange?: (state: VoteCellState) => void
  isEditable?: boolean
  isFixed?: boolean
  className?: string
}

/**
 * Get the next state in the cycle: empty -> yes -> maybe -> no -> empty
 */
function getNextState(current: VoteCellState): VoteCellState {
  switch (current) {
    case null:
      return 'yes'
    case 'yes':
      return 'maybe'
    case 'maybe':
      return 'no'
    case 'no':
      return null
    default:
      return 'yes'
  }
}

/**
 * Get styles and icon for a vote state
 */
function getStateConfig(state: VoteCellState) {
  switch (state) {
    case 'yes':
      return {
        bgClass: 'bg-emerald-100',
        borderClass: 'border-2 border-emerald-500',
        icon: Check,
        iconClass: 'text-emerald-600',
        ariaLabel: 'Yes - Available',
      }
    case 'maybe':
      return {
        bgClass: 'bg-amber-100',
        borderClass: 'border-2 border-amber-400',
        icon: HelpCircle,
        iconClass: 'text-amber-600',
        ariaLabel: 'Maybe - Possibly available',
      }
    case 'no':
      return {
        bgClass: 'bg-rose-100',
        borderClass: 'border-2 border-rose-500',
        icon: X,
        iconClass: 'text-rose-600',
        ariaLabel: 'No - Not available',
      }
    default:
      return {
        bgClass: 'bg-gray-100',
        borderClass: 'border-2 border-transparent',
        icon: null,
        iconClass: 'text-gray-400',
        ariaLabel: 'Empty - No vote yet',
      }
  }
}

/**
 * VoteCell Component
 *
 * A memoized, touch-friendly cell for voting in the grid.
 * - 44x44px minimum for touch accessibility
 * - Three-state toggle: empty -> yes -> maybe -> no -> empty
 * - Visual states per Design.md Section 9
 */
function VoteCellComponent({
  state,
  onChange,
  isEditable = true,
  isFixed = false,
  className,
}: VoteCellProps) {
  const config = getStateConfig(state)
  const IconComponent = config.icon

  const handleClick = useCallback(() => {
    if (!isEditable || isFixed) return
    const nextState = getNextState(state)
    onChange?.(nextState)
  }, [isEditable, isFixed, state, onChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isFixed}
      aria-label={config.ariaLabel}
      className={cn(
        // Base styles - 44x44px minimum for touch
        'flex items-center justify-center',
        'w-11 h-11 min-w-[44px] min-h-[44px]',
        'rounded-lg transition-all duration-150',
        // Focus styles for accessibility
        'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1',
        // Interaction states
        isEditable && !isFixed && 'cursor-pointer hover:scale-105 active:scale-95',
        isFixed && 'cursor-not-allowed opacity-60',
        !isEditable && 'cursor-default',
        // State-based styles
        config.bgClass,
        config.borderClass,
        className
      )}
    >
      {IconComponent && (
        <IconComponent
          className={cn('w-5 h-5', config.iconClass)}
          strokeWidth={state === 'yes' ? 2.5 : 2}
        />
      )}
    </button>
  )
}

// Memoize for performance - only re-render if props change
export const VoteCell = memo(VoteCellComponent)

// Also export comparison function for external use if needed
export function areVoteCellPropsEqual(
  prevProps: VoteCellProps,
  nextProps: VoteCellProps
): boolean {
  return (
    prevProps.state === nextProps.state &&
    prevProps.isEditable === nextProps.isEditable &&
    prevProps.isFixed === nextProps.isFixed &&
    prevProps.className === nextProps.className &&
    prevProps.onChange === nextProps.onChange
  )
}
