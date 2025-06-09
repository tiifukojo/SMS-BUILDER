import type { Patient, Billing, Accession, SMSTemplate, SMSSchedule, SMSLog } from "./types"

// Mock Patients Data
export const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    phone_number: "+1234567890",
    email: "john.doe@email.com",
    date_of_birth: "1985-06-15",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone_number: "+1987654321",
    email: "jane.smith@email.com",
    date_of_birth: "1990-03-22",
    created_at: "2024-01-16T09:15:00Z",
    updated_at: "2024-01-16T09:15:00Z",
  },
  {
    id: 3,
    name: "Bob Johnson",
    phone_number: "+1555123456",
    email: "bob.johnson@email.com",
    date_of_birth: "1978-11-08",
    created_at: "2024-01-17T14:20:00Z",
    updated_at: "2024-01-17T14:20:00Z",
  },
  {
    id: 4,
    name: "Alice Brown",
    phone_number: "+1444987654",
    email: "alice.brown@email.com",
    date_of_birth: "1992-09-14",
    created_at: "2024-01-18T11:45:00Z",
    updated_at: "2024-01-18T11:45:00Z",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    phone_number: "+1333456789",
    email: "charlie.wilson@email.com",
    date_of_birth: "1980-12-03",
    created_at: "2024-01-19T16:30:00Z",
    updated_at: "2024-01-19T16:30:00Z",
  },
  {
    id: 6,
    name: "Diana Martinez",
    phone_number: "+1222345678",
    email: "diana.martinez@email.com",
    date_of_birth: "1987-04-18",
    created_at: "2024-01-20T08:00:00Z",
    updated_at: "2024-01-20T08:00:00Z",
  },
  {
    id: 7,
    name: "Edward Davis",
    phone_number: "+1111234567",
    email: "edward.davis@email.com",
    date_of_birth: "1975-07-25",
    created_at: "2024-01-21T13:15:00Z",
    updated_at: "2024-01-21T13:15:00Z",
  },
  {
    id: 8,
    name: "Fiona Garcia",
    phone_number: "+1999876543",
    email: "fiona.garcia@email.com",
    date_of_birth: "1995-01-12",
    created_at: "2024-01-22T10:45:00Z",
    updated_at: "2024-01-22T10:45:00Z",
  },
]

// Mock Billing Data
export const mockBilling: Billing[] = [
  {
    id: 1,
    patient_id: 1,
    amount: 150.0,
    status: "pending",
    due_date: "2024-02-15",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    patient_id: 2,
    amount: 200.5,
    status: "paid",
    due_date: "2024-01-30",
    created_at: "2024-01-16T09:15:00Z",
  },
  {
    id: 3,
    patient_id: 3,
    amount: 75.25,
    status: "overdue",
    due_date: "2024-01-15",
    created_at: "2024-01-17T14:20:00Z",
  },
  {
    id: 4,
    patient_id: 4,
    amount: 300.0,
    status: "pending",
    due_date: "2024-02-20",
    created_at: "2024-01-18T11:45:00Z",
  },
  {
    id: 5,
    patient_id: 5,
    amount: 125.75,
    status: "pending",
    due_date: "2024-02-10",
    created_at: "2024-01-19T16:30:00Z",
  },
  {
    id: 6,
    patient_id: 6,
    amount: 180.0,
    status: "paid",
    due_date: "2024-02-05",
    created_at: "2024-01-20T08:00:00Z",
  },
  {
    id: 7,
    patient_id: 7,
    amount: 95.5,
    status: "overdue",
    due_date: "2024-01-20",
    created_at: "2024-01-21T13:15:00Z",
  },
  {
    id: 8,
    patient_id: 8,
    amount: 220.25,
    status: "pending",
    due_date: "2024-02-25",
    created_at: "2024-01-22T10:45:00Z",
  },
]

