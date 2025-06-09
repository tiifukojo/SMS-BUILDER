import Link from "next/link"

export default function HomePage() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="jumbotron bg-primary text-white p-5 rounded mb-4">
          <h1 className="display-4">
            <i className="bi bi-chat-dots me-3"></i>
            Lab SMS Platform
          </h1>
          <p className="lead">Comprehensive SMS messaging system for laboratory patient communication</p>
          <hr className="my-4" />
          <p>
            Manage templates, schedule messages, send notifications, and track all SMS communications with your patients
            for registration, sample collection, billing, and results.
          </p>
          <div className="alert alert-warning d-flex align-items-center mt-3">
            <i className="bi bi-info-circle me-2"></i>
            <div>
              <strong>Demo Mode:</strong> This version uses mock data and simulated SMS sending. No database connection
              required!
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 mb-4">
        <div className="card h-100">
          <div className="card-body text-center">
            <i className="bi bi-file-text display-4 text-primary mb-3"></i>
            <h5 className="card-title">SMS Templates</h5>
            <p className="card-text">Create and manage reusable SMS templates with dynamic placeholders</p>
            <Link href="/templates" className="btn btn-primary">
              <i className="bi bi-arrow-right me-1"></i>
              Manage Templates
            </Link>
          </div>
          <div className="card-footer bg-transparent">
            <small className="text-muted">6 sample templates included</small>
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
              <i className="bi bi-arrow-right me-1"></i>
              Schedule SMS
            </Link>
          </div>
          <div className="card-footer bg-transparent">
            <small className="text-muted">4 sample schedules available</small>
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
              <i className="bi bi-arrow-right me-1"></i>
              Send Now
            </Link>
          </div>
          <div className="card-footer bg-transparent">
            <small className="text-muted">8 mock patients ready</small>
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
              <i className="bi bi-arrow-right me-1"></i>
              View Logs
            </Link>
          </div>
          <div className="card-footer bg-transparent">
            <small className="text-muted">5 sample log entries</small>
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="bi bi-gear me-2"></i>
              Platform Features
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6>
                  <i className="bi bi-file-text text-primary me-2"></i>
                  Template Management
                </h6>
                <ul>
                  <li>Dynamic placeholder support (patient_name, amount, test_name, etc.)</li>
                  <li>Category-based organization (registration, billing, results)</li>
                  <li>Live template preview with sample data</li>
                  <li>Active/inactive status control</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>
                  <i className="bi bi-calendar-event text-success me-2"></i>
                  Message Scheduling
                </h6>
                <ul>
                  <li>Single, multiple, or all patient targeting</li>
                  <li>Recurring message support (daily, weekly, monthly)</li>
                  <li>Automatic background processing via cron jobs</li>
                  <li>Schedule status tracking and management</li>
                </ul>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <h6>
                  <i className="bi bi-send text-warning me-2"></i>
                  SMS Delivery
                </h6>
                <ul>
                  <li>Pluggable SMS provider architecture (Twilio, AWS SNS)</li>
                  <li>Phone number validation (E.164 format)</li>
                  <li>Real-time delivery status tracking</li>
                  <li>Comprehensive error handling and retry logic</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>
                  <i className="bi bi-list-ul text-info me-2"></i>
                  Audit & Logging
                </h6>
                <ul>
                  <li>Complete message audit trail</li>
                  <li>Patient and billing record association</li>
                  <li>Delivery status monitoring and reporting</li>
                  <li>Error message tracking and analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        <div className="card border-warning">
          <div className="card-header bg-warning">
            <h5 className="mb-0">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Demo Mode Information
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6>What's Included:</h6>
                <ul>
                  <li>✅ 8 sample patients with realistic data</li>
                  <li>✅ 6 pre-configured SMS templates</li>
                  <li>✅ 4 sample scheduled messages</li>
                  <li>✅ 5 historical SMS log entries</li>
                  <li>✅ Full CRUD operations on templates</li>
                  <li>✅ Mock SMS sending with simulated delays</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6>Demo Limitations:</h6>
                <ul>
                  <li>🔸 No real SMS messages sent (mock provider)</li>
                  <li>🔸 Data resets on server restart</li>
                  <li>🔸 No database persistence</li>
                  <li>🔸 Simulated network delays for realism</li>
                  <li>🔸 10% random failure rate for testing</li>
                </ul>
              </div>
            </div>
            <div className="alert alert-info mt-3">
              <i className="bi bi-lightbulb me-2"></i>
              <strong>Try it out:</strong> Create new templates, schedule messages, send bulk SMS, and explore the
              comprehensive logging system. All changes are temporary and perfect for testing!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
