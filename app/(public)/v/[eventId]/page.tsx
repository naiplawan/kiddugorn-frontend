'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from '@/components/ui'
import { useParams } from 'next/navigation'
import { useEvent, useVotes } from '@/lib/swr/hooks'
import { apiClient, getThaiErrorMessage, ApiError } from '@/lib/api/client'
import { formatThaiDateFull, formatThaiTime } from '@/lib/utils/dates'
import { VotingGrid } from '@/components/voting'
import { toast } from 'sonner'
import type { AnswerValue, ParticipantRow, DateOption, Vote } from '@/types'

// Local storage key for vote tokens
const VOTE_TOKENS_KEY = 'kiddugorn_vote_tokens'

interface StoredVoteToken {
  eventId: string
  voteId: string
  token: string
  name: string
}

function getStoredVoteTokens(): StoredVoteToken[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(VOTE_TOKENS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function storeVoteToken(token: StoredVoteToken) {
  const tokens = getStoredVoteTokens().filter(t => t.eventId !== token.eventId)
  tokens.push(token)
  localStorage.setItem(VOTE_TOKENS_KEY, JSON.stringify(tokens))
}

function getStoredVoteToken(eventId: string): StoredVoteToken | undefined {
  return getStoredVoteTokens().find(t => t.eventId === eventId)
}

export default function VotingPage() {
  const params = useParams()
  const eventId = params.eventId as string

  const { event, isLoading: isLoadingEvent, isError: isEventError } = useEvent(eventId)
  const { votes, isLoading: isLoadingVotes, mutate: mutateVotes } = useVotes(eventId)

  const [voterName, setVoterName] = useState('')
  const [localAnswers, setLocalAnswers] = useState<Record<string, AnswerValue>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasExistingVote, setHasExistingVote] = useState(false)
  const [currentVoteId, setCurrentVoteId] = useState<string | undefined>()
  const [currentVoteToken, setCurrentVoteToken] = useState<string | undefined>()

  // Check for existing vote from local storage
  useEffect(() => {
    const stored = getStoredVoteToken(eventId)
    if (stored) {
      setVoterName(stored.name)
      setCurrentVoteId(stored.voteId)
      setCurrentVoteToken(stored.token)
      setHasExistingVote(true)
    }
  }, [eventId])

  // Populate local answers when existing vote is found
  useEffect(() => {
    if (hasExistingVote && votes && currentVoteId) {
      const existingVote = votes.find(v => v.id === currentVoteId)
      if (existingVote) {
        const answers: Record<string, AnswerValue> = {}
        existingVote.answers.forEach(answer => {
          answers[answer.dateOptionId] = answer.value
        })
        setLocalAnswers(answers)
        setVoterName(existingVote.name)
      }
    }
  }, [hasExistingVote, votes, currentVoteId])

  // Transform event data to DateOption format
  const dateOptions: DateOption[] = useMemo(() => {
    if (!event) return []
    // The event from API should have dateOptions
    // If using the old format with dates array, transform it
    return event.dateOptions || []
  }, [event])

  // Transform votes to participant rows
  const participantRows: ParticipantRow[] = useMemo(() => {
    if (!votes) return []

    return votes.map(vote => {
      const answers: Record<string, AnswerValue> = {}
      vote.answers.forEach(answer => {
        answers[answer.dateOptionId] = answer.value
      })

      return {
        voteId: vote.id,
        name: vote.name,
        answers,
        isGhost: false,
      }
    })
  }, [votes])

  // Handle vote cell change
  const handleVoteChange = useCallback((dateOptionId: string, value: AnswerValue | null) => {
    setLocalAnswers(prev => {
      const newAnswers = { ...prev }
      if (value === null) {
        delete newAnswers[dateOptionId]
      } else {
        newAnswers[dateOptionId] = value
      }
      return newAnswers
    })
  }, [])

  // Submit vote
  const handleSubmit = async () => {
    if (!voterName.trim()) {
      toast.error('กรุณากรอกชื่อของคุณ')
      return
    }

    if (Object.keys(localAnswers).length === 0) {
      toast.error('กรุณาโหวตอย่างน้อย 1 ตัวเลือก')
      return
    }

    setIsSubmitting(true)

    try {
      if (hasExistingVote && currentVoteId && currentVoteToken) {
        // Update existing vote
        const answersArray = Object.entries(localAnswers).map(([dateOptionId, value]) => ({
          dateOptionId,
          value,
        }))

        await apiClient.patch(`/votes/${currentVoteId}`, {
          name: voterName.trim(),
          answers: answersArray,
        }, {
          headers: {
            'X-Vote-Token': currentVoteToken,
          },
        })

        toast.success('อัปเดตคะแนนโหวตสำเร็จ!')
      } else {
        // Create new vote
        const answersArray = Object.entries(localAnswers).map(([dateOptionId, value]) => ({
          dateOptionId,
          value,
        }))

        const response = await apiClient.post<{
          id: string
          name: string
          voteToken: string
        }>(`/events/${eventId}/votes`, {
          name: voterName.trim(),
          answers: answersArray,
        })

        // Store the vote token
        storeVoteToken({
          eventId,
          voteId: response.id,
          token: response.voteToken,
          name: voterName.trim(),
        })

        setCurrentVoteId(response.id)
        setCurrentVoteToken(response.voteToken)
        setHasExistingVote(true)

        toast.success('ส่งคะแนนโหวตสำเร็จ!')
      }

      // Refresh votes
      mutateVotes()
    } catch (error) {
      const message = getThaiErrorMessage(error)
      toast.error(message)

      // Handle specific error codes
      if (error instanceof ApiError && error.data) {
        const data = error.data as { code?: string }
        if (data.code === 'NAME_ALREADY_TAKEN') {
          toast.error('มีคนใช้ชื่อนี้แล้ว กรุณาใช้ชื่ออื่น')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading state
  if (isLoadingEvent || isLoadingVotes) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    )
  }

  // Error state
  if (isEventError || !event) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ไม่พบกิจกรรม
          </h1>
          <p className="text-gray-600 mb-6">
            กิจกรรมที่คุณค้นหาไม่มีอยู่หรืออาจถูกลบไปแล้ว
          </p>
          <Button onClick={() => window.location.href = '/'}>
            กลับหน้าหลัก
          </Button>
        </div>
      </main>
    )
  }

  const isEventLocked = event.status === 'LOCKED'

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {event.title}
          </h1>
          {event.description && (
            <p className="text-gray-600 mt-2">{event.description}</p>
          )}
          {event.location && (
            <p className="text-gray-500 mt-2 flex items-center gap-2">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {event.location}
            </p>
          )}
          <p className="text-sm text-gray-400 mt-4">
            สร้างโดย {event.creatorName || 'ไม่ระบุ'}
          </p>
        </div>

        {/* Locked event warning */}
        {isEventLocked && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 font-medium">
              กิจกรรมนี้ถูกล็อกแล้ว ไม่สามารถโหวตเพิ่มเติมได้
            </p>
          </div>
        )}

        {/* Voting Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {hasExistingVote ? 'แก้ไขคะแนนโหวตของคุณ' : 'โหวตวันที่เหมาะสม'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isEventLocked && (
              <>
                <p className="text-gray-600">
                  เลือกวันที่คุณสะดวกที่จะเข้าร่วมกิจกรรม
                </p>

                {/* Your vote row - for new voters */}
                <div className="space-y-4">
                  <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
                    <h3 className="font-medium text-gray-900 mb-3">คะแนนโหวตของคุณ</h3>

                    {/* Inline voting for current user */}
                    <div className="flex flex-wrap gap-2">
                      {dateOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-2 border border-gray-200 rounded-lg p-2"
                        >
                          <span className="text-sm text-gray-700">{option.label}</span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => handleVoteChange(option.id, 'yes')}
                              className={`px-2 py-1 rounded text-xs transition-colors ${
                                localAnswers[option.id] === 'yes'
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-emerald-100'
                              }`}
                            >
                              ว่าง
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVoteChange(option.id, 'maybe')}
                              className={`px-2 py-1 rounded text-xs transition-colors ${
                                localAnswers[option.id] === 'maybe'
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
                              }`}
                            >
                              อาจจะ
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVoteChange(option.id, 'no')}
                              className={`px-2 py-1 rounded text-xs transition-colors ${
                                localAnswers[option.id] === 'no'
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-rose-100'
                              }`}
                            >
                              ไม่ว่าง
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Voter Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อของคุณ
                    </label>
                    <Input
                      type="text"
                      placeholder="กรอกชื่อของคุณ"
                      value={voterName}
                      onChange={(e) => setVoterName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'กำลังส่ง...'
                      : hasExistingVote
                      ? 'อัปเดตคะแนนโหวต'
                      : 'ส่งคะแนนโหวต'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Voting Grid - All Participants */}
        <Card>
          <CardHeader>
            <CardTitle>สรุปผลโหวตทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>
            {participantRows.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                ยังไม่มีผู้เข้าร่วมโหวต
              </p>
            ) : (
              <VotingGrid
                dateOptions={dateOptions}
                votes={votes || []}
                fixedDateIds={event.fixedDateIds || []}
                participantRows={participantRows}
                isEditable={false}
                showSummary={true}
              />
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-emerald-100 border-2 border-emerald-500" />
            <span>ว่าง</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-amber-100 border-2 border-amber-400" />
            <span>อาจจะ</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-rose-100 border-2 border-rose-500" />
            <span>ไม่ว่าง</span>
          </div>
        </div>
      </div>
    </main>
  )
}
