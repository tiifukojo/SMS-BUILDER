"use client"

import type { SMSTemplate } from "@/lib/types"
import { deleteTemplate } from "../../actions/template-actions"
import Link from "next/link"
import { useState } from "react"

interface TemplateListProps {
  templates: SMSTemplate[]
}

export default function TemplateList({ templates }: TemplateListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this template?")) return

    setDeletingId(id)
    try {
      await deleteTemplate(id)
    } catch (error) {
      console.error("Error deleting template:", error)
      alert("Failed to delete template")
    } finally {
      setDeletingId(null)
    }
  }

  const getCategoryBadgeClass = (category: string) => {
    const classes = {
      registration: "bg-primary",
      collection: "bg-info",
      billing: "bg-warning",
      results: "bg-success",
      general: "bg-secondary",
    }
    return classes[category as keyof typeof classes] || "bg-secondary"
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-file-text display-1 text-muted"></i>
        <h4 className="mt-3">No Templates Found</h4>
        <p className="text-muted">Create your first SMS template to get started.</p>
        <Link href="/templates/new" className="btn btn-primary">
          Create Template
        </Link>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Message Preview</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>
                <strong>{template.name}</strong>
                {template.description && <div className="text-muted small">{template.description}</div>}
              </td>
              <td>
                <span className={`badge ${getCategoryBadgeClass(template.category)}`}>{template.category}</span>
              </td>
              <td>
                <div className="text-truncate" style={{ maxWidth: "300px" }}>
                  {template.message_template}
                </div>
              </td>
              <td>
                <span className={`badge ${template.is_active ? "bg-success" : "bg-danger"}`}>
                  {template.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>{new Date(template.created_at).toLocaleDateString()}</td>
              <td>
                <div className="btn-group btn-group-sm">
                  <Link href={`/templates/${template.id}`} className="btn btn-outline-primary">
                    <i className="bi bi-eye"></i>
                  </Link>
                  <Link href={`/templates/${template.id}/edit`} className="btn btn-outline-secondary">
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(template.id)}
                    disabled={deletingId === template.id}
                  >
                    {deletingId === template.id ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <i className="bi bi-trash"></i>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
