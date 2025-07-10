"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTasks } from "@/hooks/use-tasks"
import { TaskDialog } from "@/components/task-dialog"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useTasks()

  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks, projects, or people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-muted/50 border-border/50"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-muted/50 border-border/50">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>All Tasks</DropdownMenuItem>
          <DropdownMenuItem>My Tasks</DropdownMenuItem>
          <DropdownMenuItem>Completed</DropdownMenuItem>
          <DropdownMenuItem>Overdue</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>High Priority</DropdownMenuItem>
          <DropdownMenuItem>Medium Priority</DropdownMenuItem>
          <DropdownMenuItem>Low Priority</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TaskDialog mode="add" />
    </div>
  )
}
