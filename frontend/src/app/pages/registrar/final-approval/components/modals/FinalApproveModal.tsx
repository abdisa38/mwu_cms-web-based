import { useState } from "react";
import { CheckCircle2, ShieldAlert, KeyRound, AlertTriangle } from "lucide-react";
import { FinalApprovalRequest } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

interface FinalApproveModalProps {
  clearance: FinalApprovalRequest;
  onClose: () => void;
  onPreviewCertificate: () => void;
}

export function FinalApproveModal({ clearance, onClose, onPreviewCertificate }: FinalApproveModalProps) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      onPreviewCertificate();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-emerald-50">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border border-emerald-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Confirm Final Approval</h2>
          <p className="text-emerald-700 mt-1">You are about to issue the final university clearance for <strong>{clearance.studentName}</strong>.</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-900">Irreversible Action</p>
              <p className="text-sm text-amber-700 mt-1">Approving this clearance will permanently lock the record, notify the student, and generate the official digital certificate.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-400" />
              Re-enter Registrar Password to Confirm
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-lg flex items-center gap-3 border border-slate-200">
            <ShieldAlert className="w-5 h-5 text-indigo-500 shrink-0" />
            <p className="text-xs text-slate-600 font-medium">This action will be logged in the system audit trail with your IP address and timestamp.</p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white" 
            onClick={handleApprove} 
            disabled={!password || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm & Generate Certificate'}
          </Button>
        </div>
      </div>
    </div>
  );
}
