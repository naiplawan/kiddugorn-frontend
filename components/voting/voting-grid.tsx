'use client'

import { memo, useCallback, useMemo } from 'react'
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
  fixedDateIds: string[]
}

interface GridRowProps {
  participant: ParticipantRow
  dateOptions: DateOption[]
  fixedDateIds: string[]
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
  fixedDateIds,
}: GridHeaderProps) {
  return (
    <thead className="voting-grid-header">
      <tr>
        {/* Name column header - sticky left */}
        <th
          className={cn(
            'sticky left-0 z-20 bg-white',
            'min-w-[100px] h-12 px-3',
            'text-left font-semibold text-gray-700',
            'border-b border-gray-200'
          )}
        >
          ชื่อ
        </th>

        {/* Date option headers - sticky top */}
        {dateOptions.map((option) => {
          const isFixed = fixedDateIds.includes(option.id)
          return (
            <th
              key={option.id}
              className={cn(
                'sticky top-0 z-10 bg-white',
                'min-w-[80px] h-12 px-2',
                'text-center font-semibold text-gray-700',
                'border-b border-gray-200',
                isFixed && 'bg-emerald-50'
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
  fixedDateIds,
  isEditable,
  onVoteChange,
  isGhost,
}: GridRowProps) {
  return (
    <tr className={cn(isGhost && 'ghost-row')}>
      {/* Participant name - sticky left */}
      <td
        className={cn(
          'sticky left-0 z-10 bg-white',
          'min-w-[100px] h-12 px-3',
          'text-left text-gray-700',
          'border-b border-gray-100',
          isGhost && 'italic'
        )}
      >
        <span className="truncate block max-w-[120px]">{participant.name}</span>
      </td>

      {/* Vote cells for each date option */}
      {dateOptions.map((option) => {
        const isFixed = fixedDateIds.includes(option.id)
        const answer = participant.answers[option.id] || null

        return (
          <td
            key={option.id}
            className={cn(
              'min-w-[80px] h-12 px-1',
              'text-center',
              'border-b border-gray-100',
              isFixed && 'bg-emerald-50/50'
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
 * VotingGrid Component
 *
 * A responsive voting grid with sticky columns and rows.
 * - Header cells: min 80px width, 48px height, sticky top
 * - Name cells: min 100px width, 48px height, sticky left
 * - Vote cells: 44x44px (touch-friendly), centered, clickable
 *
 * Features:
 * - Horizontal scroll for many date options
 * - Sticky first column (participant names)
 * - Sticky header row (date options)
 * - Ghost mode styling for unconfirmed participants
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

  // Empty state
  if (dateOptions.length === 0) {
    return (
      <div className={cn('text-center py-8 text-gray-500', className)}>
        ยังไม่มีตัวเลือกวันที่
      </div>
    )
  }

  return (
    <div
      className={cn(
        'voting-grid-wrapper overflow-auto',
        'max-w-full border border-gray-200 rounded-lg',
        className
      )}
      style={{ maxHeight: 'calc(100vh - 300px)' }}
    >
      <table className="voting-grid border-collapse">
        <GridHeader dateOptions={dateOptions} fixedDateIds={fixedDateIds} />

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={dateOptions.length + 1}
                className="text-center py-8 text-gray-500"
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
                fixedDateIds={fixedDateIds}
                isEditable={isEditable}
                onVoteChange={handleVoteChange}
                isGhost={participant.isGhost}
              />
            ))
          )}
        </tbody>

        {/* Summary footer row */}
        {showSummary && rows.length > 0 && (
          <tfoot className="bg-gray-50">
            <tr>
              <th
                className={cn(
                  'sticky left-0 z-10 bg-gray-50',
                  'min-w-[100px] h-10 px-3',
                  'text-left font-medium text-gray-600 text-sm',
                  'border-t border-gray-200'
                )}
              >
                สรุป
              </th>
              {dateOptions.map((option) => {
                const summary = summaries[option.id]
                const total = summary
                  ? summary.yes + summary.maybe + summary.no
                  : 0

                return (
                  <td
                    key={option.id}
                    className={cn(
                      'min-w-[80px] h-10 px-2',
                      'text-center text-sm',
                      'border-t border-gray-200'
                    )}
                  >
                    {total > 0 && (
                      <div className="flex justify-center gap-1">
                        <span className="text-emerald-600">{summary.yes}</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-amber-600">{summary.maybe}</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-rose-600">{summary.no}</span>
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
  )
}

// Export memoized component for performance
export const VotingGrid = memo(VotingGridComponent)

// Re-export types
export type { VotingGridProps }
