import type { Metadata, Viewport } from 'next'
import { Kanit, Chonburi } from 'next/font/google'
import { Providers } from '@/components/providers'
import './globals.css'

const kanit = Kanit({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
  display: 'swap',
})

const chonburi = Chonburi({
  subsets: ['latin', 'thai'],
  weight: ['400'],
  variable: '--font-chonburi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'คิดดูก่อน - Kiddugorn',
  description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม | Scheduling and voting app',
  keywords: ['scheduling', 'voting', 'meeting', 'appointment', 'Thai'],
  authors: [{ name: 'Kiddugorn Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    title: 'คิดดูก่อน - Kiddugorn',
    description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary',
    title: 'คิดดูก่อน - Kiddugorn',
    description: 'แอปจัดตารางนัดหมายและโหวตเวลาที่เหมาะสม',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#DA811B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`${kanit.variable} ${chonburi.variable}`}>
      <body className={`${kanit.className} min-h-screen bg-background antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
