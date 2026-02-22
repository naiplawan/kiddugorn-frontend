'use client';

import { Calendar, Share2, CheckCircle, ArrowRight, Sparkles, Link2, BarChart3, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: '1',
    icon: Calendar,
    title: 'สร้างนัด',
    description: 'เลือกวันที่ที่เป็นไปได้ ตั้งชื่อนัด และเพิ่มรายละเอียดได้ในไม่กี่วินาที',
    color: 'bg-gradient-to-br from-primary/10 to-primary/5',
    accentColor: 'bg-gradient-to-br from-primary to-blue-600',
    emoji: '📝',
    borderColor: 'border-primary/20',
  },
  {
    number: '2',
    icon: Link2,
    title: 'แชร์ลิงก์',
    description: 'ส่งลิงก์ให้เพื่อนผ่าน LINE, Messenger หรือช่องทางอื่นๆ ได้ทันที',
    color: 'bg-gradient-to-br from-amber-50 to-orange-50',
    accentColor: 'bg-gradient-to-br from-amber-500 to-orange-500',
    emoji: '🔗',
    borderColor: 'border-amber-200',
  },
  {
    number: '3',
    icon: BarChart3,
    title: 'ดูผลโหวต',
    description: 'ระบบสรุปผลอัตโนมัติ ให้คุณเห็นวันที่เหมาะสมที่สุดในทันที',
    color: 'bg-gradient-to-br from-green-50 to-emerald-50',
    accentColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
    emoji: '✅',
    borderColor: 'border-green-200',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background py-20 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-secondary/10 to-amber-500/5 rounded-full blur-3xl" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-8 h-8 border-2 border-dashed border-primary/20 rounded-lg rotate-12 animate-float" />
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-secondary/20 rounded-full animate-bounce-slow" />
        <div className="absolute top-1/2 right-10 w-4 h-4 bg-green-400/20 rounded-sm rotate-45 animate-float-delayed" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Wavy line decoration */}
        <svg
          className="absolute top-0 left-0 w-full h-20 text-primary/5"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
        >
          <path d="M0,40 Q300,0 600,40 T1200,40" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center relative">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl relative inline-block">
            ใช้งานง่าย เสร็จในไม่กี่นาที
            {/* Underline */}
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full" />
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-4">
            สร้างนัด แชร์ลิงก์ และดูผลสรุปได้ในไม่กี่นาที ไม่ต้องสมัครสมาชิกให้ยุ่งยาก
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3 relative">
          {/* Connection line (desktop only) - Enhanced */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6">
            <div className="h-1 bg-gradient-to-r from-primary via-amber-500 to-green-500 rounded-full relative overflow-hidden">
              {/* Animated flow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
            {/* Dots on line */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/30" />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/30" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/30" />
          </div>

          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              <Card
                className={`h-full border-2 ${step.borderColor} shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="flex flex-col items-center p-6 text-center relative">
                  {/* Step Number Badge - Enhanced */}
                  <div className="relative mb-4">
                    {/* Glow ring */}
                    <div
                      className={`absolute inset-0 ${step.accentColor} rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 scale-150`}
                    />
                    {/* Animated ring */}
                    <div
                      className={`absolute -inset-2 ${step.accentColor.replace('bg-', 'border-').replace('gradient-to-br from-', 'border-').split(' ')[0]} border-2 rounded-full opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500`}
                    />
                    <span
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full ${step.accentColor} text-xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      {step.number}
                    </span>
                    {/* Floating emoji */}
                    <span className="absolute -top-2 -right-2 text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {step.emoji}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} border ${step.borderColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden`}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700" />
                    <step.icon className="h-10 w-10 text-foreground/80 group-hover:text-foreground transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Arrow for next step (hidden on mobile and last item) - Enhanced */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100 text-primary md:flex group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}

                  {/* Corner decoration */}
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 ${step.color} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`}
                  />
                </CardContent>
              </Card>

              {/* Floating particles on hover */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
              <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-secondary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-100" />
            </div>
          ))}
        </div>

        {/* Bottom decoration - Enhanced */}
        <div className="mt-12 text-center relative">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-6 py-3 shadow-lg border border-green-200 group hover:shadow-xl hover:scale-105 transition-all cursor-default">
            <div className="relative">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold shadow-lg shadow-green-200 animate-pulse-subtle">
                +100
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-bounce" />
            </div>
            <span className="text-sm font-medium text-green-700">นัดถูกสร้างขึ้นวันนี้</span>
            <span className="text-lg animate-bounce-subtle">🚀</span>
          </div>

          {/* Confetti decoration */}
          <div className="absolute -top-4 left-1/4 text-xl animate-float">✨</div>
          <div className="absolute -top-2 right-1/4 text-lg animate-float-delayed">🎉</div>
        </div>
      </div>
    </section>
  );
}
