'use client'

import { Input, Badge } from '@/components/ui'
import { useFormContext } from 'react-hook-form'
import { FileText, MapPin, AlertCircle } from 'lucide-react'
import type { CreateEventInput } from '@/lib/validations'

export function StepDetails() {
  const { register, formState: { errors } } = useFormContext<CreateEventInput>()

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Event Title */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
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
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base shadow-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 focus:outline-none placeholder:text-muted-foreground min-h-[120px] resize-none"
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
}
