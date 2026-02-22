'use client'

import { cn } from '@/lib/utils'

interface BillingToggleProps {
  value: 'MONTHLY' | 'YEARLY'
  onChange: (value: 'MONTHLY' | 'YEARLY') => void
}

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <button
        onClick={() => onChange('MONTHLY')}
        className={cn(
          'text-sm font-medium transition-colors',
          value === 'MONTHLY' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        รายเดือน
      </button>

      <button
        onClick={() => onChange(value === 'MONTHLY' ? 'YEARLY' : 'MONTHLY')}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          value === 'YEARLY' ? 'bg-primary' : 'bg-muted'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            value === 'YEARLY' ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>

      <button
        onClick={() => onChange('YEARLY')}
        className={cn(
          'flex items-center gap-2 text-sm font-medium transition-colors',
          value === 'YEARLY' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
        )}
      >
        รายปี
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
          ประหยัด 17%
        </span>
      </button>
    </div>
  )
}
