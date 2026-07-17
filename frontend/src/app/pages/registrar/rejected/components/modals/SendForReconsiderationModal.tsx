import { X, Send } from "lucide-react";
import { Button } from "../../../../../../components/ui/Button";
import { RejectedClearance } from "../../data/types";

interface Props {
  clearance: RejectedClearance;
  onClose: () => void;
}

export function SendForReconsiderationModal({ clearance, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Send for Reconsideration
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-2 text-sm text-blue-800">
            This will send the clearance back to <strong>{clearance.rejectedDepartment}</strong> for a second review. The officer will be notified.
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Department</label>
            <input 
              type="text" 
              value={clearance.rejectedDepartment}
              disabled
              className="w-full border border-slate-200 bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reconsideration Reason <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g. Student provided physical receipt."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message to Department Officer <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              placeholder="Explain why you are sending this back for review..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Send for Review</Button>
        </div>
      </div>
    </div>
  );
}
