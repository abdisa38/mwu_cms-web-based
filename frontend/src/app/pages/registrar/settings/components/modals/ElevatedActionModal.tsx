import { useState } from "react";
import { AlertTriangle, Lock, X } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface Props {
  actionName: string;
  onClose: () => void;
  onConfirm: (password: string, reason: string) => void;
}

export function ElevatedActionModal({ actionName, onClose, onConfirm }: Props) {
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    if (!password || !reason) return;
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onConfirm(password, reason);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="bg-rose-50 px-6 py-4 border-b border-rose-200 flex flex-col items-center justify-center text-center relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-rose-400 hover:text-rose-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-3 text-rose-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-rose-900">Elevated Security Action</h2>
          <p className="text-sm text-rose-700 mt-1 px-4">
            You are attempting to execute a high-risk operation: <br/>
            <span className="font-bold">"{actionName}"</span>
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Reason for Change (Audit Log)</label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Authorized maintenance window per Ticket INC-892"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none h-20 resize-none text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-slate-400"/> Re-enter Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Super Admin password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleConfirm} 
            disabled={!password || !reason || isLoading}
            className="bg-rose-600 hover:bg-rose-700 text-white border-0"
          >
            {isLoading ? "Verifying..." : "Confirm Action"}
          </Button>
        </div>

      </div>
    </div>
  );
}
