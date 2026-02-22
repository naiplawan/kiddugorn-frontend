'use client'

import { Check, X, ArrowRight, MessageCircle, CalendarCheck, Clock, Users, CheckCircle2, XCircle, Sparkles, Zap, Globe, Smartphone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const comparisonFeatures = [
  {
    feature: 'สรุปผลโหวตอัตโนมัติ',
    kiddugorn: true,
    line: false,
    description: 'เห็นวันที่เหมาะสมที่สุดทันที',
    icon: '📊',
  },
  {
    feature: 'ไม่ต้องสมัครสมาชิก',
    kiddugorn: true,
    line: false,
    description: 'ทุกคนใช้ได้ทันที',
    icon: '🚀',
  },
  {
    feature: 'โหวต 3 ตัวเลือก (โอเค/คิดดูก่อน/ไม่ได้)',
    kiddugorn: true,
    line: false,
    description: 'ไม่กดดัน ยืดหยุ่นกว่า',
    icon: '💭',
  },
  {
    feature: 'โหวตหลายวันพร้อมกัน',
    kiddugorn: true,
    line: false,
    description: 'เลือกวันที่เป็นไปได้ทั้งหมด',
    icon: '📅',
  },
  {
    feature: 'เห็นภาพรวมทีเดียว',
    kiddugorn: true,
    line: false,
    description: 'ตารางแสดงผลชัดเจน',
    icon: '👀',
  },
  {
    feature: 'รองรับภาษาไทย 100%',
    kiddugorn: true,
    line: true,
    description: 'UI และวันที่แบบไทย',
    icon: '🇹🇭',
  },
  {
    feature: 'ใช้ได้ทุกแพลตฟอร์ม',
    kiddugorn: true,
    line: false,
    description: 'ไม่จำกัดแค่ LINE',
    icon: '🌐',
  },
  {
    feature: 'แชร์ลิงก์ง่าย',
    kiddugorn: true,
    line: true,
    description: 'ส่งลิงก์ได้ทุกช่องทาง',
    icon: '🔗',
  },
]

const painPoints = [
  {
    icon: MessageCircle,
    title: 'คุยกันยาว ไม่จบ',
    description: 'ถามทีละคน "วันไหนว่าง?" คุยกันเป็นชั่วโมง',
    emoji: '😫',
    color: 'from-red-100 to-rose-100',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500',
  },
  {
    icon: Users,
    title: 'สับสน สรุปยาก',
    description: 'ใครว่างวันไหนบ้าง? ต้องนั่งจดทีละคน',
    emoji: '😵',
    color: 'from-amber-100 to-orange-100',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-500',
  },
  {
    icon: Clock,
    title: 'เสียเวลา',
    description: 'ใช้เวลานานกว่าจะได้วันที่ตกลงกันได้',
    emoji: '⏰',
    color: 'from-purple-100 to-violet-100',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-500',
  },
]

export function Comparison() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background py-20 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">💬</div>
        <div className="absolute bottom-20 right-10 text-4xl opacity-20 animate-float-delayed">📅</div>
        <div className="absolute top-1/3 right-20 text-3xl opacity-15 animate-bounce-slow">✅</div>

        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center relative">
          {/* Floating badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-full hidden md:block">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg animate-bounce-subtle flex items-center gap-2">
              <XCircle className="h-3 w-3" />
              หยุดทรมาน!
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-rose-100 text-red-600 rounded-full px-5 py-2 text-sm font-medium mb-4 shadow-sm border border-red-200">
            <XCircle className="h-4 w-4 animate-pulse" />
            เลิกนัดกันยาก!
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl relative inline-block">
            นัดใน LINE กลุ่ม vs คิดดูก่อน
            {/* VS badge */}
            <span className="absolute -right-12 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg hidden md:inline-block">
              VS
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-4">
            ทำไมต้องเสียเวลาคุยกันยาว ในเมื่อมีทางเลือกที่ดีกว่า
          </p>
        </div>

        {/* Pain Points - Enhanced */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {painPoints.map((point, index) => (
            <Card
              key={point.title}
              className={`border-2 ${point.borderColor} bg-gradient-to-br ${point.color} group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden relative`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <CardContent className="p-5 text-center relative">
                {/* Floating emoji */}
                <span className="absolute top-2 right-2 text-2xl opacity-50 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {point.emoji}
                </span>

                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ${point.iconColor} mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className={`font-semibold mb-1 ${point.iconColor.replace('text-', 'text-').replace('-500', '-700')}`}>{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table - Enhanced */}
        <Card className="border-0 shadow-2xl overflow-hidden relative">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          <CardContent className="p-0 relative">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-muted/80 to-muted/50">
              <div className="p-5 text-center relative">
                <span className="text-sm font-medium text-muted-foreground">Feature</span>
              </div>
              <div className="p-5 text-center bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                <div className="flex items-center justify-center gap-2 mb-1 relative">
                  <CalendarCheck className="h-5 w-5" />
                  <span className="font-bold">คิดดูก่อน</span>
                </div>
                <span className="text-xs text-white/70 relative">แนะนำ!</span>
                {/* Decorative corner */}
                <Sparkles className="absolute top-2 right-2 w-4 h-4 text-white/30" />
              </div>
              <div className="p-5 text-center relative">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-foreground">LINE กลุ่ม</span>
                </div>
                <span className="text-xs text-muted-foreground">แบบเดิม</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-muted/50">
              {comparisonFeatures.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 hover:bg-muted/20 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="p-4 flex items-center gap-2">
                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <span className="text-sm font-medium text-foreground">{item.feature}</span>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    {item.kiddugorn ? (
                      <div className="flex items-center gap-2 group/yes">
                        <div className="relative">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200 group-hover/yes:scale-110 group-hover/yes:rotate-12 transition-all duration-300">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          {/* Glow */}
                          <div className="absolute inset-0 h-7 w-7 rounded-full bg-green-400/50 blur-md opacity-0 group-hover/yes:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xs text-muted-foreground hidden lg:block group-hover/yes:text-green-600 transition-colors">
                          {item.description}
                        </span>
                      </div>
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                        <X className="h-4 w-4 text-red-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center group-hover:bg-muted/30 transition-colors">
                    {item.line ? (
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    ) : (
                      <div className="relative group/no">
                        <div className="h-7 w-7 rounded-full bg-red-100 flex items-center justify-center shadow-sm group-hover/no:bg-red-200 group-hover/no:scale-110 transition-all">
                          <X className="h-4 w-4 text-red-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-muted/80 to-muted/50 border-t">
              <div className="p-5"></div>
              <div className="p-5 text-center bg-primary/10 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
                <a
                  href="/create"
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105"
                >
                  <Zap className="h-4 w-4 group-hover:animate-pulse" />
                  ลองใช้เลย
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="p-5 text-center">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  หรือจะคุยกันต่อ? 😅
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun fact - Enhanced */}
        <div className="mt-10 flex justify-center">
          <div className="group inline-flex items-center gap-4 bg-white rounded-full shadow-xl px-8 py-4 border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 hover:scale-105 cursor-default relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="text-3xl animate-bounce-subtle">⏱️</span>
            <div className="text-left relative">
              <p className="text-sm text-muted-foreground">ประหยัดเวลาได้ถึง</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold text-primary">85%</p>
                <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
              </div>
            </div>
            <span className="text-sm text-muted-foreground">เทียบกับการนัดใน LINE กลุ่ม</span>

            {/* Decorative particles */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-100" />
          </div>
        </div>

        {/* International Apps Comparison */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 rounded-full px-5 py-2 text-sm font-medium mb-4 shadow-sm border border-blue-200">
              <Globe className="h-4 w-4" />
              เปรียบเทียบกับแอปต่างประเทศ
            </div>
            <h3 className="text-xl font-bold text-foreground">
              ทำไมต้องใช้คิดดูก่อนแทน Doodle หรือ Calendly?
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Kiddugorn Card */}
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                แนะนำ!
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <CalendarCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">คิดดูก่อน</h4>
                    <p className="text-xs text-muted-foreground">🇹🇭 สำหรับคนไทย</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    'ราคา ฿149/เดือน (ถูกกว่า 40%)',
                    'ภาษาไทย + ปีพุทธศักราช',
                    'UI ออกแบบสำหรับคนไทย',
                    'โหวต 3 ตัวเลือก (โอเค/คิดดูก่อน/ไม่ได้)',
                    'ใช้ได้ทันที ไม่ต้องสมัคร',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-2xl font-bold text-primary">฿149<span className="text-sm font-normal text-muted-foreground">/เดือน</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Doodle Card */}
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Doodle</h4>
                    <p className="text-xs text-muted-foreground">🇨🇭 สวิตเซอร์แลนด์</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { text: 'ราคา $6.95/เดือน (~฿250)', check: false },
                    { text: 'ภาษาอังกฤษหลัก', check: false },
                    { text: 'UI แบบตะวันตก', check: false },
                    { text: 'โหวต 2 ตัวเลือก', check: true },
                    { text: 'ต้องสมัครสมาชิก', check: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {item.check ? (
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={item.check ? '' : 'text-muted-foreground'}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-2xl font-bold text-foreground">$6.95<span className="text-sm font-normal text-muted-foreground">/เดือน</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Calendly Card */}
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Calendly</h4>
                    <p className="text-xs text-muted-foreground">🇺🇸 อเมริกา</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { text: 'ราคา $8/เดือน (~฿290)', check: false },
                    { text: 'ภาษาอังกฤษหลัก', check: false },
                    { text: 'สำหรับนัด 1:1 ไม่ใช่กลุ่ม', check: false },
                    { text: 'ซับซ้อนเกินไป', check: false },
                    { text: 'ต้องสมัครสมาชิก', check: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {item.check ? (
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={item.check ? '' : 'text-muted-foreground'}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-2xl font-bold text-foreground">$8<span className="text-sm font-normal text-muted-foreground">/เดือน</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price advantage callout */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3">
              <span className="text-2xl">💰</span>
              <span className="text-sm text-green-700">
                <strong>คิดดูก่อนถูกกว่า 40-60%</strong> เมื่อเทียบกับแอปต่างประเทศ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
