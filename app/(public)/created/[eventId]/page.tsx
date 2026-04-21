'use client'

import { useEffect, useState } from 'react'
import { Button, Card, CardContent } from '@/components/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Copy, Check, AlertTriangle, Share2, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { useCelebration } from '@/hooks/useConfetti'

interface EventCreationData {
  voteUrl: string
  adminUrl: string
  organizerKey: string
  event: {
    id: string
    title: string
    status: string
    createdAt: string
  }
}

export default function CreatedPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const [eventData, setEventData] = useState<EventCreationData | null>(null)
  const [copiedVote, setCopiedVote] = useState(false)
  const [copiedAdmin, setCopiedAdmin] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)

  // Fire celebration confetti when page loads
  useCelebration(500)

  useEffect(() => {
    // Try to get data from sessionStorage
    const storedData = sessionStorage.getItem(`event_${eventId}`)
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData) as EventCreationData
        setEventData(parsed)
        // Clear from sessionStorage after reading
        sessionStorage.removeItem(`event_${eventId}`)
      } catch (e) {
        console.error('Failed to parse event data:', e)
      }
    } else {
      // Fallback: construct URLs if no stored data
      const baseUrl = window.location.origin
      setEventData({
        voteUrl: `${baseUrl}/v/${eventId}`,
        adminUrl: `${baseUrl}/a/${eventId}`,
        organizerKey: '',
        event: {
          id: eventId,
          title: '',
          status: 'OPEN',
          createdAt: new Date().toISOString(),
        },
      })
    }
  }, [eventId])

  const copyToClipboard = async (text: string, type: 'vote' | 'admin' | 'key') => {
    const setCopiedState = () => {
      if (type === 'vote') {
        setCopiedVote(true)
        setTimeout(() => setCopiedVote(false), 2000)
      } else if (type === 'admin') {
        setCopiedAdmin(true)
        setTimeout(() => setCopiedAdmin(false), 2000)
      } else {
        setCopiedKey(true)
        setTimeout(() => setCopiedKey(false), 2000)
      }
    }

    try {
      // Try modern clipboard API first (requires HTTPS or localhost)
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text)
        toast.success('คัดลอกลิงก์เรียบร้อยแล้ว')
        setCopiedState()
        return
      }

      // Fallback for non-secure contexts (e.g., HTTP)
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (successful) {
        toast.success('คัดลอกลิงก์เรียบร้อยแล้ว')
        setCopiedState()
      } else {
        throw new Error('execCommand failed')
      }
    } catch (err) {
      console.error('Copy failed:', err)
      toast.error('ไม่สามารถคัดลอกได้ กรุณาลองใหม่')
    }
  }

  const handleShare = async () => {
    if (!eventData) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: eventData.event.title || 'เชิญร่วมโหวตเลือกเวลา',
          text: `เชิญร่วมโหวตเลือกเวลาสำหรับ${eventData.event.title || 'กิจกรรมนี้'}`,
          url: eventData.voteUrl,
        })
      } catch (err) {
        // User cancelled or share failed - fall back to copy
        copyToClipboard(eventData.voteUrl, 'vote')
      }
    } else {
      copyToClipboard(eventData.voteUrl, 'vote')
    }
  }

  // Generate URLs if we only have the event ID
  const voteUrl = eventData?.voteUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/v/${eventId}`
  const adminUrl = eventData?.adminUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/a/${eventId}`
  const organizerKey = eventData?.organizerKey || ''

  return (
    <main className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-xl">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--chart-3))]/15 text-[hsl(var(--chart-3))] mb-5">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
            สร้างกิจกรรมสำเร็จ!
          </h1>
          <p className="text-muted-foreground mt-3 text-base max-w-sm mx-auto leading-relaxed">
            แชร์ลิงก์ให้เพื่อนมาโหวตกันได้เลย
          </p>
        </div>

        {/* Event Title (if available) */}
        {eventData?.event.title && (
          <Card className="mb-4 border-primary/20 bg-primary/5">
            <CardContent className="py-4 text-center">
              <p className="text-sm text-muted-foreground">กิจกรรม</p>
              <p className="text-lg font-semibold text-foreground">{eventData.event.title}</p>
            </CardContent>
          </Card>
        )}

        {/* Vote Link */}
        <Card className="mb-4">
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <label className="text-sm font-medium text-foreground">
                ลิงก์สำหรับโหวต
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              ส่งลิงก์นี้ให้เพื่อนเพื่อมาโหวตเลือกเวลาที่สะดวก
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={voteUrl}
                className="flex-1 rounded-xl border border-input bg-muted px-4 py-2.5 text-muted-foreground text-sm truncate"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => copyToClipboard(voteUrl, 'vote')}
                className="shrink-0"
              >
                {copiedVote ? <Check className="h-4 w-4 text-[hsl(var(--chart-3))]" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleShare}
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                แชร์ลิงก์
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Admin Link & Key */}
        <Card className="mb-6 border-amber-200 bg-amber-50/50">
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-amber-600" />
              <label className="text-sm font-medium text-foreground">
                ลิงก์สำหรับแอดมิน
              </label>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 bg-amber-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>สำคัญ:</strong> เก็บลิงก์นี้ไว้เป็นความลับ หากทำลิงก์หายจะไม่สามารถเข้ามาจัดการกิจกรรมได้อีก
              </p>
            </div>

            {/* Admin URL */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">ลิงก์แอดมิน</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={adminUrl}
                  className="flex-1 rounded-xl border border-input bg-muted px-4 py-2.5 text-muted-foreground text-sm truncate"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => copyToClipboard(adminUrl, 'admin')}
                  className="shrink-0"
                >
                  {copiedAdmin ? <Check className="h-4 w-4 text-[hsl(var(--chart-3))]" strokeWidth={2.5} /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Organizer Key */}
            {organizerKey && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">รหัสแอดมิน (สำรอง)</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={organizerKey}
                    className="flex-1 rounded-lg border border-input bg-muted px-4 py-2.5 text-muted-foreground text-sm font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => copyToClipboard(organizerKey, 'key')}
                    className="shrink-0"
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-[hsl(var(--chart-3))]" strokeWidth={2.5} /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/v/${eventId}`} className="flex-1">
            <Button size="lg" className="w-full">
              ไปหน้าโหวต
            </Button>
          </Link>
          <Link href={`/a/${eventId}${organizerKey ? `?k=${organizerKey}` : ''}`} className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              ไปหน้าแอดมิน
            </Button>
          </Link>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline text-sm">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  )
}
