import { cn } from '@/lib/utils'

type Tier = 'PERSONAL' | 'TEAM' | 'BUSINESS'

interface ProBadgeProps {
  tier?: Tier
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const tierConfig: Record<Tier, { color: string; label: string }> = {
  PERSONAL: {
    color: 'bg-primary text-primary-foreground',
    label: 'Pro',
  },
  TEAM: {
    color: 'bg-secondary text-secondary-foreground',
    label: 'Team',
  },
  BUSINESS: {
    color: 'bg-accent text-accent-foreground',
    label: 'Business',
  },
}

const sizeConfig = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
}

export function ProBadge({ tier = 'PERSONAL', size = 'md', className }: ProBadgeProps) {
  const config = tierConfig[tier]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        config.color,
        sizeConfig[size],
        className
      )}
    >
      <span className="text-xs">⭐</span>
      {config.label}
    </span>
  )
}
