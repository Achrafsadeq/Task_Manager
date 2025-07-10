"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, Bar, BarChart, Pie, PieChart, Cell } from "recharts"
import { TrendingUp, TrendingDown, Users, Clock } from "lucide-react"

const performanceData = [
  { name: "Jan", completed: 65, created: 80, efficiency: 81 },
  { name: "Feb", completed: 78, created: 85, efficiency: 92 },
  { name: "Mar", completed: 90, created: 95, efficiency: 95 },
  { name: "Apr", completed: 81, created: 88, efficiency: 92 },
  { name: "May", completed: 95, created: 100, efficiency: 95 },
  { name: "Jun", completed: 110, created: 115, efficiency: 96 },
]

const projectData = [
  { name: "Website Redesign", value: 35, color: "#12a648" },
  { name: "Mobile App", value: 25, color: "#3b82f6" },
  { name: "Marketing", value: 20, color: "#8b5cf6" },
  { name: "Database", value: 20, color: "#f97316" },
]

const teamData = [
  { name: "John Doe", tasks: 24, completed: 20 },
  { name: "Jane Smith", tasks: 18, completed: 16 },
  { name: "Mike Johnson", tasks: 15, completed: 12 },
  { name: "Sarah Wilson", tasks: 12, completed: 11 },
]

const chartConfig = {
  completed: { label: "Completed", color: "#12a648" },
  created: { label: "Created", color: "#16a34a" },
  efficiency: { label: "Efficiency", color: "#22c55e" },
}

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Insights and performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Task Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">-0.3h</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">-2</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Task Performance</CardTitle>
            <CardDescription>Tasks completed vs created over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={performanceData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="created"
                  stackId="1"
                  stroke="var(--color-created)"
                  fill="var(--color-created)"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="1"
                  stroke="var(--color-completed)"
                  fill="var(--color-completed)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
            <CardDescription>Task allocation across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {projectData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Individual team member task completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={teamData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="tasks" fill="#374151" name="Total Tasks" />
              <Bar dataKey="completed" fill="#12a648" name="Completed" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
