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
    console.log("🔄 Processing pending SMS messages...")
    const pendingSchedules = await getPendingSchedules()
    console.log(`📋 Found ${pendingSchedules.length} pending schedules`)

    for (const schedule of pendingSchedules) {
      try {
        console.log(`📤 Processing schedule ${schedule.id}...`)
        let result

        if (schedule.recipient_type === "all") {
          const patients = await getPatients()
          const patientIds = patients.map((p) => p.id)
          console.log(`👥 Sending to all ${patientIds.length} patients`)
          result = await sendBulkSMS(schedule.template_id, patientIds)
        } else if (schedule.recipient_type === "multiple" && schedule.recipient_ids) {
          const patientIds = Array.isArray(schedule.recipient_ids)
            ? schedule.recipient_ids
            : JSON.parse(schedule.recipient_ids as any)
          console.log(`👥 Sending to ${patientIds.length} selected patients`)
          result = await sendBulkSMS(schedule.template_id, patientIds)
        } else if (schedule.recipient_type === "single" && schedule.recipient_ids) {
          const patientIds = Array.isArray(schedule.recipient_ids)
            ? schedule.recipient_ids
            : JSON.parse(schedule.recipient_ids as any)
          if (patientIds.length > 0) {
            console.log(`👤 Sending to single patient ${patientIds[0]}`)
            result = await sendSMSToPatient(schedule.template_id, patientIds[0])
          }
        }

        if (result?.success) {
          await updateScheduleStatus(schedule.id, "sent")
          processed++
          console.log(`✅ Schedule ${schedule.id} processed successfully`)
        } else {
          await updateScheduleStatus(schedule.id, "failed")
          errors.push(`Schedule ${schedule.id}: ${result?.error || "Unknown error"}`)
          console.log(`❌ Schedule ${schedule.id} failed: ${result?.error}`)
        }
      } catch (error) {
        await updateScheduleStatus(schedule.id, "failed")
        const errorMsg = error instanceof Error ? error.message : "Unknown error"
        errors.push(`Schedule ${schedule.id}: ${errorMsg}`)
        console.log(`❌ Schedule ${schedule.id} failed with exception: ${errorMsg}`)
      }
    }

    console.log(`🎉 Cron job completed: ${processed} processed, ${errors.length} errors`)
    return {
      success: true,
      processed,
      errors,
    }
  } catch (error) {
    console.error("❌ Cron job failed:", error)
    return {
      success: false,
      processed: 0,
      errors: [error instanceof Error ? error.message : "Unknown error"],
    }
  }
}
