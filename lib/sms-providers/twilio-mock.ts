import type { ISMSProvider } from "../types"

export class TwilioMockProvider implements ISMSProvider {
  async sendSMS(phoneNumber: string, message: string): Promise<{ success: boolean; error?: string }> {
    // Mock implementation - in production, this would use actual Twilio API
    console.log(`[MOCK SMS] Sending to ${phoneNumber}: ${message}`)

    // Simulate random failures for testing (10% failure rate)
    if (Math.random() < 0.1) {
      return {
        success: false,
        error: "Mock SMS provider failure - network timeout",
      }
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    return { success: true }
  }
}
