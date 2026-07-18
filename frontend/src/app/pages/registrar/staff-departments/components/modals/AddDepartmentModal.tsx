import { useState } from "react";
import { X, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDepartmentModal({ isOpen, onClose }: AddDepartmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col animate-in zoom-in-95 duration-200 my-auto">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Add New Department</h3>
              <p className="text-sm text-slate-500">Configure clearance office</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Name *</label>
              <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Finance Office" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Code *</label>
              <input type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. FIN-01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Type</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                <option>Administrative</option>
                <option>Academic</option>
                <option>Facility</option>
                <option>Finance</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Clearance Responsibilities</h4>
            <p className="text-xs text-slate-500 mb-4">Select which clearance types require approval from this department.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" defaultChecked />
                <span className="text-sm font-medium text-slate-700">Graduation Clearance</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" defaultChecked />
                <span className="text-sm font-medium text-slate-700">Withdrawal Clearance</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" defaultChecked />
                <span className="text-sm font-medium text-slate-700">Transfer Clearance</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                <span className="text-sm font-medium text-slate-700">Staff Clearance</span>
              </label>
            </div>
          </div>

        </form>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 z-10">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Create Department
          </Button>
        </div>

      </div>
    </div>
  );
}
