"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TaskStats } from "@/components/task-stats"
import { TaskChart } from "@/components/task-chart"
import { RecentTasks } from "@/components/recent-tasks"
import { ProjectProgress } from "@/components/project-progress"
import { QuickActions } from "@/components/quick-actions"
import { SearchBar } from "@/components/search-bar"
import { TasksSection } from "@/components/sections/tasks-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CalendarSection } from "@/components/sections/calendar-section"
import { AnalyticsSection } from "@/components/sections/analytics-section"
import { SettingsSection } from "@/components/sections/settings-section"
import { ProfileSection } from "@/components/sections/profile-section"
import { useNavigation } from "@/hooks/use-navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu } from "lucide-react"

const sectionTitles = {
  dashboard: "Dashboard",
  tasks: "Tasks",
  projects: "Projects",
  calendar: "Calendar",
  analytics: "Analytics",
  settings: "Settings",
  profile: "Profile",
}

const sectionDescriptions = {
  dashboard: "Welcome back! Here's what's happening with your tasks.",
  tasks: "Manage and organize all your tasks efficiently.",
  projects: "Overview of your active and completed projects.",
  calendar: "Schedule and track your upcoming deadlines.",
  analytics: "Insights and performance metrics for your work.",
  settings: "Customize your workspace and preferences.",
  profile: "Your personal information and achievements.",
}

export default function Dashboard() {
  const { activeSection } = useNavigation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderSection = () => {
    switch (activeSection) {
      case "tasks":
        return <TasksSection />
      case "projects":
        return <ProjectsSection />
      case "calendar":
        return <CalendarSection />
      case "analytics":
        return <AnalyticsSection />
      case "settings":
        return <SettingsSection />
      case "profile":
        return <ProfileSection />
      default:
        return (
          <div className="space-y-6">
            <TaskStats />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-full lg:col-span-4">
                <TaskChart />
              </div>
              <div className="col-span-full lg:col-span-3">
                <ProjectProgress />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-full lg:col-span-4">
                <RecentTasks />
              </div>
              <div className="col-span-full lg:col-span-3">
                <QuickActions />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 ease-in-out flex-shrink-0`}>
        <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-muted/30 bg-background/95 backdrop-blur flex items-center px-4 lg:px-6 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-2 hover:bg-primary/20"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1 flex items-center justify-between min-w-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold truncate">
                {sectionTitles[activeSection as keyof typeof sectionTitles]}
              </h1>
              <p className="text-sm text-muted-foreground truncate">
                {sectionDescriptions[activeSection as keyof typeof sectionDescriptions]}
              </p>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4 ml-4">
              {activeSection === "dashboard" && (
                <div className="hidden lg:block">
                  <SearchBar />
                </div>
              )}
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/20">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">{renderSection()}</div>
        </main>
      </div>
    </div>
  )
}
