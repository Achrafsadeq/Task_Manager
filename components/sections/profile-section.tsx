"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Mail, Phone, Award, Target, TrendingUp } from "lucide-react"

const achievements = [
  { title: "Task Master", description: "Completed 100+ tasks", icon: Target, earned: true },
  { title: "Team Player", description: "Collaborated on 10+ projects", icon: Award, earned: true },
  { title: "Speed Demon", description: "Completed tasks 50% faster", icon: TrendingUp, earned: false },
  { title: "Perfectionist", description: "Zero overdue tasks for 30 days", icon: Award, earned: false },
]

const recentActivity = [
  { action: "Completed task", item: "Design new landing page", time: "2 hours ago" },
  { action: "Created project", item: "Mobile App Redesign", time: "1 day ago" },
  { action: "Joined team", item: "Marketing Campaign", time: "3 days ago" },
  { action: "Updated profile", item: "Added new skills", time: "1 week ago" },
]

export function ProfileSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and track your progress</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Achraf Sadeq</h3>
                  <p className="text-muted-foreground">Senior Project Manager</p>
                  <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">Pro Member</Badge>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">achraf.sadeq7@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Casablanca, Ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined January 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tasks Completed</span>
                <span className="font-semibold">142</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projects</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Team Members</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="font-semibold text-primary">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className={`p-4 rounded-lg border transition-colors ${
                      achievement.earned ? "bg-primary/10 border-primary/20" : "bg-muted/30 border-border/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <achievement.icon
                        className={`h-6 w-6 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <h4 className={`font-medium ${achievement.earned ? "" : "text-muted-foreground"}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>{" "}
                        <span className="text-muted-foreground">{activity.item}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
