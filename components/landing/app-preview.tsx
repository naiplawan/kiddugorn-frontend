'use client'

import { CheckCircle2, HelpCircle, XCircle, Users, Calendar, Clock, ArrowRight } from 'lucide-react'

// Mock voting data for preview
const mockDates = [
  { date: 'เสาร์ 15 มี.ค.', shortDate: '15 มี.ค.' },
  { date: 'อาทิตย์ 16 มี.ค.', shortDate: '16 มี.ค.' },
  { date: 'เสาร์ 22 มี.ค.', shortDate: '22 มี.ค.' },
]

const mockVotes = [
  { name: 'สมชาย', votes: ['yes', 'yes', 'maybe'] },
  { name: 'สมหญิง', votes: ['yes', 'no', 'yes'] },
  { name: 'สมศักดิ์', votes: ['maybe', 'yes', 'no'] },
  { name: 'สมนึก', votes: ['yes', 'maybe', 'yes'] },
]

const voteIcons = {
  yes: { icon: CheckCircle2, color: 'bg-green-100 text-green-600', bg: 'bg-green-500' },
  no: { icon: XCircle, color: 'bg-red-100 text-red-600', bg: 'bg-red-500' },
  maybe: { icon: HelpCircle, color: 'bg-amber-100 text-amber-600', bg: 'bg-amber-500' },
}

export function AppPreview() {
  return (
    <section className="bg-background py-20 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Calendar className="h-4 w-4" />
            ดูตัวอย่างการใช้งาน
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            หน้าจอโหวตที่ใช้งานง่าย
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            เพื่อนๆ ของคุณสามารถโหวตได้ในคลิกเดียว ไม่ต้องสมัคร ไม่ต้องกรอกอะไรให้ยุ่งยาก
          </p>
        </div>

        {/* App Preview Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden border border-gray-100">
            {/* App Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">ไปกินชาบูกันไหม?</h3>
                    <p className="text-xs text-white/70">หารเท่ากันนะ</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                  <Users className="h-3 w-3" />
                  <span className="text-xs">4 คน</span>
                </div>
              </div>
            </div>

            {/* Voting Grid Preview */}
            <div className="p-4">
              {/* Date Headers */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="text-xs text-muted-foreground p-2"></div>
                {mockDates.map((d) => (
                  <div
                    key={d.shortDate}
                    className="text-center p-2 bg-muted/50 rounded-lg"
                  >
                    <p className="text-xs font-medium text-foreground">{d.shortDate}</p>
                  </div>
                ))}
              </div>

              {/* Vote Rows */}
              {mockVotes.map((voter, i) => (
                <div key={voter.name} className="grid grid-cols-4 gap-2 mb-2">
                  <div className="flex items-center gap-2 p-2">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium
                      ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-amber-500' : i === 2 ? 'bg-green-500' : 'bg-rose-500'}`}
                    >
                      {voter.name[0]}
                    </div>
                    <span className="text-sm font-medium text-foreground hidden sm:block">{voter.name}</span>
                  </div>
                  {voter.votes.map((vote, j) => {
                    const voteData = voteIcons[vote as keyof typeof voteIcons]
                    const Icon = voteData.icon
                    return (
                      <div
                        key={j}
                        className={`flex items-center justify-center p-2 rounded-xl ${voteData.color} transition-transform hover:scale-110 cursor-pointer`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    )
                  })}
                </div>
              ))}

              {/* Summary Row */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t">
                <div className="text-xs text-muted-foreground p-2">สรุป</div>
                {[
                  { yes: 3, maybe: 1 },
                  { yes: 2, maybe: 1, no: 1 },
                  { yes: 2, maybe: 1, no: 1 },
                ].map((summary, i) => (
                  <div key={i} className="p-2">
                    <div className="flex gap-1 mb-1">
                      {summary.yes && (
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                          {summary.yes}
                        </span>
                      )}
                      {summary.maybe && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                          {summary.maybe}
                        </span>
                      )}
                      {summary.no && (
                        <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          {summary.no}
                        </span>
                      )}
                    </div>
                    {i === 0 && (
                      <p className="text-xs text-green-600 font-medium">
                        เหมาะที่สุด
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vote Input Section */}
            <div className="p-4 bg-muted/30 border-t">
              <p className="text-sm text-muted-foreground mb-3">โหวตของคุณ (สมศักษิต):</p>
              <div className="flex gap-3">
                {[
                  { label: 'ไปได้', icon: CheckCircle2, color: 'bg-green-500 hover:bg-green-600' },
                  { label: 'คิดดูก่อน', icon: HelpCircle, color: 'bg-amber-500 hover:bg-amber-600' },
                  { label: 'ไปไม่ได้', icon: XCircle, color: 'bg-red-500 hover:bg-red-600' },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className={`flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-xl transition-all ${btn.color}`}
                  >
                    <btn.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="/create"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            ลองสร้างนัดดู
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
