"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, MapPin } from "lucide-react"
import { useEvents } from "@/hooks/use-events"
import { EventDialog } from "@/components/event-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarSection() {
  const {
    events,
    selectedDate,
    currentMonth,
    currentYear,
    setSelectedDate,
    setCurrentMonth,
    setCurrentYear,
    getEventsForDate,
    getUpcomingDeadlines,
    deleteEvent,
  } = useEvents()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const selectedDateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
  const todaysEvents = getEventsForDate(selectedDateString)
  const upcomingDeadlines = getUpcomingDeadlines()

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const hasEventsOnDate = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return getEventsForDate(dateString).length > 0
  }

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId)
    }
  }

  const getDaysRemaining = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Schedule and track your tasks and meetings</p>
        </div>
        <EventDialog mode="add" defaultDate={selectedDateString} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent hover:bg-primary/20"
                    onClick={() => navigateMonth("prev")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent hover:bg-primary/20"
                    onClick={() => navigateMonth("next")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, index) => (
                  <div key={`empty-${index}`} className="p-2" />
                ))}
                {daysArray.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 text-center text-sm rounded-md transition-colors hover:bg-muted/50 relative ${
                      selectedDate === day
                        ? "bg-primary text-primary-foreground"
                        : day === new Date().getDate() &&
                            currentMonth === new Date().getMonth() &&
                            currentYear === new Date().getFullYear()
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {day}
                    {hasEventsOnDate(day) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>
                {monthNames[currentMonth]} {selectedDate}, {currentYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysEvents.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">No events scheduled</p>
                  <EventDialog
                    mode="add"
                    defaultDate={selectedDateString}
                    trigger={
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Event
                      </Button>
                    }
                  />
                </div>
              ) : (
                todaysEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="text-sm font-medium text-muted-foreground min-w-[50px]">
                      {event.time || "All day"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{event.title}</div>
                      {event.description && (
                        <div className="text-xs text-muted-foreground truncate">{event.description}</div>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={event.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {event.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                        {event.location && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate max-w-20">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <EventDialog
                          mode="edit"
                          event={event}
                          trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          }
                        />
                        <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-4">No upcoming deadlines</p>
              ) : (
                upcomingDeadlines.map((event) => {
                  const daysRemaining = getDaysRemaining(event.date)
                  return (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        daysRemaining <= 1
                          ? "bg-destructive/10 border-destructive/20"
                          : daysRemaining <= 3
                            ? "bg-primary/10 border-primary/20"
                            : "bg-muted/30"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {daysRemaining === 0
                            ? "Due today"
                            : daysRemaining === 1
                              ? "Due tomorrow"
                              : `${daysRemaining} days remaining`}
                        </div>
                        {event.project && <div className="text-xs text-muted-foreground mt-1">{event.project}</div>}
                      </div>
                      <Badge
                        variant={daysRemaining <= 1 ? "destructive" : daysRemaining <= 3 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {event.priority}
                      </Badge>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
