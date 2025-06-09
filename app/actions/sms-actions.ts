"use server"

import { MockDataStore } from "@/lib/mock-data"
import type { SMSLog } from "@/lib/types"
import { SMSService } from "@/lib/sms-service"
import { MessageParser } from "@/lib/message-parser"
import { getPatientWithRelatedData } from "./patient-actions"
import { getTemplateById } from "./template-actions"
import { revalidatePath } from "next/cache"

const dataStore = MockDataStore.getInstance()
const smsService = new SMSService()

export async function getSMSLogs(): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return dataStore.getEnrichedLogs()
}

export async function logSMS(data: {
  template_id?: number
  schedule_id?: number
  patient_id?: number
  billing_id?: number
  accession_id?: number
  phone_number: string
  parsed_message: string
  status: string
  error_message?: string
}): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 50))

    const log = dataStore.createLog({
      template_id: data.template_id,
      schedule_id: data.schedule_id,
      patient_id: data.patient_id,
      billing_id: data.billing_id,
      accession_id: data.accession_id,
      phone_number: data.phone_number,
      parsed_message: data.parsed_message,
      status: data.status as SMSLog["status"],
      error_message: data.error_message,
      sent_at: data.status === "sent" ? new Date().toISOString() : undefined,
    })

    revalidatePath("/logs")
    return { success: true, id: log.id }
  } catch (error) {
    console.error("Error logging SMS:", error)
    return { success: false, error: "Failed to log SMS" }
  }
}

export async function sendSMSToPatient(
  templateId: number,
  patientId: number,
  customData?: Record<string, any>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const template = await getTemplateById(templateId)
    if (!template) {
      return { success: false, error: "Template not found" }
    }

    const patientData = await getPatientWithRelatedData(patientId)
    if (!patientData) {
      return { success: false, error: "Patient not found" }
    }

    const { patient, billing, accessions } = patientData
    const latestBilling = billing[0]
    const latestAccession = accessions[0]

    const parsedMessage = MessageParser.parseMessage(
      template.message_template,
      patient,
      latestBilling,
      latestAccession,
      customData,
    )

    const smsResult = await smsService.sendSMS(patient.phone_number, parsedMessage)

    await logSMS({
      template_id: templateId,
      patient_id: patientId,
      billing_id: latestBilling?.id,
      accession_id: latestAccession?.id,
      phone_number: patient.phone_number,
      parsed_message: parsedMessage,
      status: smsResult.success ? "sent" : "failed",
      error_message: smsResult.error,
    })

    return smsResult
  } catch (error) {
    console.error("Error sending SMS:", error)
    return { success: false, error: "Failed to send SMS" }
  }
}

export async function sendBulkSMS(
  templateId: number,
  patientIds: number[],
  customData?: Record<string, any>,
): Promise<{ success: boolean; sent: number; failed: number; errors: string[] }> {
  let sent = 0
  let failed = 0
  const errors: string[] = []

  for (const patientId of patientIds) {
    const result = await sendSMSToPatient(templateId, patientId, customData)
    if (result.success) {
      sent++
    } else {
      failed++
      errors.push(`Patient ${patientId}: ${result.error}`)
    }
    // Add small delay between sends to simulate real-world behavior
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return {
    success: sent > 0,
    sent,
    failed,
    errors,
  }
}
