"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Users, Calendar, MoreHorizontal, Trash2, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useProjects } from "@/hooks/use-projects"
import { ProjectDialog } from "@/components/project-dialog"

const statusColors = {
  Planning: "secondary",
  "In Progress": "default",
  Review: "outline",
  Completed: "default",
} as const

export function ProjectsSection() {
  const { projects, deleteProject, exportProjects, selectedProject, setSelectedProject } = useProjects()

  // Filter projects based on selection
  const displayedProjects = selectedProject ? projects.filter((project) => project.id === selectedProject) : projects

  const handleDeleteProject = (projectId: number) => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      deleteProject(projectId)
      // If we're viewing the deleted project, clear the selection
      if (selectedProject === projectId) {
        setSelectedProject(null)
      }
    }
  }

  const handleClearFilter = () => {
    setSelectedProject(null)
  }

  const selectedProjectName = selectedProject ? projects.find((p) => p.id === selectedProject)?.name : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            {selectedProjectName ? `Viewing: ${selectedProjectName}` : "Manage your project portfolio"}
          </p>
        </div>
        <div className="flex gap-2">
          {selectedProject && (
            <Button variant="outline" onClick={handleClearFilter} className="bg-transparent">
              Show All Projects
            </Button>
          )}
          {projects.length > 0 && (
            <Button variant="outline" onClick={exportProjects} className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          <ProjectDialog mode="add" />
        </div>
      </div>

      {displayedProjects.length === 0 ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedProject ? "Project not found" : "No projects yet"}</h3>
                <p className="text-muted-foreground">
                  {selectedProject
                    ? "The selected project may have been deleted"
                    : "Create your first project to get started"}
                </p>
              </div>
              {!selectedProject && <ProjectDialog mode="add" />}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project) => (
            <Card
              key={project.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/70"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${project.color}`} />
                    <Badge variant={statusColors[project.status as keyof typeof statusColors]} className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <ProjectDialog
                        mode="edit"
                        project={project}
                        trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Project</DropdownMenuItem>}
                      />
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>
                      {project.completed}/{project.total} tasks
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{project.progress}% complete</span>
                    <span>{project.total - project.completed} remaining</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-1 text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      <span>Due Date</span>
                    </div>
                    <span>{project.dueDate || "Not set"}</span>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Budget</div>
                    <span>{project.budget || "Not set"}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-1 text-muted-foreground mb-2">
                    <Users className="h-3 w-3" />
                    <span>Team ({project.team.length})</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.length > 0 ? (
                      project.team.map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs">{member}</AvatarFallback>
                        </Avatar>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No team members</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
