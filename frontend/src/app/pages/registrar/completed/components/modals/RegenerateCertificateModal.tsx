import { X, RefreshCw, KeyRound, AlertTriangle } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { Button } from "../../../../../components/ui/Button";

export function RegenerateCertificateModal({ clearance, onClose }: { clearance: CompletedClearance, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Regenerate Certificate</h2>
              <p className="text-xs text-blue-600 font-medium">Issue new version</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              This action will generate <strong>Version {clearance.certificate.version + 1}</strong> of the certificate with a new QR verification token and document hash. The previous version (v{clearance.certificate.version}) will automatically be marked as outdated in the verification portal.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Regeneration</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>Approved Correction Request</option>
                <option>System Update / Format Change</option>
                <option>Lost/Compromised Original (Replacement)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Linked Correction Request ID (if applicable)</label>
              <input 
                type="text" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. CR-001"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-slate-400" />
                Administrator Re-authentication
              </label>
              <input 
                type="password" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password to confirm..."
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <RefreshCw className="w-4 h-4" /> Generate New Version
          </Button>
        </div>
      </div>
    </div>
  );
}
