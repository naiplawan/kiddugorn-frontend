'use client'

import { Users, CalendarCheck, Clock, Globe } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '1,000+',
    label: 'ผู้ใช้งาน',
    description: 'คนไว้ใจ',
  },
  {
    icon: CalendarCheck,
    value: '5,000+',
    label: 'นัดที่สร้าง',
    description: 'และนับต่อไป',
  },
  {
    icon: Clock,
    value: '30 วินาที',
    label: 'เวลาเฉลี่ย',
    description: 'สร้างนัดเสร็จ',
  },
  {
    icon: Globe,
    value: '100%',
    label: 'ฟรี',
    description: 'ไม่มีค่าใช้จ่าย',
  },
]

export function Stats() {
  return (
    <section className="bg-primary py-16 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center text-white"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-3">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-white/90">{stat.label}</p>
              <p className="text-xs text-white/60">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
