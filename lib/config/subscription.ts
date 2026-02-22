// Subscription tier feature configuration (frontend)
// Mirrors backend/src/config/subscription.ts

export type SubscriptionTier = 'FREE' | 'PRO_PERSONAL' | 'PRO_TEAM' | 'PRO_BUSINESS'
export type BillingCycle = 'MONTHLY' | 'YEARLY'

export interface TierFeatures {
  maxEvents: number
  maxParticipants: number
  maxDateOptions: number
  retentionDays: number
  calendarSync: boolean
  recurringEvents: boolean
  smartReminders: boolean
  exportFormats: string[]
  customBranding: boolean | 'basic' | 'full'
  teamMembers: number
  showAds: boolean
  prioritySupport: string
  customUrl: boolean
  eventTemplates: number
}

export interface PricingTier {
  id: SubscriptionTier
  name: string
  nameShort: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  yearlyMonthlyEquivalent: number
  discount: number
  isPopular?: boolean
  features: string[]
  ctaText: string
}

export const TIER_FEATURES: Record<SubscriptionTier, TierFeatures> = {
  FREE: {
    maxEvents: 10,
    maxParticipants: 100,
    maxDateOptions: 20,
    retentionDays: 90,
    calendarSync: false,
    recurringEvents: false,
    smartReminders: false,
    exportFormats: [],
    customBranding: false,
    teamMembers: 0,
    showAds: true,
    prioritySupport: 'community',
    customUrl: false,
    eventTemplates: 0,
  },
  PRO_PERSONAL: {
    maxEvents: -1,
    maxParticipants: 200,
    maxDateOptions: 30,
    retentionDays: 365,
    calendarSync: true,
    recurringEvents: true,
    smartReminders: true,
    exportFormats: ['csv'],
    customBranding: false,
    teamMembers: 0,
    showAds: false,
    prioritySupport: 'email_48h',
    customUrl: false,
    eventTemplates: 5,
  },
  PRO_TEAM: {
    maxEvents: -1,
    maxParticipants: 500,
    maxDateOptions: 50,
    retentionDays: 365,
    calendarSync: true,
    recurringEvents: true,
    smartReminders: true,
    exportFormats: ['csv', 'excel', 'pdf'],
    customBranding: 'basic',
    teamMembers: 10,
    showAds: false,
    prioritySupport: 'email_24h',
    customUrl: true,
    eventTemplates: 20,
  },
  PRO_BUSINESS: {
    maxEvents: -1,
    maxParticipants: 1000,
    maxDateOptions: 100,
    retentionDays: -1,
    calendarSync: true,
    recurringEvents: true,
    smartReminders: true,
    exportFormats: ['csv', 'excel', 'pdf', 'api'],
    customBranding: 'full',
    teamMembers: -1,
    showAds: false,
    prioritySupport: 'dedicated',
    customUrl: true,
    eventTemplates: -1,
  },
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'FREE',
    name: 'Free',
    nameShort: 'Free',
    description: 'สำหรับการใช้งานส่วนตัว',
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyMonthlyEquivalent: 0,
    discount: 0,
    features: [
      'สร้างกิจกรรมได้ 10 กิจกรรม',
      'ผู้เข้าร่วม 100 คน/กิจกรรม',
      'เก็บข้อมูล 90 วัน',
      'โหวตได้ครบถ้วน',
    ],
    ctaText: 'เริ่มใช้งานฟรี',
  },
  {
    id: 'PRO_PERSONAL',
    name: 'Pro Personal',
    nameShort: 'Pro',
    description: 'สำหรับผู้ใช้ที่ต้องการความคล่องตัว',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    yearlyMonthlyEquivalent: 124,
    discount: 17,
    isPopular: true,
    features: [
      'กิจกรรมไม่จำกัด',
      'ผู้เข้าร่วม 200 คน/กิจกรรม',
      'เก็บข้อมูล 1 ปี',
      'ซิงค์กับ Google Calendar',
      'กิจกรรมซ้ำได้',
      'ส่งออกเป็น CSV',
      'ไม่มีโฆษณา',
    ],
    ctaText: 'อัปเกรดเป็น Pro',
  },
  {
    id: 'PRO_TEAM',
    name: 'Pro Team',
    nameShort: 'Team',
    description: 'สำหรับทีมงานและองค์กรขนาดเล็ก',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    yearlyMonthlyEquivalent: 416,
    discount: 17,
    features: [
      'ทุกอย่างใน Pro Personal',
      'ผู้เข้าร่วม 500 คน/กิจกรรม',
      'ทีมงาน 10 คน',
      'แบรนด์เองได้ (พื้นฐาน)',
      'ส่งออก CSV, Excel, PDF',
      'URL กำหนดเอง',
      'การสนับสนุน 24 ชม.',
    ],
    ctaText: 'อัปเกรดเป็น Team',
  },
  {
    id: 'PRO_BUSINESS',
    name: 'Pro Business',
    nameShort: 'Business',
    description: 'สำหรับองค์กรขนาดใหญ่',
    monthlyPrice: 1499,
    yearlyPrice: 14990,
    yearlyMonthlyEquivalent: 1249,
    discount: 17,
    features: [
      'ทุกอย่างใน Pro Team',
      'ผู้เข้าร่วม 1,000 คน/กิจกรรม',
      'ทีมงานไม่จำกัด',
      'แบรนด์เองได้ (เต็มรูปแบบ)',
      'เก็บข้อมูลตลอดกาล',
      'API Access',
      'การสนับสนุนแบบ VIP',
    ],
    ctaText: 'ติดต่อเรา',
  },
]

