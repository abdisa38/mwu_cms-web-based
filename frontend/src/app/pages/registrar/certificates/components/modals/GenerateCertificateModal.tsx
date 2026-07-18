import { useState } from "react";
import { CertificateRecord } from "../../data/types";
import { X, CheckCircle2, Award, Info, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface GenerateCertificateModalProps {
  certificate: CertificateRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (cert: CertificateRecord) => void;
}

export function GenerateCertificateModal({ certificate, isOpen, onClose, onGenerate }: GenerateCertificateModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !certificate) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate({
        ...certificate,
        certificateNumber: "MWU-EC-2026-000892",
        certificateStatus: "Active",
        certificateVersion: 1,
        issueDate: new Date().toISOString(),
        verificationToken: "vk_newtoken123",
        issuedBy: "Dr. Aster Tadesse (Registrar)",
        versions: [
          {
            id: "V1-" + Date.now(),
            versionNumber: 1,
            createdDate: new Date().toISOString(),
            createdBy: "Current User",
            reason: "Initial Issuance",
            status: "Active",
            documentHash: "0xNEW...HASH"
          }
        ]
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Generate Official Certificate</h3>
              <p className="text-sm text-slate-500">Create digital clearance certificate</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-800">
            <Info className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
            <p className="text-sm">
              You are about to generate an official Madda Walabu University digital clearance certificate. This action will assign a unique, immutable certificate number and generate a cryptographic verification token.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-slate-500 mb-1">Student</p>
              <p className="font-semibold text-slate-900">{certificate.studentName}</p>
              <p className="text-slate-500">{certificate.studentId}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-slate-500 mb-1">Clearance Info</p>
              <p className="font-semibold text-slate-900">{certificate.clearanceNumber}</p>
              <p className="text-slate-500">{certificate.clearanceType}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 border-b border-slate-100 pb-2">Configuration</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Certificate Template</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900">
                  <option>Standard MWU Layout</option>
                  <option>Legacy Layout</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900">
                  <option>English</option>
                  <option>Amharic (Preview)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 
              Eligibility Verified
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Final Approval Completed</li>
              <li className="flex items-center gap-2 text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Student Identity Confirmed</li>
              <li className="flex items-center gap-2 text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Blocking Appeals</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200 text-sm">
            <Lock className="w-4 h-4 shrink-0" />
            <p>This action is fully audited. The student will be notified immediately upon generation.</p>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isGenerating}>Cancel</Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            onClick={handleGenerate}
            isLoading={isGenerating}
          >
            Confirm & Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
