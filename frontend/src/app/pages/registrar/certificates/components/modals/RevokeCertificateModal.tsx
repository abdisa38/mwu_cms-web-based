import { useState } from "react";
import { CertificateRecord } from "../../data/types";
import { X, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface RevokeCertificateModalProps {
  certificate: CertificateRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRevoke: () => void;
}

export function RevokeCertificateModal({ certificate, isOpen, onClose, onRevoke }: RevokeCertificateModalProps) {
  const [isRevoking, setIsRevoking] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  if (!isOpen || !certificate) return null;

  const handleRevoke = () => {
    setIsRevoking(true);
    setTimeout(() => {
      setIsRevoking(false);
      onRevoke();
      onClose();
    }, 2000);
  };

  const isConfirmed = confirmText === "REVOKE-" + certificate.certificateNumber;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-red-100">
        
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-red-50 text-red-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Revoke Official Certificate</h3>
              <p className="text-sm opacity-80">This is a highly restricted, destructive action.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-red-400 hover:text-red-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-red-50 border border-red-200 p-5 rounded-xl flex gap-4 text-red-900 shadow-sm">
            <AlertTriangle className="w-6 h-6 shrink-0 text-red-600 mt-0.5" />
            <div className="text-sm space-y-2">
              <p className="font-bold text-base">Warning: Certificate Invalidation</p>
              <p>Revoking this certificate changes its official verification status to <strong>REVOKED</strong> globally.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Public QR code scans will show this certificate as invalid and revoked.</li>
                <li>The student will be notified immediately.</li>
                <li>This action cannot be undone without a formal Reinstatement process.</li>
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Revocation</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none mb-3">
              <option value="">Select a reason...</option>
              <option value="fraud">Fraudulent Activity Discovered</option>
              <option value="error">Critical Data Error</option>
              <option value="disciplinary">Post-Graduation Disciplinary Action</option>
              <option value="other">Other Administrative Reason</option>
            </select>
            <textarea 
              rows={3} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none resize-none text-sm"
              placeholder="Provide detailed evidence and justification..."
            ></textarea>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" /> Mandatory Security Verification
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                  Type <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-red-600">REVOKE-{certificate.certificateNumber}</span> to confirm
                </label>
                <input 
                  type="text" 
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={`REVOKE-${certificate.certificateNumber}`} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-red-500 font-mono" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">Registrar Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-red-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isRevoking}>Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
            onClick={handleRevoke}
            isLoading={isRevoking}
            disabled={!isConfirmed}
          >
            Confirm Permanent Revocation
          </Button>
        </div>
      </div>
    </div>
  );
}
