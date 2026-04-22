import { Button } from '@/components/ui'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export function AccessDenied() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-card rounded-xl shadow-sm border p-8">
          <h1 className="font-display text-2xl text-foreground mb-2 tracking-tight">ไม่มีสิทธิ์เข้าถึง</h1>
          <p className="text-muted-foreground mb-4">กรุณาใช้ลิงก์แอดมินที่ถูกต้อง</p>
          <Link href="/">
            <Button>กลับหน้าหลัก</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export function PageLoader() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </main>
  )
}

export function NotFound({ message = 'กิจกรรมนี้อาจถูกลบหรือหมดอายุแล้ว' }: { message?: string }) {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-card rounded-xl shadow-sm border p-8">
          <h1 className="font-display text-2xl text-foreground mb-2 tracking-tight">ไม่พบกิจกรรม</h1>
          <p className="text-muted-foreground mb-4">{message}</p>
          <Link href="/">
            <Button>กลับหน้าหลัก</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
