import { X, ShieldAlert, AlertOctagon } from "lucide-react";
import { Button } from "../../../../../../components/ui/Button";
import { RejectedClearance } from "../../data/types";
import { useState } from "react";

interface Props {
  clearance: RejectedClearance;
  onClose: () => void;
}

export function FinalRejectionModal({ clearance, onClose }: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-red-50">
          <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            Confirm Final Rejection
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-red-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-red-700" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 items-start">
            <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 leading-relaxed">
              <strong>Warning:</strong> You are about to issue a final rejection for this clearance. This action will permanently close the appeal workflow. The student will be notified that their appeal has been denied.
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Final Rejection Reason <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g. Student failed to provide required documents after multiple requests."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Review Summary <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              placeholder="Summarize the appeal review findings..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Admin Password Re-authentication <span className="text-red-500">*</span></label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password to confirm..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none"
            />
          </div>

          <label className="flex items-start gap-3 mt-4 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-red-600 rounded focus:ring-red-500"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="text-sm text-slate-700">
              I acknowledge that this action is final and will lock the record as permanently rejected.
            </span>
          </label>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!confirmed || password.length === 0}
          >
            Confirm Final Rejection
          </Button>
        </div>
      </div>
    </div>
  );
}
