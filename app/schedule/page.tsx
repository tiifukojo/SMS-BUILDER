import { getSchedules } from "../actions/schedule-actions"
import { getTemplates } from "../actions/template-actions"
import ScheduleList from "./components/ScheduleList"
import ScheduleForm from "./components/ScheduleForm"

export default async function SchedulePage() {
  const [schedules, templates] = await Promise.all([getSchedules(), getTemplates()])

  return (
    <div>
      <div className="mb-4">
        <h1>
          <i className="bi bi-calendar-event me-2"></i>
          Schedule SMS Messages
        </h1>
        <p className="text-muted">Schedule messages for future delivery with recurring options</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary">{schedules.length}</h3>
              <p className="text-muted mb-0">Total Schedules</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-warning">{schedules.filter((s) => s.status === "pending").length}</h3>
              <p className="text-muted mb-0">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success">{schedules.filter((s) => s.status === "sent").length}</h3>
              <p className="text-muted mb-0">Sent</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-danger">{schedules.filter((s) => s.status === "failed").length}</h3>
              <p className="text-muted mb-0">Failed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <ScheduleForm templates={templates} />
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-list me-2"></i>
                Scheduled Messages
              </h5>
            </div>
            <div className="card-body">
              <ScheduleList schedules={schedules} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
