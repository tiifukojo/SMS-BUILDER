"use client"

import type { SMSSchedule } from "@/lib/types"
import { updateScheduleStatus } from "../../actions/schedule-actions"
import { useState } from "react"

interface ScheduleListProps {
  schedules: SMSSchedule[]
}

export default function ScheduleList({ schedules }: ScheduleListProps) {
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const handleStatusUpdate = async (id: number, status: string) => {
    if (!confirm(`Are you sure you want to ${status} this scheduled message?`)) return

    setUpdatingId(id)
    try {
      await updateScheduleStatus(id, status)
    } catch (error) {
      console.error("Error updating schedule status:", error)
      alert("Failed to update schedule status")
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusBadgeClass = (status: string) => {
    const classes = {
      pending: "bg-warning",
      sent: "bg-success",
      failed: "bg-danger",
      cancelled: "bg-secondary",
    }
    return classes[status as keyof typeof classes] || "bg-secondary"
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-calendar-x display-1 text-muted"></i>
        <h4 className="mt-3">No Scheduled Messages</h4>
        <p className="text-muted">Schedule your first SMS message to get started.</p>
      </div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Template</th>
            <th>Recipients</th>
            <th>Send Time</th>
            <th>Frequency</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>
                <strong>{(schedule as any).template_name}</strong>
              </td>
              <td>
                <span className="badge bg-info">
                  {schedule.recipient_type === "all"
                    ? "All Patients"
                    : schedule.recipient_type === "single"
                      ? "1 Patient"
                      : `${schedule.recipient_ids?.length || 0} Patients`}
                </span>
              </td>
              <td>{formatDateTime(schedule.send_at)}</td>
              <td>
                <span className="badge bg-secondary">{schedule.frequency}</span>
              </td>
              <td>
                <span className={`badge ${getStatusBadgeClass(schedule.status)}`}>{schedule.status}</span>
              </td>
              <td>
                {schedule.status === "pending" && (
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleStatusUpdate(schedule.id, "cancelled")}
                      disabled={updatingId === schedule.id}
                    >
                      {updatingId === schedule.id ? <span className="loading-spinner"></span> : "Cancel"}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
