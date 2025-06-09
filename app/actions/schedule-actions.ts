"use server"

import { MockDataStore } from "@/lib/mock-data"
import type { SMSSchedule } from "@/lib/types"
import { revalidatePath } from "next/cache"

const dataStore = MockDataStore.getInstance()

export async function getSchedules(): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return dataStore.getEnrichedSchedules()
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
    await new Promise((resolve) => setTimeout(resolve, 200))

    const schedule = dataStore.createSchedule({
      template_id: data.template_id,
      recipient_type: data.recipient_type as SMSSchedule["recipient_type"],
      recipient_ids: data.recipient_ids,
      send_at: data.send_at,
      frequency: data.frequency as SMSSchedule["frequency"],
      status: "pending",
      created_by: data.created_by || "system",
    })

    revalidatePath("/schedule")
    return { success: true, id: schedule.id }
  } catch (error) {
    console.error("Error creating schedule:", error)
    return { success: false, error: "Failed to create schedule" }
  }
}

export async function updateScheduleStatus(id: number, status: string): Promise<{ success: boolean; error?: string }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 150))

    const success = dataStore.updateScheduleStatus(id, status as SMSSchedule["status"])

    if (!success) {
      return { success: false, error: "Schedule not found" }
    }

    revalidatePath("/schedule")
    return { success: true }
  } catch (error) {
    console.error("Error updating schedule status:", error)
    return { success: false, error: "Failed to update schedule status" }
  }
}

export async function getPendingSchedules(): Promise<SMSSchedule[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return dataStore.getPendingSchedules()
}
