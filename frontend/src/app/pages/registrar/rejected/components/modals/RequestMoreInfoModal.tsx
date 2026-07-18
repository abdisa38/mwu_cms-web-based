import { X, HelpCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { RejectedClearance } from "../../data/types";

interface Props {
  clearance: RejectedClearance;
  onClose: () => void;
}

export function RequestMoreInfoModal({ clearance, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            Request Information
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Request additional details or specific documents from the student to process their appeal.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Information Required <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g. Please provide the physical return receipt."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Message <span className="text-red-500">*</span></label>
            <textarea 
              rows={4}
              placeholder="Explain exactly what you need from the student..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Response Deadline</label>
            <input 
              type="date" 
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">Send Request</Button>
        </div>
      </div>
    </div>
  );
}
