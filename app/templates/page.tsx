import { getTemplates } from "../actions/template-actions"
import TemplateList from "./components/TemplateList"
import Link from "next/link"

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>SMS Templates</h1>
        <Link href="/templates/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Template
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Template Management</h5>
        </div>
        <div className="card-body">
          <TemplateList templates={templates} />
        </div>
      </div>
    </div>
  )
}
