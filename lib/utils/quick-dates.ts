/**
 * Quick date helpers for the create event form
 */

export function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getNextSunday(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7
  const nextSunday = new Date(today)
  nextSunday.setDate(today.getDate() + daysUntilSunday)
  return nextSunday
}

export const QUICK_DATES = [
  { label: 'วันนี้', getValue: () => getLocalDateString(new Date()) },
  { label: 'พรุ่งนี้', getValue: () => getLocalDateString(new Date(Date.now() + 86400000)) },
  { label: 'อาทิตย์หน้า', getValue: () => getLocalDateString(getNextSunday()) },
  { label: 'เลือกเอง', getValue: null },
] as const
