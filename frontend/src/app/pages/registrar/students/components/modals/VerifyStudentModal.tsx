import { useState } from "react";
import { X, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface VerifyStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

export function VerifyStudentModal({ isOpen, onClose, studentName }: VerifyStudentModalProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleAction = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Verify Student Identity</h3>
              <p className="text-sm text-slate-500">{studentName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-sm text-emerald-800">
            <strong>Action Required:</strong> Review the uploaded ID document against the student's profile information. If they match, approve the verification to unlock the student's clearance dashboard.
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Verification Notes / Remarks</label>
            <textarea 
              rows={3} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-sm"
              placeholder="E.g., ID document matches profile clearly. OR ID picture is too blurry to verify."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 h-12 gap-2" onClick={handleAction}>
              <XCircle className="w-4 h-4" /> Reject Verification
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 gap-2" onClick={handleAction}>
              <CheckCircle2 className="w-4 h-4" /> Approve Verification
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