// Mock Accessions Data
export const mockAccessions: Accession[] = [
  {
    id: 1,
    patient_id: 1,
    test_name: "Blood Test",
    status: "completed",
    result_date: "2024-01-25",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    patient_id: 2,
    test_name: "X-Ray",
    status: "in_progress",
    result_date: undefined,
    created_at: "2024-01-16T09:15:00Z",
  },
  {
    id: 3,
    patient_id: 3,
    test_name: "MRI Scan",
    status: "completed",
    result_date: "2024-01-20",
    created_at: "2024-01-17T14:20:00Z",
  },
  {
    id: 4,
    patient_id: 4,
    test_name: "CT Scan",
    status: "pending",
    result_date: undefined,
    created_at: "2024-01-18T11:45:00Z",
  },
  {
    id: 5,
    patient_id: 5,
    test_name: "Ultrasound",
    status: "completed",
    result_date: "2024-01-22",
    created_at: "2024-01-19T16:30:00Z",
  },
  {
    id: 6,
    patient_id: 6,
    test_name: "ECG",
    status: "completed",
    result_date: "2024-01-23",
    created_at: "2024-01-20T08:00:00Z",
  },
  {
    id: 7,
    patient_id: 7,
    test_name: "Blood Test",
    status: "in_progress",
    result_date: undefined,
    created_at: "2024-01-21T13:15:00Z",
  },
  {
    id: 8,
    patient_id: 8,
    test_name: "Urine Test",
    status: "pending",
    result_date: undefined,
    created_at: "2024-01-22T10:45:00Z",
  },
]

// Mock SMS Templates Data
export const mockTemplates: SMSTemplate[] = [
  {
    id: 1,
    name: "Patient Registration",
    message_template:
      "Hello {{patient_name}}, welcome to our lab! Your registration is complete. Contact us at (555) 123-4567 for any questions.",
    description: "Welcome message for new patients",
    category: "registration",
    is_active: true,
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
  },
  {
    id: 2,
    name: "Sample Collection Reminder",
    message_template:
      "Hi {{patient_name}}, this is a reminder for your {{test_name}} sample collection scheduled for tomorrow. Please arrive fasting.",
    description: "Reminder for sample collection",
    category: "collection",
    is_active: true,
    created_at: "2024-01-11T10:30:00Z",
    updated_at: "2024-01-11T10:30:00Z",
  },
  {
    id: 3,
    name: "Billing Notice",
    message_template:
      "Dear {{patient_name}}, your bill of ${{amount}} is due on {{due_date}}. Please make payment to avoid late fees.",
    description: "Payment reminder for patients",
    category: "billing",
    is_active: true,
    created_at: "2024-01-12T14:15:00Z",
    updated_at: "2024-01-12T14:15:00Z",
  },
  {
    id: 4,
    name: "Results Ready",
    message_template:
      "Hello {{patient_name}}, your {{test_name}} results are ready for pickup. Available on {{result_date}}.",
    description: "Notification when results are available",
    category: "results",
    is_active: true,
    created_at: "2024-01-13T11:20:00Z",
    updated_at: "2024-01-13T11:20:00Z",
  },
  {
    id: 5,
    name: "Appointment Confirmation",
    message_template:
      "Hi {{patient_name}}, your appointment for {{test_name}} is confirmed for {{appointment_date}}. See you then!",
    description: "Appointment confirmation message",
    category: "general",
    is_active: true,
    created_at: "2024-01-14T16:45:00Z",
    updated_at: "2024-01-14T16:45:00Z",
  },
  {
    id: 6,
    name: "Overdue Payment Alert",
    message_template:
      "URGENT: {{patient_name}}, your payment of ${{amount}} is overdue. Please contact us immediately at (555) 123-4567.",
    description: "Alert for overdue payments",
    category: "billing",
    is_active: true,
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-01-15T08:30:00Z",
  },
]

