'use client'

import { memo, useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { VoteCell } from './vote-cell'
import { VisualSummary } from './visual-summary'
// Note: formatThaiDayShort, formatThaiTime available if needed for date formatting
import type {
  DateOption,
  Vote,
  AnswerValue,
  VoteSummary,
  ParticipantRow,
} from '@/types'

interface VotingGridProps {
  dateOptions: DateOption[]
  votes: Vote[]
  currentUserId?: string
  onVoteChange?: (
    dateOptionId: string,
    value: AnswerValue | null
  ) => void
  isEditable?: boolean
  fixedDateIds?: string[]
  participantRows?: ParticipantRow[]
  showSummary?: boolean
  className?: string
}

interface GridHeaderProps {
  dateOptions: DateOption[]
  fixedDateIdsSet: Set<string>
}

interface GridRowProps {
  participant: ParticipantRow
  dateOptions: DateOption[]
  fixedDateIdsSet: Set<string>
  isEditable: boolean
  onVoteChange?: (
    dateOptionId: string,
    value: AnswerValue | null
  ) => void
  isGhost?: boolean
}

/**
 * Grid Header Component
 */
const GridHeader = memo(function GridHeader({
  dateOptions,
  fixedDateIdsSet,
}: GridHeaderProps) {
  return (
    <thead className="voting-grid-header">
      <tr>
        {/* Name column header - sticky left */}
        <th
          className={cn(
            'sticky left-0 z-20 bg-background',
            'min-w-[100px] h-14 px-3',
            'text-left font-semibold text-foreground',
            'border-b border-border',
            // Shadow for sticky column effect
            'shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]'
          )}
        >
          ชื่อ
        </th>

        {/* Date option headers - sticky top */}
        {dateOptions.map((option, index) => {
          const isFixed = fixedDateIdsSet.has(option.id)
          const isLast = index === dateOptions.length - 1
          return (
            <th
              key={option.id}
              className={cn(
                'sticky top-0 z-10 bg-background',
                'min-w-[90px] h-14 px-2',
                'text-center font-semibold text-foreground',
                'border-b border-border',
                isFixed && 'bg-emerald-50 dark:bg-emerald-950',
                // Right shadow on last visible column
                isLast && 'shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]'
              )}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm">{option.label}</span>
                {option.voteSummary && (
                  <VisualSummary
                    summary={option.voteSummary}
                    totalParticipants={0}
                    className="mt-1 w-full max-w-[60px]"
                  />
                )}
              </div>
            </th>
          )
        })}
      </tr>
    </thead>
  )
})

/**
 * Grid Row Component
 */
const GridRow = memo(function GridRow({
  participant,
  dateOptions,
  fixedDateIdsSet,
  isEditable,
  onVoteChange,
  isGhost,
}: GridRowProps) {
  return (
    <tr className={cn(isGhost && 'ghost-row')}>
      {/* Participant name - sticky left */}
      <td
        className={cn(
          'sticky left-0 z-10 bg-background',
          'min-w-[100px] h-14 px-3',
          'text-left text-foreground',
          'border-b border-border',
          isGhost && 'italic',
          // Shadow for sticky column effect
          'shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]'
        )}
      >
        <span className="truncate block max-w-[120px]">{participant.name}</span>
      </td>

      {/* Vote cells for each date option */}
      {dateOptions.map((option, index) => {
        const isFixed = fixedDateIdsSet.has(option.id)
        const answer = participant.answers[option.id] || null
        const isLast = index === dateOptions.length - 1

        return (
          <td
            key={option.id}
            className={cn(
              'min-w-[90px] h-14 px-2',
              'text-center',
              'border-b border-border',
              isFixed && 'bg-emerald-50/50 dark:bg-emerald-950/30',
              isLast && 'shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]'
            )}
          >
            <VoteCell
              state={answer}
              onChange={(value) => onVoteChange?.(option.id, value)}
              isEditable={isEditable && !isGhost}
              isFixed={isFixed}
            />
          </td>
        )
      })}
    </tr>
  )
})

/**
 * Scroll Indicator Component
 */
function ScrollIndicators({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}: {
  canScrollLeft: boolean
  canScrollRight: boolean
  onScrollLeft: () => void
  onScrollRight: () => void
}) {
  if (!canScrollLeft && !canScrollRight) return null

  return (
    <div className="flex items-center justify-center gap-2 py-2 md:hidden">
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full',
          'transition-all duration-200',
          canScrollLeft
            ? 'bg-primary text-primary-foreground shadow-md active:scale-95'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-sm text-muted-foreground">เลื่อนดูวันที่เพิ่มเติม</span>
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-full',
          'transition-all duration-200',
          canScrollRight
            ? 'bg-primary text-primary-foreground shadow-md active:scale-95'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

/**
 * VotingGrid Component
 *
 * A responsive voting grid with sticky columns and rows.
 * - Header cells: min 90px width, 56px height, sticky top
 * - Name cells: min 100px width, 56px height, sticky left
 * - Vote cells: 48x48px (touch-friendly), centered, clickable
 *
 * Features:
 * - Horizontal scroll for many date options
 * - Sticky first column (participant names)
 * - Sticky header row (date options)
 * - Ghost mode styling for unconfirmed participants
 * - Scroll indicators for mobile
 * - Shadow effects on sticky columns
 */
function VotingGridComponent({
  dateOptions,
  votes,
  currentUserId,
  onVoteChange,
  isEditable = true,
  fixedDateIds = [],
  participantRows,
  showSummary = true,
  className,
}: VotingGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Convert fixedDateIds array to Set for O(1) lookups
  const fixedDateIdsSet = useMemo(() => new Set(fixedDateIds), [fixedDateIds])

  // Memoize date options map for O(1) lookups
  const dateOptionsMap = useMemo(() => {
    return new Map(dateOptions.map(opt => [opt.id, opt]))
  }, [dateOptions])

  // Convert votes to participant rows if not provided
  const rows = useMemo<ParticipantRow[]>(() => {
    if (participantRows) return participantRows

    return votes.map((vote) => ({
      voteId: vote.id,
      name: vote.name,
      answers: vote.answers.reduce((acc, answer) => {
        acc[answer.dateOptionId] = answer.value
        return acc
      }, {} as Record<string, AnswerValue>),
      isGhost: false,
    }))
  }, [votes, participantRows])

  // Calculate summaries for each date option
  const summaries = useMemo(() => {
    const result: Record<string, VoteSummary> = {}

    dateOptions.forEach((option) => {
      if (option.voteSummary) {
        result[option.id] = option.voteSummary
        return
      }

      // Calculate from votes
      let yes = 0,
        maybe = 0,
        no = 0

      rows.forEach((row) => {
        const answer = row.answers[option.id]
        if (answer === 'yes') yes++
        else if (answer === 'maybe') maybe++
        else if (answer === 'no') no++
      })

      result[option.id] = { yes, maybe, no }
    })

    return result
  }, [dateOptions, rows])

  const handleVoteChange = useCallback(
    (dateOptionId: string, value: AnswerValue | null) => {
      onVoteChange?.(dateOptionId, value)
    },
    [onVoteChange]
  )

  // Check scroll position
  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    const scrollEl = scrollRef.current
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      return () => {
        scrollEl.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [checkScroll, dateOptions])

  // Scroll handlers
  const handleScrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' })
    }
  }, [])

  const handleScrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' })
    }
  }, [])

  // Empty state
  if (dateOptions.length === 0) {
    return (
      <div className={cn('text-center py-8 text-muted-foreground', className)}>
        ยังไม่มีตัวเลือกวันที่
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Scroll indicators - only show on mobile when scrollable */}
      <ScrollIndicators
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
      />

      <div
        ref={scrollRef}
        className={cn(
          'voting-grid-wrapper overflow-auto',
          'max-w-full border border-border rounded-xl',
          // Hide scrollbar on mobile for cleaner look
          'scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent',
          'md:scrollbar-thumb-muted-foreground/30'
        )}
        style={{ maxHeight: 'calc(100vh - 300px)', minHeight: '200px' }}
      >
        <table className="voting-grid border-collapse">
          <GridHeader dateOptions={dateOptions} fixedDateIdsSet={fixedDateIdsSet} />

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={dateOptions.length + 1}
                  className="text-center py-8 text-muted-foreground"
                >
                  ยังไม่มีผู้เข้าร่วมโหวต
                </td>
              </tr>
            ) : (
              rows.map((participant, index) => (
                <GridRow
                  key={participant.voteId || `ghost-${index}`}
                  participant={participant}
                  dateOptions={dateOptions}
                  fixedDateIdsSet={fixedDateIdsSet}
                  isEditable={isEditable}
                  onVoteChange={handleVoteChange}
                  isGhost={participant.isGhost}
                />
              ))
            )}
          </tbody>

          {/* Summary footer row */}
          {showSummary && rows.length > 0 && (
            <tfoot className="bg-muted/50">
              <tr>
                <th
                  className={cn(
                    'sticky left-0 z-10 bg-muted/50',
                    'min-w-[100px] h-12 px-3',
                    'text-left font-medium text-muted-foreground text-sm',
                    'border-t border-border',
                    'shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]'
                  )}
                >
                  สรุป
                </th>
                {dateOptions.map((option, index) => {
                  const summary = summaries[option.id]
                  const total = summary
                    ? summary.yes + summary.maybe + summary.no
                    : 0
                  const isLast = index === dateOptions.length - 1

                  return (
                    <td
                      key={option.id}
                      className={cn(
                        'min-w-[90px] h-12 px-2',
                        'text-center text-sm',
                        'border-t border-border',
                        isLast && 'shadow-[-2px_0_4px_-2px_rgba(0,0,0,0.1)]'
                      )}
                    >
                      {total > 0 && (
                        <div className="flex justify-center gap-1 tabular-nums">
                          <span className="text-emerald-700 font-medium">{summary.yes}</span>
                          <span className="text-muted-foreground/40">/</span>
                          <span className="text-amber-700">{summary.maybe}</span>
                          <span className="text-muted-foreground/40">/</span>
                          <span className="text-rose-700">{summary.no}</span>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Mobile swipe hint */}
      {(canScrollLeft || canScrollRight) && (
        <p className="text-center text-xs text-muted-foreground/70 md:hidden">
          เลื่อนซ้าย-ขวาเพื่อดูวันที่เพิ่มเติม
        </p>
      )}
    </div>
  )
}

// Export memoized component for performance
export const VotingGrid = memo(VotingGridComponent)

// Re-export types
export type { VotingGridProps }
