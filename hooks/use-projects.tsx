"use client"

import { create } from "zustand"

export interface Project {
  id: number
  name: string
  description: string
  color: string
  tasks: number
  progress: number
  total: number
  completed: number
  status: string
  dueDate: string
  team: string[]
  budget: string
}

interface ProjectsState {
  projects: Project[]
  selectedProject: number | null
  addProject: (project: Omit<Project, "id">) => void
  deleteProject: (id: number) => void
  updateProject: (id: number, updates: Partial<Project>) => void
  exportProjects: () => void
  setSelectedProject: (id: number | null) => void
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    color: "project-color-1",
    tasks: 12,
    progress: 75,
    total: 16,
    completed: 12,
    status: "In Progress",
    dueDate: "2024-02-15",
    team: ["JD", "SM", "TB"],
    budget: "$25,000",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Native iOS and Android app for customer engagement",
    color: "project-color-2",
    tasks: 8,
    progress: 60,
    total: 10,
    completed: 6,
    status: "In Progress",
    dueDate: "2024-03-01",
    team: ["JS", "AC", "MW"],
    budget: "$45,000",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Comprehensive marketing strategy for Q1 product launch",
    color: "project-color-3",
    tasks: 5,
    progress: 40,
    total: 8,
    completed: 3,
    status: "Planning",
    dueDate: "2024-01-31",
    team: ["MJ", "SW"],
    budget: "$15,000",
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate legacy database to modern cloud infrastructure",
    color: "project-color-4",
    tasks: 3,
    progress: 25,
    total: 4,
    completed: 1,
    status: "Planning",
    dueDate: "2024-04-01",
    team: ["SW", "AC"],
    budget: "$30,000",
  },
]

export const useProjects = create<ProjectsState>((set, get) => ({
  projects: initialProjects,
  selectedProject: null,

  addProject: (project) => {
    const newProject = {
      ...project,
      id: Math.max(...get().projects.map((p) => p.id), 0) + 1,
    }
    set((state) => ({
      projects: [...state.projects, newProject],
    }))
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    }))
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  },

  exportProjects: () => {
    const projects = get().projects
    const csvContent = [
      ["Name", "Description", "Status", "Progress", "Due Date", "Budget", "Team Size"].join(","),
      ...projects.map((p) =>
        [p.name, p.description, p.status, `${p.progress}%`, p.dueDate, p.budget, p.team.length.toString()].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "projects.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },

  setSelectedProject: (id) => {
    set({ selectedProject: id })
  },
}))
