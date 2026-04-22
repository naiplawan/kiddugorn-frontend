'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { eventApi, getThaiErrorMessage } from '@/lib/api/client'
import { useToast } from '@/hooks/use-toast'
import type { Event } from '@/types'

export type AdminEventState = {
  event: Event | null
  isLoading: boolean
  hasAccess: boolean
  eventId: string
  organizerKey: string | null
}

export function useAdminEvent(): AdminEventState {
  const params = useParams()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const eventId = params.eventId as string
  const organizerKey = searchParams.get('k')

  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      if (!organizerKey) {
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      try {
        const data = await eventApi.getById(eventId, organizerKey)
        setEvent(data)
      } catch (error) {
        toast({
          title: 'โหลดข้อมูลไม่สำเร็จ',
          description: getThaiErrorMessage(error),
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, organizerKey, toast])

  return { event, isLoading, hasAccess, eventId, organizerKey }
}
