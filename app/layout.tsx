import type React from "react"
import type { Metadata } from "next"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lab SMS Platform",
  description: "SMS messaging platform for laboratory management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">
              Lab SMS Platform
            </a>
            <div className="navbar-nav">
              <a className="nav-link" href="/templates">
                Templates
              </a>
              <a className="nav-link" href="/schedule">
                Schedule
              </a>
              <a className="nav-link" href="/send">
                Send
              </a>
              <a className="nav-link" href="/logs">
                Logs
              </a>
            </div>
          </div>
        </nav>
        <main className="container mt-4">{children}</main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}
