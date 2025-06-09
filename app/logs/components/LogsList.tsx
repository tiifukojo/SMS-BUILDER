"use client"

import type { SMSLog } from "@/lib/types"

interface LogsListProps {
  logs: SMSLog[]
}

export default function LogsList({ logs }: LogsListProps) {
  const getStatusBadgeClass = (status: string) => {
    const classes = {
      sent: "bg-success",
      failed: "bg-danger",
      pending: "bg-warning",
    }
    return classes[status as keyof typeof classes] || "bg-secondary"
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-inbox display-1 text-muted"></i>
        <h4 className="mt-3">No SMS Logs</h4>
        <p className="text-muted">No messages have been sent yet.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Phone Number</th>
            <th>Template</th>
            <th>Message</th>
            <th>Status</th>
            <th>Sent At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>
                <strong>{(log as any).patient_name || "Unknown"}</strong>
              </td>
              <td>
                <code>{log.phone_number}</code>
              </td>
              <td>
                <span className="badge bg-info">{(log as any).template_name || "Manual"}</span>
              </td>
              <td>
                <div className="text-truncate" style={{ maxWidth: "300px" }}>
                  {log.parsed_message}
                </div>
              </td>
              <td>
                <span className={`badge ${getStatusBadgeClass(log.status)}`}>{log.status}</span>
                {log.error_message && <div className="text-danger small mt-1">{log.error_message}</div>}
              </td>
              <td>{log.sent_at ? formatDateTime(log.sent_at) : formatDateTime(log.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
