import type React from "react"
import type { Metadata } from "next"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lab SMS Platform - Mock Demo",
  description: "SMS messaging platform for laboratory management (Demo with Mock Data)",
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
              <i className="bi bi-chat-dots me-2"></i>
              Lab SMS Platform
              <span className="badge bg-warning text-dark ms-2">DEMO</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ms-auto">
                <a className="nav-link" href="/templates">
                  <i className="bi bi-file-text me-1"></i>
                  Templates
                </a>
                <a className="nav-link" href="/schedule">
                  <i className="bi bi-calendar-event me-1"></i>
                  Schedule
                </a>
                <a className="nav-link" href="/send">
                  <i className="bi bi-send me-1"></i>
                  Send
                </a>
                <a className="nav-link" href="/logs">
                  <i className="bi bi-list-ul me-1"></i>
                  Logs
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mt-4">{children}</main>
        <footer className="bg-light mt-5 py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h6>Demo Information</h6>
                <p className="text-muted small">
                  This is a demonstration version using mock data. No real SMS messages are sent, and no database
                  connection is required.
                </p>
              </div>
              <div className="col-md-6">
                <h6>Features Demonstrated</h6>
                <ul className="list-unstyled text-muted small">
                  <li>• Template management with placeholders</li>
                  <li>• Message scheduling and automation</li>
                  <li>• Bulk SMS sending capabilities</li>
                  <li>• Comprehensive logging and audit trail</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}
