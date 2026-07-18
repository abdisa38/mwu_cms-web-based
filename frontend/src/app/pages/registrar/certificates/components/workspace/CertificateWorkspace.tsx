import { useState } from "react";
import { CertificateRecord } from "../../data/types";
import { 
  X, ShieldCheck, Download, Printer, Share2, Award, Clock, History, FileText, QrCode 
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { CertificatePreviewPanel } from "./CertificatePreviewPanel";
import { QRVerificationPanel } from "./QRVerificationPanel";
import { CertificateVersionHistory } from "./CertificateVersionHistory";

interface CertificateWorkspaceProps {
  certificate: CertificateRecord | null;
  onClose: () => void;
}

export function CertificateWorkspace({ certificate, onClose }: CertificateWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "qr" | "versions" | "history">("preview");

  if (!certificate) return null;

  const isGenerated = !!certificate.certificateNumber;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-slate-50 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex-none">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  Certificate Management
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    certificate.certificateStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                    certificate.certificateStatus === 'Revoked' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {certificate.certificateStatus}
                  </span>
                </h2>
                <p className="text-sm text-slate-500">
                  {certificate.studentName} • {certificate.studentId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2" disabled={!isGenerated}>
                <Share2 className="w-4 h-4" /> Share
              </Button>
              <Button variant="outline" className="gap-2" disabled={!isGenerated}>
                <Printer className="w-4 h-4" /> Print
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" disabled={!isGenerated}>
                <Download className="w-4 h-4" /> Download PDF
              </Button>
              <div className="w-px h-6 bg-slate-200 mx-1"></div>
              <Button variant="ghost" onClick={onClose} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200">
            <button 
              onClick={() => setActiveTab("preview")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "preview" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <FileText className="w-4 h-4" /> Official Preview
            </button>
            <button 
              onClick={() => setActiveTab("qr")}
              disabled={!isGenerated}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTab === "qr" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <QrCode className="w-4 h-4" /> QR & Verification
            </button>
            <button 
              onClick={() => setActiveTab("versions")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "versions" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <History className="w-4 h-4" /> Version History
            </button>
          </div>
        </div>

        {/* Workspace Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-6">
            {activeTab === "preview" && <CertificatePreviewPanel certificate={certificate} />}
            {activeTab === "qr" && <QRVerificationPanel certificate={certificate} />}
            {activeTab === "versions" && <CertificateVersionHistory certificate={certificate} />}
          </div>
        </div>
      </div>
    </div>
  );
}
