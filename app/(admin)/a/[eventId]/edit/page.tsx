'use client'

import { useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { eventApi, getThaiErrorMessage } from '@/lib/api/client'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface EditEventForm {
  title: string
  description: string
  location: string
}

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const eventId = params.eventId as string
  const organizerKey = searchParams.get('k')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditEventForm>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
    },
  })

  // Fetch event data on mount
  useEffect(() => {
    async function fetchEvent() {
      if (!organizerKey) {
        toast({
          title: 'ไม่มีสิทธิ์เข้าถึง',
          description: 'กรุณาใช้ลิงก์แอดมินที่ถูกต้อง',
          variant: 'destructive',
        })
        return
      }

      try {
        const event = await eventApi.getById(eventId, organizerKey)
        reset({
          title: event.title || '',
          description: event.description || '',
          location: event.location || '',
        })
      } catch (error) {
        toast({
          title: 'โหลดข้อมูลไม่สำเร็จ',
          description: getThaiErrorMessage(error),
          variant: 'destructive',
        })
      }
    }

    fetchEvent()
  }, [eventId, organizerKey, reset, toast])

  const onSubmit = async (data: EditEventForm) => {
    if (!organizerKey) {
      toast({
        title: 'ไม่มีสิทธิ์แก้ไข',
        description: 'กรุณาใช้ลิงก์แอดมินที่ถูกต้อง',
        variant: 'destructive',
      })
      return
    }

    try {
      await eventApi.update(eventId, {
        title: data.title,
        description: data.description || undefined,
        location: data.location || undefined,
      }, organizerKey)

      toast({
        title: 'บันทึกสำเร็จ',
        description: 'แก้ไขกิจกรรมเรียบร้อยแล้ว',
      })
      router.push(`/a/${eventId}?k=${organizerKey}`)
    } catch (error) {
      toast({
        title: 'บันทึกไม่สำเร็จ',
        description: getThaiErrorMessage(error),
        variant: 'destructive',
      })
    }
  }

  if (!organizerKey) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-card rounded-xl shadow-sm border p-8">
            <h1 className="font-display text-2xl text-foreground mb-2 tracking-tight">ไม่มีสิทธิ์เข้าถึง</h1>
            <p className="text-muted-foreground mb-4">กรุณาใช้ลิงก์แอดมินที่ถูกต้อง</p>
            <Link href="/">
              <Button>กลับหน้าหลัก</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Link
            href={`/a/${eventId}?k=${organizerKey}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้าแอดมิน
          </Link>
          <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
            แก้ไขกิจกรรม
          </h1>
          <p className="text-muted-foreground mt-2">
            แก้ไขรายละเอียดกิจกรรม
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดกิจกรรม</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="ชื่อกิจกรรม"
                placeholder="เช่น ประชุมทีม, ไปเที่ยวเขา"
                error={errors.title?.message}
                {...register('title', { required: 'กรุณาระบุชื่อกิจกรรม' })}
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground/80">
                  รายละเอียด (ไม่บังคับ)
                </label>
                <textarea
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none placeholder:text-muted-foreground min-h-[100px]"
                  placeholder="เพิ่มรายละเอียดเกี่ยวกับกิจกรรม..."
                  {...register('description')}
                />
              </div>

              <Input
                label="สถานที่ (ไม่บังคับ)"
                placeholder="เช่น ห้องประชุม A, ร้านอาหาร ABC"
                error={errors.location?.message}
                {...register('location')}
              />
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Link href={`/a/${eventId}?k=${organizerKey}`} className="flex-1">
              <Button type="button" variant="outline" size="lg" className="w-full">
                ยกเลิก
              </Button>
            </Link>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              isLoading={isSubmitting}
              disabled={!isDirty}
            >
              บันทึกการแก้ไข
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
