import { X, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "../../../../../../components/ui/Button";
import { RejectedClearance } from "../../data/types";
import { useState } from "react";

interface Props {
  clearance: RejectedClearance;
  onClose: () => void;
}

export function ReopenClearanceModal({ clearance, onClose }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            Reopen Clearance
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-800 leading-relaxed">
              <strong>Controlled Workflow:</strong> Reopening this clearance changes its status and allows it to continue through the standard review process. The original rejection remains permanently preserved in the audit log.
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reopening Reason <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g. Appeal approved, student submitted missing document."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Registrar Notes <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              placeholder="Detailed justification for reopening this clearance..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none resize-none"
            ></textarea>
          </div>

          <label className="flex items-start gap-3 mt-4 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="text-sm text-slate-700">
              I confirm that I have reviewed the appeal and authorize reopening this clearance workflow.
            </span>
          </label>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!confirmed}
          >
            Reopen Clearance
          </Button>
        </div>
      </div>
    </div>
  );
}
