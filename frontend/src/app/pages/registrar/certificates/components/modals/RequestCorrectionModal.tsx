import { useState } from "react";
import { CertificateRecord } from "../../data/types";
import { X, Edit3, UploadCloud } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface RequestCorrectionModalProps {
  certificate: CertificateRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRequest: () => void;
}

export function RequestCorrectionModal({ certificate, isOpen, onClose, onRequest }: RequestCorrectionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !certificate) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRequest();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Request Certificate Correction</h3>
              <p className="text-sm text-slate-500">{certificate.certificateNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700">
            A correction request does not modify the certificate immediately. It will create a formal request that must be reviewed and approved before a new version of the certificate can be generated.
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Original Value</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" placeholder="E.g. Abeba Kebede" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Corrected Value</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" placeholder="E.g. Abebe Kebede" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Correction</label>
            <textarea 
              rows={3} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
              placeholder="Provide a detailed reason for why this certificate needs correction..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Supporting Evidence (Optional)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Submit Request
          </Button>
        </div>
      </div>
    </div>
  );
}
