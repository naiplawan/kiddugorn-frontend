'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, CardContent } from '@/components/ui'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema } from '@/lib/validations'
import type { CreateEventInput } from '@/lib/validations'
import { eventApi, getThaiErrorMessage } from '@/lib/api/client'
import { StepDetails } from '@/components/create/step-details'
import { StepDates } from '@/components/create/step-dates'
import { StepReview } from '@/components/create/step-review'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  FileText,
  Calendar,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'

const STEPS = [
  { id: 1, title: 'รายละเอียด', icon: FileText, description: 'ข้อมูลกิจกรรม' },
  { id: 2, title: 'วันที่', icon: Calendar, description: 'เลือกวันเวลา' },
  { id: 3, title: 'สรุป', icon: CheckCircle2, description: 'ตรวจสอบข้อมูล' },
] as const

const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm<CreateEventInput>({
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

  const { handleSubmit, trigger, formState: { isSubmitting } } = methods

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepDetails />
      case 2:
        return <StepDates />
      case 3:
        return <StepReview />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background pb-28 md:pb-8">
      <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight mb-2">
            สร้างกิจกรรมใหม่
          </h1>
          <p className="text-muted-foreground text-base">
            เชิญเพื่อนมาโหวตเลือกเวลาที่สะดวก
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted overflow-hidden rounded-full">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  transitionTimingFunction: EASING,
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
                      transition-colors duration-300
                      ${isCompleted || isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                    style={{ transitionTimingFunction: EASING }}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    )}
                  </div>
                  <div className="mt-2 text-center hidden sm:block">
                    <p className={`text-sm font-medium transition-colors ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="sm:hidden text-center mt-4">
            <p className="text-sm font-medium text-primary">
              ขั้นตอนที่ {currentStep}: {STEPS[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="contents">
            <Card className="overflow-hidden">
              <CardContent className="p-4 md:p-6">
                {renderStepContent()}
              </CardContent>
            </Card>

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
                      isLoading={isSubmitting}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 shadow-md"
                    >
                      สร้างกิจกรรม
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  )
}
