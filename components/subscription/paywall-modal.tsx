'use client'

import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui'
import { ProBadge } from '@/components/ui/pro-badge'
import { Check, Sparkles, X, Lock } from 'lucide-react'
import Link from 'next/link'

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  feature: 'events' | 'participants' | 'calendarSync' | 'export' | 'recurring'
  currentCount?: number
  limit?: number
}

const FEATURE_INFO: Record<string, { title: string; description: string }> = {
  events: {
    title: 'ถึงขีดจำกัดกิจกรรมแล้ว!',
    description: 'คุณสร้างกิจกรรมครบ 10 รายการแล้วในแพ็กเกจฟรี',
  },
  participants: {
    title: 'ผู้เข้าร่วมเยอะมาก!',
    description: 'กิจกรรมนี้มีผู้เข้าร่วมเกินขีดจำกัดแล้ว',
  },
  calendarSync: {
    title: 'ซิงค์ปฏิทิน',
    description: 'ฟีเจอร์นี้สำหรับสมาชิก Pro เท่านั้น',
  },
  export: {
    title: 'ส่งออกข้อมูล',
    description: 'ส่งออกข้อมูลเป็น CSV, Excel หรือ PDF ได้ในแพ็กเกจ Pro',
  },
  recurring: {
    title: 'กิจกรรมซ้ำ',
    description: 'สร้างกิจกรรมซ้ำได้ในแพ็กเกจ Pro เท่านั้น',
  },
}

const PRO_FEATURES = [
  'กิจกรรมไม่จำกัด',
  'ซิงค์กับ Google Calendar',
  'กิจกรรมซ้ำได้',
  'ส่งออกข้อมูล',
  'ไม่มีโฆษณา',
]

export function PaywallModal({ isOpen, onClose, feature, currentCount, limit }: PaywallModalProps) {
  const featureInfo = FEATURE_INFO[feature] || FEATURE_INFO.events

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl flex items-center justify-center gap-2">
            {featureInfo.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {featureInfo.description}
            {currentCount !== undefined && limit !== undefined && (
              <span className="block mt-1 font-medium text-foreground">
                ปัจจุบัน: {currentCount} / {limit}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <ProBadge tier="PERSONAL" />
            <span className="font-semibold">Pro Personal</span>
            <span className="ml-auto text-lg font-bold">฿149<span className="text-sm font-normal text-muted-foreground">/เดือน</span></span>
          </div>

          <ul className="space-y-2 mb-4">
            {PRO_FEATURES.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-success shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              ภายหลัง
            </Button>
            <Link href="/pricing" className="flex-1">
              <Button className="w-full">
                <Sparkles className="h-4 w-4 mr-1" />
                อัปเกรด
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          ยกเลิกได้ทุกเมื่อ • คืนเงินภายใน 7 วัน
        </p>
      </DialogContent>
    </Dialog>
  )
}
