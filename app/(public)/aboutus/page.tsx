import { Card, CardContent } from '@/components/ui'
import { Calendar, Users, Shield, Sparkles, Heart, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
            <Calendar className="h-7 w-7 text-primary" strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3 tracking-tight">
            เกี่ยวกับ คิดดูก่อน
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            แอปจัดการนัดหมายและโหวตเลือกเวลาที่สะดวกที่สุด โดยไม่ต้องสมัครสมาชิก
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              พันธกิจของเรา
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              เราเชื่อว่าการนัดหมายไม่ควรเป็นเรื่องยาก ทีมงานของเราสร้าง <strong className="text-foreground">คิดดูก่อน</strong> เพื่อให้ทุกคนสามารถจัดการนัดหมายกับเพื่อน ครอบครัว หรือเพื่อนร่วมงานได้อย่างง่ายดาย ไม่ต้องสมัครสมาชิก ไม่ต้องจดจำรหัสผ่าน เพียงสร้างกิจกรรมและแชร์ลิงก์ให้ทุกคนมาโหวตเลือกเวลาที่สะดวก
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <FeatureCard
            icon={Clock}
            title="ประหยัดเวลา"
            description="ไม่ต้องคุยกันหลายรอบ ให้ทุกคนโหวตเลือกเวลาที่สะดวกได้ในที่เดียว"
          />
          <FeatureCard
            icon={Users}
            title="ง่ายสำหรับทุกคน"
            description="ไม่ต้องสมัครสมาชิก เข้าร่วมโหวตได้ทันทีเพียงคลิกลิงก์"
          />
          <FeatureCard
            icon={Shield}
            title="เป็นส่วนตัว"
            description="ไม่เก็บข้อมูลส่วนบุคคล ไม่ต้องใช้อีเมลหรือเบอร์โทรศัพท์"
          />
          <FeatureCard
            icon={Heart}
            title="ฟรีตลอดกาล"
            description="ใช้งานได้ฟรีทุกฟีเจอร์ ไม่มีค่าใช้จ่ายแอบแฝง"
          />
        </div>

        {/* How it works */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6">วิธีใช้งาน</h2>
            <div className="space-y-4">
              <StepItem
                step={1}
                title="สร้างกิจกรรม"
                description="กรอกชื่อกิจกรรมและเลือกวันที่เป็นไปได้หลายวัน"
              />
              <StepItem
                step={2}
                title="แชร์ลิงก์"
                description="ส่งลิงก์ให้เพื่อนหรือคนที่ต้องการเชิญ"
              />
              <StepItem
                step={3}
                title="รอโหวต"
                description="ทุกคนโหวตเลือกเวลาที่สะดวกได้ด้วยตัวเอง"
              />
              <StepItem
                step={4}
                title="สรุปผล"
                description="ดูผลโหวตและเลือกวันที่เหมาะสมที่สุด"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-primary/20">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">ติดต่อเรา</h2>
            <p className="text-muted-foreground mb-4">
              มีคำถามหรือข้อเสนอแนะ? เรายินดีที่จะรับฟัง
            </p>
            <a
              href="mailto:hello@kiddugorn.com"
              className="text-primary hover:underline font-medium"
            >
              hello@kiddugorn.com
            </a>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StepItem({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold text-sm">
        {step}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
