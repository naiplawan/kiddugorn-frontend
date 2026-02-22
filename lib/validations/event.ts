import { z } from 'zod'

/**
 * Schema for creating an event date
 */
export const eventDateSchema = z.object({
  date: z.string().min(1, 'กรุณาเลือกวันที่'),
  time: z.string().optional(),
})

/**
 * Schema for creating an event
 */
export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, 'กรุณากรอกชื่อกิจกรรม')
    .max(100, 'ชื่อกิจกรรมต้องไม่เกิน 100 ตัวอักษร'),
  description: z.string().max(500, 'รายละเอียดต้องไม่เกิน 500 ตัวอักษร').optional(),
  location: z.string().max(200, 'สถานที่ต้องไม่เกิน 200 ตัวอักษร').optional(),
  creatorName: z
    .string()
    .min(1, 'กรุณากรอกชื่อของคุณ')
    .max(50, 'ชื่อต้องไม่เกิน 50 ตัวอักษร'),
  creatorEmail: z
    .string()
    .email('รูปแบบอีเมลไม่ถูกต้อง')
    .max(100, 'อีเมลต้องไม่เกิน 100 ตัวอักษร')
    .optional()
    .or(z.literal('')),
  dates: z
    .array(eventDateSchema)
    .min(1, 'กรุณาเพิ่มอย่างน้อย 1 วันที่')
    .max(20, 'สามารถเพิ่มได้สูงสุด 20 วันที่'),
})

/**
 * Schema for updating an event
 */
export const updateEventSchema = z.object({
  title: z
    .string()
    .min(1, 'กรุณากรอกชื่อกิจกรรม')
    .max(100, 'ชื่อกิจกรรมต้องไม่เกิน 100 ตัวอักษร')
    .optional(),
  description: z.string().max(500, 'รายละเอียดต้องไม่เกิน 500 ตัวอักษร').optional(),
  location: z.string().max(200, 'สถานที่ต้องไม่เกิน 200 ตัวอักษร').optional(),
  dates: z
    .array(eventDateSchema)
    .min(1, 'กรุณาเพิ่มอย่างน้อย 1 วันที่')
    .max(20, 'สามารถเพิ่มได้สูงสุด 20 วันที่')
    .optional(),
})

/**
 * Type exports
 */
export type EventDateInput = z.infer<typeof eventDateSchema>
export type CreateEventInput = z.infer<typeof createEventSchema>
export type UpdateEventInput = z.infer<typeof updateEventSchema>
