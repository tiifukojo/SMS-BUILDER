import { getTemplates } from "../actions/template-actions"
import TemplateList from "./components/TemplateList"
import Link from "next/link"

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>
            <i className="bi bi-file-text me-2"></i>
            SMS Templates
          </h1>
          <p className="text-muted">Manage reusable SMS message templates with dynamic placeholders</p>
        </div>
        <Link href="/templates/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Template
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary">{templates.length}</h3>
              <p className="text-muted mb-0">Total Templates</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success">{templates.filter((t) => t.is_active).length}</h3>
              <p className="text-muted mb-0">Active Templates</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-warning">{templates.filter((t) => !t.is_active).length}</h3>
              <p className="text-muted mb-0">Inactive Templates</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-info">{new Set(templates.map((t) => t.category)).size}</h3>
              <p className="text-muted mb-0">Categories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-list me-2"></i>
            Template Management
          </h5>
        </div>
        <div className="card-body">
          <TemplateList templates={templates} />
        </div>
      </div>
    </div>
  )
}
