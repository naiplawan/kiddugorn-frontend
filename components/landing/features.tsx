'use client';

import {
  UserX,
  Clock,
  Smartphone,
  Zap,
  Shield,
  Heart,
  MessageCircle,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: UserX,
    title: 'ไม่ต้องสมัคร',
    description: 'ทุกคนใช้ได้ทันที ไม่ต้องกรอกข้อมูลสมัครสมาชิกให้ยุ่งยาก',
    color: 'text-primary',
    bgColor: 'bg-gradient-to-br from-primary/10 to-blue-50',
    borderColor: 'border-primary/20',
    emoji: '🚀',
    gradient: 'from-primary to-blue-600',
  },
  {
    icon: Clock,
    title: 'คิดดูก่อนได้',
    description: 'ไม่ต้องตอบเลย กดปุ่ม "คิดดูก่อน" ไว้ก่อน ไม่กดดันให้ต้องตอบทันที',
    color: 'text-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    emoji: '🤔',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Smartphone,
    title: 'มือถือลื่น',
    description: 'ใช้บน LINE ได้สบาย ออกแบบมาเพื่อมือถือโดยเฉพาะ',
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    emoji: '📱',
    gradient: 'from-green-500 to-emerald-500',
  },
];

const additionalFeatures = [
  {
    icon: Zap,
    title: 'เร็วทันใจ',
    description: 'สร้างนัดได้ใน 30 วินาที',
    emoji: '⚡',
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    icon: Shield,
    title: 'ปลอดภัย',
    description: 'ไม่เก็บข้อมูลส่วนตัว',
    emoji: '🔒',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Heart,
    title: 'ใช้ฟรี',
    description: 'ไม่มีค่าใช้จ่ายซ่อน',
    emoji: '💜',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    icon: MessageCircle,
    title: 'ไทยทั้งดุ้น',
    description: 'ออกแบบเพื่อคนไทย',
    emoji: '🇹🇭',
    gradient: 'from-blue-400 to-red-400',
  },
];

export function Features() {
  return (
    <section className="bg-muted/30 py-20 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-secondary/10 to-amber-500/5 rounded-full blur-3xl" />

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-dashed border-primary/10 rounded-2xl rotate-12 animate-float" />
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-secondary/10 rounded-full animate-bounce-slow" />

        {/* Star decorations */}
        <Star className="absolute top-20 right-1/4 w-6 h-6 text-amber-300/50 animate-pulse" />
        <Star className="absolute bottom-20 left-1/3 w-4 h-4 text-primary/30 animate-pulse delay-150" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(45deg, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(-45deg, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Wave decoration */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-muted/50"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center relative">
          {/* Floating badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-4 py-1.5 rounded-full shadow-lg animate-bounce-subtle">
              <Sparkles className="h-3 w-3" />
              ทำไมต้องเลือกเรา?
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl relative inline-block">
            แก้ปัญหาการนัดเพื่อนแบบเดิมๆ
            {/* Animated underline */}
            <div className="absolute -bottom-1 left-0 w-full">
              <div className="h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-primary rounded-full" />
            </div>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-4">
            คุยกันยาก สรุปยาก ใครว่างวันไหนก็ไม่รู้ ใช้ &quot;คิดดูก่อน&quot; จบในคลิกเดียว
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group h-full border-2 ${feature.borderColor} bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden relative`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Corner decoration */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 ${feature.bgColor} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`}
              />

              {/* Floating emoji */}
              <span className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {feature.emoji}
              </span>

              <CardContent className="p-6 relative">
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bgColor} ${feature.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden shadow-lg`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700" />
                  {/* Glow on hover */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                  />
                  <feature.icon className="h-8 w-8 relative" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>

                {/* Animated border glow */}
                <div
                  className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:${feature.borderColor} transition-all duration-300 pointer-events-none`}
                />
              </CardContent>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />
            </Card>
          ))}
        </div>

        {/* Additional Features Grid - Enhanced */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 relative overflow-hidden group">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group/item cursor-default relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover/item:opacity-5 rounded-2xl transition-opacity duration-300`}
                />

                {/* Icon container */}
                <div className="relative inline-block mb-3">
                  {/* Glow ring */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-0 group-hover/item:opacity-20 blur-lg transition-opacity duration-300`}
                  />
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 group-hover/item:bg-gradient-to-br group-hover/item:from-primary group-hover/item:to-primary/80 transition-all duration-300 shadow-md group-hover/item:shadow-xl group-hover/item:shadow-primary/20 group-hover/item:scale-110">
                    <feature.icon className="h-6 w-6 text-primary group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  {/* Floating emoji */}
                  <span className="absolute -top-1 -right-1 text-sm opacity-0 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300">
                    {feature.emoji}
                  </span>
                </div>

                <h4 className="font-semibold text-foreground text-sm mb-1 group-hover/item:text-primary transition-colors">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual comparison element - Enhanced */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-full shadow-xl px-6 py-4 border border-gray-100 group hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">LINE กลุ่ม</span>
              <span className="text-xs bg-gradient-to-r from-red-100 to-rose-100 text-red-600 px-2.5 py-1 rounded-full font-semibold border border-red-200 shadow-sm">
                สับสน 😵
              </span>
            </div>

            {/* Animated arrow */}
            <div className="relative">
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
              <CalendarCheck className="h-5 w-5" />
              <span className="text-sm">คิดดูก่อน</span>
              <span className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2.5 py-1 rounded-full font-semibold border border-green-200 shadow-sm animate-pulse-subtle">
                ชัดเจน ✨
              </span>
            </div>
          </div>

          {/* Decorative particles */}
          <div className="absolute left-1/4 -bottom-4 w-2 h-2 bg-primary/30 rounded-full animate-bounce" />
          <div className="absolute right-1/4 -bottom-4 w-2 h-2 bg-secondary/30 rounded-full animate-bounce delay-100" />
        </div>
      </div>
    </section>
  );
}
