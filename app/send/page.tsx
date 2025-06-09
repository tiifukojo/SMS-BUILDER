import { getTemplates } from "../actions/template-actions"
import { getPatients } from "../actions/patient-actions"
import SendForm from "./components/SendForm"
import CronTrigger from "./components/CronTrigger"

export default async function SendPage() {
  const [templates, patients] = await Promise.all([getTemplates(), getPatients()])

  return (
    <div>
      <div className="mb-4">
        <h1>
          <i className="bi bi-send me-2"></i>
          Send SMS Messages
        </h1>
        <p className="text-muted">Send immediate SMS messages to individual patients or groups</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary">{patients.length}</h3>
              <p className="text-muted mb-0">Available Patients</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success">{templates.filter((t) => t.is_active).length}</h3>
              <p className="text-muted mb-0">Active Templates</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-info">Mock</h3>
              <p className="text-muted mb-0">SMS Provider</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <SendForm templates={templates} patients={patients} />
        </div>
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <CronTrigger />

              <hr />

              <div className="d-grid gap-2">
                <button className="btn btn-outline-info" type="button" disabled>
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Test Template Preview
                  <small className="d-block text-muted">Coming soon</small>
                </button>
                <button className="btn btn-outline-secondary" type="button" disabled>
                  <i className="bi bi-graph-up me-2"></i>
                  View Analytics
                  <small className="d-block text-muted">Coming soon</small>
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Demo Information
              </h5>
            </div>
            <div className="card-body">
              <div className="alert alert-warning">
                <h6>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Mock SMS Provider
                </h6>
                <ul className="mb-0">
                  <li>No real SMS messages are sent</li>
                  <li>Simulated network delays (0.5-1.5 seconds)</li>
                  <li>10% random failure rate for testing</li>
                  <li>All messages logged for demonstration</li>
                </ul>
              </div>

              <h6>Available Test Data:</h6>
              <ul>
                <li>
                  <strong>{patients.length} patients</strong> with realistic data
                </li>
                <li>
                  <strong>{templates.length} templates</strong> across different categories
                </li>
                <li>
                  <strong>Dynamic placeholders</strong> for personalization
                </li>
                <li>
                  <strong>Comprehensive logging</strong> of all activities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
