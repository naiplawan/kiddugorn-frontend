// ==================== Enums ====================

export type EventStatus = 'OPEN' | 'LOCKED' | 'draft' | 'active' | 'fixed' | 'cancelled'

export type AnswerValue = 'yes' | 'maybe' | 'no'

// Legacy alias for backward compatibility
export type VoteResponse = AnswerValue

// ==================== Event Types ====================

export interface Event {
  id: string
  title: string
  description?: string | null
  location?: string | null
  creatorName?: string | null
  creatorEmail?: string | null
  status: EventStatus
  deadline?: string | null
  fixedDateIds?: string[]
  createdAt: string
  updatedAt?: string
  expiresAt?: string
  participantCount?: number
  dateOptions?: DateOption[]
  // Legacy fields
  dates?: EventDate[]
  fixedDate?: string
  adminToken?: string
}

export interface DateOption {
  id: string
  eventId?: string
  label: string
  order: number
  voteSummary?: VoteSummary
  // Legacy fields
  date?: string
  time?: string
}

export interface EventDate {
  id: string
  date: string
  time?: string
  votes?: Vote[]
}

export interface VoteSummary {
  yes: number
  maybe: number
  no: number
}

// ==================== Vote Types ====================

export interface Vote {
  id: string
  eventId?: string
  name: string
  order?: number
  updatedAt?: string
  answers: Answer[]
  // Legacy fields
  voterName?: string
  eventDateId?: string
  response?: VoteResponse
  createdAt?: string
}

export interface Answer {
  id: string
  voteId?: string
  dateOptionId: string
  value: AnswerValue
}

export interface VoteWithAnswers extends Vote {
  answers: Answer[]
  voteToken?: string
}

// ==================== UI Types ====================

export interface VotingGridCell {
  dateOptionId: string
  voteId?: string
  value: AnswerValue | null
  isFixed: boolean
  isGhost?: boolean
}

export interface ParticipantRow {
  voteId?: string
  name: string
  answers: Record<string, AnswerValue>
  isGhost?: boolean
  voteToken?: string
}

// ==================== Local Storage Types ====================

export interface StoredVoteToken {
  eventId: string
  voteId: string
  token: string
  name: string
}

// ==================== API Request Types ====================

export interface CreateEventRequest {
  title: string
  description?: string
  dateOptions: string[]
  deadline?: string
  settings?: {
    lockAnswers?: boolean
    maxParticipants?: number
  }
}

export interface CreateEventResponse {
  event: Event
  voteUrl: string
  adminUrl: string
  organizerKey: string
}

export interface UpdateEventRequest {
  title?: string
  description?: string
  dateOptions?: string[]
  deadline?: string
}

export interface SubmitVoteRequest {
  name: string
  answers: Record<string, AnswerValue>
}

export interface SubmitVoteResponse {
  vote: VoteWithAnswers
}

export interface UpdateVoteRequest {
  name?: string
  answers: Record<string, AnswerValue>
}

export interface FixDateRequest {
  dateOptionIds: string[]
}

export interface LockEventRequest {
  locked: boolean
}

// ==================== API Response Types ====================

export interface PaginatedResponse<T> {
  data: T[]
  nextCursor?: string
  hasMore: boolean
  total?: number
  page?: number
  limit?: number
}

export interface APIError {
  error: {
    code: string
    message: string
    details?: unknown
  }
}

// ==================== Error Codes ====================

export const ERROR_CODES = {
  EVENT_NOT_FOUND: 'EVENT_NOT_FOUND',
  EVENT_LOCKED: 'EVENT_LOCKED',
  EVENT_EXPIRED: 'EVENT_EXPIRED',
  MISSING_ORGANIZER_KEY: 'MISSING_ORGANIZER_KEY',
  INVALID_ORGANIZER_KEY: 'INVALID_ORGANIZER_KEY',
  MISSING_VOTE_TOKEN: 'MISSING_VOTE_TOKEN',
  INVALID_VOTE_TOKEN: 'INVALID_VOTE_TOKEN',
  NAME_ALREADY_TAKEN: 'NAME_ALREADY_TAKEN',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]

// ==================== Error Messages (Thai) ====================

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  EVENT_NOT_FOUND: 'ไม่พบกิจกรรมนี้',
  EVENT_LOCKED: 'กิจกรรมนี้ถูกล็อกแล้ว ไม่สามารถแก้ไขได้',
  EVENT_EXPIRED: 'กิจกรรมนี้หมดอายุแล้ว',
  MISSING_ORGANIZER_KEY: 'ไม่มีสิทธิ์เข้าถึง',
  INVALID_ORGANIZER_KEY: 'ไม่มีสิทธิ์เข้าถึง',
  MISSING_VOTE_TOKEN: 'ไม่มีสิทธิ์แก้ไข',
  INVALID_VOTE_TOKEN: 'ไม่มีสิทธิ์แก้ไขคำตอบนี้',
  NAME_ALREADY_TAKEN: 'มีคนใช้ชื่อนี้แล้ว',
  VALIDATION_ERROR: 'ข้อมูลไม่ถูกต้อง',
  RATE_LIMIT_EXCEEDED: 'พิมพ์เร็วเกินไป รอสักครู่นะ',
}

// ==================== Legacy API Types ====================

export interface CreateEventInput {
  title: string
  description?: string
  location?: string
  creatorName: string
  creatorEmail?: string
  dates: CreateEventDateInput[]
}

export interface CreateEventDateInput {
  date: string
  time?: string
}

export interface UpdateEventInput {
  title?: string
  description?: string
  location?: string
  dates?: CreateEventDateInput[]
}

export interface CastVoteInput {
  voterName: string
  votes: {
    eventDateId: string
    response: VoteResponse
  }[]
}

export interface FixDateInput {
  fixedDateIds: string[]
}

// ==================== Form Types ====================

export interface EventFormData {
  title: string
  description: string
  location: string
  creatorName: string
  creatorEmail: string
  dates: EventDateFormData[]
}

export interface EventDateFormData {
  date: string
  time: string
}

export interface VoteFormData {
  voterName: string
  votes: Record<string, VoteResponse>
}

// ==================== Store Types ====================

export interface CreateEventState {
  formData: Partial<EventFormData>
  setFormData: (data: Partial<EventFormData>) => void
  resetFormData: () => void
}

export interface AdminState {
  event: Event | null
  setEvent: (event: Event | null) => void
}
