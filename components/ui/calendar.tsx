'use client'

import { useState, useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

const THAI_DAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
const THAI_DAYS_FULL = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
]

interface CalendarProps {
  selected?: Date
  onSelect: (date: Date) => void
  disabled?: (date: Date) => boolean
  minDate?: Date
  className?: string
}

export function Calendar({
  selected,
  onSelect,
  disabled,
  minDate,
  className,
}: CalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  // Get days in month
  const daysInMonth = useMemo(() => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d))
    }

    return days
  }, [viewMonth])

  const goToPrevMonth = useCallback(() => {
    setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const goToNextMonth = useCallback(() => {
    setViewMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const handleDateClick = useCallback((date: Date) => {
    if (disabled?.(date)) return
    if (minDate && date < minDate) return
    onSelect(date)
  }, [disabled, minDate, onSelect])

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate()
  }

  const isToday = (date: Date) => {
    return isSameDay(date, new Date())
  }

  const isSelected = (date: Date) => {
    return selected ? isSameDay(date, selected) : false
  }

  const isDisabled = (date: Date) => {
    if (disabled?.(date)) return true
    if (minDate && date < minDate) return true
    return false
  }

  // Get Buddhist Era year
  const buddhistYear = viewMonth.getFullYear() + 543

  return (
    <div className={cn('p-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={goToPrevMonth}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <span className="font-semibold text-sm">
            {THAI_MONTHS[viewMonth.getMonth()]} {buddhistYear}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={goToNextMonth}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {THAI_DAYS.map((day, i) => (
          <div
            key={day}
            className={cn(
              'text-center text-xs font-medium py-1',
              i === 0 || i === 6 ? 'text-red-500' : 'text-muted-foreground'
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, index) => (
          <div key={index} className="aspect-square">
            {date ? (
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                disabled={isDisabled(date)}
                className={cn(
                  'w-full h-full flex items-center justify-center rounded-md text-sm transition-all',
                  'hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                  isSelected(date) && 'bg-primary text-primary-foreground hover:bg-primary/90',
                  isToday(date) && !isSelected(date) && 'ring-1 ring-primary text-primary font-medium',
                  (date.getDay() === 0 || date.getDay() === 6) && !isSelected(date) && 'text-red-500'
                )}
              >
                {date.getDate()}
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Calendar Popover Component
interface CalendarPickerProps {
  value?: string // YYYY-MM-DD format
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  className?: string
}

export function CalendarPicker({
  value,
  onChange,
  placeholder = 'เลือกวันที่',
  disabled = false,
  minDate,
  className,
}: CalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedDate = useMemo(() => {
    if (!value) return undefined
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }, [value])

  const handleSelect = useCallback((date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    onChange(`${year}-${month}-${day}`)
    setIsOpen(false)
  }, [onChange])

  const formatDisplayDate = useCallback((date: Date) => {
    const dayName = THAI_DAYS_FULL[date.getDay()]
    const day = date.getDate()
    const month = THAI_MONTHS[date.getMonth()]
    const year = date.getFullYear() + 543
    return `${dayName} ${day} ${month} ${year}`
  }, [])

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border bg-background',
          'text-left text-sm transition-all',
          'hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
          disabled && 'opacity-50 cursor-not-allowed',
          isOpen && 'ring-2 ring-primary/20 border-primary'
        )}
      >
        <span className={cn(value ? 'text-foreground' : 'text-muted-foreground')}>
          {value ? formatDisplayDate(selectedDate!) : placeholder}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar dropdown */}
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border rounded-lg shadow-lg">
            <Calendar
              selected={selectedDate}
              onSelect={handleSelect}
              minDate={minDate}
              disabled={disabled ? () => true : undefined}
            />
          </div>
        </>
      )}
    </div>
  )
}
