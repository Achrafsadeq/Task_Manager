"use client"

import { create } from "zustand"

export interface Task {
  id: number
  title: string
  description: string
  project: string
  priority: "high" | "medium" | "low"
  dueDate: string
  assignee: string
  completed: boolean
  createdAt: string
}

interface TasksState {
  tasks: Task[]
  searchQuery: string
  priorityFilter: string
  statusFilter: string
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: number, updates: Partial<Task>) => void
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
  setSearchQuery: (query: string) => void
  setPriorityFilter: (priority: string) => void
  setStatusFilter: (status: string) => void
  getFilteredTasks: () => Task[]
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design new landing page",
    description: "Create a modern, responsive landing page with improved UX",
    project: "Website Redesign",
    priority: "high",
    dueDate: "2024-01-15",
    assignee: "John Doe",
    completed: false,
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Implement user authentication",
    description: "Add secure login and registration functionality",
    project: "Mobile App",
    priority: "high",
    dueDate: "2024-01-12",
    assignee: "Jane Smith",
    completed: true,
    createdAt: "2024-01-08",
  },
  {
    id: 3,
    title: "Create marketing materials",
    description: "Design brochures, social media posts, and email templates",
    project: "Marketing Campaign",
    priority: "medium",
    dueDate: "2024-01-18",
    assignee: "Mike Johnson",
    completed: false,
    createdAt: "2024-01-09",
  },
  {
    id: 4,
    title: "Database schema optimization",
    description: "Optimize database queries and improve performance",
    project: "Database Migration",
    priority: "low",
    dueDate: "2024-01-20",
    assignee: "Sarah Wilson",
    completed: false,
    createdAt: "2024-01-11",
  },
  {
    id: 5,
    title: "User testing sessions",
    description: "Conduct usability testing with target users",
    project: "Website Redesign",
    priority: "medium",
    dueDate: "2024-01-16",
    assignee: "Tom Brown",
    completed: true,
    createdAt: "2024-01-07",
  },
  {
    id: 6,
    title: "API documentation update",
    description: "Update API documentation with new endpoints",
    project: "Mobile App",
    priority: "low",
    dueDate: "2024-01-22",
    assignee: "Alex Chen",
    completed: false,
    createdAt: "2024-01-12",
  },
]

export const useTasks = create<TasksState>((set, get) => ({
  tasks: initialTasks,
  searchQuery: "",
  priorityFilter: "all",
  statusFilter: "all",

  addTask: (task) => {
    const newTask = {
      ...task,
      id: Math.max(...get().tasks.map((t) => t.id), 0) + 1,
      createdAt: new Date().toISOString().split("T")[0],
    }
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }))
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    }))
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }))
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    }))
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  setPriorityFilter: (priority) => {
    set({ priorityFilter: priority })
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status })
  },

  getFilteredTasks: () => {
    const { tasks, searchQuery, priorityFilter, statusFilter } = get()

    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "pending" && !task.completed) ||
        (statusFilter === "overdue" && !task.completed && new Date(task.dueDate) < new Date())

      return matchesSearch && matchesPriority && matchesStatus
    })
  },
}))
