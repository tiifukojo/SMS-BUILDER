"use client"

import { useState } from "react"
import { processPendingMessages } from "../../actions/cron-actions"

export default function CronTrigger() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleProcessPending = async () => {
    setIsProcessing(true)
    setResult(null)

    try {
      const cronResult = await processPendingMessages()
      setResult(cronResult)
    } catch (error) {
      setResult({
        success: false,
        processed: 0,
        errors: ["Failed to process pending messages"],
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <button className="btn btn-outline-success w-100 mb-3" onClick={handleProcessPending} disabled={isProcessing}>
        {isProcessing ? (
          <>
            <span className="loading-spinner me-2"></span>
            Processing Pending Messages...
          </>
        ) : (
          <>
            <i className="bi bi-clock me-2"></i>
            Process Pending Schedules
          </>
        )}
      </button>

      {result && (
        <div className={`alert ${result.success ? "alert-success" : "alert-danger"}`}>
          <h6>
            <i className={`bi ${result.success ? "bi-check-circle" : "bi-exclamation-triangle"} me-2`}></i>
            Cron Job Result
          </h6>
          <p className="mb-1">
            <strong>Processed:</strong> {result.processed} messages
          </p>
          {result.errors && result.errors.length > 0 && (
            <div>
              <strong>Errors:</strong>
              <ul className="mb-0 mt-1">
                {result.errors.slice(0, 3).map((error: string, index: number) => (
                  <li key={index}>
                    <small>{error}</small>
                  </li>
                ))}
                {result.errors.length > 3 && (
                  <li>
                    <small>... and {result.errors.length - 3} more</small>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="text-muted small">
        <i className="bi bi-info-circle me-1"></i>
        This simulates the automatic cron job that processes scheduled messages every 5 minutes.
      </div>
    </div>
  )
}
