"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", completed: 65, created: 80 },
  { name: "Feb", completed: 78, created: 85 },
  { name: "Mar", completed: 90, created: 95 },
  { name: "Apr", completed: 81, created: 88 },
  { name: "May", completed: 95, created: 100 },
  { name: "Jun", completed: 110, created: 115 },
]

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#12a648",
  },
  created: {
    label: "Created",
    color: "#16a34a",
  },
}

export function TaskChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Task Progress</CardTitle>
        <CardDescription>Tasks completed vs created over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
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
  )
}
