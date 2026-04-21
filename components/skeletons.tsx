'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    />
  )
}

/**
 * Card skeleton for event cards
 */
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-4 space-y-3', className)}>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  )
}

/**
 * Event header skeleton
 */
export function EventHeaderSkeleton() {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

/**
 * Stats skeleton for admin dashboard
 */
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-4 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  )
}

/**
 * Date option skeleton for voting grid
 */
export function DateOptionSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex gap-3 text-sm pt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

/**
 * Voting grid skeleton
 */
export function VotingGridSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex bg-muted/30 border-b p-3 gap-2">
        <Skeleton className="h-6 w-24 shrink-0" />
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex p-3 gap-2 border-b last:border-b-0">
          <Skeleton className="h-10 w-24 shrink-0" />
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-10 w-20 rounded-md" />
          ))}
        </div>
      ))}

      {/* Footer */}
      <div className="flex bg-muted/30 p-3 gap-2">
        <Skeleton className="h-8 w-24 shrink-0" />
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20" />
        ))}
      </div>
    </div>
  )
}

/**
 * Participant row skeleton
 */
export function ParticipantRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 border-b">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

/**
 * Form skeleton
 */
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

/**
 * Full page loading skeleton
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        <EventHeaderSkeleton />
        <StatsSkeleton />
        <div className="space-y-4">
          <DateOptionSkeleton />
          <DateOptionSkeleton />
          <DateOptionSkeleton />
        </div>
      </div>
    </div>
  )
}

/**
 * Loading spinner with text
 */
export function LoadingSpinner({
  text = 'กำลังโหลด...',
  className,
}: {
  text?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-border rounded-full" />
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      {text && (
        <p className="mt-4 text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}
