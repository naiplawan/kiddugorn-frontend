'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Users, Calendar, CheckCircle2, Sparkles, Eye, ArrowRight, Star, Zap, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Live activity simulation
const liveActivities = [
  { action: 'สร้างนัด', event: 'ไปเที่ยวเกาะช้าง', time: '1 นาทีที่แล้ว', emoji: '🏝️' },
  { action: 'โหวตเสร็จ', event: 'ทีมมีตติ้ง Q1', time: '3 นาทีที่แล้ว', emoji: '📊' },
  { action: 'สร้างนัด', event: 'ไปกิน BBQ กัน', time: '5 นาทีที่แล้ว', emoji: '🍖' },
  { action: 'โหวตเสร็จ', event: 'นัดทำงานกลุ่ม', time: '7 นาทีที่แล้ว', emoji: '👥' },
]

// Floating emoji particles
const floatingEmojis = ['✨', '🎉', '📅', '👍', '💬', '⭐', '🔥', '💫']

// SVG Illustration component for the hero
function HeroIllustration() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative w-full max-w-md mx-auto mt-8 md:mt-0">
      {/* Decorative orbit ring */}
      <div className="absolute inset-0 -m-8">
        <div className="w-full h-full rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
      </div>

      {/* Floating emoji particles */}
      {floatingEmojis.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-60 animate-float-random pointer-events-none"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${-10 + Math.random() * 120}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Main card mockup */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-primary/20 p-6 border border-gray-100 animate-float-slow relative overflow-hidden group">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Corner decorations */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Star className="w-3 h-3 text-white" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain p-1.5"
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">ไปกินชาบูกันไหม?</p>
            <p className="text-xs text-muted-foreground">3 วันที่เปิดโหวต</p>
          </div>
          <div className="ml-auto">
            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium animate-pulse-subtle">
              🔥 Active
            </div>
          </div>
        </div>

        {/* Date options */}
        <div className="space-y-2 mb-4">
          {[
            { day: 'เสาร์ 15 มี.ค.', status: 'most', votes: 8, progress: 100 },
            { day: 'อาทิตย์ 16 มี.ค.', status: 'good', votes: 5, progress: 62 },
            { day: 'เสาร์ 22 มี.ค.', status: 'maybe', votes: 3, progress: 38 },
          ].map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                item.status === 'most'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md shadow-green-100'
                  : item.status === 'good'
                  ? 'bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20'
                  : 'bg-gradient-to-r from-muted/50 to-muted/30 border border-muted'
              } ${hoveredIndex === i ? 'scale-[1.02] shadow-lg' : ''}`}
            >
              {/* Progress bar background */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  item.status === 'most' ? 'bg-green-200/30' : 'bg-primary/5'
                }`}
                style={{ width: `${item.progress}%`, maxWidth: '100%' }}
              />

              <div className="relative flex items-center gap-2">
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    item.status === 'most'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-300'
                      : 'bg-white shadow-md'
                  } ${hoveredIndex === i ? 'rotate-12' : ''}`}
                >
                  {item.status === 'most' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <span className="text-sm font-medium">{item.day}</span>
              </div>
              <div className="relative flex items-center gap-2">
                {/* Vote count with animation */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  item.status === 'most' ? 'bg-green-500 text-white' : 'bg-white shadow-sm text-muted-foreground'
                }`}>
                  <Users className="h-3 w-3" />
                  <span>{item.votes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Avatar row */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {['bg-gradient-to-br from-primary to-blue-600', 'bg-gradient-to-br from-amber-400 to-orange-500', 'bg-gradient-to-br from-green-400 to-emerald-500', 'bg-gradient-to-br from-rose-400 to-pink-500'].map((color, i) => (
              <div
                key={i}
                className={`h-8 w-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-lg transition-all duration-300 hover:scale-125 hover:z-10 hover:-translate-y-1 cursor-pointer`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {['ก', 'ข', 'ค', 'ง'][i]}
              </div>
            ))}
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white flex items-center justify-center text-muted-foreground text-xs font-medium shadow-md">
              +4
            </div>
          </div>
          <span className="text-sm text-muted-foreground ml-2">โหวตแล้ว</span>
        </div>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Floating notification cards */}
      <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-3 animate-bounce-slow border border-green-100 group hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-green-600">8 คนโอเค!</span>
            <p className="text-xs text-muted-foreground">เสาร์ 15 มี.ค.</p>
          </div>
        </div>
        {/* Confetti dots */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
        <div className="absolute -top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
      </div>

      <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 animate-float border border-amber-100 group hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-muted-foreground">คิดดูก่อนได้</span>
        </div>
      </div>

      {/* New floating element */}
      <div className="absolute top-1/2 -right-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-xl p-2 animate-float-delayed text-xs font-medium">
        <Zap className="w-4 h-4 inline mr-1" />
        เร็ว!
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-1/2 -right-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-2xl -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-0 -left-16 w-28 h-28 bg-gradient-to-br from-secondary/20 to-amber-500/10 rounded-full blur-xl -z-10" />
      <div className="absolute -top-10 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/10 rounded-full blur-lg -z-10" />

      {/* Dotted pattern background */}
      <div className="absolute inset-0 -z-20 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
    </div>
  )
}

