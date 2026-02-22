'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            คิดดูก่อน
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/create"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              สร้างกิจกรรม
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
