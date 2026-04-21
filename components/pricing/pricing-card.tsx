'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui'
import { PricingTier } from '@/lib/config/subscription'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  tier: PricingTier
  billingCycle: 'MONTHLY' | 'YEARLY'
  isCurrent?: boolean
  onSelect?: () => void
}

export function PricingCard({ tier, billingCycle, isCurrent, onSelect }: PricingCardProps) {
  const price = billingCycle === 'MONTHLY' ? tier.monthlyPrice : tier.yearlyPrice
  const displayPrice = billingCycle === 'MONTHLY' ? tier.monthlyPrice : tier.yearlyMonthlyEquivalent

  const isFree = tier.id === 'FREE'
  const isBusiness = tier.id === 'PRO_BUSINESS'

  return (
    <div
      className={cn(
        'relative rounded-xl border-2 p-6 transition-all duration-300',
        'flex flex-col h-full',
        tier.isPopular
          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105 z-10'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-md',
        isCurrent && 'ring-2 ring-success ring-offset-2'
      )}
    >
      {/* Popular Badge */}
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            ยอดนิยม
          </span>
        </div>
      )}

      {/* Current Badge */}
      {isCurrent && (
        <div className="absolute -top-3 right-4">
          <span className="inline-flex items-center rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
            แพ็กเกจปัจจุบัน
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className="text-xl font-bold">{tier.name}</h3>
          {tier.id !== 'FREE' && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {tier.nameShort}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{tier.description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        {isFree ? (
          <div className="text-4xl font-bold">ฟรี</div>
        ) : (
          <>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-lg text-muted-foreground">฿</span>
              <span className="text-4xl font-bold">{displayPrice.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {billingCycle === 'MONTHLY' ? '/ เดือน' : '/ เดือน (วันเป็นรายปี)'}
            </p>
            {billingCycle === 'YEARLY' && tier.discount > 0 && (
              <p className="text-xs text-success mt-1">
                ประหยัด {tier.discount}%
              </p>
            )}
          </>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6 flex-grow">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        className={cn(
          'w-full',
          tier.isPopular && 'bg-primary hover:bg-primary/90'
        )}
        variant={isFree ? 'outline' : 'default'}
        onClick={onSelect}
        disabled={isCurrent}
      >
        {isCurrent ? 'แพ็กเกจปัจจุบัน' : tier.ctaText}
      </Button>
    </div>
  )
}
