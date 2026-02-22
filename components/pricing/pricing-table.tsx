'use client'

import { Check, X } from 'lucide-react'
import { FEATURE_COMPARISON } from '@/lib/config/subscription'
import { cn } from '@/lib/utils'

interface PricingTableProps {
  billingCycle: 'MONTHLY' | 'YEARLY'
}

export function PricingTable({}: PricingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              ฟีเจอร์
            </th>
            <th className="text-center py-4 px-4 font-medium">Free</th>
            <th className="text-center py-4 px-4 font-medium text-primary">
              Pro Personal
            </th>
            <th className="text-center py-4 px-4 font-medium">Pro Team</th>
            <th className="text-center py-4 px-4 font-medium">Pro Business</th>
          </tr>
        </thead>
        <tbody>
          {FEATURE_COMPARISON.map((feature, index) => (
            <tr
              key={feature.key}
              className={cn(
                'border-b',
                index % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'
              )}
            >
              <td className="py-3 px-4 text-sm">{feature.name}</td>
              <td className="py-3 px-4 text-center text-sm">
                <FeatureValue value={feature.free} />
              </td>
              <td className="py-3 px-4 text-center text-sm bg-primary/5">
                <FeatureValue value={feature.personal} />
              </td>
              <td className="py-3 px-4 text-center text-sm">
                <FeatureValue value={feature.team} />
              </td>
              <td className="py-3 px-4 text-center text-sm">
                <FeatureValue value={feature.business} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-success mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground mx-auto" />
    )
  }

  return <span>{value}</span>
}
