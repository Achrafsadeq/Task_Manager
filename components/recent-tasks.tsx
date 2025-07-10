"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Calendar, User, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTasks } from "@/hooks/use-tasks"
import { TaskDialog } from "@/components/task-dialog"

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const

export function RecentTasks() {
  const { tasks, toggleTask, deleteTask } = useTasks()

  // Get the 5 most recent tasks
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const handleDeleteTask = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId)
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Your latest tasks and their current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task) => {
            const daysUntilDue = getDaysUntilDue(task.dueDate)
            const isOverdue = daysUntilDue < 0 && !task.completed

            return (
              <div
                key={task.id}
                className={`flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                  task.priority === "high"
                    ? "task-priority-high"
                    : task.priority === "medium"
                      ? "task-priority-medium"
                      : "task-priority-low"
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex-1 space-y-1">
                  <p
                    className={`text-sm font-medium leading-none ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{task.project}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span className={isOverdue ? "text-destructive font-medium" : ""}>
                        {task.dueDate}
                        {isOverdue && " (Overdue)"}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={priorityColors[task.priority]} className="text-xs">
                  {task.priority}
                </Badge>
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
                    <DropdownMenuItem onClick={() => toggleTask(task.id)}>
                      {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
