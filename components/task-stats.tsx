"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Tasks",
    value: "142",
    change: "+12%",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Completed",
    value: "89",
    change: "+8%",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "In Progress",
    value: "34",
    change: "+3%",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    title: "Overdue",
    value: "19",
    change: "-5%",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
]

export function TaskStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.changeType === "positive" ? "text-primary" : "text-destructive"}>
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
