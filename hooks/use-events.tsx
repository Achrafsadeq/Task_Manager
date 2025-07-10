"use client"

import { create } from "zustand"

export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  type: "meeting" | "deadline" | "task" | "reminder"
  priority: "high" | "medium" | "low"
  project?: string
  attendees?: string[]
  location?: string
  createdAt: string
}

interface EventsState {
  events: Event[]
  selectedDate: number
  currentMonth: number
  currentYear: number
  addEvent: (event: Omit<Event, "id" | "createdAt">) => void
  updateEvent: (id: number, updates: Partial<Event>) => void
  deleteEvent: (id: number) => void
  setSelectedDate: (date: number) => void
  setCurrentMonth: (month: number) => void
  setCurrentYear: (year: number) => void
  getEventsForDate: (date: string) => Event[]
  getUpcomingDeadlines: () => Event[]
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Design Review",
    description: "Review the new landing page designs with the team",
    date: "2024-01-15",
    time: "09:00",
    type: "meeting",
    priority: "high",
    project: "Website Redesign",
    attendees: ["John Doe", "Jane Smith"],
    location: "Conference Room A",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Website Redesign Due",
    description: "Final deadline for website redesign project",
    date: "2024-01-15",
    time: "17:00",
    type: "deadline",
    priority: "high",
    project: "Website Redesign",
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    title: "Team Standup",
    description: "Daily team standup meeting",
    date: "2024-01-15",
    time: "10:00",
    type: "meeting",
    priority: "medium",
    attendees: ["Team"],
    location: "Virtual",
    createdAt: "2024-01-14",
  },
  {
    id: 4,
    title: "Client Presentation",
    description: "Present project progress to client",
    date: "2024-01-16",
    time: "14:00",
    type: "meeting",
    priority: "high",
    project: "Mobile App",
    attendees: ["Client", "Project Team"],
    location: "Client Office",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    title: "Code Review",
    description: "Review pull requests and code quality",
    date: "2024-01-17",
    time: "16:00",
    type: "task",
    priority: "medium",
    project: "Mobile App",
    createdAt: "2024-01-13",
  },
]

export const useEvents = create<EventsState>((set, get) => ({
  events: initialEvents,
  selectedDate: 15,
  currentMonth: 0, // January (0-indexed)
  currentYear: 2024,

  addEvent: (event) => {
    const newEvent = {
      ...event,
      id: Math.max(...get().events.map((e) => e.id), 0) + 1,
      createdAt: new Date().toISOString().split("T")[0],
    }
    set((state) => ({
      events: [...state.events, newEvent],
    }))
  },

  updateEvent: (id, updates) => {
    set((state) => ({
      events: state.events.map((event) => (event.id === id ? { ...event, ...updates } : event)),
    }))
  },

  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    }))
  },

  setSelectedDate: (date) => {
    set({ selectedDate: date })
  },

  setCurrentMonth: (month) => {
    set({ currentMonth: month })
  },

  setCurrentYear: (year) => {
    set({ currentYear: year })
  },

  getEventsForDate: (date) => {
    return get().events.filter((event) => event.date === date)
  },

  getUpcomingDeadlines: () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return get()
      .events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate >= today && eventDate <= nextWeek && (event.type === "deadline" || event.priority === "high")
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  },
}))
