import TemplateForm from "../components/TemplateForm"

export default function NewTemplatePage() {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <a href="/templates" className="btn btn-outline-secondary me-3">
          <i className="bi bi-arrow-left"></i>
        </a>
        <div>
          <h1>Create New Template</h1>
          <p className="text-muted mb-0">Design a reusable SMS template with dynamic placeholders</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <TemplateForm />
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Available Placeholders
              </h6>
            </div>
            <div className="card-body">
              <h6>Patient Data</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{patient_name}}"}</code> - Patient's full name
                </li>
                <li>
                  <code>{"{{patient_phone}}"}</code> - Patient's phone number
                </li>
                <li>
                  <code>{"{{patient_email}}"}</code> - Patient's email address
                </li>
              </ul>

              <h6>Billing Data</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{amount}}"}</code> - Bill amount
                </li>
                <li>
                  <code>{"{{due_date}}"}</code> - Payment due date
                </li>
                <li>
                  <code>{"{{billing_status}}"}</code> - Payment status
                </li>
              </ul>

              <h6>Test/Accession Data</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{test_name}}"}</code> - Name of the test
                </li>
                <li>
                  <code>{"{{result_date}}"}</code> - Test result date
                </li>
                <li>
                  <code>{"{{test_status}}"}</code> - Test status
                </li>
              </ul>

              <h6>General</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{today}}"}</code> - Current date
                </li>
              </ul>

              <div className="alert alert-info mt-3">
                <small>
                  <i className="bi bi-lightbulb me-1"></i>
                  <strong>Tip:</strong> Use placeholders to create dynamic messages that automatically populate with
                  patient data.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
