import { AlertCircle, HelpCircle, Send, ShieldAlert, RefreshCw } from "lucide-react";
import { RejectedClearance } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

interface AppealReviewPanelProps {
  clearance: RejectedClearance;
  onRequestInfo: () => void;
  onSendReconsideration: () => void;
  onReopen: () => void;
  onFinalReject: () => void;
}

export function AppealReviewPanel({ 
  clearance, 
  onRequestInfo, 
  onSendReconsideration, 
  onReopen, 
  onFinalReject 
}: AppealReviewPanelProps) {
  
  if (!clearance.appeal) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">Review Unavailable</h3>
        <p className="text-slate-500">There is no active appeal to review for this clearance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Registrar Appeal Review</h3>
        <p className="text-slate-500 text-sm mb-6">
          Carefully review the student's appeal and the original rejection. Select the appropriate action to proceed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={onRequestInfo}
            className="flex flex-col items-center justify-center p-6 bg-orange-50 border-2 border-orange-200 rounded-xl hover:bg-orange-100 transition-colors text-center group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <HelpCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-bold text-orange-900 mb-1">Request Information</h4>
            <p className="text-xs text-orange-700 px-4">Ask the student for more details or documents.</p>
          </button>

          <button 
            onClick={onSendReconsideration}
            className="flex flex-col items-center justify-center p-6 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-center group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-blue-900 mb-1">Send for Reconsideration</h4>
            <p className="text-xs text-blue-700 px-4">Send back to the rejecting department for a second look.</p>
          </button>

          <button 
            onClick={onReopen}
            className="flex flex-col items-center justify-center p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors text-center group"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
              <RefreshCw className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-bold text-emerald-900 mb-1">Reopen Clearance</h4>
            <p className="text-xs text-emerald-700 px-4">Approve appeal and reopen the clearance workflow.</p>
          </button>

          <button 
            onClick={onFinalReject}
            className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-slate-300 rounded-xl hover:bg-slate-100 transition-colors text-center group"
          >
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-300 transition-colors">
              <ShieldAlert className="w-6 h-6 text-slate-700" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Final Rejection</h4>
            <p className="text-xs text-slate-600 px-4">Deny appeal and lock record as permanently rejected.</p>
          </button>
        </div>
      </div>
      
      {/* Priority & Assignment Control */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-900 mb-4">Appeal Management</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority Level</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
              <option>Normal</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assign Reviewer</label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none bg-white">
              <option>Dr. Samuel Tadesse (Registrar)</option>
              <option>Ato Girma (Asst. Registrar)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Update Management Settings</Button>
        </div>
      </div>
    </div>
  );
}
