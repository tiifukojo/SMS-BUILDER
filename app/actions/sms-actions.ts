"use server"

import { executeQuery, executeInsert } from "@/lib/database"
import type { SMSLog } from "@/lib/types"
import { SMSService } from "@/lib/sms-service"
import { MessageParser } from "@/lib/message-parser"
import { getPatientWithRelatedData } from "./patient-actions"
import { getTemplateById } from "./template-actions"
import { revalidatePath } from "next/cache"

const smsService = new SMSService()

export async function getSMSLogs(): Promise<SMSLog[]> {
  const query = `
    SELECT l.*, p.name as patient_name, t.name as template_name
    FROM sms_logs l
    LEFT JOIN patients p ON l.patient_id = p.id
    LEFT JOIN sms_templates t ON l.template_id = t.id
    ORDER BY l.created_at DESC
    LIMIT 100
  `
  return await executeQuery<SMSLog>(query)
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
    const query = `
      INSERT INTO sms_logs (
        template_id, schedule_id, patient_id, billing_id, accession_id,
        phone_number, parsed_message, status, error_message, sent_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const id = await executeInsert(query, [
      data.template_id || null,
      data.schedule_id || null,
      data.patient_id || null,
      data.billing_id || null,
      data.accession_id || null,
      data.phone_number,
      data.parsed_message,
      data.status,
      data.error_message || null,
      data.status === "sent" ? new Date() : null,
    ])

    revalidatePath("/logs")
    return { success: true, id }
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
  }

  return {
    success: sent > 0,
    sent,
    failed,
    errors,
  }
}
