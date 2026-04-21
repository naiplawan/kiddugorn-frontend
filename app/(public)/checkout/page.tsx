'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { ProBadge } from '@/components/ui/pro-badge'
import { PRICING_TIERS, formatPrice } from '@/lib/config/subscription'
import { ArrowLeft, Check, Lock, CreditCard, QrCode, Shield, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const tier = searchParams.get('tier') as 'PRO_PERSONAL' | 'PRO_TEAM' | 'PRO_BUSINESS' | null
  const cycle = searchParams.get('cycle') as 'MONTHLY' | 'YEARLY' | null

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'promptpay'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')

  // Find tier details
  const tierDetails = PRICING_TIERS.find((t) => t.id === tier)
  const price = cycle === 'YEARLY' ? tierDetails?.yearlyPrice || 0 : tierDetails?.monthlyPrice || 0
  const cycleLabel = cycle === 'YEARLY' ? 'รายปี' : 'รายเดือน'

  // Redirect if invalid params
  useEffect(() => {
    if (!tier || !cycle || !tierDetails) {
      router.push('/pricing')
    }
  }, [tier, cycle, tierDetails, router])

  if (!tierDetails) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would call Stripe/Omise API
      // For demo, we'll just activate the subscription
      toast.success('ชำระเงินสำเร็จ!')

      // Redirect to success page
      router.push('/checkout/success')
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setIsProcessing(false)
    }
  }

  // Calculate next billing date
  const nextBillingDate = new Date()
  if (cycle === 'YEARLY') {
    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
  } else {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
  }

  return (
    <main className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับหน้าราคา
        </Link>

        <h1 className="text-2xl font-bold mb-6">ชำระเงิน</h1>

        <div className="grid gap-6">
          {/* Order Summary */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-3">สรุปคำสั่งซื้อ</h2>
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                <ProBadge tier={tier === 'PRO_TEAM' ? 'TEAM' : tier === 'PRO_BUSINESS' ? 'BUSINESS' : 'PERSONAL'} />
                <div className="flex-1">
                  <p className="font-medium">{tierDetails.name}</p>
                  <p className="text-sm text-muted-foreground">{cycleLabel}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">฿{formatPrice(price)}</p>
                  <p className="text-xs text-muted-foreground">THB/{cycle === 'YEARLY' ? 'ปี' : 'เดือน'}</p>
                </div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground space-y-1">
                <p>วันเริ่มต้น: {new Date().toLocaleDateString('th-TH')}</p>
                <p>
                  ต่ออายุอัตโนมัติ: {nextBillingDate.toLocaleDateString('th-TH')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-4">วิธีชำระเงิน</h2>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border-2 flex items-center gap-2 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm font-medium">บัตรเครดิต/เดบิต</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('promptpay')}
                  className={`p-3 rounded-lg border-2 flex items-center gap-2 transition-colors ${
                    paymentMethod === 'promptpay'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span className="text-sm font-medium">PromptPay</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">หมายเลขบัตร</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">วันหมดอายุ</label>
                        <Input
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">CVV</label>
                        <Input
                          placeholder="123"
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">ชื่อบนบัตร</label>
                      <Input
                        placeholder="JOHN DOE"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'promptpay' && (
                  <div className="text-center py-8">
                    <div className="w-48 h-48 mx-auto bg-muted rounded-xl flex items-center justify-center mb-4">
                      <QrCode className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      สแกน QR Code เพื่อชำระเงินผ่านแอปธนาคาร
                    </p>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 p-3 bg-muted/50 rounded-lg mt-4">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm text-muted-foreground">
                    การชำระเงินปลอดภัยด้วยการเข้ารหัส SSL 256-bit
                  </span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full mt-4"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      กำลังดำเนินการ...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      ชำระเงิน ฿{formatPrice(price)}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Terms */}
          <p className="text-xs text-center text-muted-foreground">
            การชำระเงินแสดงว่าคุณยอมรับ{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              ข้อกำหนดการใช้งาน
            </Link>{' '}
            และ{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              นโยบายความเป็นส่วนตัว
            </Link>
            <br />
            ยกเลิกได้ทุกเมื่อ • คืนเงินภายใน 7 วัน
          </p>
        </div>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
