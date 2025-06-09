import { getSMSLogs } from "../actions/sms-actions"
import LogsList from "./components/LogsList"

export default async function LogsPage() {
  const logs = await getSMSLogs()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>
            <i className="bi bi-list-ul me-2"></i>
            SMS Logs
          </h1>
          <p className="text-muted">View detailed logs of all sent messages with delivery status</p>
        </div>
        <div className="btn-group">
          <button className="btn btn-outline-secondary" disabled>
            <i className="bi bi-funnel me-2"></i>
            Filter
          </button>
          <button className="btn btn-outline-secondary" disabled>
            <i className="bi bi-download me-2"></i>
            Export
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary">{logs.length}</h3>
              <p className="text-muted mb-0">Total Messages</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success">{logs.filter((l) => l.status === "sent").length}</h3>
              <p className="text-muted mb-0">Sent Successfully</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-danger">{logs.filter((l) => l.status === "failed").length}</h3>
              <p className="text-muted mb-0">Failed</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-warning">{logs.filter((l) => l.status === "pending").length}</h3>
              <p className="text-muted mb-0">Pending</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Message History
          </h5>
        </div>
        <div className="card-body">
          <LogsList logs={logs} />
        </div>
      </div>
    </div>
  )
}
