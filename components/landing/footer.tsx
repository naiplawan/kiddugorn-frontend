'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Github, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = [
  { label: 'เกี่ยวกับเรา', href: '/aboutus' },
  { label: 'ราคา', href: '/pricing' },
  { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-green-500" />

      <div className="container mx-auto max-w-5xl px-4 py-12 relative">
        {/* Main Footer Content */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center justify-center gap-3 md:justify-start mb-2">
              <Image
                src="/logo.png"
                alt="Kiddugorn Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <h3 className="text-xl font-bold">คิดดูก่อน</h3>
            </Link>
            <p className="text-sm text-background/60">
              นัดเพื่อนง่ายๆ ไม่ต้องสมัคร
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-background/70 transition-colors hover:text-background hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@kiddugorn.com"
              className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center text-background/70 hover:bg-background/20 hover:text-background transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg bg-background/10 flex items-center justify-center text-background/70 hover:bg-background/20 hover:text-background transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <Separator className="mb-8 bg-background/20" />

        {/* Copyright */}
        <div className="text-center text-sm text-background/50">
          <p>
            &copy; {currentYear} Kiddugorn. All rights reserved.
          </p>
          <p className="mt-1 flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-400 inline" /> in Thailand
          </p>
        </div>
      </div>
    </footer>
  )
}
