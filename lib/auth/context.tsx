'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { authApi, subscriptionApi, type AuthResponse, type UserResponse, type SubscriptionResponse } from '../api/client'

interface AuthContextType {
  user: UserResponse | null
  subscription: SubscriptionResponse | null
  isLoading: boolean
  isAuthenticated: boolean
  accessToken: string | null

  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  oauth: (provider: 'google' | 'line', idToken?: string, code?: string, redirectUri?: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const TOKEN_KEY = 'kiddugorn_tokens'
const USER_KEY = 'kiddugorn_user'

function getStoredTokens(): { accessToken: string; refreshToken: string } | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(TOKEN_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function setStoredTokens(tokens: { accessToken: string; refreshToken: string } | null) {
  if (typeof window === 'undefined') return
  if (tokens) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!accessToken

  const refreshUser = useCallback(async () => {
    const tokens = getStoredTokens()
    if (!tokens) {
      setIsLoading(false)
      return
    }

    try {
      setAccessToken(tokens.accessToken)
      const userData = await authApi.me(tokens.accessToken)
      setUser(userData)

      // Fetch subscription
      try {
        const subData = await subscriptionApi.get(tokens.accessToken)
        setSubscription(subData)
      } catch {
        setSubscription(null)
      }
    } catch (error) {
      // Token might be expired, try refresh
      try {
        const newTokens = await authApi.refresh(tokens.refreshToken)
        setStoredTokens(newTokens)
        setAccessToken(newTokens.accessToken)

        const userData = await authApi.me(newTokens.accessToken)
        setUser(userData)

        try {
          const subData = await subscriptionApi.get(newTokens.accessToken)
          setSubscription(subData)
        } catch {
          setSubscription(null)
        }
      } catch {
        // Refresh failed, clear auth
        setStoredTokens(null)
        setAccessToken(null)
        setUser(null)
        setSubscription(null)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const handleAuthResponse = async (response: AuthResponse) => {
    setStoredTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    })
    setAccessToken(response.accessToken)
    setUser({
      id: response.user.id,
      email: response.user.email,
      name: response.user.name,
      avatarUrl: response.user.avatarUrl,
      createdAt: new Date().toISOString(),
      subscription: null,
    })

    // Fetch full user data and subscription
    try {
      const [userData, subData] = await Promise.all([
        authApi.me(response.accessToken),
        subscriptionApi.get(response.accessToken),
      ])
      setUser(userData)
      setSubscription(subData)
    } catch {
      // Non-critical, user is still logged in
    }
  }

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    await handleAuthResponse(response)
  }

  const register = async (email: string, password: string, name?: string) => {
    const response = await authApi.register({ email, password, name })
    await handleAuthResponse(response)
  }

  const oauth = async (
    provider: 'google' | 'line',
    idToken?: string,
    code?: string,
    redirectUri?: string
  ) => {
    const response = await authApi.oauth({ provider, idToken, code, redirectUri })
    await handleAuthResponse(response)
  }

  const logout = async () => {
    const tokens = getStoredTokens()
    if (tokens?.refreshToken) {
      try {
        await authApi.logout(tokens.refreshToken)
      } catch {
        // Ignore logout errors
      }
    }
    setStoredTokens(null)
    setAccessToken(null)
    setUser(null)
    setSubscription(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isLoading,
        isAuthenticated,
        accessToken,
        login,
        register,
        oauth,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
