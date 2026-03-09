'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils/cn'
import type { VoteSummary } from '@/types'

interface VisualSummaryProps {
  summary: VoteSummary
  totalParticipants: number
  className?: string
}

/**
 * VisualSummary Component
 *
 * A progress bar showing yes/maybe/no vote counts for a date column.
 * Uses stacked bar design with colors matching the vote states.
 */
function VisualSummaryComponent({
  summary,
  totalParticipants,
  className,
}: VisualSummaryProps) {
  const { yes, maybe, no } = summary

  // Calculate percentages, avoid division by zero
  const total = yes + maybe + no
  const yesPercent = total > 0 ? (yes / total) * 100 : 0
  const maybePercent = total > 0 ? (maybe / total) * 100 : 0
  const noPercent = total > 0 ? (no / total) * 100 : 0

  // If no votes, show placeholder
  if (total === 0) {
    return (
      <div
        className={cn(
          'w-full h-2 rounded-full bg-gray-100 overflow-hidden',
          className
        )}
        aria-label="No votes yet"
      >
        <div className="w-full h-full bg-gray-200/50" />
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Stacked progress bar */}
      <div
        className="w-full h-2 rounded-full bg-gray-100 overflow-hidden flex"
        role="progressbar"
        aria-label={`${yes} yes, ${maybe} maybe, ${no} no votes`}
      >
        {/* Yes section - emerald */}
        {yesPercent > 0 && (
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.min(yesPercent, 100)}%` }}
            title={`ว่าง: ${yes}`}
          />
        )}

        {/* Maybe section - amber */}
        {maybePercent > 0 && (
          <div
            className="h-full bg-amber-400 transition-all duration-300"
            style={{ width: `${Math.min(maybePercent, 100)}%` }}
            title={`อาจจะ: ${maybe}`}
          />
        )}

        {/* No section - rose */}
        {noPercent > 0 && (
          <div
            className="h-full bg-rose-400 transition-all duration-300"
            style={{ width: `${Math.min(noPercent, 100)}%` }}
            title={`ไม่ว่าง: ${no}`}
          />
        )}
      </div>

      {/* Vote count labels (optional, show on hover or when space permits) */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span className="text-emerald-600">{yes > 0 && yes}</span>
        <span className="text-amber-600">{maybe > 0 && maybe}</span>
        <span className="text-rose-600">{no > 0 && no}</span>
      </div>
    </div>
  )
}

export const VisualSummary = memo(VisualSummaryComponent)
