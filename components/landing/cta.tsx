'use client'

import Link from 'next/link'
import { ArrowRight, CalendarCheck, Sparkles, CheckCircle2, PartyPopper, Rocket, Stars } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-primary animate-gradient-shift" />

      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Floating emoji particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['✨', '🎉', '📅', '🚀', '⭐', '💫', '🔥', '✅', '👏', '🎊'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-3xl animate-float-random opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/10 via-transparent to-transparent" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-1/4 w-16 h-16 border-2 border-white/20 rounded-xl rotate-12 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-12 h-12 border-2 border-white/20 rounded-full animate-float-delayed" />
        <div className="absolute top-1/3 right-1/6 w-8 h-8 bg-white/10 rounded-lg rotate-45 animate-bounce-slow" />
        <div className="absolute bottom-1/3 left-1/6 w-6 h-6 bg-white/20 rounded-full animate-pulse" />

        {/* Spinning ring */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-dashed border-white/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative text-center">
        {/* Floating badges */}
        <div className="absolute -top-4 left-1/4 animate-bounce-subtle hidden md:block">
          <div className="bg-white text-primary text-xs px-3 py-1.5 rounded-full font-medium shadow-xl flex items-center gap-1">
            <Rocket className="w-3 h-3" />
            เริ่มต้นง่าย
          </div>
        </div>
        <div className="absolute -top-2 right-1/4 animate-bounce-subtle hidden md:block" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            <Stars className="w-3 h-3" />
            ฟรีตลอดชีพ
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-5 py-2 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 transition-colors cursor-default group">
          <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
          เริ่มใช้งานฟรี ไม่ต้องสมัคร
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Headline */}
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl relative">
          <span className="relative inline-block">
            พร้อมเลิกนัดกันยากแล้วหรือยัง?
            {/* Decorative underline */}
            <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 300 15" preserveAspectRatio="none">
              <path d="M0,7.5 Q75,0 150,7.5 T300,7.5" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" className="animate-dash" />
            </svg>
          </span>
          <PartyPopper className="absolute -top-4 -right-8 w-8 h-8 text-amber-300 animate-bounce hidden md:block" />
        </h2>

        {/* Subheadline */}
        <p className="mb-8 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          สร้างนัดแรกของคุณได้ใน 30 วินาที ส่งลิงก์ให้เพื่อน แล้วรอดูผลสรุป
          <br className="hidden md:block" />
          <span className="text-white font-medium">ไม่ต้องสมัคร ไม่ต้องจำรหัสผ่าน!</span>
        </p>

        {/* Benefits list - Enhanced */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: CheckCircle2, text: 'ไม่ต้องสมัครสมาชิก', color: 'from-green-400 to-emerald-400' },
            { icon: CheckCircle2, text: 'ฟรี 100%', color: 'from-amber-400 to-orange-400' },
            { icon: CheckCircle2, text: 'ใช้งานได้ทันที', color: 'from-blue-400 to-cyan-400' },
          ].map((benefit, i) => (
            <div
              key={i}
              className={`group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`h-6 w-6 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <benefit.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons - Enhanced */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/create" className="group w-full sm:w-auto">
            <Button
              size="lg"
              className="h-14 md:h-16 w-full sm:w-auto rounded-full px-8 md:px-10 text-base md:text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 transition-all group-hover:scale-105 group-hover:shadow-3xl relative overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <CalendarCheck className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              สร้างนัดแรกของคุณ
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/create?demo=true" className="group w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="h-14 md:h-16 w-full sm:w-auto rounded-full px-6 md:px-8 text-base md:text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
              ดูตัวอย่าง
            </Button>
          </Link>
        </div>

        {/* Trust text - Enhanced */}
        <div className="relative inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
          <div className="flex -space-x-2">
            {['bg-gradient-to-br from-pink-400 to-rose-500', 'bg-gradient-to-br from-blue-400 to-indigo-500', 'bg-gradient-to-br from-green-400 to-emerald-500'].map((color, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                {['ก', 'ข', 'ค'][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/70">
            ใช้งานโดย <span className="text-white font-semibold">1,000+</span> คน และ <span className="text-white font-semibold">5,000+</span> นัดถูกสร้างขึ้นแล้ว
          </p>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Decorative corner elements */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-8 h-1 bg-white/20 rounded-full" />
          <div className="w-4 h-1 bg-white/30 rounded-full" />
          <div className="w-2 h-1 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-background" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0,40 Q300,80 600,40 T1200,40 L1200,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
