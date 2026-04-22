'use client'

import { Button, Input, Card, CardContent, Badge } from '@/components/ui'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { CalendarPicker } from '@/components/ui'
import { QUICK_DATES } from '@/lib/utils/quick-dates'
import { formatThaiDateWithDay, formatThaiTime12h } from '@/lib/utils/dates'
import { cn } from '@/lib/utils'
import {
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
} from 'lucide-react'
import type { CreateEventInput } from '@/lib/validations'
import { useState } from 'react'

export function StepDates() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventInput>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates',
  })

  const watchedDates = watch('dates')
  const [activeQuickDate, setActiveQuickDate] = useState<number | null>(null)

  const addDate = () => {
    append({ date: '', time: '' })
    setActiveQuickDate(null)
  }

  const handleQuickDate = (index: number, quickDateIndex: number) => {
    const quickDate = QUICK_DATES[quickDateIndex]

    if (quickDate.getValue === null) {
      setActiveQuickDate(null)
      return
    }

    const dateValue = quickDate.getValue()
    if (dateValue) {
      setValue(`dates.${index}.date`, dateValue, { shouldValidate: true })
      setActiveQuickDate(quickDateIndex)
    }
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2 mb-6">
        <h3 className="text-lg font-semibold">เลือกวันที่และเวลาที่เป็นไปได้</h3>
        <p className="text-sm text-muted-foreground">
          เพิ่มวันที่หลายวันเพื่อให้ผู้เข้าร่วมได้โหวตเลือกเวลาที่สะดวก
        </p>
      </div>

      {fields.map((field, index) => (
        <Card
          key={field.id}
          className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
        >
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <span className="font-medium">ตัวเลือกที่ {index + 1}</span>
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Quick Date Selection */}
            {!watchedDates[index]?.date && (
              <div className="flex flex-wrap gap-2 animate-slide-up">
                {QUICK_DATES.map((quickDate, qIndex) => (
                  <Button
                    key={qIndex}
                    type="button"
                    variant={activeQuickDate === qIndex ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleQuickDate(index, qIndex)}
                    className={cn(
                      "flex-1 min-w-[80px]",
                      activeQuickDate === qIndex && "scale-105"
                    )}
                  >
                    {quickDate.label}
                  </Button>
                ))}
              </div>
            )}

            {/* Date and Time Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  วันที่ <span className="text-destructive">*</span>
                </label>
                <Controller
                  name={`dates.${index}.date`}
                  control={control}
                  render={({ field }) => (
                    <CalendarPicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="เลือกวันที่"
                      minDate={new Date()}
                    />
                  )}
                />
                {errors.dates?.[index]?.date && (
                  <p className="text-sm text-destructive">{errors.dates[index]?.date?.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  เวลา
                  <Badge variant="secondary" className="text-xs">ไม่บังคับ</Badge>
                </label>
                <Input
                  type="time"
                  {...register(`dates.${index}.time`)}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Selected Date Preview */}
            {watchedDates[index]?.date && (
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl animate-scale-in">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium text-primary">
                    {formatThaiDateWithDay(watchedDates[index].date)}
                  </span>
                  {watchedDates[index]?.time && (
                    <span className="text-muted-foreground">
                      {' '}&middot; {formatThaiTime12h(watchedDates[index].time)}
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {errors.dates?.message && (
        <p className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errors.dates.message}
        </p>
      )}

      {errors.dates?.root && (
        <p className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errors.dates.root.message}
        </p>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={addDate}
        className="w-full border-dashed border-2 h-12 hover:border-primary/50 hover:bg-primary/5"
      >
        <Plus className="h-5 w-5 mr-2" />
        เพิ่มวันที่อีก
      </Button>
    </div>
  )
}
