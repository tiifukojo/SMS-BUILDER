import { getSchedules } from "../actions/schedule-actions"
import { getTemplates } from "../actions/template-actions"
import ScheduleList from "./components/ScheduleList"
import ScheduleForm from "./components/ScheduleForm"

export default async function SchedulePage() {
  const [schedules, templates] = await Promise.all([getSchedules(), getTemplates()])

  return (
    <div>
      <h1 className="mb-4">Schedule SMS Messages</h1>

      <div className="row">
        <div className="col-lg-4">
          <ScheduleForm templates={templates} />
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Scheduled Messages</h5>
            </div>
            <div className="card-body">
              <ScheduleList schedules={schedules} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
