import { useState } from "react";
import { X, AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface PublishWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowName: string;
  version: string;
}

export function PublishWorkflowModal({ isOpen, onClose, workflowName, version }: PublishWorkflowModalProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onClose();
    }, 2500);
  };

  const isConfirmed = confirmText === "PUBLISH" && password.length > 3;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col animate-in zoom-in-95 duration-200 my-auto border border-amber-200">
        
        <div className="px-6 py-4 border-b border-amber-100 flex items-center justify-between bg-amber-50 text-amber-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Publish Workflow Configuration</h3>
              <p className="text-sm opacity-80">{workflowName} v{version}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-amber-400 hover:text-amber-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          
          {/* Validation Results */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Automated Validation Checks</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Workflow Has Start and End Nodes
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Circular Dependencies Detected
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> All Required Departments Exist
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Final Approval Gate Configured
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-red-50 border border-red-200 p-5 rounded-xl flex gap-4 text-red-900 shadow-sm">
            <AlertTriangle className="w-6 h-6 shrink-0 text-red-600 mt-0.5" />
            <div className="text-sm space-y-2">
              <p className="font-bold text-base">Configuration Impact Warning</p>
              <p>Publishing this configuration will affect new clearance requests created after activation. Existing clearance requests will remain connected to their original workflow version unless explicitly migrated through a controlled administrative process.</p>
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Change Summary (For Audit Log) *</label>
              <textarea 
                required
                rows={2} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                placeholder="Briefly describe what changed in this version..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                  Type <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-amber-600">PUBLISH</span> to confirm
                </label>
                <input 
                  type="text" 
                  required
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="PUBLISH" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-amber-500 font-mono" 
                />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                  Registrar Re-authentication
                </label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-amber-500" 
                />
              </div>
            </div>
          </form>

        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 z-10">
          <Button variant="outline" onClick={onClose} disabled={isPublishing}>Cancel</Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm font-bold"
            onClick={handlePublish}
            isLoading={isPublishing}
            disabled={!isConfirmed}
          >
            Confirm Publish
          </Button>
        </div>

      </div>
    </div>
  );
}
