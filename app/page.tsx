import Link from "next/link"

export default function HomePage() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="jumbotron bg-primary text-white p-5 rounded mb-4">
          <h1 className="display-4">Lab SMS Platform</h1>
          <p className="lead">Comprehensive SMS messaging system for laboratory patient communication</p>
          <hr className="my-4" />
          <p>
            Manage templates, schedule messages, send notifications, and track all SMS communications with your patients
            for registration, sample collection, billing, and results.
          </p>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
        <div className="card h-100">
          <div className="card-body text-center">
            <i className="bi bi-file-text display-4 text-primary mb-3"></i>
            <h5 className="card-title">SMS Templates</h5>
            <p className="card-text">Create and manage reusable SMS templates with dynamic placeholders</p>
            <Link href="/templates" className="btn btn-primary">
              Manage Templates
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
        <div className="card h-100">
          <div className="card-body text-center">
            <i className="bi bi-calendar-event display-4 text-success mb-3"></i>
            <h5 className="card-title">Schedule Messages</h5>
            <p className="card-text">Schedule SMS messages for future delivery with recurring options</p>
            <Link href="/schedule" className="btn btn-success">
              Schedule SMS
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
        <div className="card h-100">
          <div className="card-body text-center">
            <i className="bi bi-send display-4 text-warning mb-3"></i>
            <h5 className="card-title">Send Messages</h5>
            <p className="card-text">Send immediate SMS messages to individual patients or groups</p>
            <Link href="/send" className="btn btn-warning">
              Send Now
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
        <div className="card h-100">
          <div className="card-body text-center">
            <i className="bi bi-list-ul display-4 text-info mb-3"></i>
            <h5 className="card-title">SMS Logs</h5>
            <p className="card-text">View detailed logs of all sent messages with delivery status</p>
            <Link href="/logs" className="btn btn-info">
              View Logs
            </Link>
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Platform Features</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6>Template Management</h6>
                <ul>
                  <li>Dynamic placeholder support</li>
                  <li>Category-based organization</li>
                  <li>Template preview and validation</li>
                  <li>Active/inactive status control</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>Message Scheduling</h6>
                <ul>
                  <li>Single, multiple, or all patient targeting</li>
                  <li>Recurring message support</li>
                  <li>Automatic background processing</li>
                  <li>Schedule status tracking</li>
                </ul>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <h6>SMS Delivery</h6>
                <ul>
                  <li>Pluggable SMS provider architecture</li>
                  <li>Phone number validation (E.164)</li>
                  <li>Delivery status tracking</li>
                  <li>Error handling and retry logic</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>Audit & Logging</h6>
                <ul>
                  <li>Comprehensive message logs</li>
                  <li>Patient and billing association</li>
                  <li>Delivery status monitoring</li>
                  <li>Error message tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