// Mock SMS Schedules Data
export const mockSchedules: SMSSchedule[] = [
  {
    id: 1,
    template_id: 2,
    recipient_type: "single",
    recipient_ids: [1],
    send_at: "2024-02-01T09:00:00Z",
    frequency: "once",
    status: "pending",
    created_by: "admin",
    created_at: "2024-01-25T10:00:00Z",
    updated_at: "2024-01-25T10:00:00Z",
  },
  {
    id: 2,
    template_id: 3,
    recipient_type: "multiple",
    recipient_ids: [1, 3, 5],
    send_at: "2024-02-05T14:00:00Z",
    frequency: "once",
    status: "pending",
    created_by: "admin",
    created_at: "2024-01-26T11:30:00Z",
    updated_at: "2024-01-26T11:30:00Z",
  },
  {
    id: 3,
    template_id: 4,
    recipient_type: "single",
    recipient_ids: [2],
    send_at: "2024-01-28T16:00:00Z",
    frequency: "once",
    status: "sent",
    created_by: "admin",
    created_at: "2024-01-27T09:15:00Z",
    updated_at: "2024-01-28T16:05:00Z",
  },
  {
    id: 4,
    template_id: 1,
    recipient_type: "all",
    recipient_ids: undefined,
    send_at: "2024-02-10T10:00:00Z",
    frequency: "weekly",
    status: "pending",
    created_by: "admin",
    created_at: "2024-01-28T14:20:00Z",
    updated_at: "2024-01-28T14:20:00Z",
  },
]

// Mock SMS Logs Data
export const mockLogs: SMSLog[] = [
  {
    id: 1,
    template_id: 4,
    schedule_id: 3,
    patient_id: 2,
    billing_id: 2,
    accession_id: 2,
    phone_number: "+1987654321",
    parsed_message: "Hello Jane Smith, your X-Ray results are ready for pickup. Available on .",
    status: "sent",
    error_message: undefined,
    sent_at: "2024-01-28T16:05:00Z",
    created_at: "2024-01-28T16:05:00Z",
  },
  {
    id: 2,
    template_id: 1,
    schedule_id: undefined,
    patient_id: 1,
    billing_id: undefined,
    accession_id: undefined,
    phone_number: "+1234567890",
    parsed_message:
      "Hello John Doe, welcome to our lab! Your registration is complete. Contact us at (555) 123-4567 for any questions.",
    status: "sent",
    error_message: undefined,
    sent_at: "2024-01-27T10:30:00Z",
    created_at: "2024-01-27T10:30:00Z",
  },
  {
    id: 3,
    template_id: 3,
    schedule_id: undefined,
    patient_id: 3,
    billing_id: 3,
    accession_id: undefined,
    phone_number: "+1555123456",
    parsed_message:
      "Dear Bob Johnson, your bill of $75.25 is due on 2024-01-15. Please make payment to avoid late fees.",
    status: "failed",
    error_message: "Invalid phone number format",
    sent_at: undefined,
    created_at: "2024-01-26T15:20:00Z",
  },
  {
    id: 4,
    template_id: 2,
    schedule_id: undefined,
    patient_id: 4,
    billing_id: undefined,
    accession_id: 4,
    phone_number: "+1444987654",
    parsed_message:
      "Hi Alice Brown, this is a reminder for your CT Scan sample collection scheduled for tomorrow. Please arrive fasting.",
    status: "sent",
    error_message: undefined,
    sent_at: "2024-01-25T09:15:00Z",
    created_at: "2024-01-25T09:15:00Z",
  },
  {
    id: 5,
    template_id: 6,
    schedule_id: undefined,
    patient_id: 7,
    billing_id: 7,
    accession_id: undefined,
    phone_number: "+1111234567",
    parsed_message:
      "URGENT: Edward Davis, your payment of $95.5 is overdue. Please contact us immediately at (555) 123-4567.",
    status: "sent",
    error_message: undefined,
    sent_at: "2024-01-24T11:00:00Z",
    created_at: "2024-01-24T11:00:00Z",
  },
]

// In-memory storage for runtime data
export class MockDataStore {
  private static instance: MockDataStore
  private patients: Patient[] = [...mockPatients]
  private billing: Billing[] = [...mockBilling]
  private accessions: Accession[] = [...mockAccessions]
  private templates: SMSTemplate[] = [...mockTemplates]
  private schedules: SMSSchedule[] = [...mockSchedules]
  private logs: SMSLog[] = [...mockLogs]
  private nextId = {
    patients: 9,
    billing: 9,
    accessions: 9,
    templates: 7,
    schedules: 5,
    logs: 6,
  }

