/**
 * API Client for Kiddugorn backend
 */

import { formatDateOptionLabel } from '@/lib/utils/dates'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * Thai error messages for common errors
 */
export const getThaiErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    // Handle specific error codes
    if (error.data && typeof error.data === 'object' && 'code' in error.data) {
      const code = (error.data as { code: string }).code
      switch (code) {
        case 'VALIDATION_ERROR':
          return 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง'
        case 'EVENT_NOT_FOUND':
          return 'ไม่พบกิจกรรมนี้'
        case 'EVENT_EXPIRED':
          return 'กิจกรรมนี้หมดอายุแล้ว'
        case 'RATE_LIMIT_EXCEEDED':
          return 'คุณส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่'
        default:
          break
      }
    }

    // Handle HTTP status codes
    switch (error.status) {
      case 400:
        return error.message || 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง'
      case 401:
        return 'กรุณายืนยันตัวตน'
      case 403:
        return 'คุณไม่มีสิทธิ์เข้าถึง'
      case 404:
        return 'ไม่พบข้อมูลที่ต้องการ'
      case 409:
        return 'ข้อมูลซ้ำซ้อน'
      case 429:
        return 'คุณส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่'
      case 500:
        return 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่ภายหลัง'
      case 0:
        return 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'
      default:
        return error.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('fetch')) {
      return 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต'
    }
    return error.message
  }

  return 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
}

/**
 * Base fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    // Handle non-OK responses
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: response.statusText }
      }

      throw new ApiError(
        errorData.message || errorData.error || 'An error occurred',
        response.status,
        errorData
      )
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    )
  }
}

/**
 * API client object with HTTP methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),

  /**
   * POST request
   */
  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * PUT request
   */
  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * PATCH request
   */
  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    fetchApi<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
}

/**
 * API response type for event creation
 */
export interface CreateEventApiResponse {
  id: string
  title: string
  description: string | null
  deadline: string | null
  status: string
  expiresAt: string
  createdAt: string
  updatedAt: string
  organizerKey: string
  creatorName: string | null
  creatorEmail: string | null
  location: string | null
  dateOptions: Array<{
    id: string
    label: string
    order: number
  }>
}

/**
 * Frontend-friendly event creation response
 */
export interface CreateEventResponse {
  event: {
    id: string
    title: string
    status: string
    createdAt: string
  }
  voteUrl: string
  adminUrl: string
  organizerKey: string
}

/**
 * Frontend input for event creation (from form)
 */
interface BackendCreateEventPayload {
  title: string
  dateOptions: Array<{ label: string }>
  description?: string
  location?: string
  creatorName?: string
  creatorEmail?: string
}

export interface FrontendCreateEventInput {
  title: string
  description?: string
  location?: string
  creatorName?: string
  creatorEmail?: string
  dates: Array<{
    date: string
    time?: string
  }>
}

/**
 * Event API endpoints
 */
export const eventApi = {
  /**
   * Create a new event
   * Transforms frontend form data to backend API format
   */
  create: async (data: FrontendCreateEventInput): Promise<CreateEventResponse> => {
    // Transform frontend data to backend format
    const backendData: BackendCreateEventPayload = {
      title: data.title,
      dateOptions: data.dates.map((d: { date: string; time?: string }) => ({
        label: formatDateOptionLabel(d.date, d.time),
      })),
    }

    if (data.description) backendData.description = data.description
    if (data.location) backendData.location = data.location
    if (data.creatorName) backendData.creatorName = data.creatorName
    if (data.creatorEmail) backendData.creatorEmail = data.creatorEmail

    const response = await apiClient.post<CreateEventApiResponse>('/events', backendData)

    // Transform backend response to frontend-friendly format
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

    return {
      event: {
        id: response.id,
        title: response.title,
        status: response.status,
        createdAt: response.createdAt,
      },
      voteUrl: `${baseUrl}/v/${response.id}`,
      adminUrl: `${baseUrl}/a/${response.id}?k=${response.organizerKey}`,
      organizerKey: response.organizerKey,
    }
  },

  /**
   * Get event by ID (public)
   * @param organizerKey - Optional organizer key for admin access
   */
  getById: (eventId: string, organizerKey?: string) => {
    const url = organizerKey
      ? `/events/${eventId}?k=${encodeURIComponent(organizerKey)}`
      : `/events/${eventId}`
    return apiClient.get<Event>(url)
  },

  /**
   * Update event (requires organizerKey)
   */
  update: (eventId: string, data: UpdateEventInput, organizerKey: string) =>
    apiClient.patch<Event>(`/events/${eventId}?k=${encodeURIComponent(organizerKey)}`, data),

  /**
   * Delete event (requires organizerKey)
   */
  delete: (eventId: string, organizerKey: string) =>
    apiClient.delete(`/events/${eventId}?k=${encodeURIComponent(organizerKey)}`),

  /**
   * Fix date for event (requires organizerKey)
   */
  fixDate: (eventId: string, data: FixDateInput, organizerKey: string) =>
    apiClient.patch<Event>(`/events/${eventId}/fix?k=${encodeURIComponent(organizerKey)}`, data),

  /**
   * Lock/unlock event (requires organizerKey)
   */
  lock: (eventId: string, locked: boolean, organizerKey: string) =>
    apiClient.patch<Event>(`/events/${eventId}/lock?k=${encodeURIComponent(organizerKey)}`, { locked }),
}

