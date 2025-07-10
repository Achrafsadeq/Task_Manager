"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const projects = [
  {
    name: "Website Redesign",
    progress: 75,
    total: 16,
    completed: 12,
    color: "bg-emerald-500",
  },
  {
    name: "Mobile App",
    progress: 60,
    total: 10,
    completed: 6,
    color: "bg-blue-500",
  },
  {
    name: "Marketing Campaign",
    progress: 40,
    total: 8,
    completed: 3,
    color: "bg-purple-500",
  },
  {
    name: "Database Migration",
    progress: 25,
    total: 4,
    completed: 1,
    color: "bg-orange-500",
  },
]

export function ProjectProgress() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <CardDescription>Track the completion status of your active projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${project.color}`} />
                  <span className="text-sm font-medium">{project.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {project.completed}/{project.total}
                </span>
              </div>
              <Progress value={project.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{project.progress}% complete</span>
                <span>{project.total - project.completed} remaining</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
