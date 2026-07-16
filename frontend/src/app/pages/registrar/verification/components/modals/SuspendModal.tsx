import { X, ShieldOff, AlertTriangle } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

interface SuspendModalProps {
  onClose: () => void;
}

export function SuspendModal({ onClose }: SuspendModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldOff className="w-5 h-5 text-rose-600" />
            Suspend Account
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-sm text-rose-800 font-medium">
              Warning: Suspending this account will immediately block the student from accessing the MWU e-Clearance System.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Suspension Duration <span className="text-rose-500">*</span></label>
            <select className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
              <option value="temporary">Temporary (Investigation Pending)</option>
              <option value="permanent">Permanent (Fraud/Policy Violation)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Suspension Reason / Notes <span className="text-rose-500">*</span></label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
              placeholder="Provide a detailed reason for the suspension. This will be recorded in the audit log."
            ></textarea>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 pt-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            Send suspension notification to student's university email
          </label>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="text-slate-600">Cancel</Button>
          <Button onClick={onClose} className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm">
            Confirm Suspension
          </Button>
        </div>
      </div>
    </div>
  );
}
