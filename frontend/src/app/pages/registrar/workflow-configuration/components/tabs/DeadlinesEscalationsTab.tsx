import { Clock, AlertTriangle, FastForward } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export function DeadlinesEscalationsTab() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Overview */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" /> Deadlines & Escalation Rules
        </h3>
        <p className="text-sm text-slate-500 mt-1">Define maximum processing times per step and automatic system actions when deadlines are breached.</p>
      </div>

      {/* Global Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Global Timers</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Calculation Method</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
              <option>Business Days (Mon-Fri)</option>
              <option>Calendar Days</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">Excludes weekends and configured university holidays.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Overall Maximum Clearance Duration</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={14} className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
              <span className="text-sm text-slate-600">Days</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Triggers Registrar intervention if exceeded.</p>
          </div>
        </div>
      </div>

      {/* Node specific escalations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> Department Escalation Triggers
          </h4>
          <Button variant="outline" className="text-xs h-8">Add Rule</Button>
        </div>

        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900">Library Review Overdue</div>
                <div className="text-xs text-slate-600 mt-1">If <span className="font-bold">Library Review</span> sits in pending for more than <span className="font-bold text-red-600">2 days</span>:</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-2 text-sm flex items-center gap-2 shrink-0 shadow-sm">
                <FastForward className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-slate-700">Notify Department Head</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900">Critical Delay</div>
                <div className="text-xs text-slate-600 mt-1">If <span className="font-bold">Any Department Review</span> sits in pending for more than <span className="font-bold text-red-600">5 days</span>:</div>
              </div>
              <div className="bg-white border border-red-200 rounded-lg p-2 text-sm flex items-center gap-2 shrink-0 shadow-sm">
                <FastForward className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-700">Escalate to Super Admin</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
