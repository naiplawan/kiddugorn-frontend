import { z } from 'zod'

/**
 * Vote response enum
 */
export const voteResponseSchema = z.enum(['yes', 'no', 'maybe'])

/**
 * Schema for a single vote
 */
export const singleVoteSchema = z.object({
  eventDateId: z.string().min(1, 'Event date ID is required'),
  response: voteResponseSchema,
})

/**
 * Schema for casting votes
 */
export const castVoteSchema = z.object({
  voterName: z
    .string()
    .min(1, 'กรุณากรอกชื่อของคุณ')
    .max(50, 'ชื่อต้องไม่เกิน 50 ตัวอักษร'),
  votes: z
    .array(singleVoteSchema)
    .min(1, 'กรุณาโหวตอย่างน้อย 1 ตัวเลือก'),
})

/**
 * Schema for fixing a date
 */
export const fixDateSchema = z.object({
  eventDateId: z.string().min(1, 'กรุณาเลือกวันที่'),
})

/**
 * Type exports
 */
export type VoteResponse = z.infer<typeof voteResponseSchema>
export type SingleVote = z.infer<typeof singleVoteSchema>
export type CastVoteInput = z.infer<typeof castVoteSchema>
export type FixDateInput = z.infer<typeof fixDateSchema>
