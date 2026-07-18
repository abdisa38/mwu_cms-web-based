import { X, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface RequestInfoModalProps {
  onClose: () => void;
}

export function RequestInfoModal({ onClose }: RequestInfoModalProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-amber-50">
          <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Request More Information
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Send a request to the student to provide additional documents or clarify their submitted information. The verification process will be paused until they respond.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Required Information <span className="text-rose-500">*</span></label>
            <div className="space-y-2 mt-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Clearer photo of Student ID
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                University Admission Letter
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                Valid Kebele ID / Passport
              </label>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-slate-700 block">Message to Student <span className="text-rose-500">*</span></label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
              placeholder="Explain exactly what is needed and why..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Response Deadline</label>
            <input 
              type="date" 
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="text-slate-600">Cancel</Button>
          <Button onClick={onClose} className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm">
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}
