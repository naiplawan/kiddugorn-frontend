'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Button, Card, CardHeader, CardTitle, CardContent, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'
import { eventApi, getThaiErrorMessage } from '@/lib/api/client'
import Link from 'next/link'
import { getRelativeTimeThai } from '@/lib/utils/dates'
import { AlertTriangle, Loader2, ExternalLink, Edit, Lock, Unlock, Trash2, Copy, Check } from 'lucide-react'

interface DateOption {
  id: string
  label: string
  order: number
  voteSummary?: {
    yes: number
    maybe: number
    no: number
  }
}

interface EventData {
  id: string
  title: string
  description?: string | null
  location?: string | null
  status: string
  fixedDateIds: string[]
  dateOptions: DateOption[]
  createdAt: string
  expiresAt?: string
  _count?: {
    votes: number
  }
}

export default function AdminDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const eventId = params.eventId as string
  const organizerKey = searchParams.get('k')

  const [event, setEvent] = useState<EventData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLocking, setIsLocking] = useState(false)
  const [copied, setCopied] = useState(false)

  // Fetch event data
  useEffect(() => {
    async function fetchEvent() {
      if (!organizerKey) {
        toast({
          title: 'ไม่มีสิทธิ์เข้าถึง',
          description: 'กรุณาใช้ลิงก์แอดมินที่ถูกต้อง',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      try {
        const data = await eventApi.getById(eventId, organizerKey)
        setEvent({
          id: data.id,
          title: data.title || '',
          description: data.description,
          location: data.location,
          status: data.status || 'OPEN',
          fixedDateIds: data.fixedDateIds || [],
          dateOptions: data.dateOptions || [],
          createdAt: data.createdAt,
          expiresAt: data.expiresAt,
          // _count is optional in the Event type, so the cast is needed
          _count: (data as any)._count,
        })
      } catch (error) {
        toast({
          title: 'โหลดข้อมูลไม่สำเร็จ',
          description: getThaiErrorMessage(error),
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, organizerKey, toast])

  const handleDelete = async () => {
    if (!organizerKey) return

    setIsDeleting(true)
    try {
      await eventApi.delete(eventId, organizerKey)
      toast({
        title: 'ลบกิจกรรมสำเร็จ',
        description: 'กิจกรรมถูกลบเรียบร้อยแล้ว',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: 'ลบไม่สำเร็จ',
        description: getThaiErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleToggleLock = async () => {
    if (!organizerKey || !event) return

    setIsLocking(true)
    try {
      const newLocked = event.status !== 'LOCKED'
      await eventApi.lock(eventId, newLocked, organizerKey)
      setEvent(prev => prev ? { ...prev, status: newLocked ? 'LOCKED' : 'OPEN' } : null)
      toast({
        title: newLocked ? 'ล็อกกิจกรรมแล้ว' : 'ปลดล็อกกิจกรรมแล้ว',
        description: newLocked
          ? 'ผู้เข้าร่วมไม่สามารถโหวตหรือแก้ไขได้แล้ว'
          : 'ผู้เข้าร่วมสามารถโหวตได้แล้ว',
      })
    } catch (error) {
      toast({
        title: 'เปลี่ยนสถานะไม่สำเร็จ',
        description: getThaiErrorMessage(error),
        variant: 'destructive',
      })
    } finally {
      setIsLocking(false)
    }
  }

  const copyVoteLink = async () => {
    const url = `${window.location.origin}/v/${eventId}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast({ title: 'คัดลอกลิงก์แล้ว' })
    setTimeout(() => setCopied(false), 2000)
  }

  if (!organizerKey) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-card rounded-xl shadow-sm border p-8">
            <h1 className="font-display text-2xl text-foreground mb-2 tracking-tight">ไม่มีสิทธิ์เข้าถึง</h1>
            <p className="text-muted-foreground mb-4">กรุณาใช้ลิงก์แอดมินที่ถูกต้อง</p>
            <Link href="/">
              <Button>กลับหน้าหลัก</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-4xl flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-card rounded-xl shadow-sm border p-8">
            <h1 className="font-display text-2xl text-foreground mb-2 tracking-tight">ไม่พบกิจกรรม</h1>
            <p className="text-muted-foreground mb-4">กิจกรรมนี้อาจถูกลบหรือหมดอายุแล้ว</p>
            <Link href="/">
              <Button>กลับหน้าหลัก</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const isLocked = event.status === 'LOCKED'
  const voteCount = event._count?.votes || 0
  const publicUrl = `/v/${eventId}`

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isLocked
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {isLocked ? '🔒 ล็อกแล้ว' : '🟢 กำลังดำเนินการ'}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
              {event.title}
            </h1>
            {event.description && (
              <p className="text-muted-foreground mt-1">{event.description}</p>
            )}
            {event.location && (
              <p className="text-muted-foreground text-sm mt-1">📍 {event.location}</p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={copyVoteLink}>
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              คัดลอกลิงก์โหวต
            </Button>
            <Link href={`${publicUrl}`} target="_blank">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                ดูหน้าโหวต
              </Button>
            </Link>
            <Link href={`./edit?k=${organizerKey}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                แก้ไข
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="จำนวนวันที่" value={event.dateOptions.length.toString()} />
          <StatCard label="ผู้โหวต" value={voteCount.toString()} />
          <StatCard label="สร้างเมื่อ" value={getRelativeTimeThai(event.createdAt)} />
          <StatCard label="สถานะ" value={isLocked ? 'ล็อกแล้ว' : 'กำลังโหวต'} />
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">การดำเนินการ</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href={`./fix?k=${organizerKey}`}>
              <Button variant="default" size="sm">
                ✅ เลือกวันที่แน่นอน
              </Button>
            </Link>
            <Button
              variant={isLocked ? 'default' : 'outline'}
              size="sm"
              onClick={handleToggleLock}
              disabled={isLocking}
            >
              {isLocking ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : isLocked ? (
                <Unlock className="h-4 w-4 mr-1" />
              ) : (
                <Lock className="h-4 w-4 mr-1" />
              )}
              {isLocked ? 'ปลดล็อก' : 'ล็อกกิจกรรม'}
            </Button>
          </CardContent>
        </Card>

        {/* Date Options with Vote Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ผลโหวตแต่ละวัน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {event.dateOptions.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">ไม่มีตัวเลือกวันที่</p>
            ) : (
              event.dateOptions.map((dateOption) => {
                const isFixed = event.fixedDateIds.includes(dateOption.id)
                return (
                  <div
                    key={dateOption.id}
                    className={`border rounded-lg p-4 ${isFixed ? 'border-primary bg-primary/5' : 'border-border'}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">
                            {dateOption.label}
                          </p>
                          {isFixed && (
                            <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                              ✓ เลือกแล้ว
                            </span>
                          )}
                        </div>
                        {dateOption.voteSummary && (
                          <div className="flex gap-3 text-sm mt-1">
                            <span className="text-green-600">โอเค: {dateOption.voteSummary.yes}</span>
                            <span className="text-muted-foreground">คิดดูก่อน: {dateOption.voteSummary.maybe}</span>
                            <span className="text-red-500">ไม่ได้: {dateOption.voteSummary.no}</span>
                          </div>
                        )}
                      </div>
                      {!isFixed && (
                        <Link href={`./fix?k=${organizerKey}&dateId=${dateOption.id}`}>
                          <Button variant="outline" size="sm">
                            เลือกวันนี้
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              การดำเนินการอันตราย
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              การลบกิจกรรมจะลบข้อมูลทั้งหมด รวมถึงผลโหวต และไม่สามารถย้อนกลับได้
            </p>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  ลบกิจกรรม
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    ยืนยันการลบกิจกรรม
                  </DialogTitle>
                  <DialogDescription className="pt-4">
                    คุณแน่ใจหรือไม่ที่จะลบกิจกรรม <strong className="text-foreground">{event.title}</strong>?
                  </DialogDescription>
                  <DialogDescription className="text-destructive">
                    การกระทำนี้ไม่สามารถย้อนกลับได้ ข้อมูลทั้งหมดจะถูกลบถาวร รวมถึงรายชื่อผู้โหวตและผลโหวตทั้งหมด
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                    disabled={isDeleting}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                  >
                    ลบกิจกรรม
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold text-foreground mt-1">{value}</p>
    </div>
  )
}
