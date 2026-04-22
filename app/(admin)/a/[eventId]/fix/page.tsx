'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AccessDenied, PageLoader } from '@/components/shared'
import { useAdminEvent } from '@/hooks/use-admin-event'
import { useToast } from '@/hooks/use-toast'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { eventApi, getThaiErrorMessage } from '@/lib/api/client'
import { fireSuccessConfetti } from '@/lib/utils/confetti'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function FixDatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { event, isLoading, hasAccess, eventId, organizerKey } = useAdminEvent()

  const preselectedDateId = searchParams.get('dateId')
  const [selectedDateIds, setSelectedDateIds] = useState<string[]>(preselectedDateId ? [preselectedDateId] : [])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isFixing, setIsFixing] = useState(false)

  useEffect(() => {
    if (event?.fixedDateIds && event.fixedDateIds.length > 0) {
      setSelectedDateIds(event.fixedDateIds)
    }
  }, [event?.fixedDateIds])

  const toggleDateSelection = (dateId: string) => {
    setSelectedDateIds(prev =>
      prev.includes(dateId)
        ? prev.filter(id => id !== dateId)
        : [...prev, dateId]
    )
  }

  const handleFixDate = async () => {
    if (!organizerKey || selectedDateIds.length === 0) return

    setIsFixing(true)
    try {
      await eventApi.fixDate(eventId, { fixedDateIds: selectedDateIds }, organizerKey)
      fireSuccessConfetti()
      toast({
        title: 'ยืนยันวันที่สำเร็จ',
        description: 'วันที่ได้รับการยืนยันแล้ว ทุกคนจะเห็นวันที่สรุป',
      })
      setShowConfirmDialog(false)
      router.push(`/a/${eventId}?k=${organizerKey}`)
    } catch (error) {
      toast({
        title: 'ยืนยันไม่สำเร็จ',
        description: getThaiErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setIsFixing(false)
    }
  }

  if (!hasAccess) return <AccessDenied />
  if (isLoading) return <PageLoader />
  if (!event) return <AccessDenied />

  return (
    <main className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Link
            href={`/a/${eventId}?k=${organizerKey}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้าแอดมิน
          </Link>
          <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
            เลือกวันที่แน่นอน
          </h1>
          <p className="text-muted-foreground mt-2">
            เลือกวันที่ที่จะใช้จัดกิจกรรม (เลือกได้หลายวัน)
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(!event.dateOptions || event.dateOptions.length === 0) ? (
              <p className="text-muted-foreground text-center py-4">ไม่มีตัวเลือกวันที่</p>
            ) : (
              event.dateOptions.map((dateOption) => (
                <button
                  key={dateOption.id}
                  onClick={() => toggleDateSelection(dateOption.id)}
                  className={`w-full text-left border rounded-lg p-4 transition-all ${
                    selectedDateIds.includes(dateOption.id)
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {dateOption.label}
                      </p>
                    </div>
                    {selectedDateIds.includes(dateOption.id) && (
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    )}
                  </div>

                  {dateOption.voteSummary && (
                    <div className="mt-3 pt-3 border-t border-border flex gap-4 text-sm">
                      <span className="text-green-600">โอเค: {dateOption.voteSummary.yes}</span>
                      <span className="text-muted-foreground">คิดดูก่อน: {dateOption.voteSummary.maybe}</span>
                      <span className="text-red-500">ไม่ได้: {dateOption.voteSummary.no}</span>
                    </div>
                  )}
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Link href={`/a/${eventId}?k=${organizerKey}`} className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              ยกเลิก
            </Button>
          </Link>
          <Button
            size="lg"
            className="flex-1"
            disabled={selectedDateIds.length === 0}
            onClick={() => setShowConfirmDialog(true)}
          >
            ยืนยันวันที่ ({selectedDateIds.length})
          </Button>
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการเลือกวันที่</DialogTitle>
            <DialogDescription>
              วันที่เลือกจะถูกไฮไลท์ให้ทุกคนเห็น
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground mb-2">วันที่เลือก:</p>
            {event?.dateOptions
              ?.filter(d => selectedDateIds.includes(d.id))
              .map(d => (
                <p key={d.id} className="font-medium text-foreground">• {d.label}</p>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleFixDate} isLoading={isFixing}>
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
