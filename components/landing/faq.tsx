'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, Shield, Clock, Users, Globe, Zap, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const faqs = [
  {
    question: 'ต้องสมัครสมาชิกไหม?',
    answer: 'ไม่ต้อง! นี่คือจุดเด่นของเราเลย ทั้งคนสร้างนัดและคนโหวต ไม่ต้องสมัครสมาชิก ไม่ต้องกรอกอะไรให้ยุ่งยาก เข้ามาใช้ได้ทันที',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    question: 'ข้อมูลของฉันปลอดภัยไหม?',
    answer: 'เราไม่เก็บข้อมูลส่วนตัวของคุณ เช่น เบอร์โทร อีเมล หรือข้อมูลที่ระบุตัวตนได้ เราเก็บแค่ชื่อที่คุณกรอกตอนโหวตเท่านั้น และข้อมูลจะถูกลบหลังจากนัดหมดอายุ',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    question: 'นัดจะหมดอายุเมื่อไหร่?',
    answer: 'นัดจะถูกเก็บไว้ 30 วันหลังจากวันที่สร้าง หลังจากนั้นข้อมูลจะถูกลบอัตโนมัติ คุณสามารถลบนัดเองได้ทุกเมื่อจากหน้า Admin',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    question: 'ใครสามารถโหวตได้บ้าง?',
    answer: 'ทุกคนที่มีลิงก์! เพียงแค่ส่งลิงก์ให้เพื่อน ครอบครัว เพื่อนร่วมงาน ทุกคนสามารถเข้ามาโหวตได้ทันที ไม่ต้องสมัคร ไม่ต้องล็อกอิน',
    icon: Globe,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    question: 'มีค่าใช้จ่ายไหม?',
    answer: 'ไม่มี! คิดดูก่อน ฟรี 100% ไม่มีค่าใช้จ่ายซ่อน ไม่มีแผน Premium ไม่มีโฆษณารบกวน ใช้งานได้ฟรีไม่จำกัด',
    icon: Zap,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    question: 'ลิงก์ Admin เปลี่ยนแปลงได้ไหม?',
    answer: 'ลิงก์ Admin เป็นลิงก์พิเศษที่ให้คุณจัดการนัดได้ เช่น ล็อค/ปลดล็อค, กำหนดวันสุดท้าย, ลบนัด กรุณาเก็บลิงก์นี้ไว้ให้ดี เพราะไม่สามารถเปลี่ยนแปลงได้',
    icon: Lock,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-background py-20 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            คำถามที่พบบ่อย
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            มีคำถาม? เรามีคำตอบ
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            คำถามที่ผู้ใช้ถามบ่อยที่สุด ถ้ายังไม่เจอคำตอบ ติดต่อเราได้เลย
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`border-0 transition-all ${
                openIndex === index
                  ? 'shadow-xl bg-white'
                  : 'shadow-md bg-white/80 hover:shadow-lg'
              }`}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 h-10 w-10 rounded-xl ${faq.bgColor} ${faq.color} flex items-center justify-center`}>
                    <faq.icon className="h-5 w-5" />
                  </div>

                  {/* Question */}
                  <span className="flex-grow font-medium text-foreground">
                    {faq.question}
                  </span>

                  {/* Chevron */}
                  <ChevronDown
                    className={`flex-shrink-0 h-5 w-5 text-muted-foreground transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-14">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-0 shadow-md bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <p className="text-foreground mb-2 font-medium">
                ยังไม่เจอคำตอบที่หา?
              </p>
              <a
                href="mailto:contact@kiddugorn.com"
                className="text-primary hover:underline font-medium"
              >
                ติดต่อเราได้เลย →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
