import { X, XCircle, AlertTriangle, Upload } from "lucide-react";
import { Button } from "../../../../../../components/ui/Button";

interface RejectModalProps {
  onClose: () => void;
}

export function RejectModal({ onClose }: RejectModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-rose-50">
          <h3 className="text-lg font-bold text-rose-900 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            Reject Verification
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              Rejecting this verification will keep the student's account inactive. An email will be sent to the student with the rejection reason.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Rejection Reason <span className="text-rose-500">*</span></label>
            <select className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all">
              <option value="">Select a reason...</option>
              <option value="invalid_id">Invalid Student ID Document</option>
              <option value="mismatch">Information Mismatch</option>
              <option value="duplicate">Duplicate Account Detected</option>
              <option value="not_enrolled">Student Not Currently Enrolled</option>
              <option value="suspicious">Suspicious Activity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Detailed Comments <span className="text-rose-500">*</span></label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all min-h-[100px]"
              placeholder="Provide detailed explanation for the student..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Upload Evidence (Optional)</label>
            <div className="w-full border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 mb-2" />
              <span className="text-sm font-medium">Click to upload or drag and drop</span>
              <span className="text-xs">PNG, JPG, PDF up to 5MB</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="text-slate-600">Cancel</Button>
          <Button onClick={onClose} className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm">
            Reject Verification
          </Button>
        </div>
      </div>
    </div>
  );
}
