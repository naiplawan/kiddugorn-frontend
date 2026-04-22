'use client'

import { Input, Card, CardContent } from '@/components/ui'
import { useFormContext } from 'react-hook-form'
import { formatThaiDateWithDay, formatThaiTime12h } from '@/lib/utils/dates'
import {
  FileText,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import type { CreateEventInput } from '@/lib/validations'

export function StepReview() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateEventInput>()

  const watchedForm = watch()

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
              <FileText className="h-4 w-4" />
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
                    {dateItem.date ? formatThaiDateWithDay(dateItem.date) : 'ยังไม่เลือกวันที่'}
                  </p>
                  {dateItem.time && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatThaiTime12h(dateItem.time)}
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

      {/* Creator Info Form */}
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
}
