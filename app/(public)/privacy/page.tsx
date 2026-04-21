import { Card, CardContent } from '@/components/ui'
import { Shield, Lock, Eye, Database, Trash2, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
            <Shield className="h-7 w-7 text-primary" strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3 tracking-tight">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-muted-foreground">
            อัปเดตล่าสุด: กุมภาพันธ์ 2569
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="p-6 md:p-8">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">คิดดูก่อน</strong> ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งานเป็นอย่างยิ่ง เอกสารนี้อธิบายว่าเราเก็บรวบรวม ใช้ และปกป้องข้อมูลของคุณอย่างไร
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-4">
          <PrivacySection
            icon={Database}
            title="ข้อมูลที่เราเก็บรวบรวม"
            content={
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">ข้อมูลกิจกรรม:</strong> ชื่อกิจกรรม รายละเอียด วันที่ และตัวเลือกเวลา</li>
                <li><strong className="text-foreground">ข้อมูลการโหวต:</strong> ชื่อผู้โหวตและคำตอบของแต่ละวัน</li>
                <li><strong className="text-foreground">ข้อมูลทางเทคนิค:</strong> ที่อยู่ IP (ชั่วคราว) เพื่อป้องกันการใช้งานในทางที่ผิด</li>
              </ul>
            }
          />

          <PrivacySection
            icon={Eye}
            title="ข้อมูลที่เราไม่เก็บ"
            content={
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>รหัสผ่าน (ไม่ต้องสมัครสมาชิก)</li>
                <li>ที่อยู่อีเมล (เว้นแต่ระบุไว้ในข้อมูลผู้สร้าง)</li>
                <li>เบอร์โทรศัพท์</li>
                <li>ข้อมูลการเงิน</li>
                <li>ข้อมูลตำแหน่งที่ตั้ง</li>
              </ul>
            }
          />

          <PrivacySection
            icon={Lock}
            title="การใช้ข้อมูล"
            content={
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>จัดเก็บและแสดงผลกิจกรรมและผลโหวต</li>
                <li>สร้างลิงก์สำหรับแชร์และจัดการกิจกรรม</li>
                <li>ป้องกันการใช้งานระบบในทางที่ผิด</li>
                <li>ปรับปรุงประสบการณ์ผู้ใช้งาน</li>
              </ul>
            }
          />

          <PrivacySection
            icon={Shield}
            title="การรักษาความปลอดภัย"
            content={
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>เข้ารหัสการส่งข้อมูลด้วย HTTPS</li>
                <li>จัดเก็บข้อมูลในฐานข้อมูลที่มีความปลอดภัย</li>
                <li>ใช้ระบบยืนยันตัวตนด้วย Token สำหรับการจัดการ</li>
                <li>ลบข้อมูลอัตโนมัติเมื่อกิจกรรมหมดอายุ</li>
              </ul>
            }
          />

          <PrivacySection
            icon={Trash2}
            title="การเก็บรักษาและการลบข้อมูล"
            content={
              <div className="space-y-3 text-muted-foreground">
                <p>กิจกรรมที่ไม่มีการใช้งานจะถูกลบโดยอัตโนมัติหลังจาก <strong className="text-foreground">30 วัน</strong></p>
                <p>ผู้สร้างกิจกรรมสามารถลบกิจกรรมได้ทุกเมื่อผ่านหน้าแอดมิน</p>
                <p>หากต้องการลบข้อมูลส่วนบุคคล สามารถติดต่อเราได้ที่อีเมลด้านล่าง</p>
              </div>
            }
          />

          <PrivacySection
            icon={Mail}
            title="ติดต่อเรา"
            content={
              <div className="text-muted-foreground">
                <p className="mb-2">หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว สามารถติดต่อเราได้ที่:</p>
                <a
                  href="mailto:privacy@kiddugorn.com"
                  className="text-primary hover:underline font-medium"
                >
                  privacy@kiddugorn.com
                </a>
              </div>
            }
          />
        </div>

        {/* Cookie Notice */}
        <Card className="mt-6 border-amber-200 bg-amber-50/50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-amber-800 mb-2">การใช้คุกกี้</h3>
            <p className="text-sm text-amber-700">
              เราใช้คุกกี้เพื่อจดจำการตั้งค่าของผู้ใช้ (เช่น ภาษา) และเก็บ Token สำหรับการแก้ไขโหวตของคุณ เราไม่ใช้คุกกี้เพื่อการติดตามหรือโฆษณา
            </p>
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

function PrivacySection({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-3">{title}</h2>
            {content}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
