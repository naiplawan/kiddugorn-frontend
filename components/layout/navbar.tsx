'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/auth/context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, User, Settings, CreditCard, LogOut, Crown } from 'lucide-react'
import { ProBadge } from '@/components/subscription/pro-badge'

export function Navbar() {
  const { user, subscription, isAuthenticated, isLoading, logout } = useAuth()

  const isPro = subscription && subscription.tier !== 'FREE'

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 overflow-hidden group-hover:shadow-xl transition-shadow">
            <Image
              src="/logo.png"
              alt="Kiddugorn"
              fill
              className="object-contain p-1.5"
            />
          </div>
          <span className="text-xl font-bold hidden sm:inline">คิดดูก่อน</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            ราคา
          </Link>
          <Link href="/aboutus" className="text-muted-foreground hover:text-foreground transition-colors">
            เกี่ยวกับเรา
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          <Link href="/create">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">สร้างกิจกรรม</span>
            </Button>
          </Link>

          {isLoading ? (
            <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl || undefined} alt={user.name || user.email} />
                    <AvatarFallback>
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isPro && (
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <ProBadge size="sm" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user.name || 'ผู้ใช้'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {isPro && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Crown className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs font-medium text-amber-600">
                        {subscription?.tier.replace('PRO_', 'Pro ')}
                      </span>
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/my-events" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    กิจกรรมของฉัน
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/subscription" className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    การสมัครสมาชิก
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    ตั้งค่า
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  เข้าสู่ระบบ
                </Button>
              </Link>
              <Link href="/register" className="hidden sm:block">
                <Button variant="outline" size="sm">
                  สมัครสมาชิก
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
