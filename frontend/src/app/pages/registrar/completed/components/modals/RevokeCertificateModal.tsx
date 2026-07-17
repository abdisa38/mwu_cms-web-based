import { X, ShieldAlert, KeyRound, AlertTriangle } from "lucide-react";
import { CompletedClearance } from "../../data/types";
import { Button } from "../../../../../../components/ui/Button";

export function RevokeCertificateModal({ clearance, onClose }: { clearance: CompletedClearance, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Revoke Certificate</h2>
              <p className="text-xs text-red-600 font-medium">Highly Restricted Action</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">
              Revoking a certificate changes its verification status globally and renders the physical/digital document officially invalid. This action will be permanently recorded in the audit log and the student will be notified.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Revocation Reason</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-white">
                <option>Discovered Fraud / Forgery</option>
                <option>Administrative Error</option>
                <option>Disciplinary Action Post-Graduation</option>
                <option>Financial Discrepancy Found</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Explanation</label>
              <textarea 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none resize-none"
                rows={3}
                placeholder="Required. Provide specific details for the revocation..."
              ></textarea>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-slate-400" />
                Administrator Re-authentication
              </label>
              <input 
                type="password" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="Enter your password to confirm..."
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="confirm-revoke" className="mt-1 rounded border-slate-300 text-red-600 focus:ring-red-500" />
              <label htmlFor="confirm-revoke" className="text-sm text-slate-600">
                I understand that this action will invalidate certificate <strong className="text-slate-900">{clearance.certificate.certificateNumber}</strong> globally.
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Permanently Revoke</Button>
        </div>
      </div>
    </div>
  );
}
