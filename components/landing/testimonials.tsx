'use client'

import { useState, useEffect } from 'react'
import { Quote, Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'ณัฐพงษ์',
    role: 'นักศึกษามหาวิทยาลัย',
    avatar: 'ณ',
    avatarBg: 'bg-primary',
    quote: 'เคยนัดเพื่อนไปทริป คุยกันใน LINE กลุ่มยาวมาก สรุปไม่ออก พอใช้คิดดูก่อน เสร็จใน 10 นาที!',
    rating: 5,
    useCase: 'ทริปเที่ยวเชียงใหม่',
  },
  {
    name: 'สุดาภรณ์',
    role: 'ผู้จัดการร้านอาหาร',
    avatar: 'ส',
    avatarBg: 'bg-rose-500',
    quote: 'ใช้จัดตารางเวรพนักงาน ง่ายมาก ไม่ต้องสมัครสมาชิกให้ยุ่งยาก พนักงานก็โหวตได้เลย',
    rating: 5,
    useCase: 'จัดตารางเวร',
  },
  {
    name: 'ธนกฤต',
    role: 'Freelancer',
    avatar: 'ธ',
    avatarBg: 'bg-green-500',
    quote: 'นัดลูกค้าประชุมง่ายขึ้นเยอะ ส่งลิงก์ไป รอผลโหวต จบ! ไม่ต้องคุยไปมาหลายรอบ',
    rating: 5,
    useCase: 'นัดประชุมลูกค้า',
  },
  {
    name: 'พิมพ์ใจ',
    role: 'แม่บ้าน',
    avatar: 'พ',
    avatarBg: 'bg-amber-500',
    quote: 'นัดครอบครัวไปกินข้าวนอกบ้าน ทุกคนโหวตวันที่ว่างได้ง่าย ไม่ต้องโทรถามทีละคน',
    rating: 5,
    useCase: 'นัดครอบครัว',
  },
  {
    name: 'วิทยา',
    role: 'หัวหน้าทีม IT',
    avatar: 'ว',
    avatarBg: 'bg-indigo-500',
    quote: 'ทีมผม 20 คน หาเวลาประชุมได้ยากมาก ใช้คิดดูก่อน เห็นภาพรวมทันที ประหยัดเวลาเยอะ',
    rating: 5,
    useCase: 'ประชุมทีม',
  },
]

const liveActivities = [
  { action: 'สร้างนัด', event: 'ไปเที่ยวเกาะเสม็ด', time: '2 นาทีที่แล้ว' },
  { action: 'โหวตเสร็จ', event: 'ทีมมีตติ้ง Q1', time: '5 นาทีที่แล้ว' },
  { action: 'สร้างนัด', event: 'ไปกิน BBQ กัน', time: '8 นาทีที่แล้ว' },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleActivity, setVisibleActivity] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotate live activities
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleActivity((prev) => (prev + 1) % liveActivities.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="bg-muted/30 py-20 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4" />
            รีวิวจากผู้ใช้จริง
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            ใครๆ ก็ใช้งานง่าย
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            จากนักเรียน พนักงาน ไปจนถึงหัวหน้าทีม ทุกคนบอกว่าใช้งานง่าย ประหยัดเวลา
          </p>
        </div>

        {/* Live Activity Indicator */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full shadow-md px-4 py-2 border border-green-100">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {liveActivities[visibleActivity].action}
              </span>
              <span className="font-medium text-foreground">
                "{liveActivities[visibleActivity].event}"
              </span>
              <span className="text-xs text-muted-foreground">
                {liveActivities[visibleActivity].time}
              </span>
            </div>
          </div>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Quote className="h-4 w-4 text-white" />
            </div>
            <CardContent className="p-8 pt-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${currentTestimonial.avatarBg} flex items-center justify-center text-white text-lg font-medium`}>
                  {currentTestimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {currentTestimonial.useCase}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Thumbnails */}
        <div className="grid grid-cols-5 gap-3 mt-12 max-w-xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              onClick={() => setCurrentIndex(index)}
              className={`p-3 rounded-xl transition-all ${
                index === currentIndex
                  ? 'bg-primary text-white shadow-lg scale-110'
                  : 'bg-white text-muted-foreground hover:bg-muted hover:scale-105'
              }`}
            >
              <div className={`h-8 w-8 mx-auto rounded-full ${testimonial.avatarBg} flex items-center justify-center text-white text-sm font-medium`}>
                {testimonial.avatar}
              </div>
              <p className="text-xs mt-1 truncate">{testimonial.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
