"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEvents, type Event } from "@/hooks/use-events"
import { useProjects } from "@/hooks/use-projects"
import { Plus } from "lucide-react"

interface EventDialogProps {
  event?: Event
  mode: "add" | "edit"
  trigger?: React.ReactNode
  defaultDate?: string
}

export function EventDialog({ event, mode, trigger, defaultDate }: EventDialogProps) {
  const { addEvent, updateEvent } = useEvents()
  const { projects } = useProjects()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || defaultDate || "",
    time: event?.time || "",
    type: event?.type || ("meeting" as const),
    priority: event?.priority || ("medium" as const),
    project: event?.project || "No Project",
    location: event?.location || "",
    attendees: event?.attendees?.join(", ") || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const eventData = {
      ...formData,
      attendees: formData.attendees
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    }

    if (mode === "add") {
      addEvent(eventData)
    } else if (event) {
      updateEvent(event.id, eventData)
    }

    setOpen(false)
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      type: "meeting",
      priority: "medium",
      project: "No Project",
      location: "",
      attendees: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Event" : "Edit Event"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Create a new event for your calendar." : "Update your event details and settings."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              required
              className="bg-muted/30 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your event"
              className="bg-muted/30 border-border/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="bg-muted/30 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-muted/30 border-border/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as Event["type"] })}
              >
                <SelectTrigger className="bg-muted/30 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as Event["priority"] })}
              >
                <SelectTrigger className="bg-muted/30 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project (Optional)</Label>
            <Select value={formData.project} onValueChange={(value) => setFormData({ ...formData, project: value })}>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Project">No Project</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.name}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Meeting location or link"
              className="bg-muted/30 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Attendees (Optional)</Label>
            <Input
              id="attendees"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              placeholder="Comma-separated names"
              className="bg-muted/30 border-border/50"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {mode === "add" ? "Create Event" : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
