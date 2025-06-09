import type { ISMSProvider } from "./types"
import { TwilioMockProvider } from "./sms-providers/twilio-mock"

export class SMSService {
  private provider: ISMSProvider

  constructor(provider?: ISMSProvider) {
    this.provider = provider || new TwilioMockProvider()
  }

  async sendSMS(phoneNumber: string, message: string): Promise<{ success: boolean; error?: string }> {
    // Validate phone number
    if (!this.isValidPhoneNumber(phoneNumber)) {
      return {
        success: false,
        error: "Invalid phone number format",
      }
    }

    try {
      return await this.provider.sendSMS(phoneNumber, message)
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    // E.164 format validation
    const e164Regex = /^\+[1-9]\d{1,14}$/
    return e164Regex.test(phoneNumber)
  }
}
