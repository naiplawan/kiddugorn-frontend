'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Card, CardContent, Badge } from '@/components/ui'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema } from '@/lib/validations'
import type { CreateEventInput } from '@/lib/validations'
import { eventApi, getThaiErrorMessage } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import {
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  CalendarDays,
} from 'lucide-react'
import { toast } from 'sonner'

// Step configuration
const STEPS = [
  { id: 1, title: 'รายละเอียด', icon: FileText, description: 'ข้อมูลกิจกรรม' },
  { id: 2, title: 'วันที่', icon: Calendar, description: 'เลือกวันเวลา' },
  { id: 3, title: 'สรุป', icon: CheckCircle2, description: 'ตรวจสอบข้อมูล' },
] as const

// Smooth easing constants for consistent animations
const EASINGS = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

// Helper to get local date string in YYYY-MM-DD format (avoids timezone issues)
function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Quick date options (Thai format) - uses local date to avoid timezone issues
const QUICK_DATES = [
  { label: 'วันนี้', getValue: () => getLocalDateString(new Date()) },
  { label: 'พรุ่งนี้', getValue: () => getLocalDateString(new Date(Date.now() + 86400000)) },
  { label: 'อาทิตย์หน้า', getValue: () => getLocalDateString(getNextSunday()) },
  { label: 'เลือกเอง', getValue: null },
]

function getNextSunday(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + daysUntilSunday)
  return nextSunday
}

// Format date to Thai
function formatThaiDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const thaiDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ]

  const dayName = thaiDays[date.getDay()]
  const day = date.getDate()
  const month = thaiMonths[date.getMonth()]
  const year = date.getFullYear() + 543 // Buddhist Era

  return `${dayName} ${day} ${month} ${year}`
}

