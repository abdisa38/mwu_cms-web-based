import { X, CheckCircle, Info } from "lucide-react";
import { Button } from "../../../../../components/ui/Button";

interface ApproveModalProps {
  onClose: () => void;
}

export function ApproveModal({ onClose }: ApproveModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Approve Verification
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0" />
            <p className="text-sm text-blue-800">
              You are about to approve the verification for <strong>Chala Merera (UGR/8821/11)</strong>. 
              This will activate their account and allow them to start the clearance process.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Verification Notes (Optional)</label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all min-h-[100px]"
              placeholder="Add any final notes for the audit log..."
            ></textarea>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="text-slate-600">Cancel</Button>
          <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            Confirm & Approve
          </Button>
        </div>
      </div>
    </div>
  );
}
