import { Calendar, Link2, BarChart3 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'สร้างนัด',
    description: 'เลือกวันที่เป็นไปได้ ตั้งชื่อ เพิ่มรายละเอียด — ไม่เกินครึ่งนาที',
  },
  {
    number: '02',
    icon: Link2,
    title: 'แชร์ลิงก์',
    description: 'ก็อปลิงก์ ส่งเข้ากลุ่ม LINE หรือส่งให้ทีละคน ได้ทันที',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'ดูผลสรุป',
    description: 'ระบบรวมคะแนนให้อัตโนมัติ เห็นวันที่ทุกคนโอเคพร้อมกันในหน้าเดียว',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-14 md:mb-20 max-w-2xl">
          <p className="mb-3 text-sm font-medium tracking-widest text-accent">
            ใช้ยังไง
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1] tracking-tight">
            สามจังหวะ
            <br className="sm:hidden" />
            <span className="sm:ml-3">จบในครึ่งนาที</span>
          </h2>
        </div>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step) => (
            <li key={step.number} className="relative flex flex-col gap-3">
              {/* Numeral with hand-drawn chili underline — echoes hero squiggle */}
              <div className="flex items-baseline gap-4 mb-2">
                <span className="relative font-display text-5xl md:text-6xl text-primary tabular-nums tracking-tight leading-none">
                  {step.number}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 80 10"
                    preserveAspectRatio="none"
                    className="absolute left-0 -bottom-2 w-full h-2 text-accent"
                  >
                    <path
                      d="M2 5 C 20 1, 40 8, 60 4 S 76 7, 78 5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <step.icon className="h-5 w-5 text-muted-foreground shrink-0" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-2">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-[32ch]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
