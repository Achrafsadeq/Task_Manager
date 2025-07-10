"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users, FileText } from "lucide-react"
import { TaskDialog } from "@/components/task-dialog"
import { EventDialog } from "@/components/event-dialog"
import { useNavigation } from "@/hooks/use-navigation"
import { useTasks } from "@/hooks/use-tasks"
import { useProjects } from "@/hooks/use-projects"
import { useEvents } from "@/hooks/use-events"

export function QuickActions() {
  const { setActiveSection } = useNavigation()
  const { tasks } = useTasks()
  const { projects } = useProjects()
  const { events } = useEvents()

  const generateReport = () => {
    // Generate a comprehensive report
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    const overdueTasks = tasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date()).length

    const projectStats = projects.map((project) => ({
      name: project.name,
      progress: project.progress,
      tasksCompleted: project.completed,
      totalTasks: project.total,
    }))

    const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date()).length

    const reportData = {
      summary: {
        totalTasks,
        completedTasks,
        completionRate,
        overdueTasks,
        totalProjects: projects.length,
        upcomingEvents,
      },
      projects: projectStats,
      generatedAt: new Date().toISOString(),
    }

    // Create and download CSV report
    const csvContent = [
      "Task Manager Report",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "SUMMARY",
      `Total Tasks,${totalTasks}`,
      `Completed Tasks,${completedTasks}`,
      `Completion Rate,${completionRate}%`,
      `Overdue Tasks,${overdueTasks}`,
      `Total Projects,${projects.length}`,
      `Upcoming Events,${upcomingEvents}`,
      "",
      "PROJECT DETAILS",
      "Project Name,Progress,Completed Tasks,Total Tasks",
      ...projectStats.map((p) => `${p.name},${p.progress}%,${p.tasksCompleted},${p.totalTasks}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `task-manager-report-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    // Show success message
    alert("Report generated and downloaded successfully!")
  }

  const inviteTeam = () => {
    // Simulate team invitation
    const email = prompt("Enter team member's email address:")
    if (email && email.includes("@")) {
      alert(`Invitation sent to ${email}! They will receive an email with instructions to join your workspace.`)
    } else if (email) {
      alert("Please enter a valid email address.")
    }
  }

  const actions = [
    {
      title: "New Task",
      description: "Create a new task",
      icon: Plus,
      color: "bg-primary hover:bg-primary/90",
      component: (
        <TaskDialog
          mode="add"
          trigger={
            <Button className="h-auto flex-col space-y-2 p-4 hover:bg-muted/50 bg-transparent border-border/50 w-full">
              <Plus className="h-6 w-6" />
              <div className="text-center">
                <div className="text-sm font-medium">New Task</div>
                <div className="text-xs text-muted-foreground">Create a new task</div>
              </div>
            </Button>
          }
        />
      ),
    },
    {
      title: "Schedule Meeting",
      description: "Add to calendar",
      icon: Calendar,
      color: "bg-blue-600 hover:bg-blue-700",
      component: (
        <EventDialog
          mode="add"
          trigger={
            <Button
              variant="outline"
              className="h-auto flex-col space-y-2 p-4 hover:bg-muted/50 bg-transparent border-border/50 w-full"
            >
              <Calendar className="h-6 w-6" />
              <div className="text-center">
                <div className="text-sm font-medium">Schedule Meeting</div>
                <div className="text-xs text-muted-foreground">Add to calendar</div>
              </div>
            </Button>
          }
        />
      ),
    },
    {
      title: "Invite Team",
      description: "Add team members",
      icon: Users,
      color: "bg-purple-600 hover:bg-purple-700",
      action: inviteTeam,
    },
    {
      title: "Generate Report",
      description: "Export analytics",
      icon: FileText,
      color: "bg-orange-600 hover:bg-orange-700",
      action: generateReport,
    },
  ]

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions for faster workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <div key={action.title}>
              {action.component || (
                <Button
                  variant="outline"
                  className="h-auto flex-col space-y-2 p-4 hover:bg-muted/50 bg-transparent border-border/50 w-full"
                  onClick={action.action}
                >
                  <action.icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="text-sm font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
