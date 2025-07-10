import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task_manager',
  description: 'Task Manager provides a dashboard to visualize task statuses, manage multiple projects, track progress, and organize work with a sleek UI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
