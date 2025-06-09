"use server"

import { executeQuery, executeInsert } from "@/lib/database"
import type { SMSSchedule } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function getSchedules(): Promise<SMSSchedule[]> {
  const query = `
    SELECT s.*, t.name as template_name 
    FROM sms_schedules s 
    JOIN sms_templates t ON s.template_id = t.id 
    ORDER BY s.send_at DESC
  `
  return await executeQuery<SMSSchedule>(query)
}

export async function createSchedule(data: {
  template_id: number
  recipient_type: string
  recipient_ids?: number[]
  send_at: string
  frequency: string
  created_by?: string
}): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    const query = `
      INSERT INTO sms_schedules (template_id, recipient_type, recipient_ids, send_at, frequency, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    const id = await executeInsert(query, [
      data.template_id,
      data.recipient_type,
      data.recipient_ids ? JSON.stringify(data.recipient_ids) : null,
      data.send_at,
      data.frequency,
      data.created_by || "system",
    ])

    revalidatePath("/schedule")
    return { success: true, id }
  } catch (error) {
    console.error("Error creating schedule:", error)
    return { success: false, error: "Failed to create schedule" }
  }
}

export async function updateScheduleStatus(id: number, status: string): Promise<{ success: boolean; error?: string }> {
  try {
    const query = "UPDATE sms_schedules SET status = ? WHERE id = ?"
    await executeQuery(query, [status, id])

    revalidatePath("/schedule")
    return { success: true }
  } catch (error) {
    console.error("Error updating schedule status:", error)
    return { success: false, error: "Failed to update schedule status" }
  }
}

export async function getPendingSchedules(): Promise<SMSSchedule[]> {
  const query = `
    SELECT * FROM sms_schedules 
    WHERE status = 'pending' AND send_at <= NOW()
    ORDER BY send_at ASC
  `
  return await executeQuery<SMSSchedule>(query)
}
