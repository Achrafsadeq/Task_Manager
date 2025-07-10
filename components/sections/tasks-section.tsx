"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Calendar, User, Search, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTasks } from "@/hooks/use-tasks"
import { TaskDialog } from "@/components/task-dialog"

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

export function TasksSection() {
  const {
    getFilteredTasks,
    searchQuery,
    priorityFilter,
    statusFilter,
    setSearchQuery,
    setPriorityFilter,
    setStatusFilter,
    toggleTask,
    deleteTask,
  } = useTasks()

  const filteredTasks = getFilteredTasks()

  const handleDeleteTask = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all your tasks</p>
        </div>
        <TaskDialog mode="add" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px] bg-card border-border/50">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-card border-border/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No tasks found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || priorityFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first task to get started"}
                </p>
              </div>
              {!searchQuery && priorityFilter === "all" && statusFilter === "all" && <TaskDialog mode="add" />}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={`border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/70 ${
                task.priority === "high"
                  ? "task-priority-high"
                  : task.priority === "medium"
                    ? "task-priority-medium"
                    : "task-priority-low"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Badge variant={priorityColors[task.priority]} className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <TaskDialog
                        mode="edit"
                        task={task}
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        }
                      />
                      <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className={`text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Project</span>
                    <span>{task.project}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due</span>
                    </div>
                    <span className={new Date(task.dueDate) < new Date() && !task.completed ? "text-destructive" : ""}>
                      {task.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>Assignee</span>
                    </div>
                    <span>{task.assignee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredTasks.length} of {useTasks.getState().tasks.length} tasks
        </span>
        {(searchQuery || priorityFilter !== "all" || statusFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setPriorityFilter("all")
              setStatusFilter("all")
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
