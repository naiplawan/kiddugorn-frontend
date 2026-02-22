interface EventJsonLdProps {
  name: string
  description?: string | null
  location?: string | null
  dateOptions: { id: string; label: string }[]
  url: string
}

/**
 * JSON-LD structured data for events
 * Helps search engines understand the event content
 */
export function EventJsonLd({
  name,
  description,
  location,
  dateOptions,
  url,
}: EventJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: name,
    description: description || `โหวตเลือกวันที่สำหรับ ${name}`,
    url: url,
    ...(location && {
      location: {
        '@type': 'Place',
        name: location,
      },
    }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    // Use the first date option as a potential start date hint
    ...(dateOptions.length > 0 && {
      startDate: extractDateFromLabel(dateOptions[0].label),
    }),
    organizer: {
      '@type': 'Organization',
      name: 'คิดดูก่อน (Kiddugorn)',
      url: 'https://kiddugorn.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

/**
 * Organization JSON-LD for the website
 */
export function OrganizationJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'คิดดูก่อน (Kiddugorn)',
    description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม | Scheduling and voting app for Thai users',
    url: 'https://kiddugorn.com',
    logo: 'https://kiddugorn.com/logo.png',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Thai', 'English'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

/**
 * WebSite JSON-LD for search
 */
export function WebsiteJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'คิดดูก่อน (Kiddugorn)',
    url: 'https://kiddugorn.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kiddugorn.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

/**
 * Helper to extract date from label like "วันเสาร์ที่ 15 มีนาคม 2568"
 */
function extractDateFromLabel(label: string): string | undefined {
  // Try to parse Thai date format
  // This is a simplified version - you might need more robust parsing
  try {
    const thaiMonths: Record<string, number> = {
      'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3,
      'พฤษภาคม': 4, 'มิถุนายน': 5, 'กรกฎาคม': 6, 'สิงหาคม': 7,
      'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11,
    }

    for (const [month, monthIndex] of Object.entries(thaiMonths)) {
      if (label.includes(month)) {
        const dayMatch = label.match(/(\d+)/)
        if (dayMatch) {
          const day = parseInt(dayMatch[1])
          const year = new Date().getFullYear()
          return new Date(year, monthIndex, day).toISOString()
        }
      }
    }
  } catch {
    // Ignore parsing errors
  }

  return undefined
}
