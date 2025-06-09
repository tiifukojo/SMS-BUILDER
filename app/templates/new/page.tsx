import TemplateForm from "../components/TemplateForm"

export default function NewTemplatePage() {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <a href="/templates" className="btn btn-outline-secondary me-3">
          <i className="bi bi-arrow-left"></i>
        </a>
        <h1>Create New Template</h1>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <TemplateForm />
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Available Placeholders</h6>
            </div>
            <div className="card-body">
              <h6>Patient Data</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{patient_name}}"}</code>
                </li>
                <li>
                  <code>{"{{patient_phone}}"}</code>
                </li>
                <li>
                  <code>{"{{patient_email}}"}</code>
                </li>
              </ul>

              <h6>Billing Data</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{amount}}"}</code>
                </li>
                <li>
                  <code>{"{{due_date}}"}</code>
                </li>
                <li>
                  <code>{"{{billing_status}}"}</code>
                </li>
              </ul>

              <h6>Test/Accession Data</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{test_name}}"}</code>
                </li>
                <li>
                  <code>{"{{result_date}}"}</code>
                </li>
                <li>
                  <code>{"{{test_status}}"}</code>
                </li>
              </ul>

              <h6>General</h6>
              <ul className="list-unstyled">
                <li>
                  <code>{"{{today}}"}</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
