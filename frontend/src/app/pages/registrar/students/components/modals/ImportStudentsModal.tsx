import { useState } from "react";
import { X, UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface ImportStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportStudentsModal({ isOpen, onClose }: ImportStudentsModalProps) {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
    }, 1500);
  };

  const handleConfirm = () => {
    setStep(3);
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Import Student Records</h3>
              <p className="text-sm text-slate-500">Bulk upload via CSV or Excel</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
                <UploadCloud className="w-12 h-12 mx-auto mb-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                <h4 className="text-sm font-bold text-slate-700">Click to upload or drag and drop</h4>
                <p className="text-xs text-slate-500 mt-1">.csv, .xls, .xlsx (Max 10MB)</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-1">Important Instructions</span>
                  <ul className="list-disc pl-4 space-y-1 opacity-90">
                    <li>Ensure the file matches the standard MWU template.</li>
                    <li>Duplicate student IDs will be flagged and skipped.</li>
                    <li>Required fields: Full Name, Student ID, Email, Department, Program, Year.</li>
                  </ul>
                  <button className="text-blue-600 font-bold mt-2 underline text-xs">Download MWU Import Template</button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-bold text-slate-900 mb-1">450</div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Rows</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">448</div>
                  <div className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Valid</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center relative group">
                  <div className="text-2xl font-bold text-amber-600 mb-1">2</div>
                  <div className="text-xs font-medium text-amber-700 uppercase tracking-wider">Duplicates</div>
                </div>
              </div>
              <div className="text-sm text-slate-700">
                <p><strong>2 duplicates found.</strong> These rows share Student IDs with existing records and will be skipped.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Import Successful</h3>
              <p className="text-slate-500 text-sm">448 new students have been added to the database.</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          {step === 1 && (
            <>
              <Button variant="outline" onClick={onClose} disabled={isUploading}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={handleUpload} isLoading={isUploading}>Validate File</Button>
            </>
          )}
          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>Cancel</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2" onClick={handleConfirm}>
                <CheckCircle2 className="w-4 h-4" /> Confirm Import
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
