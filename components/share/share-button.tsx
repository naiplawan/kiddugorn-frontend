'use client'

import { useState, useCallback } from 'react'
import { Share2, Copy, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

interface ShareButtonProps {
  eventId: string
  title: string
  dateCount: number
  voteCount: number
  bestDate?: string
}

export function ShareButton({
  eventId,
  title,
  dateCount,
  voteCount,
  bestDate,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const voteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/v/${eventId}`
    : `/v/${eventId}`

  // Generate OG image URL
  const ogImageUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/events/${eventId}/og?${new URLSearchParams({
        title: title,
        dates: dateCount.toString(),
        votes: voteCount.toString(),
        ...(bestDate && { best: bestDate }),
      })}`
    : ''

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(voteUrl)
      setCopied(true)
      toast({ title: 'คัดลอกลิงก์แล้ว' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: 'คัดลอกไม่สำเร็จ',
        variant: 'destructive',
      })
    }
  }, [voteUrl, toast])

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - คิดดูก่อน`,
          text: `ช่วยโหวตเลือกวันที่สะดวกสำหรับ "${title}" หน่อย!`,
          url: voteUrl,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      setIsOpen(true)
    }
  }, [title, voteUrl])

  const handleDownloadImage = useCallback(async () => {
    try {
      const response = await fetch(ogImageUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title}-share.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({ title: 'ดาวน์โหลดรูปภาพแล้ว' })
    } catch {
      toast({
        title: 'ดาวน์โหลดไม่สำเร็จ',
        variant: 'destructive',
      })
    }
  }, [ogImageUrl, title, toast])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="gap-1.5"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">แชร์</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>แชร์กิจกรรม</DialogTitle>
            <DialogDescription>
              ส่งลิงก์ให้เพื่อนมาโหวต หรือแชร์รูปภาพได้เลย
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Preview Image */}
            {ogImageUrl && (
              <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src={ogImageUrl}
                  alt="Share card preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Copy Link */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm truncate">
                {voteUrl}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[hsl(var(--chart-3))]" strokeWidth={2.5} />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDownloadImage}
              >
                <Download className="h-4 w-4 mr-2" />
                ดาวน์โหลดรูป
              </Button>
              <Button
                className="flex-1"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    คัดลอกแล้ว
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    คัดลอกลิงก์
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
