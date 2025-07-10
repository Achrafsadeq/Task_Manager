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
import { useProjects, type Project } from "@/hooks/use-projects"
import { Plus } from "lucide-react"

const colorOptions = [
  { value: "project-color-1", label: "Emerald", class: "bg-emerald-500" },
  { value: "project-color-2", label: "Blue", class: "bg-blue-500" },
  { value: "project-color-3", label: "Purple", class: "bg-purple-500" },
  { value: "project-color-4", label: "Orange", class: "bg-orange-500" },
  { value: "project-color-5", label: "Pink", class: "bg-pink-500" },
  { value: "project-color-6", label: "Cyan", class: "bg-cyan-500" },
]

interface ProjectDialogProps {
  project?: Project
  mode: "add" | "edit"
  trigger?: React.ReactNode
}

export function ProjectDialog({ project, mode, trigger }: ProjectDialogProps) {
  const { addProject, updateProject } = useProjects()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    color: project?.color || "project-color-1",
    status: project?.status || "Planning",
    dueDate: project?.dueDate || "",
    budget: project?.budget || "",
    total: project?.total || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "add") {
      addProject({
        ...formData,
        tasks: 0,
        progress: 0,
        completed: 0,
        team: [],
      })
    } else if (project) {
      updateProject(project.id, formData)
    }

    setOpen(false)
    setFormData({
      name: "",
      description: "",
      color: "project-color-1",
      status: "Planning",
      dueDate: "",
      budget: "",
      total: 1,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Project" : "Edit Project"}</DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a new project to organize your tasks and track progress."
              : "Update your project details and settings."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
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
              placeholder="Describe your project"
              className="bg-muted/30 border-border/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-muted/30 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">Total Tasks</Label>
              <Input
                id="total"
                type="number"
                min="1"
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: Number.parseInt(e.target.value) || 1 })}
                className="bg-muted/30 border-border/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="bg-muted/30 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="$0"
                className="bg-muted/30 border-border/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Color</Label>
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`h-8 w-8 rounded-full ${color.class} border-2 ${
                    formData.color === color.value ? "border-primary" : "border-transparent hover:border-border"
                  } transition-colors`}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {mode === "add" ? "Create Project" : "Update Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
