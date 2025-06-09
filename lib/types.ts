export interface Patient {
  id: number
  name: string
  phone_number: string
  email?: string
  date_of_birth?: string
  created_at: string
  updated_at: string
}

export interface Billing {
  id: number
  patient_id: number
  amount: number
  status: "pending" | "paid" | "overdue"
  due_date?: string
  created_at: string
}

export interface Accession {
  id: number
  patient_id: number
  test_name: string
  status: "pending" | "in_progress" | "completed"
  result_date?: string
  created_at: string
}

export interface SMSTemplate {
  id: number
  name: string
  message_template: string
  description?: string
  category: "registration" | "collection" | "billing" | "results" | "general"
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SMSSchedule {
  id: number
  template_id: number
  recipient_type: "single" | "multiple" | "all"
  recipient_ids?: number[]
  send_at: string
  frequency: "once" | "daily" | "weekly" | "monthly"
  status: "pending" | "sent" | "failed" | "cancelled"
  created_by?: string
  created_at: string
  updated_at: string
}

export interface SMSLog {
  id: number
  template_id?: number
  schedule_id?: number
  patient_id?: number
  billing_id?: number
  accession_id?: number
  phone_number: string
  parsed_message: string
  status: "sent" | "failed" | "pending"
  error_message?: string
  sent_at?: string
  created_at: string
}

export interface ISMSProvider {
  sendSMS(phoneNumber: string, message: string): Promise<{ success: boolean; error?: string }>
}
