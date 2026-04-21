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
 * Stacked progress bar showing yes/maybe/no distribution for a date column.
 * Uses emerald/amber/rose as domain convention (green=yes, yellow=maybe, red=no)
 * to match user expectations in voting UIs.
 */
function VisualSummaryComponent({
  summary,
  className,
}: VisualSummaryProps) {
  const { yes, maybe, no } = summary

  const total = yes + maybe + no
  const yesPercent = total > 0 ? (yes / total) * 100 : 0
  const maybePercent = total > 0 ? (maybe / total) * 100 : 0
  const noPercent = total > 0 ? (no / total) * 100 : 0

  if (total === 0) {
    return (
      <div
        className={cn(
          'w-full h-2 rounded-full bg-muted overflow-hidden',
          className
        )}
        aria-label="No votes yet"
      >
        <div className="w-full h-full bg-muted-foreground/10" />
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className="w-full h-2 rounded-full bg-muted overflow-hidden flex"
        role="progressbar"
        aria-label={`${yes} ว่าง, ${maybe} อาจจะ, ${no} ไม่ว่าง`}
      >
        {yesPercent > 0 && (
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.min(yesPercent, 100)}%` }}
            title={`ว่าง: ${yes}`}
          />
        )}
        {maybePercent > 0 && (
          <div
            className="h-full bg-amber-400 transition-all duration-300"
            style={{ width: `${Math.min(maybePercent, 100)}%` }}
            title={`อาจจะ: ${maybe}`}
          />
        )}
        {noPercent > 0 && (
          <div
            className="h-full bg-rose-400 transition-all duration-300"
            style={{ width: `${Math.min(noPercent, 100)}%` }}
            title={`ไม่ว่าง: ${no}`}
          />
        )}
      </div>

      <div className="flex justify-between mt-1 text-xs text-muted-foreground tabular-nums">
        <span className="text-emerald-700">{yes > 0 && yes}</span>
        <span className="text-amber-700">{maybe > 0 && maybe}</span>
        <span className="text-rose-700">{no > 0 && no}</span>
      </div>
    </div>
  )
}

export const VisualSummary = memo(VisualSummaryComponent)