// Format time to 12-hour Thai format
function formatThaiTime(timeStr: string): string {
  if (!timeStr) return ''
  const [hours, minutes] = timeStr.split(':').map(Number)
  const period = hours >= 12 ? 'น.' : 'น.'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [activeQuickDate, setActiveQuickDate] = useState<number | null>(null)
  const [showCustomDatePicker, setShowCustomDatePicker] = useState<number | null>(null)

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      creatorName: '',
      creatorEmail: '',
      dates: [{ date: '', time: '' }],
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates',
  })

  const watchedDates = watch('dates')
  const watchedForm = watch()

  // Validate current step before proceeding
  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof CreateEventInput)[] = []

    switch (step) {
      case 1:
        fieldsToValidate = ['title', 'description', 'location']
        break
      case 2:
        fieldsToValidate = ['dates']
        break
    }

    if (fieldsToValidate.length > 0) {
      return await trigger(fieldsToValidate)
    }
    return true
  }

  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: CreateEventInput) => {
    try {
      const response = await eventApi.create(data)

      toast.success('สร้างกิจกรรมสำเร็จ!')

      // Redirect to the created page with the event data
      // Store the response in sessionStorage for the created page to access
      sessionStorage.setItem(
        `event_${response.event.id}`,
        JSON.stringify({
          voteUrl: response.voteUrl,
          adminUrl: response.adminUrl,
          organizerKey: response.organizerKey,
          event: response.event,
        })
      )

      router.push(`/created/${response.event.id}`)
    } catch (error) {
      console.error('Failed to create event:', error)
      const errorMessage = getThaiErrorMessage(error)
      toast.error(errorMessage)
    }
  }

  const addDate = () => {
    append({ date: '', time: '' })
    setActiveQuickDate(null)
  }

  const handleQuickDate = (index: number, quickDateIndex: number) => {
    const quickDate = QUICK_DATES[quickDateIndex]

    if (quickDate.getValue === null) {
      // "Custom" selected - show date picker
      setShowCustomDatePicker(index)
      setActiveQuickDate(null)
      return
    }

    const dateValue = quickDate.getValue()
    if (dateValue) {
      // Use setValue from react-hook-form
      setValue(`dates.${index}.date`, dateValue, { shouldValidate: true })
      setActiveQuickDate(quickDateIndex)
      setShowCustomDatePicker(null)
    }
  }

  // Check if a date field has a value
  const hasDateValue = (index: number): boolean => {
    return Boolean(watchedDates[index]?.date)
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            {/* Event Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                ชื่อกิจกรรม <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="เช่น ประชุมทีม, ไปเที่ยวเขา, งานเลี้ยงวันเกิด"
                error={errors.title?.message}
                {...register('title')}
                className="text-base md:text-lg"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="h-4 w-4 text-muted-foreground" />
                รายละเอียดเพิ่มเติม
                <Badge variant="secondary" className="text-xs">ไม่บังคับ</Badge>
              </label>
              <textarea
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base shadow-sm transition-all duration-200 ease-out focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 focus:outline-none focus:scale-[1.005] placeholder:text-muted-foreground min-h-[120px] resize-none"
                placeholder="อธิบายรายละเอียดเกี่ยวกับกิจกรรม เช่น วัตถุประสงค์ กำหนดการ หรือสิ่งที่ต้องเตรียม..."
                {...register('description')}
              />
              {errors.description && (
                <p className="flex items-center gap-1.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                สถานที่
                <Badge variant="secondary" className="text-xs">ไม่บังคับ</Badge>
              </label>
              <Input
                placeholder="เช่น ห้องประชุม A, ร้านอาหาร ABC, ออนไลน์ (Zoom)"
                error={errors.location?.message}
                {...register('location')}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-lg font-semibold">เลือกวันที่และเวลาที่เป็นไปได้</h3>
              <p className="text-sm text-muted-foreground">
                เพิ่มวันที่หลายวันเพื่อให้ผู้เข้าร่วมได้โหวตเลือกเวลาที่สะดวก
              </p>
            </div>

            {/* Date Options */}
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

                  {/* Quick Date Selection - Only show if no date selected */}
                  {!hasDateValue(index) && (
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
                      <Input
                        type="date"
                        error={errors.dates?.[index]?.date?.message}
                        {...register(`dates.${index}.date`)}
                        className="cursor-pointer"
                        onClick={() => setShowCustomDatePicker(index)}
                      />
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
                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg animate-scale-in">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 animate-bounce-subtle" />
                      <div className="text-sm">
                        <span className="font-medium text-primary">
                          {formatThaiDate(watchedDates[index].date)}
                        </span>
                        {watchedDates[index]?.time && (
                          <span className="text-muted-foreground">
                            {' '}&middot; {formatThaiTime(watchedDates[index].time)}
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

            {/* Add Date Button */}
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

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center space-y-2 mb-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">ตรวจสอบข้อมูลก่อนสร้าง</h3>
              <p className="text-sm text-muted-foreground">
                กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนกดสร้างกิจกรรม
              </p>
            </div>

            {/* Event Details Summary */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/5 px-4 py-3 border-b">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    รายละเอียดกิจกรรม
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-muted-foreground min-w-[80px]">ชื่อ:</span>
                    <span className="font-medium">{watchedForm.title || '-'}</span>
                  </div>
                  {watchedForm.description && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm text-muted-foreground min-w-[80px]">รายละเอียด:</span>
                      <span className="text-sm">{watchedForm.description}</span>
                    </div>
                  )}
                  {watchedForm.location && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm text-muted-foreground min-w-[80px]">สถานที่:</span>
                      <span className="text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {watchedForm.location}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dates Summary */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/5 px-4 py-3 border-b">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    วันที่และเวลา ({watchedForm.dates.length} ตัวเลือก)
                  </h4>
                </div>
                <div className="divide-y">
                  {watchedForm.dates.map((dateItem, index) => (
                    <div key={index} className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {dateItem.date ? formatThaiDate(dateItem.date) : 'ยังไม่เลือกวันที่'}
                        </p>
                        {dateItem.time && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatThaiTime(dateItem.time)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Creator Info Summary */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary/5 px-4 py-3 border-b">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <User className="h-4 w-4" />
                    ข้อมูลผู้สร้าง
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-muted-foreground min-w-[80px]">ชื่อ:</span>
                    <span className="font-medium">{watchedForm.creatorName || '-'}</span>
                  </div>
                  {watchedForm.creatorEmail && (
                    <div className="flex items-start gap-3">
                      <span className="text-sm text-muted-foreground min-w-[80px]">อีเมล:</span>
                      <span className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {watchedForm.creatorEmail}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Creator Info Form (shown in step 3) */}
            <Card className="border-dashed">
              <CardContent className="p-4 space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  ข้อมูลของคุณ
                </h4>
                <div className="space-y-4">
                  <Input
                    label="ชื่อของคุณ"
                    placeholder="ชื่อที่จะแสดงในหน้ากิจกรรม"
                    error={errors.creatorName?.message}
                    {...register('creatorName')}
                  />
                  <Input
                    type="email"
                    label="อีเมล (ไม่บังคับ)"
                    placeholder="สำหรับรับลิงก์แอดมิน"
                    error={errors.creatorEmail?.message}
                    {...register('creatorEmail')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-28 md:pb-8">
      <div className="container mx-auto max-w-2xl px-4 py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            สร้างกิจกรรมใหม่
          </h1>
          <p className="text-muted-foreground">
            สร้างกิจกรรมและเชิญเพื่อนมาโหวตเลือกเวลาที่สะดวก
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted overflow-hidden rounded-full">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  transitionTimingFunction: EASINGS.smooth,
                }}
              />
            </div>

            {STEPS.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-500 ease-out
                      ${isCompleted
                        ? 'bg-primary text-primary-foreground scale-105'
                        : isActive
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110 shadow-lg shadow-primary/30'
                          : 'bg-muted text-muted-foreground'
                      }
                    `}
                    style={{
                      transitionTimingFunction: isCompleted ? EASINGS.bounce : EASINGS.smooth,
                    }}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5 animate-scale-in" />
                    ) : (
                      <Icon className={`h-5 w-5 ${isActive ? 'animate-pulse-subtle' : ''}`} />
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block transition-all duration-300">
                    <p className={`text-sm font-medium transition-colors duration-300 ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Step Title */}
          <div className="sm:hidden text-center mt-4">
            <p className="text-sm font-medium text-primary">
              ขั้นตอนที่ {currentStep}: {STEPS[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="overflow-hidden">
            <CardContent className="p-4 md:p-6">
              {renderStepContent()}
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Sticky Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t z-50 md:static md:border-t-0 md:bg-transparent md:backdrop-blur-none md:mt-6 animate-slide-up shadow-lg md:shadow-none">
        <div className="container mx-auto max-w-2xl px-4 py-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex-1 sm:flex-none"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                ย้อนกลับ
              </Button>
            )}

            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1"
              >
                ถัดไป
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg hover:shadow-primary/25"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                สร้างกิจกรรม
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
