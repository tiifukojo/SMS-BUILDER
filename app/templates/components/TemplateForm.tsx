"use client"

import type React from "react"

import { useState } from "react"
import { createTemplate, updateTemplate } from "../../actions/template-actions"
import type { SMSTemplate } from "@/lib/types"
import { MessageParser } from "@/lib/message-parser"
import { useRouter } from "next/navigation"

interface TemplateFormProps {
  template?: SMSTemplate
  isEdit?: boolean
}

export default function TemplateForm({ template, isEdit = false }: TemplateFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: template?.name || "",
    message_template: template?.message_template || "",
    description: template?.description || "",
    category: template?.category || "general",
    is_active: template?.is_active ?? true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = isEdit && template ? await updateTemplate(template.id, formData) : await createTemplate(formData)

      if (result.success) {
        router.push("/templates")
      } else {
        setError(result.error || "Failed to save template")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const getMessagePreview = () => {
    const sampleData = {
      patient_name: "John Doe",
      patient_phone: "+1234567890",
      patient_email: "john.doe@email.com",
      amount: "150.00",
      due_date: "2024-02-15",
      billing_status: "pending",
      test_name: "Blood Test",
      result_date: "2024-01-25",
      test_status: "completed",
      today: new Date().toLocaleDateString(),
    }

    return MessageParser.parseMessage(formData.message_template, undefined, undefined, undefined, sampleData)
  }

  const getPlaceholders = () => {
    return MessageParser.getPlaceholders(formData.message_template)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">{isEdit ? "Edit Template" : "Create New Template"}</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Template Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="general">General</option>
              <option value="registration">Registration</option>
              <option value="collection">Sample Collection</option>
              <option value="billing">Billing</option>
              <option value="results">Results</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of this template"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message_template" className="form-label">
              Message Template
            </label>
            <textarea
              className="form-control"
              id="message_template"
              name="message_template"
              rows={4}
              value={formData.message_template}
              onChange={handleInputChange}
              placeholder="Enter your message template with placeholders like {{patient_name}}"
              required
            />
            <div className="form-text">
              Use placeholders like {"{{patient_name}}"}, {"{{amount}}"}, {"{{test_name}}"} etc.
            </div>
          </div>

          {isEdit && (
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="is_active">
                Active Template
              </label>
            </div>
          )}

          {formData.message_template && (
            <div className="mb-3">
              <label className="form-label">Message Preview</label>
              <div className="message-preview">{getMessagePreview()}</div>
              <div className="form-text">
                Preview with sample data. Placeholders found: {getPlaceholders().join(", ") || "None"}
              </div>
            </div>
          )}

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading-spinner me-2"></span>
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update Template"
              ) : (
                "Create Template"
              )}
            </button>
            <a href="/templates" className="btn btn-secondary">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
