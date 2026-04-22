/**
 * Date formatting utilities for Thai locale
 */

const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
]

const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
]

const THAI_DAYS_SHORT = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
const THAI_DAYS_FULL = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']

/**
 * Format a date string to Thai short format (e.g., "15 ม.ค. 2568")
 */
export function formatThaiDateShort(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = THAI_MONTHS_SHORT[date.getMonth()]
  const year = date.getFullYear() + 543 // Convert to Buddhist Era

  return `${day} ${month} ${year}`
}

/**
 * Format a date string to Thai full format (e.g., "15 มกราคม 2568")
 */
export function formatThaiDateFull(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = THAI_MONTHS_FULL[date.getMonth()]
  const year = date.getFullYear() + 543

  return `${day} ${month} ${year}`
}

/**
 * Format a date string with day of week (e.g., "จันทร์ 15 มกราคม 2568")
 */
export function formatThaiDateWithDay(dateString: string): string {
  const date = new Date(dateString)
  const dayOfWeek = THAI_DAYS_FULL[date.getDay()]
  const day = date.getDate()
  const month = THAI_MONTHS_FULL[date.getMonth()]
  const year = date.getFullYear() + 543

  return `${dayOfWeek} ${day} ${month} ${year}`
}

/**
 * Format a date string to short day format (e.g., "จ. 15")
 */
export function formatThaiDayShort(dateString: string): string {
  const date = new Date(dateString)
  const dayOfWeek = THAI_DAYS_SHORT[date.getDay()]
  const day = date.getDate()

  return `${dayOfWeek}. ${day}`
}

/**
 * Format time string to Thai format (e.g., "09:00" -> "09:00 น.")
 */
export function formatThaiTime(timeString: string): string {
  if (!timeString) return ''
  return `${timeString} น.`
}

/**
 * Format time string to 12-hour Thai display (e.g., "14:30" -> "2:30 น.")
 */
export function formatThaiTime12h(timeString: string): string {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':').map(Number)
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} น.`
}

/**
 * Format a date with optional time as a human-readable label
 * (e.g., "จันทร์ 15 มกราคม 2568 2:30 น.")
 */
export function formatDateOptionLabel(dateString: string, timeString?: string): string {
  let label = formatThaiDateWithDay(dateString)
  if (timeString) {
    label += ` ${formatThaiTime12h(timeString)}`
  }
  return label
}

/**
 * Format date and time together (e.g., "15 ม.ค. 2568 เวลา 09:00 น.")
 */
export function formatThaiDateTime(dateString: string, timeString?: string): string {
  const dateStr = formatThaiDateShort(dateString)
  if (!timeString) return dateStr
  return `${dateStr} เวลา ${formatThaiTime(timeString)}`
}

/**
 * Get relative time string in Thai (e.g., "2 วันที่แล้ว", "3 ชั่วโมงที่แล้ว")
 */
export function getRelativeTimeThai(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (seconds < 60) return 'เมื่อสักครู่'
  if (minutes < 60) return `${minutes} นาทีที่แล้ว`
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`
  if (days < 7) return `${days} วันที่แล้ว`
  if (weeks < 4) return `${weeks} สัปดาห์ที่แล้ว`
  if (months < 12) return `${months} เดือนที่แล้ว`

  return formatThaiDateShort(dateString)
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a date is in the past
 */
export function isPast(dateString: string): boolean {
  const date = new Date(dateString)
  const now = new Date()
  return date < now
}

/**
 * Format ISO date string to display format
 */
export function formatISODate(isoString: string): string {
  const date = new Date(isoString)
  return date.toISOString().split('T')[0]
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string): Date {
  return new Date(dateString)
}
