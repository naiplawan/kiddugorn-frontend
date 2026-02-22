import type { Metadata } from 'next'

interface EventMetadata {
  title: string
  description?: string | null
  dateCount: number
  voteCount: number
  eventId: string
}

export function generateEventMetadata(event: EventMetadata): Metadata {
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kiddugorn.com'}/api/events/${event.eventId}/og?${new URLSearchParams({
    title: event.title,
    dates: event.dateCount.toString(),
    votes: event.voteCount.toString(),
  })}`

  return {
    title: `${event.title} - คิดดูก่อน`,
    description: event.description || `ช่วยโหวตเลือกวันที่สะดวกสำหรับ "${event.title}" | ${event.dateCount} วันที่เลือก, ${event.voteCount} คนโหวต`,
    openGraph: {
      title: `${event.title} - คิดดูก่อน`,
      description: event.description || `ช่วยโหวตเลือกวันที่สะดวกสำหรับ "${event.title}"`,
      images: [ogImageUrl],
      type: 'website',
      locale: 'th_TH',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} - คิดดูก่อน`,
      description: event.description || `ช่วยโหวตเลือกวันที่สะดวกสำหรับ "${event.title}"`,
      images: [ogImageUrl],
    },
  }
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'คิดดูก่อน - Kiddugorn',
    template: '%s | คิดดูก่อน',
  },
  description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม | Scheduling and voting app for Thai users',
  keywords: ['scheduling', 'voting', 'meeting', 'appointment', 'Thai', 'นัดหมาย', 'โหวต', 'จัดตาราง'],
  authors: [{ name: 'Kiddugorn Team' }],
  creator: 'Kiddugorn',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kiddugorn.com'),
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: '/',
    siteName: 'คิดดูก่อน - Kiddugorn',
    title: 'คิดดูก่อน - Kiddugorn',
    description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'คิดดูก่อน - Kiddugorn',
    description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}