/**
 * Vote API endpoints
 */
export const voteApi = {
  /**
   * Cast votes for an event
   */
  cast: (eventId: string, data: CastVoteInput) =>
    apiClient.post<Vote[]>(`/events/${eventId}/votes`, data),

  /**
   * Get votes for an event
   */
  getByEventId: (eventId: string) =>
    apiClient.get<Vote[]>(`/events/${eventId}/votes`),

  /**
   * Update votes
   */
  update: (eventId: string, voteId: string, response: VoteResponse) =>
    apiClient.patch<Vote>(`/events/${eventId}/votes/${voteId}`, { response }),
}

/**
 * Auth API types
 */
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  name?: string
}

export interface OAuthInput {
  provider: 'google' | 'line'
  idToken?: string
  code?: string
  redirectUri?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
    tier: string
  }
}

export interface UserResponse {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  createdAt: string
  subscription: {
    tier: string
    status: string
    currentPeriodEnd: string | null
  } | null
}

/**
 * Auth API endpoints
 */
export const authApi = {
  /**
   * Register with email/password
   */
  register: (data: RegisterInput) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  /**
   * Login with email/password
   */
  login: (data: LoginInput) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  /**
   * OAuth login (Google, LINE)
   */
  oauth: (data: OAuthInput) =>
    apiClient.post<AuthResponse>('/auth/oauth', data),

  /**
   * Refresh access token
   */
  refresh: (refreshToken: string) =>
    apiClient.post<AuthResponse>('/auth/refresh', { refreshToken }),

  /**
   * Logout
   */
  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refreshToken }),

  /**
   * Get current user
   */
  me: (accessToken: string) =>
    apiClient.get<UserResponse>('/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

/**
 * Subscription API types
 */
export interface SubscriptionResponse {
  id: string
  tier: string
  status: string
  billingCycle: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export interface CheckoutInput {
  tier: 'PRO_PERSONAL' | 'PRO_TEAM' | 'PRO_BUSINESS'
  billingCycle: 'MONTHLY' | 'YEARLY'
}

export interface CheckoutResponse {
  checkoutUrl: string
  subscriptionId: string
}

/**
 * Subscription API endpoints
 */
export const subscriptionApi = {
  /**
   * Get current subscription
   */
  get: (accessToken: string) =>
    apiClient.get<SubscriptionResponse | null>('/subscription', {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  /**
   * Create checkout session
   */
  checkout: (data: CheckoutInput, accessToken: string) =>
    apiClient.post<CheckoutResponse>('/subscription/checkout', data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  /**
   * Cancel subscription
   */
  cancel: (accessToken: string) =>
    apiClient.post<{ success: boolean }>('/subscription/cancel', {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

  /**
   * Reactivate subscription
   */
  reactivate: (accessToken: string) =>
    apiClient.post<{ success: boolean }>('/subscription/reactivate', {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
}

// Import types at the end to avoid circular dependencies
import type {
  Event,
  CreateEventInput,
  UpdateEventInput,
  FixDateInput,
  Vote,
  VoteResponse,
  CastVoteInput,
} from '@/types'
