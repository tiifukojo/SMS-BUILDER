import { getSMSLogs } from "../actions/sms-actions"
import LogsList from "./components/LogsList"

export default async function LogsPage() {
  const logs = await getSMSLogs()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>SMS Logs</h1>
        <div className="btn-group">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-funnel me-2"></i>
            Filter
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-download me-2"></i>
            Export
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Message History</h5>
        </div>
        <div className="card-body">
          <LogsList logs={logs} />
        </div>
      </div>
    </div>
  )
}
