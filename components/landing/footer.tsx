import Link from 'next/link'
import Image from 'next/image'
import { Heart, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = [
  { label: 'เกี่ยวกับเรา', href: '/aboutus' },
  { label: 'ราคา', href: '/pricing' },
  { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="h-px bg-background/15" />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center gap-3 md:justify-start mb-2">
              <Image
                src="/logo.png"
                alt="คิดดูก่อน"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-display text-xl tracking-tight">คิดดูก่อน</span>
            </Link>
            <p className="text-sm text-background/60">
              นัดเพื่อนง่าย ๆ ไม่ต้องสมัคร
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-background/70 hover:text-background hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:contact@kiddugorn.com"
              className="h-9 w-9 rounded-xl bg-background/10 flex items-center justify-center text-background/70 hover:bg-background/20 hover:text-background transition-colors"
              aria-label="ส่งอีเมลหาเรา"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Separator className="mb-8 bg-background/15" />

        <div className="text-center text-sm text-background/50">
          <p>สงวนลิขสิทธิ์ &copy; {currentYear} คิดดูก่อน</p>
          <p className="mt-1 inline-flex items-center gap-1">
            ทำด้วย <Heart className="h-3.5 w-3.5 text-accent fill-accent" /> ในประเทศไทย
          </p>
        </div>
      </div>
    </footer>
  )
}
