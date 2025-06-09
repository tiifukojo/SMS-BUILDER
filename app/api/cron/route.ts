import { processPendingMessages } from "../../actions/cron-actions"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const result = await processPendingMessages()

    return NextResponse.json({
      success: true,
      processed: result.processed,
      errors: result.errors,
    })
  } catch (error) {
    console.error("Cron job error:", error)
    return NextResponse.json({ success: false, error: "Failed to process pending messages" }, { status: 500 })
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() })
}