// Live Activity Indicator Component
function LiveActivityIndicator() {
  const [currentActivity, setCurrentActivity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % liveActivities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const activity = liveActivities[currentActivity]

  return (
    <div className="group relative">
      <div className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-green-100 hover:shadow-xl hover:border-green-200 transition-all cursor-pointer">
        {/* Pulsing dot */}
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200"></div>
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-400 animate-ping"></div>
          <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-300 animate-pulse"></div>
        </div>

        <div className="flex items-center gap-2 text-sm overflow-hidden">
          <span className="text-lg group-hover:scale-125 transition-transform">{activity.emoji}</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {activity.action}
          </span>
          <span className="font-semibold text-foreground max-w-[100px] truncate group-hover:text-primary transition-colors">
            "{activity.event}"
          </span>
          <span className="text-xs text-muted-foreground/70 hidden sm:inline">
            {activity.time}
          </span>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      </div>

      {/* Decorative particles */}
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-green-400 rounded-full animate-bounce" />
      <div className="absolute -bottom-1 left-4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="gradient-hero min-h-[90vh] flex items-center justify-center px-4 py-16 md:py-24 overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-secondary/20 to-amber-500/10 rounded-full blur-lg animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/15 to-emerald-500/10 rounded-full blur-lg animate-float" />

        {/* Floating shapes */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-primary/20 rounded-lg rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/3 left-1/6 w-6 h-6 border-2 border-secondary/30 rounded-full animate-bounce-slow" />
        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-primary/10 rounded-sm rotate-12 animate-float" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Radial gradient overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center md:text-left relative">
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 md:left-0 hidden md:block animate-float">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg shadow-green-200 font-medium">
                100% ฟรี!
              </div>
            </div>
            <div className="absolute -top-2 right-0 md:right-auto md:left-24 animate-float-delayed hidden md:block">
              <div className="bg-white text-foreground text-xs px-3 py-1.5 rounded-full shadow-lg border font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                30 วินาที
              </div>
            </div>

            {/* Logo */}
            <div className="mb-6 flex items-center justify-center gap-3 md:justify-start group">
              <div className="relative">
                <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/40 transition-all group-hover:scale-105 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Kiddugorn Logo"
                    width={64}
                    height={64}
                    className="h-full w-full object-contain p-1 group-hover:scale-110 transition-transform"
                  />
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping opacity-20" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">คิดดูก่อน</h2>
                <p className="text-xs text-muted-foreground">Scheduling Made Easy</p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl xl:text-6xl leading-tight relative">
              <span className="relative inline-block">
                เลิกนัดกันยาก
                {/* Underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,6 Q50,0 100,6 T200,6" stroke="currentColor" strokeWidth="3" fill="none" className="animate-dash" />
                </svg>
              </span>
              <br />
              <span className="gradient-text relative">
                ใช้คิดดูก่อน จบ!
                {/* Sparkle decorations */}
                <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-amber-400 animate-pulse" />
                <Sparkles className="absolute -bottom-1 right-0 w-3 h-3 text-primary/50 animate-pulse delay-150" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-6 max-w-xl text-base md:text-lg text-muted-foreground md:text-xl md:mx-0 leading-relaxed">
              สร้างลิงก์ <ArrowRight className="inline h-4 w-4 mx-1 text-primary animate-bounce-subtle" /> ส่งให้เพื่อน{' '}
              <ArrowRight className="inline h-4 w-4 mx-1 text-primary animate-bounce-subtle" style={{ animationDelay: '0.1s' }} /> ทุกคนโหวตวันที่ว่าง
              <br />
              <span className="text-primary font-semibold">ไม่ต้องสมัคร ใช้งานได้ทันที</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:justify-start mb-6">
              <Link href="/create" className="w-full sm:w-auto group">
                <Button
                  size="lg"
                  className="h-12 md:h-14 w-full sm:w-auto rounded-full px-6 md:px-8 text-base md:text-lg font-semibold shadow-xl shadow-primary/25 transition-all group-hover:shadow-2xl group-hover:shadow-primary/40 group-hover:scale-105 relative overflow-hidden"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <Plus className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
                  สร้างเรื่องให้คิดดูก่อน
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/create?demo=true" className="w-full sm:w-auto group">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 md:h-14 w-full sm:w-auto rounded-full px-6 md:px-8 text-base md:text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 transition-all group-hover:bg-primary/5 relative overflow-hidden"
                >
                  <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  ดูตัวอย่าง
                </Button>
              </Link>
            </div>

            {/* Color mapping for Tailwind classes (Tailwind cannot process dynamic class names at runtime) */}
            {(() => {
              const colorMap: Record<string, { bg: string, border: string, text: string, shadow: string }> = {
                green: { bg: 'bg-green-500', border: 'border-green-200', text: 'text-green-500', shadow: 'shadow-green-200' },
                primary: { bg: 'bg-primary', border: 'border-primary/20', text: 'text-primary', shadow: 'shadow-primary/20' },
                amber: { bg: 'bg-amber-500', border: 'border-amber-200', text: 'text-amber-500', shadow: 'shadow-amber-200' },
              }
              const trustIndicators = [
                { icon: CheckCircle2, text: 'ใช้งานได้ทันที', color: 'green' },
                { icon: Heart, text: 'ไม่ต้องสมัคร', color: 'primary' },
                { icon: Star, text: 'ฟรี!', color: 'amber' },
              ]
              return (
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-sm text-muted-foreground md:justify-start mb-6">
                  {trustIndicators.map((item, i) => {
                    const colors = colorMap[item.color] || colorMap.primary
                    return (
                      <div
                        key={i}
                        className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md hover:shadow-lg transition-all cursor-default border border-gray-100"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className={`h-2.5 w-2.5 rounded-full ${colors.bg} animate-pulse shadow-lg ${colors.shadow}`}></div>
                        <item.icon className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity -ml-1`} />
                        <span className="group-hover:font-medium transition-all">{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })()}

            {/* Live Activity Indicator */}
            <div className="hidden md:block">
              <LiveActivityIndicator />
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden md:block relative">
            <HeroIllustration />
          </div>
        </div>

        {/* Mobile Live Activity Indicator */}
        <div className="mt-8 flex justify-center md:hidden">
          <LiveActivityIndicator />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
