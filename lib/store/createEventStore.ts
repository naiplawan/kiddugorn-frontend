import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EventFormData, EventDateFormData } from '@/types'

interface CreateEventState {
  formData: Partial<EventFormData>
  setFormData: (data: Partial<EventFormData>) => void
  addDate: (date: EventDateFormData) => void
  removeDate: (index: number) => void
  updateDate: (index: number, date: EventDateFormData) => void
  resetFormData: () => void
}

const initialFormData: Partial<EventFormData> = {
  title: '',
  description: '',
  location: '',
  creatorName: '',
  creatorEmail: '',
  dates: [],
}

export const useCreateEventStore = create<CreateEventState>()(
  persist(
    (set) => ({
      formData: initialFormData,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      addDate: (date) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dates: [...(state.formData.dates || []), date],
          },
        })),

      removeDate: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dates: state.formData.dates?.filter((_, i) => i !== index),
          },
        })),

      updateDate: (index, date) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dates: state.formData.dates?.map((d, i) => (i === index ? date : d)),
          },
        })),

      resetFormData: () => set({ formData: initialFormData }),
    }),
    {
      name: 'kiddugorn-create-event',
    }
  )
)
