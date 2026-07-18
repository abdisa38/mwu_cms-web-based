import { useState } from "react";
import { CertificateRecord } from "../../data/types";
import { X, RefreshCw, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface RegenerateCertificateModalProps {
  certificate: CertificateRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: () => void;
}

export function RegenerateCertificateModal({ certificate, isOpen, onClose, onRegenerate }: RegenerateCertificateModalProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!isOpen || !certificate) return null;

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      onRegenerate();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Regenerate Certificate</h3>
              <p className="text-sm text-slate-500">Create a new version (v{certificate.certificateVersion + 1}.0)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-800">
            <AlertTriangle className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">A new version will be created.</p>
              <p>The previous version (v{certificate.certificateVersion}.0) will be archived but preserved in the audit history. The new certificate will maintain the same certificate number but will generate a new verification token.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Regeneration</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none mb-3">
              <option value="">Select a reason...</option>
              <option value="correction">Approved Correction Request</option>
              <option value="error">System Error on Previous Generation</option>
              <option value="update">Clearance Data Updated</option>
              <option value="other">Other</option>
            </select>
            <textarea 
              rows={3} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-sm"
              placeholder="Provide additional details..."
            ></textarea>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" /> Security Verification
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Registrar Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                I confirm that I am authorized to regenerate this official document.
              </label>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isRegenerating}>Cancel</Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            onClick={handleRegenerate}
            isLoading={isRegenerating}
          >
            Confirm & Regenerate
          </Button>
        </div>
      </div>
    </div>
  );
}
