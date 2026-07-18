import { useState } from "react";
import { X, ShieldAlert, AlertTriangle, Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface SuspendStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffName: string;
}

export function SuspendStaffModal({ isOpen, onClose, staffName }: SuspendStaffModalProps) {
  const [isSuspending, setIsSuspending] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  if (!isOpen) return null;

  const handleSuspend = () => {
    setIsSuspending(true);
    setTimeout(() => {
      setIsSuspending(false);
      onClose();
    }, 2000);
  };

  const isConfirmed = confirmText === "SUSPEND";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-red-100">
        
        <div className="px-6 py-4 border-b border-red-100 flex items-center justify-between bg-red-50 text-red-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Suspend Staff Account</h3>
              <p className="text-sm opacity-80">{staffName}</p>
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
              <p className="font-bold text-base">Immediate Access Revocation</p>
              <p>Suspending this account will immediately revoke {staffName}'s access to the Registrar System.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Active sessions will be immediately terminated.</li>
                <li>Department approval workflows may be blocked if this is the only assigned head.</li>
                <li>An audit log will be permanently generated.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Suspension Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="date" className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Suspension End Date (Optional)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="date" className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Suspension</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none mb-3">
              <option value="">Select a reason...</option>
              <option value="leave">Extended Leave of Absence</option>
              <option value="investigation">Pending Security Investigation</option>
              <option value="disciplinary">Disciplinary Action</option>
              <option value="termination">Employment Termination</option>
              <option value="other">Other Administrative Reason</option>
            </select>
            <textarea 
              rows={3} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none resize-none text-sm"
              placeholder="Internal Notes (Visible only to Super Admins)..."
            ></textarea>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                Type <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-red-600">SUSPEND</span> to confirm
              </label>
              <input 
                type="text" 
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SUSPEND" 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-red-500 font-mono" 
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSuspending}>Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white shadow-sm"
            onClick={handleSuspend}
            isLoading={isSuspending}
            disabled={!isConfirmed}
          >
            Confirm Suspension
          </Button>
        </div>
      </div>
    </div>
  );
}
