import type { Patient, Billing, Accession } from "./types"

export class MessageParser {
  static parseMessage(
    template: string,
    patient?: Patient,
    billing?: Billing,
    accession?: Accession,
    customData?: Record<string, any>,
  ): string {
    let parsedMessage = template

    // Replace patient placeholders
    if (patient) {
      parsedMessage = parsedMessage.replace(/\{\{patient_name\}\}/g, patient.name)
      parsedMessage = parsedMessage.replace(/\{\{patient_phone\}\}/g, patient.phone_number)
      parsedMessage = parsedMessage.replace(/\{\{patient_email\}\}/g, patient.email || "")
    }

    // Replace billing placeholders
    if (billing) {
      parsedMessage = parsedMessage.replace(/\{\{amount\}\}/g, billing.amount.toString())
      parsedMessage = parsedMessage.replace(/\{\{due_date\}\}/g, billing.due_date || "")
      parsedMessage = parsedMessage.replace(/\{\{billing_status\}\}/g, billing.status)
    }

    // Replace accession placeholders
    if (accession) {
      parsedMessage = parsedMessage.replace(/\{\{test_name\}\}/g, accession.test_name)
      parsedMessage = parsedMessage.replace(/\{\{result_date\}\}/g, accession.result_date || "")
      parsedMessage = parsedMessage.replace(/\{\{test_status\}\}/g, accession.status)
    }

    // Replace custom data placeholders
    if (customData) {
      Object.entries(customData).forEach(([key, value]) => {
        const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, "g")
        parsedMessage = parsedMessage.replace(placeholder, String(value))
      })
    }

    // Replace date placeholders
    const today = new Date().toLocaleDateString()
    parsedMessage = parsedMessage.replace(/\{\{today\}\}/g, today)

    return parsedMessage
  }

  static getPlaceholders(template: string): string[] {
    const placeholderRegex = /\{\{([^}]+)\}\}/g
    const placeholders: string[] = []
    let match

    while ((match = placeholderRegex.exec(template)) !== null) {
      placeholders.push(match[1])
    }

    return [...new Set(placeholders)] // Remove duplicates
  }
}