  static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore()
    }
    return MockDataStore.instance
  }

  // Patient operations
  getPatients(): Patient[] {
    return [...this.patients]
  }

  getPatientById(id: number): Patient | null {
    return this.patients.find((p) => p.id === id) || null
  }

  // Billing operations
  getBilling(): Billing[] {
    return [...this.billing]
  }

  getBillingByPatientId(patientId: number): Billing[] {
    return this.billing.filter((b) => b.patient_id === patientId)
  }

  // Accession operations
  getAccessions(): Accession[] {
    return [...this.accessions]
  }

  getAccessionsByPatientId(patientId: number): Accession[] {
    return this.accessions.filter((a) => a.patient_id === patientId)
  }

  // Template operations
  getTemplates(): SMSTemplate[] {
    return [...this.templates]
  }

  getTemplateById(id: number): SMSTemplate | null {
    return this.templates.find((t) => t.id === id) || null
  }

  createTemplate(data: Omit<SMSTemplate, "id" | "created_at" | "updated_at">): SMSTemplate {
    const now = new Date().toISOString()
    const template: SMSTemplate = {
      ...data,
      id: this.nextId.templates++,
      created_at: now,
      updated_at: now,
    }
    this.templates.push(template)
    return template
  }

  updateTemplate(id: number, data: Partial<SMSTemplate>): boolean {
    const index = this.templates.findIndex((t) => t.id === id)
    if (index === -1) return false

    this.templates[index] = {
      ...this.templates[index],
      ...data,
      updated_at: new Date().toISOString(),
    }
    return true
  }

  deleteTemplate(id: number): boolean {
    const index = this.templates.findIndex((t) => t.id === id)
    if (index === -1) return false

    this.templates.splice(index, 1)
    return true
  }

  // Schedule operations
  getSchedules(): SMSSchedule[] {
    return [...this.schedules]
  }

  createSchedule(data: Omit<SMSSchedule, "id" | "created_at" | "updated_at">): SMSSchedule {
    const now = new Date().toISOString()
    const schedule: SMSSchedule = {
      ...data,
      id: this.nextId.schedules++,
      created_at: now,
      updated_at: now,
    }
    this.schedules.push(schedule)
    return schedule
  }

  updateScheduleStatus(id: number, status: SMSSchedule["status"]): boolean {
    const index = this.schedules.findIndex((s) => s.id === id)
    if (index === -1) return false

    this.schedules[index] = {
      ...this.schedules[index],
      status,
      updated_at: new Date().toISOString(),
    }
    return true
  }

  getPendingSchedules(): SMSSchedule[] {
    const now = new Date()
    return this.schedules.filter((s) => s.status === "pending" && new Date(s.send_at) <= now)
  }

  // Log operations
  getLogs(): SMSLog[] {
    return [...this.logs].reverse() // Most recent first
  }

  createLog(data: Omit<SMSLog, "id" | "created_at">): SMSLog {
    const log: SMSLog = {
      ...data,
      id: this.nextId.logs++,
      created_at: new Date().toISOString(),
    }
    this.logs.push(log)
    return log
  }

  // Helper method to get enriched data
  getEnrichedSchedules() {
    return this.schedules.map((schedule) => {
      const template = this.getTemplateById(schedule.template_id)
      return {
        ...schedule,
        template_name: template?.name || "Unknown Template",
      }
    })
  }

  getEnrichedLogs() {
    return this.logs.map((log) => {
      const patient = log.patient_id ? this.getPatientById(log.patient_id) : null
      const template = log.template_id ? this.getTemplateById(log.template_id) : null
      return {
        ...log,
        patient_name: patient?.name || "Unknown Patient",
        template_name: template?.name || "Manual",
      }
    })
  }
}
