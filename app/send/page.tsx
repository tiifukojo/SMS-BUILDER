import { getTemplates } from "../actions/template-actions"
import { getPatients } from "../actions/patient-actions"
import SendForm from "./components/SendForm"

export default async function SendPage() {
  const [templates, patients] = await Promise.all([getTemplates(), getPatients()])

  return (
    <div>
      <h1 className="mb-4">Send SMS Messages</h1>

      <div className="row">
        <div className="col-lg-6">
          <SendForm templates={templates} patients={patients} />
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" type="button">
                  <i className="bi bi-people me-2"></i>
                  Send to All Patients
                </button>
                <button className="btn btn-outline-success" type="button">
                  <i className="bi bi-clock me-2"></i>
                  Process Pending Schedules
                </button>
                <button className="btn btn-outline-info" type="button">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Test Template Preview
                </button>
              </div>

              <hr />

              <h6>Recent Activity</h6>
              <div className="text-muted">
                <small>No recent activity to display</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
