import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

type VoteRow = {
  day: string
  votes: number
  fill: number
  delay: number
  winner?: boolean
}

const voteRows: VoteRow[] = [
  { day: 'เสาร์ 15 มี.ค.', votes: 8, fill: 1.0, delay: 200, winner: true },
  { day: 'อาทิตย์ 16 มี.ค.', votes: 5, fill: 0.62, delay: 280 },
  { day: 'เสาร์ 22 มี.ค.', votes: 3, fill: 0.38, delay: 360 },
]

const voters = [
  { initial: 'ก', color: 'bg-primary text-primary-foreground' },
  { initial: 'ข', color: 'bg-secondary text-secondary-foreground' },
  { initial: 'ค', color: 'bg-accent text-accent-foreground' },
  { initial: 'ง', color: 'bg-[hsl(var(--chart-3))] text-white' },
]

function HeadlineSquiggle() {
  // Hand-drawn underline under "10 วินาที" — static, no animation.
  // Reference to Thai shop-sign paint stroke.
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute left-0 -bottom-2 w-full h-3 text-accent"
    >
      <path
        d="M3 8 C 40 2, 80 12, 120 6 S 200 10, 217 5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function VotingCardPreview() {
  return (
    <div className="relative w-full max-w-md">
      {/* Single warm card — no shimmer, no glow rings, no corner sparkles */}
      <div className="bg-card rounded-xl border border-border shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)] p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-contain p-1.5"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-base leading-tight truncate">
              ไปกินชาบูกันไหม?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              โหวตอยู่ · 3 วันให้เลือก
            </p>
          </div>
        </div>

        {/* Vote rows */}
        <ul className="space-y-2.5 mb-5">
          {voteRows.map((row) => (
            <li
              key={row.day}
              className={`relative rounded-xl border overflow-hidden ${
                row.winner
                  ? 'border-accent/40 bg-accent/[0.04]'
                  : 'border-border bg-muted/40'
              }`}
            >
              {/* Progress fill — the one motion moment */}
              <div
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 right-0 animate-vote-fill ${
                  row.winner ? 'bg-accent/15' : 'bg-foreground/[0.05]'
                }`}
                style={
                  {
                    '--fill': row.fill,
                    '--delay': `${row.delay}ms`,
                  } as React.CSSProperties
                }
              />

              {/* Row content */}
              <div className="relative flex items-center justify-between gap-3 px-3.5 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 ${
                      row.winner
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-background text-muted-foreground border border-border'
                    }`}
                  >
                    {row.winner ? (
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                    ) : (
                      <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                    )}
                  </span>
                  <span
                    className={`text-sm font-medium truncate ${
                      row.winner ? 'text-foreground' : 'text-foreground/80'
                    }`}
                  >
                    {row.day}
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold tabular-nums shrink-0 px-2 py-0.5 rounded-full ${
                    row.winner
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background text-muted-foreground'
                  }`}
                >
                  {row.votes} คน
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Voters */}
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-1.5">
            {voters.map((v) => (
              <span
                key={v.initial}
                className={`h-7 w-7 rounded-full ${v.color} border-2 border-card flex items-center justify-center text-xs font-semibold`}
              >
                {v.initial}
              </span>
            ))}
            <span className="h-7 w-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground">
              +4
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            8 คนโหวตแล้ว
          </span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="bg-background px-4 pt-10 md:pt-16 pb-20 md:pb-28">
      <div className="container mx-auto max-w-6xl">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5 mb-12 md:mb-20">
          <Image
            src="/logo.png"
            alt="Kiddugorn logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-xl md:text-2xl text-foreground tracking-tight">
            คิดดูก่อน
          </span>
        </div>

        {/* Content grid — asymmetric, left-weighted */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Text */}
          <div className="md:col-span-7">
            <h1 className="font-display text-[2.75rem] leading-[1.05] md:text-[4rem] md:leading-[1.02] lg:text-[4.75rem] text-foreground tracking-tight mb-6">
              นัดเพื่อน
              <br />
              จบใน{' '}
              <span className="relative inline-block whitespace-nowrap">
                10 วินาที
                <HeadlineSquiggle />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[46ch] mb-8 md:mb-10">
              สร้างลิงก์โหวต ส่งเข้ากลุ่ม LINE เพื่อนเลือกวันที่ว่าง
              ระบบสรุปผลให้เอง — ไม่ต้องทะเลาะกันว่านัดวันไหน
            </p>

            {/* Primary CTA + secondary text link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-xl px-8 text-base md:text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-md w-full sm:w-auto"
              >
                <Link href="/create">
                  สร้างนัดเลย
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Link
                href="/create?demo=true"
                className="text-base text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors self-center sm:self-auto"
              >
                หรือดูตัวอย่างก่อน
              </Link>
            </div>

            {/* Honest trust line — no fake numbers */}
            <p className="text-sm text-muted-foreground">
              ฟรี · ไม่ต้องสมัคร · ไม่ต้องจำรหัส
            </p>
          </div>

          {/* Product preview */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <VotingCardPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
