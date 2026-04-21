import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display mb-5 text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
          พร้อมสร้างนัดแรก?
        </h2>

        <p className="mb-10 text-base md:text-lg text-primary-foreground/85 max-w-xl mx-auto leading-relaxed">
          ใช้เวลาประมาณ 30 วินาที ไม่ต้องสมัคร ไม่ต้องจำรหัสผ่าน
          <br className="hidden sm:block" />
          ส่งลิงก์ให้เพื่อนได้ทันที
        </p>

        <Button
          asChild
          size="lg"
          className="h-14 rounded-xl px-10 text-base md:text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-md"
        >
          <Link href="/create">
            สร้างนัดเลย
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
