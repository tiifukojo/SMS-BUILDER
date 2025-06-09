import { processPendingMessages } from "../../actions/cron-actions"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("🔄 Cron endpoint triggered")
    const result = await processPendingMessages()

    return NextResponse.json({
      success: true,
      processed: result.processed,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Cron job error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process pending messages",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({
    status: "ok",
    message: "SMS Platform Cron Service",
    timestamp: new Date().toISOString(),
  })
}
