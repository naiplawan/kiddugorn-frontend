'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PricingCard, BillingToggle, PricingTable } from '@/components/pricing'
import { PRICING_TIERS } from '@/lib/config/subscription'
import { Button } from '@/components/ui'
import { ArrowLeft, HelpCircle } from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY')

  const handleSelectPlan = (tierId: string) => {
    // TODO: Implement checkout navigation
    if (tierId === 'FREE') {
      window.location.href = '/'
      return
    }

    if (tierId === 'PRO_BUSINESS') {
      window.location.href = '/contact'
      return
    }

    // Navigate to checkout
    window.location.href = `/checkout?tier=${tierId}&cycle=${billingCycle}`
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับหน้าหลัก
          </Link>

          <h1 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">
            เลือกแพ็กเกจที่ใช่สำหรับคุณ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            อัปเกรดเป็น Pro เพื่อปลดล็อคฟีเจอร์ทั้งหมด หรือใช้งานฟรีได้ตลอดกาล
          </p>
        </div>

        {/* Billing Toggle */}
        <BillingToggle value={billingCycle} onChange={setBillingCycle} />

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingCycle={billingCycle}
              onSelect={() => handleSelectPlan(tier.id)}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            เปรียบเทียบฟีเจอร์ทั้งหมด
          </h2>
          <div className="rounded-xl border bg-card p-4 md:p-6">
            <PricingTable billingCycle={billingCycle} />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            คำถามที่พบบ่อย
          </h2>

          <div className="space-y-4">
            <FAQItem
              question="ฉันสามารถยกเลิกการสมัครสมาชิกได้ทุกเมื่อหรือไม่?"
              answer="ใช่ คุณสามารถยกเลิกการสมัครสมาชิกได้ทุกเมื่อ หลังจากยกเลิก คุณยังสามารถใช้งานฟีเจอร์ Pro ได้จนถึงสิ้นสุดรอบบิลลิ่ง"
            />
            <FAQItem
              question="ถ้าฉันอัปเกรด ระบบจะคิดเงินอย่างไร?"
              answer="เมื่อคุณอัปเกรด ระบบจะคำนวณค่าใช้จ่ายแบบตามสัดส่วน (prorated) คุณจะจ่ายเฉพาะส่วนต่างจากแพ็กเกจเดิม"
            />
            <FAQItem
              question="มีการคืนเงินหรือไม่?"
              answer="เรามีนโยบายคืนเงินภายใน 7 วันหลังจากการสมัครสมาชิก หากคุณไม่พอใจในบริการ"
            />
            <FAQItem
              question="รองรับการชำระเงินแบบใดบ้าง?"
              answer="เรารองรับบัตรเครดิต/เดบิต (Visa, Mastercard) และ PromptPay สำหรับลูกค้าในประเทศไทย"
            />
            <FAQItem
              question="ข้อมูลของฉันจะถูกเก็บไว้นานแค่ไหน?"
              answer="ขึ้นอยู่กับแพ็กเกจของคุณ: Free เก็บ 90 วัน, Pro Personal/Team เก็บ 1 ปี, Pro Business เก็บตลอดกาล"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 rounded-xl bg-primary/5 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">
            ยังไม่แน่ใจ? ลองใช้งานฟรีก่อน
          </h2>
          <p className="text-muted-foreground mb-6">
            เริ่มต้นใช้งาน Kiddugorn ฟรี และอัปเกรดเมื่อพร้อม
          </p>
          <Link href="/">
            <Button size="lg">
              เริ่มใช้งานฟรี
            </Button>
          </Link>
        </div>

        {/* Help */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4" />
            มีคำถามเพิ่มเติม?{' '}
            <a href="mailto:support@kiddugorn.com" className="text-primary hover:underline">
              ติดต่อเรา
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-lg border bg-card">
      <summary className="flex items-center justify-between cursor-pointer p-4 font-medium">
        {question}
        <span className="text-primary group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <div className="px-4 pb-4 text-muted-foreground">
        {answer}
      </div>
    </details>
  )
}
