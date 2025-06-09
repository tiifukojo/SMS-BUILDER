// This script demonstrates how to set up a cron job to process pending SMS messages
// In production, you would use a proper cron service or task scheduler

const CRON_ENDPOINT = "http://localhost:3000/api/cron"

async function processPendingMessages() {
  try {
    console.log("Processing pending SMS messages...")

    const response = await fetch(CRON_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (result.success) {
      console.log(`✅ Processed ${result.processed} messages`)
      if (result.errors.length > 0) {
        console.log("⚠️ Errors:", result.errors)
      }
    } else {
      console.error("❌ Failed to process messages:", result.error)
    }
  } catch (error) {
    console.error("❌ Cron job failed:", error.message)
  }
}

// Run immediately
processPendingMessages()

// In production, you would set up a proper cron job like:
// */5 * * * * curl -X POST http://your-domain.com/api/cron
console.log("To set up automatic processing, add this to your crontab:")
console.log("*/5 * * * * curl -X POST http://your-domain.com/api/cron")
