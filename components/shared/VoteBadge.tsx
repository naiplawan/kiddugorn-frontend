import { cn } from '@/lib/utils/cn'
import type { VoteResponse } from '@/types'

interface VoteBadgeProps {
  response: VoteResponse
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const config = {
  yes: {
    label: 'ว่าง',
    bgClass: 'bg-success/10 text-success hover:bg-success/20',
  },
  no: {
    label: 'ไม่ว่าง',
    bgClass: 'bg-danger/10 text-danger hover:bg-danger/20',
  },
  maybe: {
    label: 'อาจจะ',
    bgClass: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  },
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
}

export function VoteBadge({ response, size = 'md', className }: VoteBadgeProps) {
  const { label, bgClass } = config[response]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        bgClass,
        sizes[size],
        className
      )}
    >
      {label}
    </span>
  )
}
