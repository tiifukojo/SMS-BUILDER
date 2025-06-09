# Lab SMS Platform - Mock Demo Version

A comprehensive SMS messaging platform for laboratory patient communication, built with Next.js 14, Bootstrap 5, and TypeScript. This demo version uses mock data and simulated SMS sending for easy testing and deployment.

## 🚀 Features

### Core Functionality
- **SMS Template Management** - Create reusable templates with dynamic placeholders
- **Message Scheduling** - Schedule messages for future delivery with recurring options
- **Instant Messaging** - Send immediate SMS to individuals or groups
- **Comprehensive Logging** - Track all messages with delivery status
- **Background Processing** - Automatic cron job simulation for scheduled messages

### Demo Highlights
- ✅ **No Database Required** - Uses in-memory mock data
- ✅ **No SMS Provider Setup** - Mock Twilio implementation included
- ✅ **Realistic Data** - 8 sample patients, 6 templates, comprehensive logs
- ✅ **Full CRUD Operations** - Create, read, update, delete templates
- ✅ **Simulated Network Delays** - Realistic user experience
- ✅ **Error Simulation** - 10% random failure rate for testing

## 🛠️ Technology Stack

- **Next.js 14** with App Router and Server Actions
- **Bootstrap 5** with custom CSS styling
- **TypeScript** throughout for type safety
- **Mock Data Store** for in-memory persistence
- **Pluggable SMS Architecture** ready for real providers

## 📦 Quick Start

1. **Clone and Install**
   \`\`\`bash
   git clone <repository-url>
   cd lab-sms-platform-mock
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open Browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

4. **Start Testing!**
   - Create new SMS templates
   - Schedule messages for future delivery
   - Send immediate messages to patients
   - View comprehensive logs

## 📱 Pages & Features

### `/` - Dashboard
- Platform overview and feature highlights
- Quick access to all sections
- Demo information and limitations

### `/templates` - Template Management
- View all SMS templates with categories
- Create new templates with placeholder support
- Edit existing templates with live preview
- Delete unused templates

### `/schedule` - Message Scheduling
- Schedule messages for single/multiple/all patients
- Set delivery time and frequency (once, daily, weekly, monthly)
- View and manage scheduled messages
- Cancel pending schedules

### `/send` - Instant Messaging
- Send immediate SMS to individual patients or groups
- Real-time message preview with sample data
- Custom data injection via JSON
- Process pending schedules manually
- Bulk messaging capabilities

### `/logs` - Message History
- Complete audit trail of all sent messages
- Delivery status tracking (sent, failed, pending)
- Error message details for failed deliveries
- Patient and template association
- Searchable message history

## 🎯 Mock Data Overview

### Sample Patients (8 total)
- John Doe, Jane Smith, Bob Johnson, Alice Brown
- Charlie Wilson, Diana Martinez, Edward Davis, Fiona Garcia
- Each with realistic phone numbers, emails, and medical data

### Pre-configured Templates (6 total)
- **Patient Registration** - Welcome message for new patients
- **Sample Collection Reminder** - Appointment reminders
- **Billing Notice** - Payment due notifications
- **Results Ready** - Test result availability alerts
- **Appointment Confirmation** - Appointment confirmations
- **Overdue Payment Alert** - Urgent payment reminders

### Dynamic Placeholders
- `{{patient_name}}` - Patient's full name
- `{{patient_phone}}` - Patient's phone number
- `{{amount}}` - Bill amount
- `{{due_date}}` - Payment due date
- `{{test_name}}` - Name of medical test
- `{{result_date}}` - Test result date
- `{{today}}` - Current date

## 🔧 Architecture

### Mock Data Store
\`\`\`typescript
// In-memory singleton pattern for data persistence
class MockDataStore {
  private static instance: MockDataStore
  private patients: Patient[] = [...mockPatients]
  private templates: SMSTemplate[] = [...mockTemplates]
  // ... other collections
}
\`\`\`

### SMS Service Architecture
\`\`\`typescript
interface ISMSProvider {
  sendSMS(phoneNumber: string, message: string): Promise<{
    success: boolean
    error?: string
  }>
}

class TwilioMockProvider implements ISMSProvider {
  // Mock implementation with simulated delays and failures
}
\`\`\`

### Message Parser
\`\`\`typescript
class MessageParser {
  static parseMessage(
    template: string,
    patient?: Patient,
    billing?: Billing,
    accession?: Accession,
    customData?: Record<string, any>
  ): string
}
\`\`\`

## 🚀 Deployment Ready

This mock version is perfect for:
- **Demonstrations** - Show platform capabilities without setup
- **Testing** - Validate workflows and user experience
- **Development** - Build additional features on solid foundation
- **Prototyping** - Rapid iteration and feedback collection

## 🔄 Converting to Production

To convert this demo to a production system:

1. **Replace Mock Data Store** with real database (MySQL, PostgreSQL)
2. **Implement Real SMS Provider** (Twilio, AWS SNS, etc.)
3. **Add Authentication** and user management
4. **Implement Data Persistence** for schedules and logs
5. **Add Environment Configuration** for different deployments
6. **Set up Real Cron Jobs** for background processing

## 📊 Demo Statistics

- **8 Mock Patients** with complete medical records
- **6 SMS Templates** across all categories
- **4 Sample Schedules** in various states
- **5 Historical Logs** showing different outcomes
- **100% TypeScript** coverage for type safety
- **Responsive Design** works on all devices

## 🎨 UI/UX Features

- **Bootstrap 5** modern component library
- **Custom CSS** for enhanced visual appeal
- **Responsive Grid** adapts to all screen sizes
- **Interactive Forms** with real-time validation
- **Loading States** for better user feedback
- **Error Handling** with user-friendly messages
- **Success Notifications** for completed actions

## 🔍 Testing Scenarios

Try these workflows to explore the platform:

1. **Create a New Template**
   - Go to Templates → New Template
   - Use placeholders like `{{patient_name}}`
   - Preview with sample data

2. **Schedule a Message**
   - Go to Schedule → Select template and patients
   - Set future delivery time
   - Process via Send → Process Pending Schedules

3. **Send Immediate Message**
   - Go to Send → Choose template and recipients
   - Add custom JSON data if needed
   - Watch real-time delivery simulation

4. **Monitor Activity**
   - Go to Logs → View all message history
   - Check delivery status and error details
   - Track patient communication patterns

## 📝 Notes

- **Data Persistence** - All changes reset on server restart
- **SMS Simulation** - No real messages sent, all logged locally
- **Network Delays** - Simulated for realistic user experience
- **Error Rates** - 10% random failure rate for testing error handling
- **Scalability** - Architecture ready for production scaling

This mock version provides a complete, functional SMS platform that demonstrates all core features without requiring external dependencies or complex setup procedures.
