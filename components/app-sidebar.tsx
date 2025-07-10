"use client"

import type React from "react"
import { MoreHorizontal } from "lucide-react" // Import MoreHorizontal here

import {
  Calendar,
  CheckSquare,
  FolderOpen,
  Home,
  Settings,
  TrendingUp,
  User,
  Plus,
  Trash2,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useNavigation } from "@/hooks/use-navigation"
import { useProjects } from "@/hooks/use-projects"
import { ProjectDialog } from "@/components/project-dialog"

const menuItems = [
  {
    title: "Dashboard",
    id: "dashboard",
    icon: Home,
  },
  {
    title: "Tasks",
    id: "tasks",
    icon: CheckSquare,
  },
  {
    title: "Projects",
    id: "projects",
    icon: FolderOpen,
  },
  {
    title: "Calendar",
    id: "calendar",
    icon: Calendar,
  },
  {
    title: "Analytics",
    id: "analytics",
    icon: TrendingUp,
  },
]

interface AppSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AppSidebar({ isOpen }: AppSidebarProps) {
  const { activeSection, setActiveSection } = useNavigation()
  const { projects, deleteProject, exportProjects, setSelectedProject } = useProjects()

  const handleDeleteProject = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId)
    }
  }

  const handleExportProjects = () => {
    exportProjects()
  }

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId)
    setActiveSection("projects")
  }

  return (
    <div className="h-full bg-sidebar border-r border-muted/30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-muted/30">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
            <CheckSquare className="h-4 w-4 text-primary-foreground" />
          </div>
          {isOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate text-sidebar-foreground">Task Manager</span>
              <span className="text-xs text-muted-foreground truncate">Pro Version</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeSection === item.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-sidebar-foreground hover:bg-muted/30 hover:text-sidebar-accent-foreground"
              }`}
              title={!isOpen ? item.title : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {isOpen && <span className="truncate">{item.title}</span>}
            </button>
          ))}
        </nav>

        {/* Projects Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-3 py-2">
            {isOpen && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Projects</span>
            )}
            {isOpen && (
              <ProjectDialog
                mode="add"
                trigger={
                  <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-primary/20">
                    <Plus className="h-3 w-3" />
                  </Button>
                }
              />
            )}
          </div>

          <div className="space-y-1">
            {projects.map((project) => (
              <div key={project.id} className="group relative">
                <button
                  onClick={() => handleProjectClick(project.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-muted/30"
                  title={!isOpen ? project.name : undefined}
                >
                  <div className={`h-3 w-3 rounded-full ${project.color} shrink-0`} />
                  {isOpen && (
                    <>
                      <span className="flex-1 truncate text-left">{project.name}</span>
                      <span className="text-xs text-muted-foreground">{project.tasks}</span>
                    </>
                  )}
                </button>

                {isOpen && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="right" className="bg-card border-muted/30">
                      <ProjectDialog
                        mode="edit"
                        project={project}
                        trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Project</DropdownMenuItem>}
                      />
                      <DropdownMenuItem
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}

            {projects.length > 0 && (
              <button
                onClick={handleExportProjects}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-muted-foreground hover:text-sidebar-foreground hover:bg-muted/30"
                title={!isOpen ? "Export Projects" : undefined}
              >
                <Download className="h-4 w-4 shrink-0" />
                {isOpen && <span className="truncate">Export Projects</span>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-muted/30">
        <div className="space-y-1">
          <button
            onClick={() => setActiveSection("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeSection === "profile"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-sidebar-foreground hover:bg-muted/30"
            }`}
            title={!isOpen ? "Profile" : undefined}
          >
            <User className="h-4 w-4 shrink-0" />
            {isOpen && <span className="truncate">Profile</span>}
          </button>

          <button
            onClick={() => setActiveSection("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeSection === "settings"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-sidebar-foreground hover:bg-muted/30"
            }`}
            title={!isOpen ? "Settings" : undefined}
          >
            <Settings className="h-4 w-4 shrink-0" />
            {isOpen && <span className="truncate">Settings</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
