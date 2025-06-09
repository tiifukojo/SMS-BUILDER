"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createSchedule } from "../../actions/schedule-actions"
import { getPatients } from "../../actions/patient-actions"
import type { SMSTemplate, Patient } from "@/lib/types"

interface ScheduleFormProps {
  templates: SMSTemplate[]
}

export default function ScheduleForm({ templates }: ScheduleFormProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [formData, setFormData] = useState({
    template_id: "",
    recipient_type: "single",
    recipient_ids: [] as number[],
    send_at: "",
    frequency: "once",
    created_by: "admin",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const patientsData = await getPatients()
      setPatients(patientsData)
    } catch (error) {
      console.error("Error loading patients:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const result = await createSchedule({
        ...formData,
        template_id: Number.parseInt(formData.template_id),
        recipient_ids: formData.recipient_type === "all" ? undefined : formData.recipient_ids,
      })

      if (result.success) {
        setSuccess("Message scheduled successfully!")
        setFormData({
          template_id: "",
          recipient_type: "single",
          recipient_ids: [],
          send_at: "",
          frequency: "once",
          created_by: "admin",
        })
      } else {
        setError(result.error || "Failed to schedule message")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  }

  const handlePatientSelection = (patientId: number, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      recipient_ids: checked ? [...prev.recipient_ids, patientId] : prev.recipient_ids.filter((id) => id !== patientId),
    }))
  }

  const getMinDateTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 5) // Minimum 5 minutes from now
    return now.toISOString().slice(0, 16)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Schedule New Message</h5>
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
                      id={`patient_${patient.id}`}
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
                      }}
                    />
                    <label className="form-check-label" htmlFor={`patient_${patient.id}`}>
                      {patient.name} ({patient.phone_number})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="send_at" className="form-label">
              Send Date & Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="send_at"
              name="send_at"
              value={formData.send_at}
              onChange={handleInputChange}
              min={getMinDateTime()}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="frequency" className="form-label">
              Frequency
            </label>
            <select
              className="form-select"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              required
            >
              <option value="once">One Time</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting || (formData.recipient_type !== "all" && formData.recipient_ids.length === 0)}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner me-2"></span>
                Scheduling...
              </>
            ) : (
              "Schedule Message"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
