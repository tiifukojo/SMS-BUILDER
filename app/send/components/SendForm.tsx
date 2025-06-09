"use client"

import type React from "react"

import { useState } from "react"
import { sendSMSToPatient, sendBulkSMS } from "../../actions/sms-actions"
import type { SMSTemplate, Patient } from "@/lib/types"
import { MessageParser } from "@/lib/message-parser"

interface SendFormProps {
  templates: SMSTemplate[]
  patients: Patient[]
}

export default function SendForm({ templates, patients }: SendFormProps) {
  const [formData, setFormData] = useState({
    template_id: "",
    recipient_type: "single",
    recipient_ids: [] as number[],
    custom_data: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [previewMessage, setPreviewMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const templateId = Number.parseInt(formData.template_id)
      let customData: Record<string, any> = {}

      if (formData.custom_data) {
        try {
          customData = JSON.parse(formData.custom_data)
        } catch {
          setError("Invalid JSON in custom data")
          setIsSubmitting(false)
          return
        }
      }

      let result
      if (formData.recipient_type === "single" && formData.recipient_ids.length === 1) {
        result = await sendSMSToPatient(templateId, formData.recipient_ids[0], customData)
        if (result.success) {
          setSuccess("Message sent successfully!")
        } else {
          setError(result.error || "Failed to send message")
        }
      } else {
        const patientIds = formData.recipient_type === "all" ? patients.map((p) => p.id) : formData.recipient_ids

        result = await sendBulkSMS(templateId, patientIds, customData)
        if (result.success) {
          setSuccess(`Messages sent! ${result.sent} successful, ${result.failed} failed.`)
          if (result.errors.length > 0) {
            setError(`Some errors occurred: ${result.errors.slice(0, 3).join(", ")}`)
          }
        } else {
          setError("Failed to send messages")
        }
      }

      // Reset form on success
      if (result.success) {
        setFormData({
          template_id: "",
          recipient_type: "single",
          recipient_ids: [],
          custom_data: "",
        })
        setPreviewMessage("")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "recipient_type") {
      setFormData((prev) => ({
        ...prev,
        recipient_ids: [],
      }))
    }

    updatePreview()
  }

  const handlePatientSelection = (patientId: number, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      recipient_ids: checked ? [...prev.recipient_ids, patientId] : prev.recipient_ids.filter((id) => id !== patientId),
    }))
    updatePreview()
  }

  const updatePreview = () => {
    if (!formData.template_id) {
      setPreviewMessage("")
      return
    }

    const template = templates.find((t) => t.id === Number.parseInt(formData.template_id))
    if (!template) return

    let customData: Record<string, any> = {}
    if (formData.custom_data) {
      try {
        customData = JSON.parse(formData.custom_data)
      } catch {
        // Invalid JSON, use sample data
      }
    }

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
      ...customData,
    }

    const preview = MessageParser.parseMessage(template.message_template, undefined, undefined, undefined, sampleData)
    setPreviewMessage(preview)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Send SMS Message</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="template_id" className="form-label">
              Template
            </label>
            <select
              className="form-select"
              id="template_id"
              name="template_id"
              value={formData.template_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a template</option>
              {templates
                .filter((t) => t.is_active)
                .map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name} ({template.category})
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="recipient_type" className="form-label">
              Recipients
            </label>
            <select
              className="form-select"
              id="recipient_type"
              name="recipient_type"
              value={formData.recipient_type}
              onChange={handleInputChange}
              required
            >
              <option value="single">Single Patient</option>
              <option value="multiple">Multiple Patients</option>
              <option value="all">All Patients</option>
            </select>
          </div>

          {formData.recipient_type !== "all" && (
            <div className="mb-3">
              <label className="form-label">Select Patients</label>
              <div className="border rounded p-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {patients.map((patient) => (
                  <div key={patient.id} className="form-check">
                    <input
                      className="form-check-input"
                      type={formData.recipient_type === "single" ? "radio" : "checkbox"}
                      name="patient_selection"
                      id={`send_patient_${patient.id}`}
                      checked={formData.recipient_ids.includes(patient.id)}
                      onChange={(e) => {
                        if (formData.recipient_type === "single") {
                          setFormData((prev) => ({
                            ...prev,
                            recipient_ids: e.target.checked ? [patient.id] : [],
                          }))
                        } else {
                          handlePatientSelection(patient.id, e.target.checked)
                        }
                        updatePreview()
                      }}
                    />
                    <label className="form-check-label" htmlFor={`send_patient_${patient.id}`}>
                      {patient.name} ({patient.phone_number})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="custom_data" className="form-label">
              Custom Data (JSON)
            </label>
            <textarea
              className="form-control"
              id="custom_data"
              name="custom_data"
              rows={3}
              value={formData.custom_data}
              onChange={handleInputChange}
              placeholder='{"appointment_date": "2024-02-15", "doctor_name": "Dr. Smith"}'
            />
            <div className="form-text">Optional: Provide custom data as JSON to replace additional placeholders</div>
          </div>

          {previewMessage && (
            <div className="mb-3">
              <label className="form-label">Message Preview</label>
              <div className="message-preview">{previewMessage}</div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting || (formData.recipient_type !== "all" && formData.recipient_ids.length === 0)}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner me-2"></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
