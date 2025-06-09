"use server"

import { getPendingSchedules, updateScheduleStatus } from "./schedule-actions"
import { getPatients } from "./patient-actions"
import { sendSMSToPatient, sendBulkSMS } from "./sms-actions"

export async function processPendingMessages(): Promise<{
  success: boolean
  processed: number
  errors: string[]
}> {
  const errors: string[] = []
  let processed = 0

  try {
    const pendingSchedules = await getPendingSchedules()

    for (const schedule of pendingSchedules) {
      try {
        let result

        if (schedule.recipient_type === "all") {
          const patients = await getPatients()
          const patientIds = patients.map((p) => p.id)
          result = await sendBulkSMS(schedule.template_id, patientIds)
        } else if (schedule.recipient_type === "multiple" && schedule.recipient_ids) {
          const patientIds = JSON.parse(schedule.recipient_ids as any)
          result = await sendBulkSMS(schedule.template_id, patientIds)
        } else if (schedule.recipient_type === "single" && schedule.recipient_ids) {
          const patientIds = JSON.parse(schedule.recipient_ids as any)
          if (patientIds.length > 0) {
            result = await sendSMSToPatient(schedule.template_id, patientIds[0])
          }
        }

        if (result?.success) {
          await updateScheduleStatus(schedule.id, "sent")
          processed++
        } else {
          await updateScheduleStatus(schedule.id, "failed")
          errors.push(`Schedule ${schedule.id}: ${result?.error || "Unknown error"}`)
        }
      } catch (error) {
        await updateScheduleStatus(schedule.id, "failed")
        errors.push(`Schedule ${schedule.id}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    return {
      success: true,
      processed,
      errors,
    }
  } catch (error) {
    console.error("Error processing pending messages:", error)
    return {
      success: false,
      processed: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    }
  }
}
