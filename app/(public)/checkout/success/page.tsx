'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent } from '@/components/ui'
import { ProBadge } from '@/components/ui/pro-badge'
import { Check, Sparkles, Calendar, Clock, Download, Shield } from 'lucide-react'

const PRO_FEATURES = [
  { icon: Calendar, text: 'สร้างกิจกรรมได้ไม่จำกัด' },
  { icon: Clock, text: 'ซิงค์กับ Google Calendar' },
  { icon: Sparkles, text: 'กิจกรรมซ้ำได้' },
  { icon: Download, text: 'ส่งออกข้อมูลเป็น CSV' },
  { icon: Shield, text: 'ไม่มีโฆษณา' },
]

export default function CheckoutSuccessPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-success/5 via-background to-background py-12 px-4">
      <div className="container mx-auto max-w-lg">
        <div
          className={`text-center transition-all duration-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Success Icon */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 rounded-full bg-success flex items-center justify-center">
              <Check className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">ชำระเงินสำเร็จ!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            ยินดีต้อนรับสู่ Kiddugorn Pro
          </p>
        </div>

        {/* Features Card */}
        <Card
          className={`transition-all duration-500 delay-200 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ProBadge tier="PERSONAL" size="lg" />
              <div>
                <p className="font-semibold">ฟีเจอร์ Pro ที่คุณจะได้รับ:</p>
              </div>
            </div>

            <ul className="space-y-3">
              {PRO_FEATURES.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    animationDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-success" />
                  </div>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div
          className={`mt-6 space-y-3 transition-all duration-500 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link href="/create" className="block">
            <Button size="lg" className="w-full">
              <Sparkles className="h-4 w-4 mr-2" />
              เริ่มสร้างกิจกรรม
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" size="lg" className="w-full">
              กลับหน้าหลัก
            </Button>
          </Link>
        </div>

        {/* Help */}
        <p
          className={`text-center text-sm text-muted-foreground mt-8 transition-all duration-500 delay-700 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          มีคำถาม?{' '}
          <a href="mailto:support@kiddugorn.com" className="text-primary hover:underline">
            ติดต่อทีมสนับสนุน
          </a>
        </p>
      </div>
    </main>
  )
}