// Feature comparison for table
export const FEATURE_COMPARISON = [
  {
    name: 'จำนวนกิจกรรม',
    key: 'maxEvents' as const,
    free: '10',
    personal: 'ไม่จำกัด',
    team: 'ไม่จำกัด',
    business: 'ไม่จำกัด',
  },
  {
    name: 'ผู้เข้าร่วม/กิจกรรม',
    key: 'maxParticipants' as const,
    free: '100',
    personal: '200',
    team: '500',
    business: '1,000',
  },
  {
    name: 'ตัวเลือกวันที่',
    key: 'maxDateOptions' as const,
    free: '20',
    personal: '30',
    team: '50',
    business: '100',
  },
  {
    name: 'เก็บข้อมูล',
    key: 'retentionDays' as const,
    free: '90 วัน',
    personal: '1 ปี',
    team: '1 ปี',
    business: 'ตลอดกาล',
  },
  {
    name: 'ซิงค์ปฏิทิน',
    key: 'calendarSync' as const,
    free: false,
    personal: true,
    team: true,
    business: true,
  },
  {
    name: 'กิจกรรมซ้ำ',
    key: 'recurringEvents' as const,
    free: false,
    personal: true,
    team: true,
    business: true,
  },
  {
    name: 'ส่งออกข้อมูล',
    key: 'exportFormats' as const,
    free: '-',
    personal: 'CSV',
    team: 'CSV, Excel, PDF',
    business: 'ทั้งหมด + API',
  },
  {
    name: 'แบรนด์เอง',
    key: 'customBranding' as const,
    free: false,
    personal: false,
    team: 'พื้นฐาน',
    business: 'เต็มรูปแบบ',
  },
  {
    name: 'ทีมงาน',
    key: 'teamMembers' as const,
    free: '-',
    personal: '-',
    team: '10 คน',
    business: 'ไม่จำกัด',
  },
  {
    name: 'โฆษณา',
    key: 'showAds' as const,
    free: true,
    personal: false,
    team: false,
    business: false,
  },
]

export function getTierFeatures(tier: SubscriptionTier): TierFeatures {
  return TIER_FEATURES[tier]
}

export function formatPrice(price: number): string {
  return price.toLocaleString('th-TH')
}
