"use client"

interface LogsListProps {
  logs: any[]
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
        <p className="text-muted">No messages have been sent yet. Start by sending your first message!</p>
        <a href="/send" className="btn btn-primary">
          <i className="bi bi-send me-2"></i>
          Send Message
        </a>
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
                <strong>{log.patient_name || "Unknown"}</strong>
                {log.patient_id && <div className="text-muted small">ID: {log.patient_id}</div>}
              </td>
              <td>
                <code>{log.phone_number}</code>
              </td>
              <td>
                <span className="badge bg-info">{log.template_name || "Manual"}</span>
                {log.template_id && <div className="text-muted small">ID: {log.template_id}</div>}
              </td>
              <td>
                <div className="text-truncate" style={{ maxWidth: "300px" }} title={log.parsed_message}>
                  {log.parsed_message}
                </div>
              </td>
              <td>
                <span className={`badge ${getStatusBadgeClass(log.status)}`}>
                  <i
                    className={`bi ${log.status === "sent" ? "bi-check-circle" : log.status === "failed" ? "bi-x-circle" : "bi-clock"} me-1`}
                  ></i>
                  {log.status}
                </span>
                {log.error_message && (
                  <div className="text-danger small mt-1" title={log.error_message}>
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    {log.error_message.length > 50 ? `${log.error_message.substring(0, 50)}...` : log.error_message}
                  </div>
                )}
              </td>
              <td>
                <div>{log.sent_at ? formatDateTime(log.sent_at) : formatDateTime(log.created_at)}</div>
                <small className="text-muted">{log.sent_at ? "Delivered" : "Created"}</small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
